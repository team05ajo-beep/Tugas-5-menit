
import React from 'react';
import { TimeDisplayProps } from '../types';

const TimeCard: React.FC<TimeDisplayProps> = ({ label, time, isActive = false }) => {
  return (
    <div className="flex flex-col items-center justify-center p-4 md:p-6 rounded-[1.5rem] md:rounded-[2rem] bg-white/10 backdrop-blur-2xl border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.4)] min-w-[130px] md:min-w-[180px] relative overflow-hidden group transition-all duration-500 hover:border-[#d4af37] hover:bg-white/20">
      <span className="text-[9px] md:text-[11px] tracking-[0.2em] font-black text-white/60 mb-3 md:mb-4 uppercase">
        {label}
      </span>
      <span className="text-4xl md:text-6xl font-black tracking-tighter text-white transition-transform duration-700 group-hover:scale-105 drop-shadow-[0_4px_12px_rgba(255,255,255,0.3)]">
        {time}
      </span>
      
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none"></div>
    </div>
  );
};

export default TimeCard;
