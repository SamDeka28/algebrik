"use client";

import { useEffect, useState } from "react";
import { 
  Calendar, 
  Layers, 
  Users, 
  BarChart3, 
  Users2, 
  TrendingUp, 
  AlertTriangle,
  Info,
  ArrowUpDown
} from "lucide-react";
import USMap from "./USMap";
import { fetchHubSpotDeals, getDealState, normalizeDealStage, type HubSpotDeal } from "@/lib/hubspot";

interface Deal {
  id: string;
  name: string;
  stage: string;
  state?: string;
  owner?: string;
  amount?: number;
  closeDate?: string;
  dealType?: string;
}

interface DealMapData {
  deals: Deal[];
  totalDeals: number;
  activeDemos: number;
  lateStagePipeline: number;
  dealsMissingState: number;
  stateData: {
    [state: string]: {
      dominantStage: string;
      volume: number;
      deals: Deal[];
    };
  };
}

interface DealMapProps {
  hubspotAccessToken?: string;
}

const US_STATES = [
  { code: 'AL', name: 'Alabama' },
  { code: 'AK', name: 'Alaska' },
  { code: 'AZ', name: 'Arizona' },
  { code: 'AR', name: 'Arkansas' },
  { code: 'CA', name: 'California' },
  { code: 'CO', name: 'Colorado' },
  { code: 'CT', name: 'Connecticut' },
  { code: 'DE', name: 'Delaware' },
  { code: 'FL', name: 'Florida' },
  { code: 'GA', name: 'Georgia' },
  { code: 'HI', name: 'Hawaii' },
  { code: 'ID', name: 'Idaho' },
  { code: 'IL', name: 'Illinois' },
  { code: 'IN', name: 'Indiana' },
  { code: 'IA', name: 'Iowa' },
  { code: 'KS', name: 'Kansas' },
  { code: 'KY', name: 'Kentucky' },
  { code: 'LA', name: 'Louisiana' },
  { code: 'ME', name: 'Maine' },
  { code: 'MD', name: 'Maryland' },
  { code: 'MA', name: 'Massachusetts' },
  { code: 'MI', name: 'Michigan' },
  { code: 'MN', name: 'Minnesota' },
  { code: 'MS', name: 'Mississippi' },
  { code: 'MO', name: 'Missouri' },
  { code: 'MT', name: 'Montana' },
  { code: 'NE', name: 'Nebraska' },
  { code: 'NV', name: 'Nevada' },
  { code: 'NH', name: 'New Hampshire' },
  { code: 'NJ', name: 'New Jersey' },
  { code: 'NM', name: 'New Mexico' },
  { code: 'NY', name: 'New York' },
  { code: 'NC', name: 'North Carolina' },
  { code: 'ND', name: 'North Dakota' },
  { code: 'OH', name: 'Ohio' },
  { code: 'OK', name: 'Oklahoma' },
  { code: 'OR', name: 'Oregon' },
  { code: 'PA', name: 'Pennsylvania' },
  { code: 'RI', name: 'Rhode Island' },
  { code: 'SC', name: 'South Carolina' },
  { code: 'SD', name: 'South Dakota' },
  { code: 'TN', name: 'Tennessee' },
  { code: 'TX', name: 'Texas' },
  { code: 'UT', name: 'Utah' },
  { code: 'VT', name: 'Vermont' },
  { code: 'VA', name: 'Virginia' },
  { code: 'WA', name: 'Washington' },
  { code: 'WV', name: 'West Virginia' },
  { code: 'WI', name: 'Wisconsin' },
  { code: 'WY', name: 'Wyoming' },
];

const STAGE_COLORS: { [key: string]: string } = {
  'demo': '#60A5FA', // Light blue
  'discovery': '#60A5FA', // Light blue
  'proposal': '#FCD34D', // Yellow
  'evaluation': '#FCD34D', // Yellow
  'negotiation': '#A78BFA', // Purple
  'late stage': '#A78BFA', // Purple
  'closed won': '#34D399', // Green
  'closed lost': '#F87171', // Red
};

export default function DealMap({ hubspotAccessToken }: DealMapProps) {
  const [loading, setLoading] = useState(true);
  const [dealData, setDealData] = useState<DealMapData | null>(null);
  const [dateRange, setDateRange] = useState('90');
  const [selectedStage, setSelectedStage] = useState('all');
  const [selectedOwner, setSelectedOwner] = useState('all');
  const [comparePrevious, setComparePrevious] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetchDealData();
  }, [dateRange, selectedStage, selectedOwner]);

  const fetchDealData = async () => {
    try {
      setLoading(true);
      
      const token = hubspotAccessToken || process.env.NEXT_PUBLIC_HUBSPOT_ACCESS_TOKEN;
      
      console.log('DealMap: Token available?', !!token);
      console.log('DealMap: Token starts with:', token ? token.substring(0, 10) + '...' : 'N/A');
      
      if (!token) {
        console.warn('No HubSpot access token found, using mock data');
        const mockData = generateMockData();
        setDealData(mockData);
        setLoading(false);
        return;
      }

      // Fetch deals from HubSpot
      console.log('Fetching deals from HubSpot API...');
      const hubspotDeals = await fetchHubSpotDeals(token);
      console.log(`✅ Successfully fetched ${hubspotDeals.length} deals from HubSpot`);
      
      if (hubspotDeals.length === 0) {
        console.warn('No deals found in HubSpot, using mock data');
        const mockData = generateMockData();
        setDealData(mockData);
        setLoading(false);
        return;
      }

      // Process deals: fetch state information for each deal
      const processedDeals: Deal[] = [];
      const stateCounts: { [state: string]: { [stage: string]: number } } = {};

      // Process deals in batches to avoid rate limiting
      const batchSize = 5; // Smaller batches for association fetching
      for (let i = 0; i < hubspotDeals.length; i += batchSize) {
        const batch = hubspotDeals.slice(i, i + batchSize);
        await Promise.all(
          batch.map(async (hubspotDeal) => {
            try {
              // Get state from associated company/contact
              const state = await getDealState(hubspotDeal, token);

              const deal: Deal = {
                id: hubspotDeal.id,
                name: hubspotDeal.properties.dealname || 'Unnamed Deal',
                stage: normalizeDealStage(hubspotDeal.properties.dealstage || ''),
                state: state,
                owner: hubspotDeal.properties.hubspot_owner_id || '',
                amount: parseFloat(hubspotDeal.properties.hs_deal_amount || '0'),
                closeDate: hubspotDeal.properties.closedate || '',
              };

              processedDeals.push(deal);

              // Count by state and stage
              if (state) {
                if (!stateCounts[state]) stateCounts[state] = {};
                const stage = deal.stage;
                stateCounts[state][stage] = (stateCounts[state][stage] || 0) + 1;
              }
            } catch (error) {
              console.error(`Error processing deal ${hubspotDeal.id}:`, error);
            }
          })
        );
        
        // Small delay between batches to avoid rate limiting
        if (i + batchSize < hubspotDeals.length) {
          await new Promise(resolve => setTimeout(resolve, 300));
        }
      }

      // Calculate state-level statistics
      const stateData: { [state: string]: { dominantStage: string; volume: number; deals: Deal[] } } = {};
      
      Object.keys(stateCounts).forEach(state => {
        const counts = stateCounts[state];
        let maxCount = 0;
        let dominantStage = 'demo';
        
        Object.keys(counts).forEach(stage => {
          if (counts[stage] > maxCount) {
            maxCount = counts[stage];
            dominantStage = stage;
          }
        });

        stateData[state] = {
          dominantStage,
          volume: Object.values(counts).reduce((a, b) => a + b, 0),
          deals: processedDeals.filter(d => d.state === state),
        };
      });

      const processedData: DealMapData = {
        deals: processedDeals,
        totalDeals: processedDeals.length,
        activeDemos: processedDeals.filter(d => d.stage === 'demo' || d.stage === 'discovery').length,
        lateStagePipeline: processedDeals.filter(d => d.stage === 'negotiation' || d.stage === 'late stage').length,
        dealsMissingState: processedDeals.filter(d => !d.state).length,
        stateData,
      };

      console.log('Processed deal data:', {
        totalDeals: processedData.totalDeals,
        statesWithData: Object.keys(stateData).length,
        dealsMissingState: processedData.dealsMissingState,
        sampleStates: Object.keys(stateData).slice(0, 5),
      });

      setDealData(processedData);
    } catch (error) {
      console.error('Error fetching deal data from HubSpot:', error);
      console.error('Error details:', error instanceof Error ? error.message : String(error));
      
      // Fallback to mock data on error
      console.warn('Falling back to mock data due to error');
      const mockData = generateMockData();
      setDealData(mockData);
    } finally {
      setLoading(false);
    }
  };

  const generateMockData = (): DealMapData => {
    // Generate mock deal data for demonstration
    const mockDeals: Deal[] = [];
    const stateCounts: { [state: string]: { [stage: string]: number } } = {};

    // Generate deals for various states
    const states = ['CA', 'TX', 'FL', 'NY', 'WA', 'GA', 'IL', 'CO', 'NC', 'VA'];
    const stages = ['demo', 'discovery', 'proposal', 'negotiation', 'late stage', 'closed won', 'closed lost'];

    states.forEach(state => {
      const dealCount = Math.floor(Math.random() * 10) + 5;
      for (let i = 0; i < dealCount; i++) {
        const stage = stages[Math.floor(Math.random() * stages.length)];
        mockDeals.push({
          id: `${state}-${i}`,
          name: `Deal ${state}-${i}`,
          stage,
          state,
          owner: `Owner ${Math.floor(Math.random() * 5) + 1}`,
          amount: Math.floor(Math.random() * 100000) + 10000,
        });

        if (!stateCounts[state]) stateCounts[state] = {};
        stateCounts[state][stage] = (stateCounts[state][stage] || 0) + 1;
      }
    });

    // Calculate state-level statistics
    const stateData: { [state: string]: { dominantStage: string; volume: number; deals: Deal[] } } = {};
    
    Object.keys(stateCounts).forEach(state => {
      const counts = stateCounts[state];
      let maxCount = 0;
      let dominantStage = 'demo';
      
      Object.keys(counts).forEach(stage => {
        if (counts[stage] > maxCount) {
          maxCount = counts[stage];
          dominantStage = stage;
        }
      });

      stateData[state] = {
        dominantStage,
        volume: Object.values(counts).reduce((a, b) => a + b, 0),
        deals: mockDeals.filter(d => d.state === state),
      };
    });

    return {
      deals: mockDeals,
      totalDeals: mockDeals.length,
      activeDemos: mockDeals.filter(d => d.stage === 'demo' || d.stage === 'discovery').length,
      lateStagePipeline: mockDeals.filter(d => d.stage === 'negotiation' || d.stage === 'late stage').length,
      dealsMissingState: mockDeals.filter(d => !d.state).length,
      stateData,
    };
  };

  const getStateColor = (stateCode: string): string => {
    if (!dealData?.stateData[stateCode]) return '#E5E7EB'; // Gray for no data
    
    const { dominantStage, volume } = dealData.stateData[stateCode];
    const baseColor = STAGE_COLORS[dominantStage] || '#60A5FA';
    
    // Calculate intensity based on volume (darker = higher volume)
    const maxVolume = Math.max(...Object.values(dealData.stateData).map(s => s.volume));
    const intensity = Math.min(volume / maxVolume, 1);
    const opacity = 0.3 + (intensity * 0.7);
    
    // Convert hex to rgba with opacity
    const hex = baseColor.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-8">
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading deal data...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!dealData) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-8">
        <p className="text-gray-600">No deal data available</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Info className="w-4 h-4 text-blue-600" />
              <BarChart3 className="w-4 h-4 text-blue-600" />
            </div>
          </div>
          <div className="text-2xl font-bold text-blue-900">{dealData.totalDeals}</div>
          <div className="text-sm text-blue-700">Total Deals (Selected Filters)</div>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Info className="w-4 h-4 text-green-600" />
              <Users2 className="w-4 h-4 text-green-600" />
            </div>
          </div>
          <div className="text-2xl font-bold text-green-900">{dealData.activeDemos}</div>
          <div className="text-sm text-green-700">Active Demos</div>
        </div>

        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Info className="w-4 h-4 text-purple-600" />
              <TrendingUp className="w-4 h-4 text-purple-600" />
            </div>
          </div>
          <div className="text-2xl font-bold text-purple-900">{dealData.lateStagePipeline}</div>
          <div className="text-sm text-purple-700">Late-Stage Pipeline</div>
        </div>

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Info className="w-4 h-4 text-gray-600" />
              <AlertTriangle className="w-4 h-4 text-gray-600" />
            </div>
          </div>
          <div className="text-2xl font-bold text-gray-900">{dealData.dealsMissingState}</div>
          <div className="text-sm text-gray-700">Deals Missing State</div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3 mb-6 pb-4 border-b border-gray-200">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <Calendar className="w-4 h-4 text-gray-600" />
          <span className="text-sm text-gray-700">Last {dateRange} days</span>
          <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        <button className="flex items-center gap-2 px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors">
          <Layers className="w-4 h-4 text-gray-600" />
          <span className="text-sm text-gray-700">All Stages</span>
          <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        <button className="flex items-center gap-2 px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors">
          <Users className="w-4 h-4 text-gray-600" />
          <span className="text-sm text-gray-700">All Owners</span>
          <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        <div className="flex items-center gap-2 ml-auto">
          <button
            onClick={() => setComparePrevious(!comparePrevious)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
              comparePrevious
                ? 'bg-blue-50 border-blue-300 text-blue-700'
                : 'bg-gray-50 border-gray-300 text-gray-700 hover:bg-gray-100'
            }`}
          >
            <ArrowUpDown className="w-4 h-4" />
            <span className="text-sm">Compare with previous period</span>
          </button>
        </div>
      </div>

      {/* Legend */}
      <div className="mb-6">
        <div className="flex flex-wrap gap-6 text-sm">
          <div>
            <div className="font-semibold text-gray-700 mb-2">COLOR = DOMINANT STAGE:</div>
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-blue-400"></div>
                <span className="text-gray-600">Demo / Discovery</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-yellow-400"></div>
                <span className="text-gray-600">Proposal / Evaluation</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-purple-400"></div>
                <span className="text-gray-600">Late Stage / Negotiation</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-green-400"></div>
                <span className="text-gray-600">Closed Won</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-red-400"></div>
                <span className="text-gray-600">Closed Lost</span>
              </div>
            </div>
          </div>
          <div>
            <div className="font-semibold text-gray-700 mb-2">INTENSITY = DEAL VOLUME:</div>
            <div className="flex items-center gap-2">
              <div className="w-32 h-4 bg-gradient-to-r from-blue-200 to-blue-600 rounded"></div>
              <span className="text-gray-600">Low → High</span>
            </div>
          </div>
        </div>
      </div>

      {/* US Map Visualization */}
      <div className="bg-gray-50 rounded-lg border border-gray-200 p-6 relative">
        <USMap
          stateData={dealData.stateData}
          getStateColor={getStateColor}
          onStateClick={(stateCode, data) => {
            console.log(`Clicked ${stateCode}:`, data);
            // You can add a modal or navigation here
          }}
        />
      </div>
    </div>
  );
}
