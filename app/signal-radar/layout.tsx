import type { Metadata } from 'next';
import 'leaflet/dist/leaflet.css';
import './signal-radar.css';
import SignalRadarNav from '@/components/signal-radar/shared/SignalRadarNav';

export const metadata: Metadata = {
  title: 'Credit Union Signal Radar | Algebrik',
  description:
    'GTM intelligence for identifying credit unions in the market for DAO and LOS solutions.',
};

export default function SignalRadarLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="signal-radar-root bg-slate-900 text-white antialiased">
      <SignalRadarNav />
      <div className="signal-radar-main">{children}</div>
    </div>
  );
}
