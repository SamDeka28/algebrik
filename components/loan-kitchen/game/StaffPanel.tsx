import React from 'react';
import { Users } from 'lucide-react';
import { StaffMember, STATIONS } from '@/lib/loan-kitchen/data/gameData';
interface StaffPanelProps {
  staffMembers: StaffMember[];
  staffAssignments: Record<string, string | null>;
  onAssign: (staffId: string, stationId: string) => void;
  onUnassign: (stationId: string) => void;
}
const STATION_COLORS: Record<string, string> = {
  account: 'bg-blue-500',
  pos: 'bg-purple-500',
  origination: 'bg-yellow-500',
  decisioning: 'bg-red-500',
  analytics: 'bg-green-500'
};
const STATION_TEXT_COLORS: Record<string, string> = {
  account: 'text-blue-700',
  pos: 'text-purple-700',
  origination: 'text-yellow-700',
  decisioning: 'text-red-700',
  analytics: 'text-green-700'
};
const STATION_BG_LIGHT: Record<string, string> = {
  account: 'bg-blue-50 border-blue-200',
  pos: 'bg-purple-50 border-purple-200',
  origination: 'bg-yellow-50 border-yellow-200',
  decisioning: 'bg-red-50 border-red-200',
  analytics: 'bg-green-50 border-green-200'
};
export function StaffPanel({
  staffMembers,
  staffAssignments,
  onAssign,
  onUnassign
}: StaffPanelProps) {
  // Find which station a staff member is currently assigned to
  const getAssignedStation = (staffId: string): string | null => {
    return (
      Object.entries(staffAssignments).find(
        ([, sid]) => sid === staffId
      )?.[0] ?? null);

  };
  const handleStaffClick = (staff: StaffMember) => {
    const currentStation = getAssignedStation(staff.id);
    if (currentStation) {
      // Already assigned — unassign
      onUnassign(currentStation);
    } else {
      // Assign to their trained station
      onAssign(staff.id, staff.stationId);
    }
  };
  return (
    <div className="bg-slate-800 border-b border-slate-700 px-4 py-2 flex items-center space-x-3">
      <div className="flex items-center space-x-1.5 text-slate-400 shrink-0">
        <Users className="w-4 h-4" />
        <span className="text-xs font-bold uppercase tracking-wide">Staff</span>
      </div>

      <div className="flex items-center space-x-2 overflow-x-auto pb-0.5">
        {staffMembers.map((staff) => {
          const assignedStationId = getAssignedStation(staff.id);
          const assignedStation = STATIONS.find(
            (s) => s.id === assignedStationId
          );
          const isAssigned = !!assignedStationId;
          return (
            <button
              key={staff.id}
              onClick={() => handleStaffClick(staff)}
              title={
              isAssigned ?
              `Click to unassign from ${assignedStation?.name}` :
              `Click to assign to ${STATIONS.find((s) => s.id === staff.stationId)?.name}`
              }
              className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg border text-sm font-medium transition-all shrink-0 ${isAssigned ? `${STATION_BG_LIGHT[assignedStationId!]} ${STATION_TEXT_COLORS[assignedStationId!]}` : 'bg-slate-700 border-slate-600 text-slate-300 hover:bg-slate-600'}`}>

              <span className="text-base leading-none">{staff.emoji}</span>
              <div className="flex flex-col items-start leading-none">
                <span className="text-[11px] font-bold">
                  {staff.name.split(' ')[0]}
                </span>
                <span className="text-[10px] opacity-70">{staff.role}</span>
              </div>
              {isAssigned ?
              <span
                className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${STATION_COLORS[assignedStationId!]} text-white`}>

                  {assignedStation?.name.split(' ')[0]}
                </span> :

              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-600 text-slate-400">
                  OFF
                </span>
              }
            </button>);

        })}
      </div>

      <div className="ml-auto shrink-0 text-xs text-slate-500">
        {Object.values(staffAssignments).filter(Boolean).length}/
        {staffMembers.length} assigned
      </div>
    </div>);

}