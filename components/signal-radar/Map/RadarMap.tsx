'use client';

import { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, CircleMarker, Tooltip, useMap } from 'react-leaflet';
import type { ScoredCreditUnion } from '@/types/signal-radar';
import MapLegend from './MapLegend';
import { Loader2 } from 'lucide-react';
import 'leaflet/dist/leaflet.css';

interface Props {
  creditUnions: ScoredCreditUnion[];
  onSelect: (cu: ScoredCreditUnion) => void;
  highlightId?: string;
}

function scoreToColor(score: number): string {
  if (score >= 70) return '#ef4444'; // red-500
  if (score >= 55) return '#f97316'; // orange-500
  if (score >= 45) return '#eab308'; // yellow-500
  if (score >= 30) return '#84cc16'; // lime-500
  return '#22c55e'; // green-500
}

function scoreToRadius(score: number): number {
  return 4 + (score / 100) * 14;
}

// Flyto on filter changes
function MapResetter({ cus }: { cus: ScoredCreditUnion[] }) {
  const map = useMap();
  const prevLen = useRef(cus.length);
  useEffect(() => {
    if (cus.length !== prevLen.current && cus.length > 0) {
      prevLen.current = cus.length;
      if (cus.length <= 50) {
        const lats = cus.map(c => c.lat);
        const lngs = cus.map(c => c.lng);
        map.fitBounds([
          [Math.min(...lats), Math.min(...lngs)],
          [Math.max(...lats), Math.max(...lngs)],
        ], { padding: [40, 40], maxZoom: 10 });
      }
    }
  }, [cus, map]);
  return null;
}

export default function RadarMap({ creditUnions, onSelect, highlightId }: Props) {
  /** Leaflet needs a painted, non-zero container; defer past SSR / Strict Mode remount. */
  const [mapReady, setMapReady] = useState(false);
  useEffect(() => {
    let cancelled = false;
    const id = requestAnimationFrame(() => {
      if (!cancelled) setMapReady(true);
    });
    return () => {
      cancelled = true;
      cancelAnimationFrame(id);
    };
  }, []);

  if (!mapReady) {
    return (
      <div className="relative flex h-full min-h-[420px] w-full items-center justify-center bg-slate-900">
        <Loader2 className="h-8 w-8 animate-spin text-slate-500" aria-hidden />
      </div>
    );
  }

  return (
    <div className="relative h-full min-h-[420px] w-full">
      <MapContainer
        center={[39.5, -98.35]}
        zoom={4}
        className="z-0 h-full w-full"
        style={{ minHeight: '100%', background: '#1e293b' }}
        zoomControl={true}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        />
        <MapResetter cus={creditUnions} />
        {creditUnions.map(cu => (
          <CircleMarker
            key={cu.id}
            center={[cu.lat, cu.lng]}
            radius={highlightId === cu.id ? scoreToRadius(cu.intentScore) + 4 : scoreToRadius(cu.intentScore)}
            pathOptions={{
              color: highlightId === cu.id ? '#ffffff' : scoreToColor(cu.intentScore),
              fillColor: scoreToColor(cu.intentScore),
              fillOpacity: 0.8,
              weight: highlightId === cu.id ? 2 : 0.5,
            }}
            eventHandlers={{ click: () => onSelect(cu) }}
          >
            <Tooltip direction="top" offset={[0, -4]} opacity={0.95}>
              <div className="text-xs">
                <p className="font-semibold">{cu.name}</p>
                <p className="text-gray-600">{cu.city}, {cu.state}</p>
                <p className="font-bold mt-0.5">
                  Score: {cu.intentScore}/100
                  <span className={`ml-1 ${cu.priority === 'hot' ? 'text-red-600' : cu.priority === 'warm' ? 'text-amber-600' : 'text-green-600'}`}>
                    ({cu.priority})
                  </span>
                </p>
                <p className="text-gray-500">{cu.opportunity} opportunity</p>
              </div>
            </Tooltip>
          </CircleMarker>
        ))}
      </MapContainer>
      <MapLegend />
    </div>
  );
}
