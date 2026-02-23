import { useState, useEffect, useCallback, useRef } from 'react';
import {
  Customer,
  ActiveLoan,
  STATIONS,
  GAME_CONFIG,
  NAMES,
  AVATARS,
  LOAN_TYPES,
  LoanType,
  RiskGrade,
  StationId,
  STAFF_MEMBERS,
  StaffMember,
  SHOP_ITEMS,
  ShopItemId } from
'@/lib/loan-kitchen/data/gameData';
import {
  HuddleEvent,
  HuddleDecision,
  generateHuddleData } from
'@/lib/loan-kitchen/data/huddleData';

export type GameState = 'menu' | 'playing' | 'paused' | 'results' | 'howto';
export type GameOverReason =
'time' |
'portfolio' |
'brand' |
null |
'legacy_collapse';

const INITIAL_STAFF_ASSIGNMENTS: Record<string, string | null> = {
  account: 'teller1',
  pos: 'rm1',
  origination: 'lo1',
  decisioning: 'uw1',
  analytics: 'pa1'
};

const AI_AUTO_PROCESS_TICKS = 3;
const MAX_LOANS_PER_STATION = 3;
const MAX_LOANS_IN_SYSTEM = 10;
const ACTIVE_LOAN_PATIENCE_DECAY = 1.8; // 10% slower — was 2
// Legacy glitch: every N ticks, legacy stations have a chance to glitch
const LEGACY_GLITCH_INTERVAL = 20;
const LEGACY_GLITCH_DURATION = 4; // ticks station is locked
const LEGACY_GLITCH_CHANCE = 0.4; // 40% per legacy station per interval
// Legacy cascade: when ALL 5 stations have legacy, cascade collapse begins
const LEGACY_CASCADE_WARNING_TICKS = 25; // ~25s warning before cascade starts
const LEGACY_CASCADE_INTERVAL = 4; // seconds between each station going down

function loanNeedsManualReview(
loan: ActiveLoan,
stationId: StationId)
: boolean {
  if (loan.riskGrade === 'F') return true;
  if (loan.riskGrade === 'D' && stationId === 'decisioning') return true;
  if (loan.dti > 55) return true;
  if (loan.ltv > 92 && stationId === 'decisioning') return true;
  if (loan.creditScore < 560) return true;
  return false;
}

export function useGameEngine() {
  const [gameState, setGameState] = useState<GameState>('menu');
  const [timeLeft, setTimeLeft] = useState(GAME_CONFIG.ROUND_DURATION);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [level, setLevel] = useState(1);
  const [gameOverReason, setGameOverReason] = useState<GameOverReason>(null);
  const [droppedCustomers, setDroppedCustomers] = useState(0);
  const [lastDroppedName, setLastDroppedName] = useState<string | null>(null);
  const [brandEquity, setBrandEquity] = useState(100);
  const [isPaused, setIsPaused] = useState(false);

  const [queue, setQueue] = useState<Customer[]>([]);
  const [activeLoans, setActiveLoans] = useState<ActiveLoan[]>([]);
  const [activeHuddle, setActiveHuddle] = useState<HuddleEvent | null>(null);

  const [staffAssignments, setStaffAssignments] = useState<
    Record<string, string | null>>(
    { ...INITIAL_STAFF_ASSIGNMENTS });
  const [extraStaff, setExtraStaff] = useState<StaffMember[]>([]);

  const [aiModules, setAiModules] = useState<Record<string, boolean>>({
    account: false,
    pos: false,
    origination: false,
    decisioning: false,
    analytics: false
  });
  // Legacy software: installed per station
  const [legacyModules, setLegacyModules] = useState<Record<string, boolean>>({
    account: false,
    pos: false,
    origination: false,
    decisioning: false,
    analytics: false
  });
  // Glitch countdown per station (>0 = glitched/locked for N more ticks)
  const [glitchStations, setGlitchStations] = useState<Record<string, number>>({
    account: 0,
    pos: 0,
    origination: 0,
    decisioning: 0,
    analytics: 0
  });
  // Toast for glitch events
  const [glitchToast, setGlitchToast] = useState<string | null>(null);

  const [purchaseCounts, setPurchaseCounts] = useState<
    Record<ShopItemId, number>>(
    {
      hire_staff: 0,
      ai_account: 0,
      ai_pos: 0,
      ai_origination: 0,
      ai_decisioning: 0,
      ai_analytics: 0,
      legacy_account: 0,
      legacy_pos: 0,
      legacy_origination: 0,
      legacy_decisioning: 0,
      legacy_analytics: 0
    });
  const [portfolioStats, setPortfolioStats] = useState({
    totalLoans: 0,
    totalVolume: 0,
    defaultRate: 0.02,
    avgRisk: 0,
    health: 100
  });

  // Legacy cascade state
  const [legacyCascadeActive, setLegacyCascadeActive] = useState(false);
  const [legacyCascadeTick, setLegacyCascadeTick] = useState(0);
  const [legacyCascadeStage, setLegacyCascadeStage] = useState(0); // 0=warning, 1-5=stations going down, 6=collapse
  const legacyCascadeRef = useRef({ active: false, tick: 0, stage: 0 });

  const lastSpawnTime = useRef(Date.now());
  const aiModulesRef = useRef(aiModules);
  useEffect(() => {
    aiModulesRef.current = aiModules;
  }, [aiModules]);
  const legacyModulesRef = useRef(legacyModules);
  useEffect(() => {
    legacyModulesRef.current = legacyModules;
  }, [legacyModules]);
  const glitchStationsRef = useRef(glitchStations);
  useEffect(() => {
    glitchStationsRef.current = glitchStations;
  }, [glitchStations]);
  const isPausedRef = useRef(isPaused);
  useEffect(() => {
    isPausedRef.current = isPaused;
  }, [isPaused]);
  const glitchTickRef = useRef(0);

  // ── PAUSE / RESUME ────────────────────────────────────────────────────────
  const pauseGame = useCallback(() => setIsPaused(true), []);
  const resumeGame = useCallback(() => setIsPaused(false), []);

  // ── SHOP ──────────────────────────────────────────────────────────────────
  const buyItem = useCallback(
    (itemId: ShopItemId) => {
      const item = SHOP_ITEMS.find((i) => i.id === itemId);
      if (!item) return;
      setScore((prev) => {
        if (prev < item.cost) return prev;
        const currentCount = purchaseCounts[itemId];
        if (currentCount >= item.maxPurchases) return prev;

        if (itemId === 'hire_staff') {
          const staffIndex = currentCount;
          const newStaff: StaffMember = {
            id: `extra_${staffIndex}`,
            name:
            ['Sam Lee', 'Dana Kim', 'Chris Obi'][staffIndex] ??
            `Staff ${staffIndex + 1}`,
            role: 'Flex Officer',
            emoji: ['🧑‍💼', '👨‍💼', '👩‍💼'][staffIndex] ?? '🧑‍💼',
            stationId: 'account',
            efficiency: 1.0
          };
          setExtraStaff((prev) => [...prev, newStaff]);
        } else if (item.category === 'ai' && item.stationId) {
          // Remove legacy if present (can't have both)
          setLegacyModules((prev) => ({ ...prev, [item.stationId!]: false }));
          setAiModules((prev) => ({ ...prev, [item.stationId!]: true }));
          // Clear any active glitch (including permanent cascade crashes) for this station
          setGlitchStations((prev) => ({ ...prev, [item.stationId!]: 0 }));
          setActiveLoans((prev) =>
          prev.map((loan) => {
            if (STATIONS[loan.currentStationIndex].id === item.stationId) {
              return {
                ...loan,
                autoProcessing: true,
                autoProcessTimer: AI_AUTO_PROCESS_TICKS
              };
            }
            return loan;
          })
          );
        } else if (item.category === 'legacy' && item.stationId) {
          // Remove AI if present (can't have both)
          setAiModules((prev) => ({ ...prev, [item.stationId!]: false }));
          setLegacyModules((prev) => ({ ...prev, [item.stationId!]: true }));
          // Reset any auto-processing loans at this station
          setActiveLoans((prev) =>
          prev.map((loan) => {
            if (STATIONS[loan.currentStationIndex].id === item.stationId) {
              return {
                ...loan,
                autoProcessing: false,
                autoProcessTimer: undefined
              };
            }
            return loan;
          })
          );
        }

        setPurchaseCounts((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
        return prev - item.cost;
      });
    },
    [purchaseCounts]
  );

  // ── STAFF ─────────────────────────────────────────────────────────────────
  const assignStaff = useCallback((staffId: string, stationId: string) => {
    setStaffAssignments((prev) => {
      const updated = { ...prev };
      Object.keys(updated).forEach((sid) => {
        if (updated[sid] === staffId) updated[sid] = null;
      });
      updated[stationId] = staffId;
      return updated;
    });
  }, []);

  const unassignStaff = useCallback((stationId: string) => {
    setStaffAssignments((prev) => ({ ...prev, [stationId]: null }));
  }, []);

  // ── CUSTOMER GENERATION ───────────────────────────────────────────────────
  const generateCustomer = useCallback((): Customer => {
    const loanTypeKeys = Object.keys(LOAN_TYPES) as LoanType[];
    const type = loanTypeKeys[Math.floor(Math.random() * loanTypeKeys.length)];
    const loanConfig = LOAN_TYPES[type];
    const amount =
    Math.floor(Math.random() * (loanConfig.max - loanConfig.min)) +
    loanConfig.min;
    const creditScore = Math.floor(Math.random() * (850 - 500) + 500);
    let riskGrade: RiskGrade = 'F';
    if (creditScore >= 720) riskGrade = 'A';else
    if (creditScore >= 680) riskGrade = 'B';else
    if (creditScore >= 620) riskGrade = 'C';else
    if (creditScore >= 580) riskGrade = 'D';
    const dti = Math.floor(Math.random() * 60);
    const ltv = Math.floor(Math.random() * 100);
    return {
      id: Math.random().toString(36).substr(2, 9),
      name: NAMES[Math.floor(Math.random() * NAMES.length)],
      type,
      amount,
      creditScore,
      dti,
      ltv,
      riskGrade,
      patience: 100,
      maxPatience: 100,
      avatar: AVATARS[Math.floor(Math.random() * AVATARS.length)]
    };
  }, []);

  // ── GAME CONTROL ──────────────────────────────────────────────────────────
  const startGame = useCallback(() => {
    setGameState('playing');
    setGameOverReason(null);
    setTimeLeft(GAME_CONFIG.ROUND_DURATION);
    setScore(0);
    setStreak(0);
    setLevel(1);
    setDroppedCustomers(0);
    setLastDroppedName(null);
    setActiveHuddle(null);
    setBrandEquity(100);
    setIsPaused(false);
    setGlitchToast(null);
    setLegacyCascadeActive(false);
    setLegacyCascadeTick(0);
    setLegacyCascadeStage(0);
    legacyCascadeRef.current = { active: false, tick: 0, stage: 0 };
    setQueue([generateCustomer(), generateCustomer(), generateCustomer()]);
    setActiveLoans([]);
    setStaffAssignments({ ...INITIAL_STAFF_ASSIGNMENTS });
    setExtraStaff([]);
    setAiModules({
      account: false,
      pos: false,
      origination: false,
      decisioning: false,
      analytics: false
    });
    setLegacyModules({
      account: false,
      pos: false,
      origination: false,
      decisioning: false,
      analytics: false
    });
    setGlitchStations({
      account: 0,
      pos: 0,
      origination: 0,
      decisioning: 0,
      analytics: 0
    });
    setPurchaseCounts({
      hire_staff: 0,
      ai_account: 0,
      ai_pos: 0,
      ai_origination: 0,
      ai_decisioning: 0,
      ai_analytics: 0,
      legacy_account: 0,
      legacy_pos: 0,
      legacy_origination: 0,
      legacy_decisioning: 0,
      legacy_analytics: 0
    });
    setPortfolioStats({
      totalLoans: 0,
      totalVolume: 0,
      defaultRate: 0.02,
      avgRisk: 85,
      health: 100
    });
    lastSpawnTime.current = Date.now();
    glitchTickRef.current = 0;
  }, [generateCustomer]);

  // ── LOAN PROCESSING ───────────────────────────────────────────────────────
  const countAtStation = (loans: ActiveLoan[], stationIndex: number) =>
  loans.filter(
    (l) => l.currentStationIndex === stationIndex && l.status !== 'completed'
  ).length;

  const acceptCustomer = useCallback(
    (customerId: string) => {
      if (activeLoans.length >= MAX_LOANS_IN_SYSTEM) return;
      const loansAtFirst = activeLoans.filter(
        (l) => l.currentStationIndex === 0
      ).length;
      if (loansAtFirst >= MAX_LOANS_PER_STATION) return;

      const customerIndex = queue.findIndex((c) => c.id === customerId);
      if (customerIndex === -1) return;
      const customer = queue[customerIndex];
      const newQueue = [...queue];
      newQueue.splice(customerIndex, 1);
      setQueue(newQueue);

      const stationId = STATIONS[0].id;
      const hasAI = aiModulesRef.current[stationId];
      const tempLoan: ActiveLoan = {
        ...customer,
        currentStationIndex: 0,
        progress: 0,
        status: 'processing',
        startTime: Date.now()
      };
      const needsReview = loanNeedsManualReview(tempLoan, stationId);

      setActiveLoans((prev) => [
      ...prev,
      {
        ...tempLoan,
        autoProcessing: hasAI && !needsReview,
        autoProcessTimer:
        hasAI && !needsReview ? AI_AUTO_PROCESS_TICKS : undefined
      }]
      );
    },
    [activeLoans, queue]
  );

  const processLoan = useCallback(
    (loanId: string) => {
      const loan = activeLoans.find((l) => l.id === loanId);
      if (!loan) return;
      const currentStationId = STATIONS[loan.currentStationIndex].id;
      if (!staffAssignments[currentStationId]) return;
      if (activeHuddle) return;
      if (loan.autoProcessing) return;
      if (loan.waitingForStation) return;
      // Block if station is glitched
      if (glitchStationsRef.current[currentStationId] > 0) return;

      const huddle = generateHuddleData(
        loanId,
        currentStationId,
        loan.currentStationIndex,
        loan
      );
      setActiveHuddle(huddle);
    },
    [activeLoans, staffAssignments, activeHuddle]
  );

  const resolveHuddle = useCallback(
    (decision: HuddleDecision) => {
      if (!activeHuddle) return;
      const { loanId, stationIndex, decisions } = activeHuddle;
      const pointDelta = decisions[decision].pointDelta;
      setScore((s) => s + pointDelta);
      setActiveHuddle(null);

      if (decision === 'reject') {
        setActiveLoans((prev) => prev.filter((l) => l.id !== loanId));
        setStreak(0);
        setBrandEquity((prev) => Math.min(100, prev + 2));
        return;
      }

      setActiveLoans((prev) => {
        const loan = prev.find((l) => l.id === loanId);
        if (!loan) return prev;

        if (stationIndex < STATIONS.length - 1) {
          const nextIndex = stationIndex + 1;
          const nextCount = countAtStation(prev, nextIndex);
          if (nextCount >= MAX_LOANS_PER_STATION) {
            return prev.map((l) =>
            l.id === loanId ? { ...l, waitingForStation: true } : l
            );
          }
          const nextStationId = STATIONS[nextIndex].id;
          const nextHasAI = aiModulesRef.current[nextStationId];
          const needsReview = loanNeedsManualReview(
            { ...loan, currentStationIndex: nextIndex },
            nextStationId
          );
          // Legacy: no auto-advance even if next station has AI (systems don't talk)
          const currentHasLegacy =
          legacyModulesRef.current[STATIONS[stationIndex].id];
          return prev.map((l) =>
          l.id === loanId ?
          {
            ...l,
            currentStationIndex: nextIndex,
            progress: 0,
            waitingForStation: false,
            // Legacy software: no chain automation — manual only at next station
            autoProcessing:
            !currentHasLegacy && nextHasAI && !needsReview,
            autoProcessTimer:
            !currentHasLegacy && nextHasAI && !needsReview ?
            AI_AUTO_PROCESS_TICKS :
            undefined
          } :
          l
          );
        } else {
          completeLoan(loan, decision);
          return prev.filter((l) => l.id !== loanId);
        }
      });

      if (pointDelta > 0) setStreak((s) => s + 1);else
      setStreak(0);
    },
    [activeHuddle]
  );

  const completeLoan = (
  loan: ActiveLoan,
  decision: HuddleDecision | 'auto') =>
  {
    const timeTaken = (Date.now() - loan.startTime) / 1000;
    const speedBonus = Math.max(0, 300 - timeTaken * 5);
    const autoBonus = decision === 'auto' ? 50 : 0;
    setScore((s) => s + Math.floor(speedBonus) + autoBonus);
    const brandBoost = timeTaken < 30 ? 5 : timeTaken < 60 ? 2 : 0;
    setBrandEquity((prev) => Math.min(100, prev + brandBoost));
    setPortfolioStats((prev) => {
      const healthDelta =
      loan.riskGrade === 'F' ? -15 : loan.riskGrade === 'D' ? -8 : 2;
      const newHealth = Math.max(0, Math.min(100, prev.health + healthDelta));
      if (newHealth < GAME_CONFIG.PORTFOLIO_HEALTH_GAME_OVER) {
        setGameOverReason('portfolio');
        setGameState('results');
      }
      return {
        totalLoans: prev.totalLoans + 1,
        totalVolume: prev.totalVolume + loan.amount,
        defaultRate:
        loan.riskGrade === 'F' ?
        prev.defaultRate + 0.05 :
        Math.max(0, prev.defaultRate - 0.001),
        avgRisk: prev.avgRisk,
        health: newHealth
      };
    });
  };

  const dismissHuddle = useCallback(() => setActiveHuddle(null), []);

  // ── GAME LOOP ─────────────────────────────────────────────────────────────
  useEffect(() => {
    if (gameState !== 'playing') return;

    const interval = setInterval(() => {
      if (isPausedRef.current) return;

      const now = Date.now();

      setTimeLeft((prev) => {
        if (prev <= 1) {
          setGameOverReason('time');
          setGameState('results');
          return 0;
        }
        return prev - 1;
      });

      // Spawn customers
      if (
      now - lastSpawnTime.current >
      Math.random() * (
      GAME_CONFIG.SPAWN_RATE_MAX - GAME_CONFIG.SPAWN_RATE_MIN) +
      GAME_CONFIG.SPAWN_RATE_MIN)
      {
        if (queue.length < 8) {
          setQueue((prev) => [...prev, generateCustomer()]);
          lastSpawnTime.current = now;
        }
      }

      // Queue patience decay + brand equity decay
      setQueue((prev) => {
        const remaining: Customer[] = [];
        let penaltyTotal = 0,
          droppedCount = 0,
          droppedName: string | null = null,
          brandDamage = 0;
        prev.forEach((c) => {
          const newPatience = c.patience - GAME_CONFIG.PATIENCE_DECAY;
          brandDamage += 0.3;
          if (newPatience <= 0) {
            penaltyTotal -= 150;
            droppedCount++;
            droppedName = c.name;
            brandDamage += 3;
          } else {
            remaining.push({ ...c, patience: newPatience });
          }
        });
        if (penaltyTotal < 0) {
          setScore((s) => s + penaltyTotal);
          setDroppedCustomers((d) => d + droppedCount);
          if (droppedName) {
            setLastDroppedName(droppedName);
            setTimeout(() => setLastDroppedName(null), 2500);
          }
        }
        if (brandDamage > 0) {
          setBrandEquity((prev) => {
            const newBrand = Math.max(0, prev - brandDamage);
            if (newBrand < GAME_CONFIG.BRAND_EQUITY_GAME_OVER) {
              setGameOverReason('brand');
              setGameState('results');
            }
            return newBrand;
          });
        }
        return remaining;
      });

      // Active loan patience decay
      setActiveLoans((prev) => {
        const toRemove: string[] = [];
        const updated = prev.map((loan) => {
          if (loan.status === 'completed') return loan;
          const newPatience = loan.patience - ACTIVE_LOAN_PATIENCE_DECAY;
          if (newPatience <= 0) {
            toRemove.push(loan.id);
            return loan;
          }
          return { ...loan, patience: newPatience };
        });
        if (toRemove.length > 0) {
          setScore((s) => s - toRemove.length * 200);
          setDroppedCustomers((d) => d + toRemove.length);
          setBrandEquity((p) => Math.max(0, p - toRemove.length * 5));
          const dropped = prev.find((l) => l.id === toRemove[0]);
          if (dropped) {
            setLastDroppedName(`${dropped.name} abandoned!`);
            setTimeout(() => setLastDroppedName(null), 2500);
          }
          return updated.filter((l) => !toRemove.includes(l.id));
        }
        return updated;
      });

      // ── LEGACY GLITCH SYSTEM ──────────────────────────────────────────────
      glitchTickRef.current += 1;

      // Tick down existing glitches
      setGlitchStations((prev) => {
        const updated = { ...prev };
        Object.keys(updated).forEach((sid) => {
          if (updated[sid] > 0) updated[sid] = updated[sid] - 1;
        });
        return updated;
      });

      // Trigger new glitches periodically
      if (glitchTickRef.current % LEGACY_GLITCH_INTERVAL === 0) {
        const legacyInstalled = Object.entries(legacyModulesRef.current).
        filter(([, installed]) => installed).
        map(([sid]) => sid);

        if (legacyInstalled.length > 0) {
          legacyInstalled.forEach((sid) => {
            if (
            Math.random() < LEGACY_GLITCH_CHANCE &&
            glitchStationsRef.current[sid] === 0)
            {
              setGlitchStations((prev) => ({
                ...prev,
                [sid]: LEGACY_GLITCH_DURATION
              }));
              setScore((s) => s - 75);
              setBrandEquity((p) => Math.max(0, p - 3));
              const stationName =
              STATIONS.find((s) => s.id === sid)?.name ?? sid;
              setGlitchToast(`⚠️ SYSTEM ERROR: ${stationName} offline!`);
              setTimeout(() => setGlitchToast(null), 3000);
            }
          });
        }
      }

      // ── LEGACY CASCADE SYSTEM ─────────────────────────────────────────────
      // Check if ALL 5 stations have legacy (and none have AI)
      const allLegacy = STATIONS.every(
        (s) => legacyModulesRef.current[s.id] && !aiModulesRef.current[s.id]
      );

      if (allLegacy && !legacyCascadeRef.current.active) {
        // Start cascade warning
        legacyCascadeRef.current.active = true;
        legacyCascadeRef.current.tick = 0;
        legacyCascadeRef.current.stage = 0;
        setLegacyCascadeActive(true);
        setLegacyCascadeTick(0);
        setLegacyCascadeStage(0);
        setGlitchToast(
          '⚠️ ALL LEGACY SYSTEMS UNSTABLE — Switch to Algebrik AI!'
        );
        setTimeout(() => setGlitchToast(null), 4000);
      }

      if (legacyCascadeRef.current.active) {
        legacyCascadeRef.current.tick += 1;
        setLegacyCascadeTick((t) => t + 1);

        const tick = legacyCascadeRef.current.tick;
        const stage = legacyCascadeRef.current.stage;

        // After warning period, start cascading stations down one by one
        if (tick > LEGACY_CASCADE_WARNING_TICKS && stage < STATIONS.length) {
          const stationsToCascade = [...STATIONS];
          const stageIndex = tick - LEGACY_CASCADE_WARNING_TICKS;
          const newStage = Math.floor(stageIndex / LEGACY_CASCADE_INTERVAL);

          if (newStage > stage && newStage <= STATIONS.length) {
            legacyCascadeRef.current.stage = newStage;
            setLegacyCascadeStage(newStage);

            // Glitch the next station
            const stationToGlitch = stationsToCascade[newStage - 1];
            if (stationToGlitch) {
              setGlitchStations((prev) => ({
                ...prev,
                [stationToGlitch.id]: 999 // permanent until collapse
              }));
              setScore((s) => s - 100);
              setBrandEquity((p) => Math.max(0, p - 8));
              setGlitchToast(
                `💥 ${stationToGlitch.name} CRASHED — Legacy system failure!`
              );
              setTimeout(() => setGlitchToast(null), 3000);
            }
          }

          // After all stations are down, trigger game over
          if (newStage >= STATIONS.length + 1) {
            setGameOverReason('legacy_collapse');
            setGameState('results');
          }
        }
      }

      // Unblock waiting loans
      setActiveLoans((prev) => {
        return prev.map((loan) => {
          if (!loan.waitingForStation) return loan;
          const nextIndex = loan.currentStationIndex + 1;
          if (nextIndex >= STATIONS.length) return loan;
          const nextCount = prev.filter(
            (l) =>
            l.currentStationIndex === nextIndex && l.status !== 'completed'
          ).length;
          if (nextCount >= MAX_LOANS_PER_STATION) return loan;
          const nextStationId = STATIONS[nextIndex].id;
          const nextHasAI = aiModulesRef.current[nextStationId];
          const needsReview = loanNeedsManualReview(
            { ...loan, currentStationIndex: nextIndex },
            nextStationId
          );
          return {
            ...loan,
            currentStationIndex: nextIndex,
            progress: 0,
            waitingForStation: false,
            autoProcessing: nextHasAI && !needsReview,
            autoProcessTimer:
            nextHasAI && !needsReview ? AI_AUTO_PROCESS_TICKS : undefined
          };
        });
      });

      // AI Auto-processing tick
      setActiveLoans((prev) => {
        const loansToComplete: ActiveLoan[] = [];
        const updated = prev.map((loan) => {
          if (!loan.autoProcessing || loan.waitingForStation) return loan;
          const stationId = STATIONS[loan.currentStationIndex].id;
          if (!aiModulesRef.current[stationId]) {
            return {
              ...loan,
              autoProcessing: false,
              autoProcessTimer: undefined
            };
          }
          const newTimer = (loan.autoProcessTimer ?? AI_AUTO_PROCESS_TICKS) - 1;
          const newProgress = Math.min(
            100,
            loan.progress + Math.floor(100 / AI_AUTO_PROCESS_TICKS)
          );
          if (newTimer <= 0) {
            if (loan.currentStationIndex < STATIONS.length - 1) {
              const nextIndex = loan.currentStationIndex + 1;
              const nextCount = prev.filter(
                (l) =>
                l.currentStationIndex === nextIndex &&
                l.status !== 'completed'
              ).length;
              if (nextCount >= MAX_LOANS_PER_STATION) {
                return {
                  ...loan,
                  autoProcessing: false,
                  autoProcessTimer: undefined,
                  waitingForStation: true,
                  progress: 100
                };
              }
              const nextStationId = STATIONS[nextIndex].id;
              const nextHasAI = aiModulesRef.current[nextStationId];
              const needsReview = loanNeedsManualReview(
                { ...loan, currentStationIndex: nextIndex },
                nextStationId
              );
              return {
                ...loan,
                currentStationIndex: nextIndex,
                progress: 0,
                waitingForStation: false,
                autoProcessing: nextHasAI && !needsReview,
                autoProcessTimer:
                nextHasAI && !needsReview ? AI_AUTO_PROCESS_TICKS : undefined
              };
            } else {
              loansToComplete.push(loan);
              return { ...loan, status: 'completed' as const };
            }
          }
          return { ...loan, autoProcessTimer: newTimer, progress: newProgress };
        });
        loansToComplete.forEach((loan) => completeLoan(loan, 'auto'));
        return updated.filter((l) => l.status !== 'completed');
      });

      // Initialize AI auto-processing for newly arrived loans
      setActiveLoans((prev) =>
      prev.map((loan) => {
        if (loan.autoProcessing !== undefined || loan.waitingForStation)
        return loan;
        const stationId = STATIONS[loan.currentStationIndex].id;
        const hasAI = aiModulesRef.current[stationId];
        if (!hasAI) return loan;
        const needsReview = loanNeedsManualReview(loan, stationId);
        if (needsReview) return loan;
        return {
          ...loan,
          autoProcessing: true,
          autoProcessTimer: AI_AUTO_PROCESS_TICKS
        };
      })
      );
    }, 1000);

    return () => clearInterval(interval);
  }, [gameState, queue.length, generateCustomer]);

  return {
    gameState,
    setGameState,
    timeLeft,
    score,
    streak,
    level,
    gameOverReason,
    droppedCustomers,
    lastDroppedName,
    brandEquity,
    isPaused,
    queue,
    activeLoans,
    portfolioStats,
    staffAssignments,
    extraStaff,
    aiModules,
    legacyModules,
    glitchStations,
    glitchToast,
    purchaseCounts,
    activeHuddle,
    maxLoansInSystem: MAX_LOANS_IN_SYSTEM,
    maxLoansPerStation: MAX_LOANS_PER_STATION,
    legacyCascadeActive,
    legacyCascadeTick,
    legacyCascadeStage,
    startGame,
    acceptCustomer,
    processLoan,
    resolveHuddle,
    dismissHuddle,
    assignStaff,
    unassignStaff,
    buyItem,
    pauseGame,
    resumeGame
  };
}