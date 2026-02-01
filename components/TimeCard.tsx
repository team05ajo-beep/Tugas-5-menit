
import React from 'react';
import { TimeDisplayProps } from '../types';

const TimeCard: React.FC<TimeDisplayProps> = ({ label, time, isActive = false }) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 rounded-[2.5rem] bg-white/80 backdrop-blur-xl border-2 border-white shadow-[0_25px_60px_rgba(0,0,0,0.1)] min-w-[160px] md:min-w-[220px] relative overflow-hidden group transition-all duration-500 hover:border-[#d4af37] hover:bg-white">
      <span className="text-[11px] md:text-[13px] tracking-[0.2em] font-black text-black/70 mb-6 uppercase">
        {label}
      </span>
      <span className="text-5xl md:text-7xl font-black tracking-tighter gold-text gold-glow transition-transform duration-700 group-hover:scale-110 drop-shadow-md">
        {time}
      </span>
      
      {/* Decorative pulse element */}
      {isActive && (
        <div className="absolute top-6 right-6">
          <div className="w-2 h-2 bg-[#d4af37] rounded-full animate-ping"></div>
          <div className="absolute inset-0 w-2 h-2 bg-[#d4af37] rounded-full"></div>
        </div>
      )}
      
      <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent pointer-events-none"></div>
    </div>
  );
};

export default TimeCard;
