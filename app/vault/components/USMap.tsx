"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

// Dynamically import Plotly to avoid SSR issues
const Plotly = dynamic(() => import("react-plotly.js"), { 
  ssr: false,
  loading: () => <div className="w-full h-96 bg-gray-50 rounded-lg flex items-center justify-center text-gray-500">Loading map...</div>
});

interface USMapProps {
  stateData: {
    [stateCode: string]: {
      dominantStage: string;
      volume: number;
      deals: any[];
    };
  };
  getStateColor: (stateCode: string) => string;
  onStateClick?: (stateCode: string, data: any) => void;
}

// Map stage names to numeric values for color scale
const STAGE_VALUES: { [key: string]: number } = {
  'demo': 1,
  'discovery': 1,
  'proposal': 2,
  'evaluation': 2,
  'negotiation': 3,
  'late stage': 3,
  'closed won': 4,
  'closed lost': 5,
};

export default function USMap({ stateData, getStateColor, onStateClick }: USMapProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-full h-96 bg-gray-50 rounded-lg flex items-center justify-center">
        <div className="text-gray-500">Loading map...</div>
      </div>
    );
  }

  // Prepare data for Plotly choropleth map
  const stateCodes: string[] = [];
  const values: number[] = [];
  const volumes: number[] = [];
  const stages: string[] = [];
  const texts: string[] = [];

  // US state codes (Plotly uses state abbreviations)
  const allStates = [
    'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
    'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
    'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
    'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
    'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
  ];

  // Calculate max volume for normalization
  const maxVolume = Math.max(...Object.values(stateData).map(s => s.volume), 1);

  allStates.forEach(stateCode => {
    const data = stateData[stateCode];
    stateCodes.push(stateCode);
    
    if (data && data.volume > 0) {
      // Create composite value: stage base (1-5) + normalized volume (0-0.9)
      // This allows stage to determine color category, volume to affect intensity
      const stageValue = STAGE_VALUES[data.dominantStage] || 1;
      const normalizedVolume = (data.volume / maxVolume) * 0.9;
      const compositeValue = stageValue + normalizedVolume;
      
      values.push(compositeValue);
      volumes.push(data.volume);
      stages.push(data.dominantStage);
      texts.push(`${stateCode}<br>${data.volume} ${data.volume === 1 ? 'deal' : 'deals'}<br>Stage: ${data.dominantStage}`);
    } else {
      values.push(0);
      volumes.push(0);
      stages.push('');
      texts.push(`${stateCode}<br>No deals`);
    }
  });

  const plotData: any = [
    {
      type: 'choropleth',
      locationmode: 'USA-states',
      locations: stateCodes,
      z: values,
      text: texts,
      hovertemplate: '<b>%{text}</b><extra></extra>',
      // Colorscale: stage determines base color, volume affects intensity within stage range
      colorscale: [
        [0, '#E5E7EB'], // No data - gray
        [0.001, '#93C5FD'], // Demo/Discovery - light blue (low volume)
        [1.9, '#60A5FA'], // Demo/Discovery - blue (high volume)
        [1.901, '#FDE047'], // Proposal/Evaluation - light yellow
        [2.9, '#FCD34D'], // Proposal/Evaluation - yellow
        [2.901, '#C4B5FD'], // Late Stage/Negotiation - light purple
        [3.9, '#A78BFA'], // Late Stage/Negotiation - purple
        [3.901, '#6EE7B7'], // Closed Won - light green
        [4.9, '#34D399'], // Closed Won - green
        [4.901, '#FCA5A5'], // Closed Lost - light red
        [5.9, '#F87171'], // Closed Lost - red
      ],
      zmin: 0,
      zmax: 6,
      marker: {
        line: {
          color: 'white',
          width: 1.5
        }
      },
      showscale: false,
      customdata: stateCodes.map((code, i) => ({
        stateCode: code,
        volume: volumes[i],
        stage: stages[i],
        data: stateData[code]
      }))
    }
  ];

  const layout: any = {
    geo: {
      scope: 'usa',
      projection: { type: 'albers usa' },
      showlakes: false,
      showland: false,
      bgcolor: 'transparent',
      lonaxis: {},
      lataxis: {},
    },
    margin: { l: 0, r: 0, t: 0, b: 0 },
    autosize: true,
    paper_bgcolor: 'transparent',
    plot_bgcolor: 'transparent',
    dragmode: false,
  };

  const config: any = {
    displayModeBar: false,
    responsive: true,
  };

  return (
    <div className="w-full">
      <Plotly
        data={plotData}
        layout={layout}
        config={config}
        style={{ width: '100%', height: '500px' }}
        useResizeHandler={true}
        onHover={(data) => {
          // Handle hover if needed
        }}
        onClick={(data) => {
          if (data.points && data.points[0] && data.points[0].customdata) {
            const customData = data.points[0].customdata as any;
            if (customData.data && onStateClick) {
              onStateClick(customData.stateCode, customData.data);
            }
          }
        }}
      />
    </div>
  );
}
