import React, { useState, Fragment } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Users,
  CreditCard,
  FileText,
  Scale,
  PieChart,
  ShoppingCart,
  Zap,
  Heart,
  Star,
  AlertTriangle,
  CheckCircle,
  TrendingDown,
  Clock,
  Trophy } from
'lucide-react';
interface HowToPlayProps {
  onBack: () => void;
}
const STEPS = [
{
  id: 'welcome',
  title: 'Welcome to LoanKitchen',
  subtitle: 'Your shift starts now'
},
{
  id: 'queue',
  title: 'The Customer Queue',
  subtitle: 'Manage incoming applicants'
},
{
  id: 'stations',
  title: 'The 5 Stations',
  subtitle: 'Move loans through the pipeline'
},
{
  id: 'huddle',
  title: 'Huddle Decisions',
  subtitle: 'Make the right call'
},
{
  id: 'health',
  title: 'Portfolio & Brand',
  subtitle: 'Keep both meters healthy'
},
{
  id: 'shop',
  title: 'The Operations Store',
  subtitle: 'Upgrade your department'
},
{
  id: 'tips',
  title: "You're Ready!",
  subtitle: 'Key tips before your shift'
}];

const STATIONS_INFO = [
{
  id: 'account',
  name: 'Account Opening',
  icon: Users,
  color: 'bg-blue-500',
  light: 'bg-blue-50 border-blue-200',
  text: 'text-blue-700',
  action: 'Verify ID',
  desc: 'Check identity documents before opening an account.'
},
{
  id: 'pos',
  name: 'Point of Sale',
  icon: CreditCard,
  color: 'bg-purple-500',
  light: 'bg-purple-50 border-purple-200',
  text: 'text-purple-700',
  action: 'Select Product',
  desc: 'Match the right loan product to the customer.'
},
{
  id: 'origination',
  name: 'Origination',
  icon: FileText,
  color: 'bg-yellow-500',
  light: 'bg-yellow-50 border-yellow-200',
  text: 'text-yellow-700',
  action: 'Input Data',
  desc: 'Collect income, employment, and asset information.'
},
{
  id: 'decisioning',
  name: 'Decisioning',
  icon: Scale,
  color: 'bg-red-500',
  light: 'bg-red-50 border-red-200',
  text: 'text-red-700',
  action: 'Review Risk',
  desc: 'Final credit risk assessment. Reject Grade F loans!'
},
{
  id: 'analytics',
  name: 'Portfolio',
  icon: PieChart,
  color: 'bg-green-500',
  light: 'bg-green-50 border-green-200',
  text: 'text-green-700',
  action: 'Book Loan',
  desc: 'Book approved loans into the portfolio.'
}];

function StepDots({ total, current }: {total: number;current: number;}) {
  return (
    <div className="flex items-center space-x-1.5">
      {Array.from({
        length: total
      }).map((_, i) =>
      <div
        key={i}
        className={`rounded-full transition-all duration-300 ${i === current ? 'w-6 h-2 bg-blue-600' : i < current ? 'w-2 h-2 bg-blue-300' : 'w-2 h-2 bg-slate-200'}`} />

      )}
    </div>);

}
// ── STEP CONTENT ─────────────────────────────────────────────────────────────
function WelcomeStep() {
  return (
    <div className="space-y-6">
      <div className="text-center py-4">
        <div className="text-7xl mb-4">🏦</div>
        <p className="text-slate-600 text-base leading-relaxed max-w-sm mx-auto">
          You run the lending department of a busy bank. Customers arrive with
          loan applications — your job is to process them fast and smart.
        </p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {[
        {
          icon: '⚡',
          label: 'Process Loans',
          desc: 'Move applications through 5 stations'
        },
        {
          icon: '🎯',
          label: 'Make Decisions',
          desc: 'Approve, flag, or reject risky loans'
        },
        {
          icon: '🏆',
          label: 'Score Points',
          desc: 'Fast & accurate processing earns more'
        }].
        map((item) =>
        <div
          key={item.label}
          className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-center">

            <div className="text-2xl mb-1">{item.icon}</div>
            <div className="text-xs font-bold text-slate-700">{item.label}</div>
            <div className="text-[10px] text-slate-500 mt-0.5">{item.desc}</div>
          </div>
        )}
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-start space-x-3">
        <Clock className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
        <div>
          <div className="font-bold text-blue-800 text-sm">3-Minute Shifts</div>
          <div className="text-blue-600 text-xs mt-0.5">
            Each game lasts 3 minutes. Process as many loans as possible before
            time runs out — without destroying your portfolio or brand.
          </div>
        </div>
      </div>
    </div>);

}
function QueueStep() {
  const [accepted, setAccepted] = useState(false);
  const customers = [
  {
    name: 'Alex Rivera',
    avatar: '👨‍💼',
    type: 'Personal',
    grade: 'A',
    patience: 85,
    amount: '$12,000'
  },
  {
    name: 'Jordan Lee',
    avatar: '👩‍💼',
    type: 'Mortgage',
    grade: 'C',
    patience: 42,
    amount: '$320,000'
  },
  {
    name: 'Casey Smith',
    avatar: '👨‍🏭',
    type: 'Auto',
    grade: 'F',
    patience: 18,
    amount: '$28,000'
  }];

  return (
    <div className="space-y-5">
      <p className="text-slate-600 text-sm leading-relaxed">
        Customers appear in the left panel. Each card shows their loan type,
        risk grade, and a patience bar. <strong>Click a customer</strong> to
        accept them into the processing pipeline.
      </p>

      <div className="space-y-2">
        {customers.map((c, i) => {
          const isCritical = c.patience < 25;
          const isWarning = c.patience < 50;
          return (
            <div
              key={c.name}
              onClick={() => i === 0 && setAccepted(true)}
              className={`bg-white rounded-xl border p-3 relative overflow-hidden transition-all ${i === 0 && !accepted ? 'border-blue-400 shadow-blue-100 shadow-md cursor-pointer hover:scale-[1.02] ring-2 ring-blue-300 ring-offset-1' : i === 0 && accepted ? 'border-emerald-400 bg-emerald-50 opacity-60' : isCritical ? 'border-red-400 animate-pulse' : isWarning ? 'border-yellow-300' : 'border-slate-200'}`}>

              <div className="absolute bottom-0 left-0 h-1.5 w-full bg-slate-100">
                <div
                  className={`h-full ${c.patience < 20 ? 'bg-red-500' : c.patience < 50 ? 'bg-yellow-500' : 'bg-green-500'}`}
                  style={{
                    width: `${c.patience}%`
                  }} />

              </div>
              <div className="flex items-center justify-between pb-1">
                <div className="flex items-center space-x-2">
                  <span className="text-xl">{c.avatar}</span>
                  <div>
                    <div className="font-bold text-slate-800 text-sm">
                      {c.name}
                    </div>
                    <div className="text-xs text-slate-500">
                      {c.type} · {c.amount}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-1.5">
                  <span
                    className={`text-xs font-bold px-2 py-0.5 rounded-full ${c.grade === 'A' || c.grade === 'B' ? 'bg-green-100 text-green-700' : c.grade === 'F' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`}>

                    Grade {c.grade}
                  </span>
                  {i === 0 && !accepted &&
                  <span className="text-[10px] bg-blue-600 text-white font-bold px-2 py-0.5 rounded-full animate-pulse">
                      CLICK ME
                    </span>
                  }
                  {i === 0 && accepted &&
                  <span className="text-[10px] bg-emerald-600 text-white font-bold px-2 py-0.5 rounded-full">
                      ✓ Accepted
                    </span>
                  }
                  {isCritical && i !== 0 &&
                  <span className="text-[10px] bg-red-600 text-white font-bold px-2 py-0.5 rounded-full">
                      LEAVING!
                    </span>
                  }
                </div>
              </div>
            </div>);

        })}
      </div>

      <div className="grid grid-cols-2 gap-3 text-xs">
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
          <div className="font-bold text-amber-700 mb-1">
            ⚠️ Watch patience!
          </div>
          <div className="text-amber-600">
            If the bar empties, the customer leaves and you lose 150 pts.
          </div>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-lg p-3">
          <div className="font-bold text-red-700 mb-1">🚫 Avoid Grade F</div>
          <div className="text-red-600">
            High-risk loans damage your portfolio health when booked.
          </div>
        </div>
      </div>
    </div>);

}
function StationsStep() {
  const [activeStation, setActiveStation] = useState(0);
  const station = STATIONS_INFO[activeStation];
  const Icon = station.icon;
  return (
    <div className="space-y-4">
      <p className="text-slate-600 text-sm leading-relaxed">
        Every loan travels through <strong>5 stations</strong> in order. Click a
        loan card at a station to trigger a Huddle decision. Each station needs
        an assigned staff member to operate.
      </p>

      {/* Station selector */}
      <div className="flex space-x-1.5 overflow-x-auto pb-1">
        {STATIONS_INFO.map((s, i) => {
          const SIcon = s.icon;
          return (
            <button
              key={s.id}
              onClick={() => setActiveStation(i)}
              className={`flex flex-col items-center px-3 py-2 rounded-xl border-2 transition-all shrink-0 ${i === activeStation ? `${s.light} border-current ${s.text}` : 'bg-white border-slate-200 text-slate-500 hover:border-slate-300'}`}>

              <SIcon className="w-4 h-4 mb-1" />
              <span className="text-[10px] font-bold whitespace-nowrap">
                {i + 1}. {s.name.split(' ')[0]}
              </span>
            </button>);

        })}
      </div>

      {/* Station detail */}
      <div
        className={`rounded-xl border-2 p-4 ${station.light} transition-all`}>

        <div className="flex items-center space-x-3 mb-3">
          <div className={`p-2.5 ${station.color} rounded-xl text-white`}>
            <Icon className="w-5 h-5" />
          </div>
          <div>
            <div className={`font-black text-base ${station.text}`}>
              {station.name}
            </div>
            <div className="text-slate-500 text-xs">{station.desc}</div>
          </div>
        </div>

        {/* Mock loan card */}
        <div className="bg-white rounded-lg border border-slate-200 p-3 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <span className="text-lg">👨‍💼</span>
              <div>
                <div className="text-xs font-bold text-slate-700">
                  Alex Rivera
                </div>
                <div className="text-[10px] text-slate-500">Personal Loan</div>
              </div>
            </div>
            <span className="text-[10px] bg-green-100 text-green-700 font-bold px-2 py-0.5 rounded">
              Grade A
            </span>
          </div>
          <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden mb-2">
            <div className="h-full bg-emerald-400 w-4/5" />
          </div>
          <div
            className={`text-center text-xs font-bold ${station.text} py-1 rounded-lg ${station.light} border`}>

            👆 Click to {station.action}
          </div>
        </div>
      </div>

      {/* Pipeline flow */}
      <div className="flex items-center justify-center space-x-1">
        {STATIONS_INFO.map((s, i) => {
          const SIcon = s.icon;
          return (
            <Fragment key={s.id}>
              <div
                className={`p-1.5 rounded-lg ${i <= activeStation ? s.color : 'bg-slate-200'} transition-all`}>

                <SIcon className="w-3 h-3 text-white" />
              </div>
              {i < STATIONS_INFO.length - 1 &&
              <div
                className={`w-4 h-0.5 ${i < activeStation ? 'bg-blue-400' : 'bg-slate-200'}`} />

              }
            </Fragment>);

        })}
      </div>
    </div>);

}
function HuddleStep() {
  const [decision, setDecision] = useState<string | null>(null);
  const flags = [
  {
    label: 'HIGH DEFAULT RISK',
    severity: 'critical',
    desc: '72% predicted default probability'
  },
  {
    label: 'SUBPRIME CREDIT',
    severity: 'critical',
    desc: 'Credit score of 541 is below minimum'
  }];

  const decisions = [
  {
    key: 'approve',
    label: 'Approve Loan',
    delta: -400,
    icon: CheckCircle,
    style: 'bg-red-50 border-red-300 text-red-700',
    desc: 'WARNING: High-risk approval damages portfolio'
  },
  {
    key: 'flag',
    label: 'Counter-offer (Higher Rate)',
    delta: 100,
    icon: AlertTriangle,
    style: 'bg-amber-50 border-amber-300 text-amber-700',
    desc: 'Approve with risk-adjusted rate premium'
  },
  {
    key: 'reject',
    label: 'Deny Application',
    delta: 350,
    icon: TrendingDown,
    style: 'bg-emerald-50 border-emerald-300 text-emerald-700',
    desc: 'Correct denial — protects portfolio health'
  }];

  return (
    <div className="space-y-4">
      <p className="text-slate-600 text-sm leading-relaxed">
        When you click a loan at a station, a <strong>Huddle</strong> pops up.
        It shows risk flags and data points. You must decide: Approve, Flag, or
        Reject.{' '}
        <strong>
          The right choice earns points — the wrong one costs them.
        </strong>
      </p>

      {/* Mock huddle */}
      <div className="bg-white rounded-xl border-2 border-slate-200 overflow-hidden shadow-sm">
        {/* Header */}
        <div className="bg-red-700 p-3 text-white flex items-center space-x-2">
          <Scale className="w-4 h-4" />
          <div>
            <div className="font-black text-sm">Underwriting Decision</div>
            <div className="text-red-200 text-[10px]">
              Final credit risk assessment
            </div>
          </div>
        </div>

        {/* Customer bar */}
        <div className="bg-slate-800 px-3 py-2 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-lg">👨‍🏭</span>
            <div>
              <div className="text-white font-bold text-xs">Casey Smith</div>
              <div className="text-slate-400 text-[10px]">
                Personal · $28,000
              </div>
            </div>
          </div>
          <span className="text-xs bg-red-900/50 border border-red-600 text-red-300 font-black px-2 py-0.5 rounded-full">
            Grade F
          </span>
        </div>

        {/* Flags */}
        <div className="p-3 space-y-1.5">
          {flags.map((f) =>
          <div
            key={f.label}
            className="flex items-start space-x-2 px-2.5 py-1.5 rounded-lg bg-red-50 border border-red-200 text-xs">

              <AlertTriangle className="w-3 h-3 text-red-600 mt-0.5 shrink-0" />
              <div>
                <span className="font-black text-red-700">{f.label}</span>
                <span className="mx-1 text-red-400">—</span>
                <span className="text-red-600">{f.desc}</span>
              </div>
            </div>
          )}
        </div>

        {/* Decision buttons */}
        <div className="px-3 pb-3 space-y-1.5">
          {decisions.map((d) => {
            const Icon = d.icon;
            const isSelected = decision === d.key;
            return (
              <button
                key={d.key}
                onClick={() => setDecision(d.key)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl border-2 font-bold text-xs transition-all ${d.style} ${isSelected ? 'ring-2 ring-offset-1 ring-blue-400 scale-[1.02]' : 'hover:opacity-90'}`}>

                <div className="flex items-center space-x-2">
                  <Icon className="w-3.5 h-3.5" />
                  <span>{d.label}</span>
                </div>
                <span
                  className={`font-black font-mono text-sm ${d.delta > 0 ? 'text-emerald-600' : 'text-red-600'}`}>

                  {d.delta > 0 ? '+' : ''}
                  {d.delta}
                </span>
              </button>);

          })}
        </div>
      </div>

      {decision === 'reject' &&
      <div className="bg-emerald-50 border border-emerald-300 rounded-xl p-3 text-sm text-emerald-700 font-bold flex items-center space-x-2">
          <CheckCircle className="w-4 h-4 shrink-0" />
          <span>
            Correct! Rejecting Grade F loans protects your portfolio. +350 pts!
          </span>
        </div>
      }
      {decision === 'approve' &&
      <div className="bg-red-50 border border-red-300 rounded-xl p-3 text-sm text-red-700 font-bold flex items-center space-x-2">
          <AlertTriangle className="w-4 h-4 shrink-0" />
          <span>
            Risky! Approving Grade F loans damages your portfolio health. -400
            pts!
          </span>
        </div>
      }
      {decision === 'flag' &&
      <div className="bg-amber-50 border border-amber-300 rounded-xl p-3 text-sm text-amber-700 font-bold flex items-center space-x-2">
          <AlertTriangle className="w-4 h-4 shrink-0" />
          <span>
            Borderline — a counter-offer earns some points but still carries
            risk. +100 pts.
          </span>
        </div>
      }
      {!decision &&
      <div className="text-center text-slate-400 text-xs">
          👆 Try clicking a decision above to see the outcome
        </div>
      }
    </div>);

}
function HealthStep() {
  const [portfolioHealth] = useState(62);
  const [brandEquity] = useState(45);
  return (
    <div className="space-y-5">
      <p className="text-slate-600 text-sm leading-relaxed">
        Two meters determine if you survive the shift. Let either drop too low
        and it's game over.
      </p>

      <div className="space-y-4">
        {/* Portfolio Health */}
        <div className="bg-white border-2 border-slate-200 rounded-xl p-4">
          <div className="flex items-center space-x-3 mb-3">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Heart className="w-5 h-5 text-yellow-600" />
            </div>
            <div>
              <div className="font-black text-slate-800">Portfolio Health</div>
              <div className="text-xs text-slate-500">Game over below 30%</div>
            </div>
            <div className="ml-auto font-black text-yellow-600 text-lg">
              {portfolioHealth}%
            </div>
          </div>
          <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden mb-3">
            <div
              className="h-full bg-yellow-500 transition-all duration-500"
              style={{
                width: `${portfolioHealth}%`
              }} />

          </div>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="bg-red-50 border border-red-200 rounded-lg p-2">
              <div className="font-bold text-red-700">📉 Decreases when:</div>
              <div className="text-red-600 mt-0.5">
                Approving Grade D/F loans
              </div>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-lg p-2">
              <div className="font-bold text-green-700">📈 Increases when:</div>
              <div className="text-green-600 mt-0.5">
                Booking Grade A/B loans
              </div>
            </div>
          </div>
        </div>

        {/* Brand Equity */}
        <div className="bg-white border-2 border-slate-200 rounded-xl p-4">
          <div className="flex items-center space-x-3 mb-3">
            <div className="p-2 bg-pink-100 rounded-lg">
              <Star className="w-5 h-5 text-pink-600" />
            </div>
            <div>
              <div className="font-black text-slate-800">Brand Equity</div>
              <div className="text-xs text-slate-500">Game over below 20%</div>
            </div>
            <div className="ml-auto font-black text-pink-600 text-lg">
              {brandEquity}%
            </div>
          </div>
          <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden mb-3">
            <div
              className="h-full bg-pink-500 transition-all duration-500"
              style={{
                width: `${brandEquity}%`
              }} />

          </div>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="bg-red-50 border border-red-200 rounded-lg p-2">
              <div className="font-bold text-red-700">📉 Decreases when:</div>
              <div className="text-red-600 mt-0.5">
                Customers leave the queue
              </div>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-lg p-2">
              <div className="font-bold text-green-700">📈 Increases when:</div>
              <div className="text-green-600 mt-0.5">
                Fast processing, good service
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>);

}
function ShopStep() {
  const [tab, setTab] = useState<'ai' | 'legacy'>('ai');
  return (
    <div className="space-y-4">
      <p className="text-slate-600 text-sm leading-relaxed">
        Earn points by processing loans, then spend them in the{' '}
        <strong>Operations Store</strong> (top-right SHOP button). Upgrades
        change how your department works.
      </p>

      <div className="flex bg-slate-100 p-1 rounded-xl">
        <button
          onClick={() => setTab('ai')}
          className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center space-x-1.5 ${tab === 'ai' ? 'bg-white text-blue-700 shadow' : 'text-slate-500'}`}>

          <Zap className="w-3.5 h-3.5" />
          <span>Algebrik AI</span>
        </button>
        <button
          onClick={() => setTab('legacy')}
          className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${tab === 'legacy' ? 'bg-white text-orange-700 shadow' : 'text-slate-500'}`}>

          💾 Legacy Software
        </button>
      </div>

      {tab === 'ai' &&
      <div className="space-y-3">
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Zap className="w-5 h-5 text-blue-600" />
              <div className="font-black text-blue-800">
                Algebrik AI Modules
              </div>
              <span className="text-[10px] bg-blue-600 text-white font-bold px-2 py-0.5 rounded-full">
                RECOMMENDED
              </span>
            </div>
            <div className="text-blue-700 text-xs leading-relaxed">
              Install AI at any station and it will{' '}
              <strong>automatically process clean loans</strong> and chain them
              to the next stage — no clicking needed. Risky loans still get
              flagged for your review.
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs">
            {[
          {
            emoji: '🤖',
            name: 'AI Account',
            cost: '800 pts'
          },
          {
            emoji: '🤖',
            name: 'AI Point of Sale',
            cost: '800 pts'
          },
          {
            emoji: '🤖',
            name: 'AI Origination',
            cost: '1,000 pts'
          },
          {
            emoji: '🧠',
            name: 'AI Decisioning',
            cost: '1,500 pts'
          }].
          map((item) =>
          <div
            key={item.name}
            className="bg-white border border-blue-200 rounded-lg p-2.5 flex items-center space-x-2">

                <span className="text-xl">{item.emoji}</span>
                <div>
                  <div className="font-bold text-slate-700">{item.name}</div>
                  <div className="text-blue-600 font-bold">{item.cost}</div>
                </div>
              </div>
          )}
          </div>
        </div>
      }

      {tab === 'legacy' &&
      <div className="space-y-3">
          <div className="bg-orange-50 border border-orange-200 rounded-xl p-4">
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-lg">💾</span>
              <div className="font-black text-orange-800">Legacy Software</div>
              <span className="text-[10px] bg-orange-500 text-white font-bold px-2 py-0.5 rounded-full">
                RISKY
              </span>
            </div>
            <div className="text-orange-700 text-xs leading-relaxed">
              Cheaper than AI, but systems{' '}
              <strong>don't talk to each other</strong> — no automatic chaining.
              Prone to random <strong>SYSTEM ERRORS</strong> that lock stations
              for several seconds and cost points.
            </div>
          </div>
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-xs text-amber-700">
            <strong>⚠️ Trade-off:</strong> Save points short-term, but glitches
            will hurt you later. AI is the better long-term investment.
          </div>
        </div>
      }
    </div>);

}
function TipsStep() {
  const tips = [
  {
    icon: '⚡',
    color: 'bg-blue-50 border-blue-200',
    text: 'text-blue-700',
    title: 'Speed = Bonus Points',
    desc: 'Faster loan completion earns a speed bonus on top of base points.'
  },
  {
    icon: '🔥',
    color: 'bg-orange-50 border-orange-200',
    text: 'text-orange-700',
    title: 'Build Your Streak',
    desc: 'Consecutive correct decisions multiply your score. Avoid breaking it!'
  },
  {
    icon: '🚫',
    color: 'bg-red-50 border-red-200',
    text: 'text-red-700',
    title: 'Reject Grade F Loans',
    desc: 'Never approve Grade F — they tank portfolio health and cost you big.'
  },
  {
    icon: '🤖',
    color: 'bg-violet-50 border-violet-200',
    text: 'text-violet-700',
    title: 'Buy AI Early',
    desc: 'AI modules free up your attention for complex decisions. Worth the cost.'
  },
  {
    icon: '👥',
    color: 'bg-green-50 border-green-200',
    text: 'text-green-700',
    title: 'Assign All Staff',
    desc: "Stations without staff can't process loans. Check the staff bar!"
  },
  {
    icon: '⭐',
    color: 'bg-pink-50 border-pink-200',
    text: 'text-pink-700',
    title: 'Watch Brand Equity',
    desc: "Don't let customers wait too long — brand collapse ends the game."
  }];

  return (
    <div className="space-y-4">
      <div className="text-center py-2">
        <div className="text-5xl mb-2">🎉</div>
        <p className="text-slate-600 text-sm">
          You know everything you need. Here are the key tips to maximize your
          score:
        </p>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {tips.map((tip) =>
        <div key={tip.title} className={`rounded-xl border p-3 ${tip.color}`}>
            <div className="text-xl mb-1">{tip.icon}</div>
            <div className={`font-bold text-xs ${tip.text} mb-0.5`}>
              {tip.title}
            </div>
            <div className="text-[10px] text-slate-600">{tip.desc}</div>
          </div>
        )}
      </div>
    </div>);

}
const STEP_COMPONENTS = [
WelcomeStep,
QueueStep,
StationsStep,
HuddleStep,
HealthStep,
ShopStep,
TipsStep];

export function HowToPlay({ onBack }: HowToPlayProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const isFirst = currentStep === 0;
  const isLast = currentStep === STEPS.length - 1;
  const StepContent = STEP_COMPONENTS[currentStep];
  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="max-w-lg w-full bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="bg-blue-600 px-5 py-4 text-white flex items-center justify-between shrink-0">
          <button
            onClick={onBack}
            className="flex items-center space-x-1.5 text-blue-200 hover:text-white transition-colors text-sm font-bold">

            <ArrowLeft className="w-4 h-4" />
            <span>Exit</span>
          </button>
          <div className="text-center">
            <div className="font-black text-sm">{STEPS[currentStep].title}</div>
            <div className="text-blue-200 text-[10px]">
              {STEPS[currentStep].subtitle}
            </div>
          </div>
          <div className="text-blue-200 text-xs font-bold">
            {currentStep + 1}/{STEPS.length}
          </div>
        </div>

        {/* Progress dots */}
        <div className="flex justify-center py-3 bg-slate-50 border-b border-slate-100 shrink-0">
          <StepDots total={STEPS.length} current={currentStep} />
        </div>

        {/* Step content */}
        <div className="flex-1 overflow-y-auto p-5">
          <StepContent />
        </div>

        {/* Navigation */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between shrink-0">
          <button
            onClick={() => setCurrentStep((s) => s - 1)}
            disabled={isFirst}
            className="flex items-center space-x-1.5 px-4 py-2.5 rounded-xl font-bold text-sm transition-all disabled:opacity-30 disabled:cursor-not-allowed bg-white border-2 border-slate-200 text-slate-600 hover:border-slate-300">

            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>

          <div className="text-xs text-slate-400 font-medium">
            {STEPS[currentStep].subtitle}
          </div>

          {isLast ?
          <button
            onClick={onBack}
            className="flex items-center space-x-1.5 px-5 py-2.5 rounded-xl font-bold text-sm bg-blue-600 hover:bg-blue-700 text-white transition-colors shadow-lg shadow-blue-600/20">

              <Trophy className="w-4 h-4" />
              <span>Start Shift!</span>
            </button> :

          <button
            onClick={() => setCurrentStep((s) => s + 1)}
            className="flex items-center space-x-1.5 px-5 py-2.5 rounded-xl font-bold text-sm bg-blue-600 hover:bg-blue-700 text-white transition-colors shadow-lg shadow-blue-600/20">

              <span>Next</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          }
        </div>
      </div>
    </div>);

}