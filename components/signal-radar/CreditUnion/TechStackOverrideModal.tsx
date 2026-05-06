'use client';

import { useState } from 'react';
import type { ScoredCreditUnion } from '@/types/signal-radar';
import { writeStoredOverride, deleteStoredOverride } from '@/lib/signal-radar/constants';
import { computeFitAfterTechPatch } from '@/lib/signal-radar/mergeTechOverride';
import { X, Save, Trash2, Loader2 } from 'lucide-react';

interface TechStackData {
  coreProcessor?: string | null;
  consumerLOS?: string | null;
  mobileApp?: string | null;
  eSignProvider?: string | null;
  onlineBanking?: string | null;
  website?: string | null;
}

interface Props {
  cuId: string;
  scoringCu: ScoredCreditUnion;
  currentData: TechStackData;
  onSaved: (newFit: number, newData: TechStackData) => void;
  onCleared: () => void;
  onClose: () => void;
}

const FIELDS: { key: keyof TechStackData; label: string; placeholder: string }[] = [
  { key: 'coreProcessor',  label: 'Core Processor',        placeholder: 'e.g. Jack Henry: Symitar' },
  { key: 'consumerLOS',    label: 'Consumer LOS',           placeholder: 'e.g. MeridianLink Consumer' },
  { key: 'mobileApp',      label: 'Mobile Banking App',     placeholder: 'e.g. Q2 Mobile' },
  { key: 'onlineBanking',  label: 'Online Banking Platform', placeholder: 'e.g. Fiserv: Architect' },
  { key: 'eSignProvider',  label: 'eSignature Provider',    placeholder: 'e.g. DocuSign' },
];

export default function TechStackOverrideModal({ cuId, scoringCu, currentData, onSaved, onCleared, onClose }: Props) {
  const [fields, setFields] = useState<Record<string, string>>(() => {
    const init: Record<string, string> = {};
    for (const f of FIELDS) {
      init[f.key] = currentData[f.key] ?? '';
    }
    return init;
  });
  const [saving, setSaving] = useState(false);
  const [clearing, setClearing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSave() {
    setSaving(true);
    setError(null);
    try {
      // Only send non-empty fields
      const payload: Record<string, string | null> = {};
      for (const f of FIELDS) {
        payload[f.key] = fields[f.key].trim() || null;
      }

      writeStoredOverride(cuId, payload);
      const newFit = computeFitAfterTechPatch(scoringCu, payload);

      const newData: TechStackData = {};
      for (const f of FIELDS) {
        (newData as Record<string, string | null>)[f.key] = payload[f.key];
      }
      newData.website = currentData.website;

      onSaved(newFit, newData);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setSaving(false);
    }
  }

  async function handleClear() {
    setClearing(true);
    setError(null);
    try {
      deleteStoredOverride(cuId);
      onCleared();
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setClearing(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <div
        className="bg-slate-800 rounded-2xl border border-slate-700 shadow-2xl w-full max-w-md"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-700">
          <div>
            <p className="text-white font-semibold">Add Your Tech Intel</p>
            <p className="text-slate-400 text-xs mt-0.5">Override Callahan data with what you know — scores update instantly</p>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Fields */}
        <div className="px-5 py-4 space-y-3">
          {FIELDS.map(f => (
            <div key={f.key}>
              <label className="text-slate-400 text-[11px] uppercase tracking-wide block mb-1">{f.label}</label>
              <input
                type="text"
                value={fields[f.key]}
                onChange={e => setFields(prev => ({ ...prev, [f.key]: e.target.value }))}
                placeholder={f.placeholder}
                className="w-full bg-slate-900 border border-slate-600 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 transition-colors"
              />
            </div>
          ))}

          {error && (
            <p className="text-red-400 text-xs bg-red-900/20 border border-red-700/40 rounded-lg px-3 py-2">{error}</p>
          )}

          <p className="text-slate-500 text-[10px] leading-relaxed">
            Fields left blank will keep their existing value. The Algebrik Fit Score updates immediately based on the LOS you enter.
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 px-5 py-4 border-t border-slate-700">
          <button
            onClick={handleClear}
            disabled={clearing || saving}
            className="flex items-center gap-1.5 px-3 py-2 text-xs text-red-400 hover:text-red-300 hover:bg-red-900/20 border border-red-800/40 rounded-lg transition-colors disabled:opacity-50"
          >
            {clearing ? <Loader2 className="w-3 h-3 animate-spin" /> : <Trash2 className="w-3 h-3" />}
            Clear override
          </button>
          <div className="flex-1" />
          <button
            onClick={onClose}
            className="px-3 py-2 text-xs text-slate-400 hover:text-white transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={saving || clearing}
            className="flex items-center gap-1.5 px-4 py-2 text-xs bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-medium transition-colors disabled:opacity-50"
          >
            {saving ? <Loader2 className="w-3 h-3 animate-spin" /> : <Save className="w-3 h-3" />}
            {saving ? 'Saving…' : 'Save & Rescore'}
          </button>
        </div>
      </div>
    </div>
  );
}
