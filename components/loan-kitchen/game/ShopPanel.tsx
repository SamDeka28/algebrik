import React, { useState } from 'react';
import { SHOP_ITEMS, ShopItem, ShopItemId } from '@/lib/loan-kitchen/data/gameData';
import {
  X,
  ShoppingCart,
  Zap,
  Users,
  CheckCircle,
  AlertTriangle,
  RefreshCw } from
'lucide-react';
const ALGEBRIK_LOGO = "/loan-kitchen-logo.png";

interface ShopPanelProps {
  score: number;
  purchaseCounts: Record<ShopItemId, number>;
  aiModules: Record<string, boolean>;
  legacyModules: Record<string, boolean>;
  onBuy: (itemId: ShopItemId) => void;
  onClose: () => void;
}
export function ShopPanel({
  score,
  purchaseCounts,
  aiModules,
  legacyModules,
  onBuy,
  onClose
}: ShopPanelProps) {
  const staffItems = SHOP_ITEMS.filter((i) => i.category === 'staff');
  const aiItems = SHOP_ITEMS.filter((i) => i.category === 'ai');
  const legacyItems = SHOP_ITEMS.filter((i) => i.category === 'legacy');
  const canAfford = (item: ShopItem) => score >= item.cost;
  const isMaxed = (item: ShopItem) =>
  purchaseCounts[item.id] >= item.maxPurchases;
  const isPurchased = (item: ShopItem) => purchaseCounts[item.id] > 0;
  const hasAIAtStation = (stationId?: string) =>
  stationId ? aiModules[stationId] : false;
  const hasLegacyAtStation = (stationId?: string) =>
  stationId ? legacyModules[stationId] : false;
  const renderBuyButton = (
  item: ShopItem,
  variant: 'ai' | 'legacy' | 'staff') =>
  {
    const purchased = isPurchased(item);
    const affordable = canAfford(item);
    const maxed = isMaxed(item);
    // Conflict checks
    const legacyInstalledAtStation =
    variant === 'ai' && hasLegacyAtStation(item.stationId);
    const aiInstalledAtStation =
    variant === 'legacy' && hasAIAtStation(item.stationId);
    const btnBase =
    'ml-3 px-3 py-2 rounded-xl font-bold text-xs transition-all shrink-0 whitespace-nowrap';
    if (purchased || maxed)
    return (
      <span
        className={`${btnBase} ${variant === 'legacy' ? 'bg-orange-100 text-orange-700' : 'bg-emerald-100 text-emerald-700'} cursor-default`}>

          ✓ Installed
        </span>);

    // AI trying to replace legacy → show "Replace" button (not "Conflicts")
    if (legacyInstalledAtStation) {
      return (
        <button
          onClick={() => onBuy(item.id)}
          disabled={!affordable}
          className={`${btnBase} flex items-center space-x-1.5 ${affordable ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/20' : 'bg-slate-100 text-slate-400 cursor-not-allowed'}`}>

          <RefreshCw className="w-3 h-3 shrink-0" />
          <span>
            {affordable ?
            `Replace · ${item.cost.toLocaleString()} pts` :
            `${item.cost.toLocaleString()} pts`}
          </span>
        </button>);

    }
    // Legacy trying to install when AI is present → blocked (downgrade not allowed)
    if (aiInstalledAtStation)
    return (
      <span
        className={`${btnBase} bg-slate-100 text-slate-400 cursor-not-allowed flex items-center space-x-1`}>

          <img
          src={ALGEBRIK_LOGO}
          alt="AI"
          className="w-3 h-3 rounded-sm opacity-50" />

          <span>AI Installed</span>
        </span>);

    return (
      <button
        onClick={() => onBuy(item.id)}
        disabled={!affordable}
        className={`${btnBase} ${affordable ? variant === 'legacy' ? 'bg-orange-500 hover:bg-orange-600 text-white shadow-lg shadow-orange-500/20' : 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/20' : 'bg-slate-100 text-slate-400 cursor-not-allowed'}`}>

        {item.cost.toLocaleString()} pts
      </button>);

  };
  return (
    <div className="fixed inset-0 bg-slate-900/85 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 to-slate-800 p-5 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-500/20 rounded-lg border border-blue-400/30">
              <ShoppingCart className="w-5 h-5 text-blue-300" />
            </div>
            <div>
              <h2 className="font-black text-lg leading-none">
                Operations Store
              </h2>
              <p className="text-slate-400 text-xs mt-0.5">
                Timer paused while shopping
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <div className="text-[10px] text-slate-400 uppercase font-bold">
                Available
              </div>
              <div className="text-xl font-black text-yellow-400">
                {score.toLocaleString()} pts
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors">

              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          {/* Staff Section */}
          <section>
            <div className="flex items-center space-x-2 mb-3">
              <Users className="w-4 h-4 text-slate-500" />
              <h3 className="font-black text-slate-700 uppercase text-xs tracking-widest">
                Hire Staff
              </h3>
              <div className="flex-1 h-px bg-slate-200" />
            </div>
            {staffItems.map((item) => {
              const bought = purchaseCounts[item.id];
              const maxed = isMaxed(item);
              const affordable = canAfford(item);
              return (
                <div
                  key={item.id}
                  className={`flex items-center justify-between p-4 rounded-xl border-2 transition-all ${maxed ? 'bg-slate-50 border-slate-200 opacity-60' : affordable ? 'bg-white border-slate-200' : 'bg-slate-50 border-slate-200 opacity-70'}`}>

                  <div className="flex items-center space-x-3">
                    <span className="text-3xl">{item.emoji}</span>
                    <div>
                      <div className="font-bold text-slate-800">
                        {item.name}
                      </div>
                      <div className="text-xs text-slate-500 mt-0.5">
                        {item.description}
                      </div>
                      <div className="text-xs text-slate-400 mt-1">
                        {bought}/{item.maxPurchases} hired
                      </div>
                    </div>
                  </div>
                  {renderBuyButton(item, 'staff')}
                </div>);

            })}
          </section>

          {/* Algebrik AI Section */}
          <section>
            <div className="flex items-center space-x-2 mb-3">
              <img
                src={ALGEBRIK_LOGO}
                alt="Algebrik"
                className="w-4 h-4 rounded-sm" />

              <h3 className="font-black text-blue-700 uppercase text-xs tracking-widest">
                Algebrik AI Modules
              </h3>
              <div className="flex-1 h-px bg-blue-100" />
              <span className="text-[10px] bg-blue-100 text-blue-700 font-bold px-2 py-0.5 rounded-full">
                Auto-processes + chains stages
              </span>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 mb-3 text-xs text-blue-700">
              <strong>Algebrik AI</strong> auto-processes clean loans and chains
              them automatically through connected stages. Risky loans still get
              flagged for manual review.
            </div>
            <div className="grid grid-cols-1 gap-2">
              {aiItems.map((item) => {
                const hasLegacyHere = hasLegacyAtStation(item.stationId);
                return (
                  <div
                    key={item.id}
                    className={`flex items-center justify-between p-3 rounded-xl border-2 transition-all ${isPurchased(item) ? 'bg-emerald-50 border-emerald-300' : hasLegacyHere ? 'bg-blue-50 border-blue-200' : canAfford(item) ? 'bg-white border-slate-200 hover:border-blue-300' : 'bg-slate-50 border-slate-200 opacity-70'}`}>

                    <div className="flex items-center space-x-3">
                      <div
                        className={`p-2 rounded-lg ${isPurchased(item) ? 'bg-emerald-100' : 'bg-blue-50'}`}>

                        <img
                          src={ALGEBRIK_LOGO}
                          alt="Algebrik AI"
                          className="w-5 h-5 rounded-sm" />

                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="font-bold text-slate-800 text-sm">
                            {item.name}
                          </span>
                          {isPurchased(item) &&
                          <span className="text-[10px] bg-emerald-100 text-emerald-700 font-bold px-2 py-0.5 rounded-full flex items-center space-x-1">
                              <CheckCircle className="w-2.5 h-2.5" />
                              <span>ACTIVE</span>
                            </span>
                          }
                          {hasLegacyHere && !isPurchased(item) &&
                          <span className="text-[10px] bg-orange-100 text-orange-700 font-bold px-2 py-0.5 rounded-full flex items-center space-x-1">
                              <RefreshCw className="w-2.5 h-2.5" />
                              <span>REPLACES LEGACY</span>
                            </span>
                          }
                        </div>
                        <div className="text-xs text-slate-500 mt-0.5">
                          {item.description}
                        </div>
                      </div>
                    </div>
                    {renderBuyButton(item, 'ai')}
                  </div>);

              })}
            </div>
          </section>

          {/* Legacy Software Section */}
          <section>
            <div className="flex items-center space-x-2 mb-3">
              <span className="text-sm">💾</span>
              <h3 className="font-black text-orange-700 uppercase text-xs tracking-widest">
                Legacy Software
              </h3>
              <div className="flex-1 h-px bg-orange-100" />
              <span className="text-[10px] bg-orange-100 text-orange-700 font-bold px-2 py-0.5 rounded-full">
                Cheaper · Risky long-term
              </span>
            </div>
            <div className="bg-orange-50 border border-orange-200 rounded-xl p-3 mb-3 text-xs text-orange-800">
              <strong>⚠️ Warning:</strong> Legacy software is cheaper but
              systems <strong>don't talk to each other</strong> — no automatic
              chaining between stages. Prone to random{' '}
              <strong>SYSTEM ERRORS</strong> that lock stations and cost points.
              Fine short-term, painful long-term.
            </div>
            <div className="grid grid-cols-1 gap-2">
              {legacyItems.map((item) =>
              <div
                key={item.id}
                className={`flex items-center justify-between p-3 rounded-xl border-2 transition-all ${isPurchased(item) ? 'bg-orange-50 border-orange-300' : canAfford(item) ? 'bg-white border-slate-200 hover:border-orange-300' : 'bg-slate-50 border-slate-200 opacity-70'}`}>

                  <div className="flex items-center space-x-3">
                    <div
                    className={`p-2 rounded-lg ${isPurchased(item) ? 'bg-orange-100' : 'bg-slate-50'}`}>

                      <span className="text-xl">{item.emoji}</span>
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-slate-800 text-sm">
                          {item.name}
                        </span>
                        {isPurchased(item) &&
                      <span className="text-[10px] bg-orange-100 text-orange-700 font-bold px-2 py-0.5 rounded-full flex items-center space-x-1">
                            <AlertTriangle className="w-2.5 h-2.5" />
                            <span>INSTALLED</span>
                          </span>
                      }
                      </div>
                      <div className="text-xs text-slate-500 mt-0.5">
                        {item.description}
                      </div>
                    </div>
                  </div>
                  {renderBuyButton(item, 'legacy')}
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>);

}