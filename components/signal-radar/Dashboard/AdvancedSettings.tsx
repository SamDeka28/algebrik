'use client';

import { useEffect, useRef, useState } from 'react';
import { X, Upload, Trash2, CheckCircle, AlertCircle, Loader2, Database, ChevronRight } from 'lucide-react';

interface DataFileMeta {
  rows: number;
  uploadedAt: string;
  filename: string;
}

interface DataStatus {
  ncua?: DataFileMeta;
  callahan?: DataFileMeta;
}

interface UploadState {
  loading: boolean;
  success: string | null;
  error: string | null;
}

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 1) return 'just now';
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
}

interface SectionProps {
  type: 'ncua' | 'callahan';
  meta: DataFileMeta | undefined;
  onUpload: (type: 'ncua' | 'callahan', file: File) => Promise<void>;
  onDelete: (type: 'ncua' | 'callahan') => Promise<void>;
  uploadState: UploadState;
}

function DataSection({ type, meta, onUpload, onDelete, uploadState }: SectionProps) {
  const fileRef = useRef<HTMLInputElement>(null);
  const isNCUA = type === 'ncua';

  return (
    <div className="rounded-xl bg-slate-800/60 border border-slate-700/60 p-4">
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="text-sm font-semibold text-white">
            {isNCUA ? 'NCUA Financial Data' : 'Callahan Tech Stack Data'}
          </h3>
          <p className="text-[11px] text-slate-500 mt-0.5">
            {isNCUA
              ? 'Custom call report CSV overrides the live NCUA download'
              : 'Custom tech stack CSV/JSON merges with bundled Q3 2024 data'}
          </p>
        </div>
        <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full border ${
          meta
            ? 'text-indigo-300 bg-indigo-500/15 border-indigo-500/30'
            : 'text-slate-500 bg-slate-700/40 border-slate-600/40'
        }`}>
          {meta ? 'Custom' : isNCUA ? 'Live NCUA / Sample' : 'Bundled Q3 2024'}
        </span>
      </div>

      {/* Status row */}
      {meta && (
        <div className="flex items-center gap-2 mb-3 p-2.5 rounded-lg bg-indigo-500/10 border border-indigo-500/20">
          <CheckCircle className="w-3.5 h-3.5 text-indigo-400 flex-shrink-0" />
          <span className="text-[11px] text-indigo-300 flex-1">
            <span className="font-semibold">{meta.rows.toLocaleString()} records</span> from <span className="font-mono">{meta.filename}</span>
            {' · '}uploaded {timeAgo(meta.uploadedAt)}
          </span>
          <button
            onClick={() => onDelete(type)}
            className="text-slate-500 hover:text-red-400 transition-colors ml-1"
            title="Remove custom data"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Upload area */}
      <input
        ref={fileRef}
        type="file"
        accept={isNCUA ? '.csv' : '.csv,.json'}
        className="hidden"
        onChange={e => {
          const f = e.target.files?.[0];
          if (f) onUpload(type, f);
          e.target.value = '';
        }}
      />

      <button
        onClick={() => fileRef.current?.click()}
        disabled={uploadState.loading}
        className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg border border-dashed border-slate-600 hover:border-indigo-500/60 hover:bg-indigo-500/5 text-slate-400 hover:text-indigo-300 transition-all text-xs font-medium disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {uploadState.loading ? (
          <><Loader2 className="w-3.5 h-3.5 animate-spin" />Processing…</>
        ) : (
          <><Upload className="w-3.5 h-3.5" />Upload {isNCUA ? 'NCUA CSV' : 'Callahan CSV or JSON'}</>
        )}
      </button>

      {/* Feedback */}
      {uploadState.success && (
        <p className="mt-2 text-[11px] text-emerald-400 flex items-center gap-1">
          <CheckCircle className="w-3 h-3 flex-shrink-0" />
          {uploadState.success}
        </p>
      )}
      {uploadState.error && (
        <p className="mt-2 text-[11px] text-red-400 flex items-center gap-1">
          <AlertCircle className="w-3 h-3 flex-shrink-0" />
          {uploadState.error}
        </p>
      )}

      {/* Format hint */}
      <details className="mt-3 group">
        <summary className="text-[10px] text-slate-600 hover:text-slate-400 cursor-pointer select-none flex items-center gap-1 transition-colors">
          <ChevronRight className="w-3 h-3 group-open:rotate-90 transition-transform" />
          {isNCUA ? 'Expected CSV columns' : 'Expected format'}
        </summary>
        <div className="mt-1.5 p-2.5 rounded-lg bg-slate-900/60 border border-slate-700/40">
          {isNCUA ? (
            <code className="text-[10px] text-slate-400 leading-relaxed font-mono block">
              CU_NUMBER, CU_NAME, STATE_CODE, CITY,<br />
              ACCT_010 (Assets), ACCT_083 (Members),<br />
              ACCT_025A (Loans), ACCT_018 (Shares),<br />
              ACCT_010_PREV, ACCT_083_PREV,<br />
              ACCT_025A_PREV, JOIN_DATE
            </code>
          ) : (
            <code className="text-[10px] text-slate-400 leading-relaxed font-mono block">
              CSV: CU_NUMBER, CORE, CLOS, MOB,<br />
              ESIGN, OB, EFF, ROA, LG, NWR, URL<br />
              <br />
              JSON: &#123; &quot;charter#&quot;: &#123; core, clos, mob,<br />
              esign, ob, eff, roa, lg ... &#125; &#125;
            </code>
          )}
        </div>
      </details>
    </div>
  );
}

interface Props {
  open: boolean;
  onClose: () => void;
  onDataChanged: () => void;
}

export default function AdvancedSettings({ open, onClose, onDataChanged }: Props) {
  const [status, setStatus] = useState<DataStatus>({});
  const [ncuaState, setNcuaState] = useState<UploadState>({ loading: false, success: null, error: null });
  const [callahanState, setCallahanState] = useState<UploadState>({ loading: false, success: null, error: null });

  // Load current data status
  useEffect(() => {
    if (!open) return;
    fetch('/api/settings/data')
      .then(r => r.json())
      .then((d: { data: DataStatus }) => setStatus(d.data))
      .catch(() => {});
  }, [open]);

  async function handleUpload(type: 'ncua' | 'callahan', file: File) {
    const setState = type === 'ncua' ? setNcuaState : setCallahanState;
    setState({ loading: true, success: null, error: null });
    try {
      const fd = new FormData();
      fd.append('type', type);
      fd.append('file', file);
      const r = await fetch('/api/settings/data', { method: 'POST', body: fd });
      const d = await r.json() as { success?: boolean; message?: string; error?: string };
      if (!r.ok || d.error) throw new Error(d.error ?? 'Upload failed');
      setState({ loading: false, success: d.message ?? 'Loaded successfully', error: null });
      // Refresh status
      const sr = await fetch('/api/settings/data');
      const sd = await sr.json() as { data: DataStatus };
      setStatus(sd.data);
      onDataChanged();
    } catch (e) {
      setState({ loading: false, success: null, error: (e as Error).message });
    }
  }

  async function handleDelete(type: 'ncua' | 'callahan') {
    const setState = type === 'ncua' ? setNcuaState : setCallahanState;
    setState({ loading: false, success: null, error: null });
    try {
      await fetch(`/api/settings/data?type=${type}`, { method: 'DELETE' });
      setStatus(prev => {
        const next = { ...prev };
        delete next[type];
        return next;
      });
      onDataChanged();
    } catch (e) {
      setState({ loading: false, success: null, error: (e as Error).message });
    }
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-[2px] z-40 transition-opacity duration-200 ${
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Slide-out panel */}
      <div
        className={`fixed top-0 right-0 h-full w-[420px] max-w-[95vw] z-50 bg-slate-900 border-l border-slate-700/60 shadow-2xl flex flex-col transition-transform duration-300 ease-in-out ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Panel header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800 flex-shrink-0">
          <div className="flex items-center gap-2">
            <Database className="w-4 h-4 text-indigo-400" />
            <span className="text-sm font-semibold text-white">Data Sources</span>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 flex items-center justify-center rounded-lg text-slate-500 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
          <p className="text-[11px] text-slate-500 leading-relaxed">
            Upload custom data files to override the default NCUA download and Callahan bundled data.
            Changes take effect immediately — the dashboard will refresh automatically.
          </p>

          <DataSection
            type="ncua"
            meta={status.ncua}
            onUpload={handleUpload}
            onDelete={handleDelete}
            uploadState={ncuaState}
          />

          <DataSection
            type="callahan"
            meta={status.callahan}
            onUpload={handleUpload}
            onDelete={handleDelete}
            uploadState={callahanState}
          />

          {/* Help note */}
          <div className="p-3 rounded-xl bg-slate-800/40 border border-slate-700/40 text-[11px] text-slate-500 leading-relaxed space-y-1">
            <p className="text-slate-400 font-medium">How data priority works</p>
            <p>1. Custom NCUA CSV (if uploaded) → used as primary financial data</p>
            <p>2. Live NCUA download → fetched fresh every 7 days</p>
            <p>3. Callahan custom data → overrides bundled records by charter #</p>
            <p>4. Bundled Callahan Q3 2024 → 531 CUs with tech stack data</p>
            <p>5. Sample data → fallback if all sources fail</p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-slate-800 flex-shrink-0">
          <p className="text-[10px] text-slate-600 text-center">
            Custom data is stored locally and never committed to git
          </p>
        </div>
      </div>
    </>
  );
}
