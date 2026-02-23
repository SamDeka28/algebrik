import React, { useEffect, useState } from 'react';
import { useGameEngine } from '@/hooks/loan-kitchen/useGameEngine';
import { HUD } from '@/components/loan-kitchen/game/HUD';
import { CustomerQueue } from '@/components/loan-kitchen/game/CustomerQueue';
import { StationPanel } from '@/components/loan-kitchen/game/StationPanel';
import { PortfolioPanel } from '@/components/loan-kitchen/game/PortfolioPanel';
import { ResultsScreen } from '@/components/loan-kitchen/game/ResultsScreen';
import { StaffPanel } from '@/components/loan-kitchen/game/StaffPanel';
import { HuddleModal } from '@/components/loan-kitchen/game/HuddleModal';
import { ShopPanel } from '@/components/loan-kitchen/game/ShopPanel';
import { STAFF_MEMBERS, SHOP_ITEMS, STATIONS } from '@/lib/loan-kitchen/data/gameData';
import { WifiOff, ShoppingCart, X, Zap, AlertTriangle } from 'lucide-react';
const ALGEBRIK_LOGO = "/loan-kitchen-logo.png";

interface GameScreenProps {
  onMenu: () => void;
}
export function GameScreen({ onMenu }: GameScreenProps) {
  const [shopOpen, setShopOpen] = useState(false);
  const [bannerDismissedAtScore, setBannerDismissedAtScore] = useState<
    number | null>(
    null);
  const {
    gameState,
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
    maxLoansInSystem,
    maxLoansPerStation,
    legacyCascadeActive,
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
  } = useGameEngine();
  useEffect(() => {
    if (gameState === 'menu') startGame();
  }, []);
  // ── Upgrade banner logic ──────────────────────────────────────────────────
  // All affordable items not yet maxed
  const affordableUpgrades = SHOP_ITEMS.filter(
    (item) =>
    score >= item.cost && (purchaseCounts[item.id] ?? 0) < item.maxPurchases
  );
  const hasAffordableUpgrade = affordableUpgrades.length > 0;
  // Single upgrade = direct buy button
  const singleUpgrade =
  affordableUpgrades.length === 1 ? affordableUpgrades[0] : null;
  // Only legacy items affordable (no AI items)
  const onlyLegacyAffordable =
  hasAffordableUpgrade &&
  affordableUpgrades.every((item) => item.category === 'legacy');
  // All 5 stations have legacy (no AI anywhere)
  const allLegacyInstalled = STATIONS.every(
    (s) => legacyModules[s.id] && !aiModules[s.id]
  );
  // Show banner: re-show after 300 pts since last dismiss
  const showUpgradeBanner =
  hasAffordableUpgrade &&
  !shopOpen &&
  gameState === 'playing' && (
  bannerDismissedAtScore === null || score >= bannerDismissedAtScore + 300);
  // Legacy cascade banner overrides normal upgrade banner
  const showCascadeBanner =
  legacyCascadeActive && gameState === 'playing' && !shopOpen;
  const handleDismissBanner = () => setBannerDismissedAtScore(score);
  const handleDirectBuy = () => {
    if (singleUpgrade) {
      buyItem(singleUpgrade.id as any);
      setBannerDismissedAtScore(score);
    }
  };
  const openShop = () => {
    setShopOpen(true);
    setBannerDismissedAtScore(score);
    pauseGame();
  };
  const closeShop = () => {
    setShopOpen(false);
    resumeGame();
  };
  const allStaff = [...STAFF_MEMBERS, ...extraStaff];
  const cascadeStationsDown = legacyCascadeStage;
  return (
    <div className="h-screen flex flex-col bg-slate-100 overflow-hidden font-sans">
      {/* ── Legacy Cascade Warning Banner (highest priority) ── */}
      {showCascadeBanner &&
      <div
        className="bg-gradient-to-r from-red-700 to-orange-600 text-white px-4 py-2.5 flex items-center justify-between shadow-lg z-40 shrink-0"
        style={{
          animation: 'slideDown 0.35s ease-out'
        }}>

          <div className="flex items-center space-x-3">
            <div className="p-1.5 bg-white/20 rounded-lg shrink-0">
              <AlertTriangle className="w-5 h-5 text-yellow-300 animate-pulse" />
            </div>
            <div className="flex flex-col">
              <span className="font-black text-sm leading-tight">
                {cascadeStationsDown === 0 ?
              '⚠️ All Legacy Systems Unstable — Switch to Algebrik AI!' :
              `💥 Cascade Failure — ${cascadeStationsDown}/${STATIONS.length} stations down!`}
              </span>
              <span className="text-red-200 text-xs leading-tight">
                {cascadeStationsDown === 0 ?
              'Your entire stack is legacy. System collapse imminent — upgrade now!' :
              'Systems are crashing one by one. Upgrade to Algebrik AI to stop the collapse.'}
              </span>
            </div>
          </div>
          <button
          onClick={openShop}
          className="flex items-center space-x-1.5 bg-white text-red-700 font-black text-xs px-3 py-1.5 rounded-lg hover:bg-red-50 transition-colors shadow shrink-0 ml-4">

            <img
            src={ALGEBRIK_LOGO}
            alt="Algebrik"
            className="w-3.5 h-3.5 rounded-sm" />

            <span>Switch to Algebrik</span>
          </button>
        </div>
      }

      {/* ── Upgrade Available Banner ── */}
      {showUpgradeBanner && !showCascadeBanner &&
      <div
        className={`text-white px-4 py-2.5 flex items-center justify-between shadow-lg z-40 shrink-0 ${onlyLegacyAffordable ? 'bg-gradient-to-r from-orange-700 to-orange-500' : 'bg-gradient-to-r from-blue-700 to-blue-500'}`}
        style={{
          animation: 'slideDown 0.35s ease-out'
        }}>

          <div className="flex items-center space-x-3">
            {/* No Algebrik logo if only legacy upgrades available */}
            {onlyLegacyAffordable ?
          <div className="p-1.5 bg-white/20 rounded-lg shrink-0 text-xl leading-none">
                💾
              </div> :

          <img
            src={ALGEBRIK_LOGO}
            alt="Algebrik"
            className="w-7 h-7 rounded-xl shrink-0 shadow-md" />

          }
            <div className="flex flex-col">
              <span className="font-black text-sm leading-tight">
                {allLegacyInstalled ?
              '🔄 Switch to Algebrik AI' :
              singleUpgrade ?
              `Upgrade Available: ${singleUpgrade.name}` :
              'Upgrades Available!'}
              </span>
              <span
              className={`text-xs leading-tight ${onlyLegacyAffordable ? 'text-orange-200' : 'text-blue-200'}`}>

                {allLegacyInstalled ?
              'All stations on legacy — upgrade to prevent system collapse' :
              singleUpgrade ?
              `${singleUpgrade.description} · ${singleUpgrade.cost.toLocaleString()} pts` :
              'You can afford new modules in the Operations Store'}
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-2 shrink-0 ml-4">
            {/* Direct buy button if exactly 1 non-legacy upgrade available */}
            {singleUpgrade && !onlyLegacyAffordable &&
          <button
            onClick={handleDirectBuy}
            className="flex items-center space-x-1.5 bg-white text-blue-700 font-black text-xs px-3 py-1.5 rounded-lg hover:bg-blue-50 transition-colors shadow">

                <Zap className="w-3.5 h-3.5" />
                <span>Buy Now · {singleUpgrade.cost.toLocaleString()} pts</span>
              </button>
          }
            <button
            onClick={openShop}
            className={`flex items-center space-x-1.5 font-black text-xs px-3 py-1.5 rounded-lg transition-colors shadow ${onlyLegacyAffordable ? 'bg-white text-orange-700 hover:bg-orange-50' : singleUpgrade ? 'bg-white/20 hover:bg-white/30 text-white border border-white/30' : 'bg-white text-blue-700 hover:bg-blue-50'}`}>

              <ShoppingCart className="w-3.5 h-3.5" />
              <span>{singleUpgrade ? 'View Shop' : 'Open Shop'}</span>
            </button>
            <button
            onClick={handleDismissBanner}
            className="p-1.5 hover:bg-white/20 rounded-lg transition-colors"
            aria-label="Dismiss">

              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      }

      <HUD
        timeLeft={timeLeft}
        score={score}
        streak={streak}
        level={level}
        portfolioHealth={portfolioStats.health}
        droppedCustomers={droppedCustomers}
        brandEquity={brandEquity}
        isPaused={isPaused}
        onOpenShop={openShop} />


      <StaffPanel
        staffMembers={allStaff}
        staffAssignments={staffAssignments}
        onAssign={assignStaff}
        onUnassign={unassignStaff} />


      <div className="flex-1 flex overflow-hidden">
        <CustomerQueue
          queue={queue}
          onAccept={acceptCustomer}
          lastDroppedName={lastDroppedName}
          activeLoansCount={activeLoans.length}
          maxLoans={maxLoansInSystem} />

        <div className="flex-1 flex flex-col overflow-hidden">
          <StationPanel
            activeLoans={activeLoans}
            onProcess={processLoan}
            staffAssignments={staffAssignments}
            staffMembers={allStaff}
            aiModules={aiModules}
            legacyModules={legacyModules}
            glitchStations={glitchStations}
            maxPerStation={maxLoansPerStation} />

          <PortfolioPanel stats={portfolioStats} />
        </div>
      </div>

      {/* Glitch toast */}
      {glitchToast &&
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-red-700 text-white font-black text-sm px-5 py-3 rounded-xl shadow-2xl flex items-center space-x-2 animate-bounce">
          <WifiOff className="w-4 h-4" />
          <span>{glitchToast}</span>
        </div>
      }

      {activeHuddle &&
      <HuddleModal
        huddle={activeHuddle}
        onDecide={resolveHuddle}
        onClose={dismissHuddle} />

      }

      {shopOpen &&
      <ShopPanel
        score={score}
        purchaseCounts={purchaseCounts}
        aiModules={aiModules}
        legacyModules={legacyModules}
        onBuy={buyItem}
        onClose={closeShop} />

      }

      {gameState === 'results' &&
      <ResultsScreen
        score={score}
        stats={portfolioStats}
        brandEquity={brandEquity}
        gameOverReason={gameOverReason}
        onRestart={startGame}
        onMenu={onMenu}
        algebrikActive={Object.values(aiModules).some(Boolean)} />

      }
    </div>);

}