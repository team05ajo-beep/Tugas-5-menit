
import React from 'react';
import { TimeDisplayProps } from '../types';

const TimeCard: React.FC<TimeDisplayProps> = ({ label, time, isActive = false }) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 rounded-[2.5rem] bg-white/10 backdrop-blur-2xl border border-white/20 shadow-[0_25px_60px_rgba(0,0,0,0.4)] min-w-[160px] md:min-w-[220px] relative overflow-hidden group transition-all duration-500 hover:border-[#d4af37] hover:bg-white/20">
      <span className="text-[11px] md:text-[13px] tracking-[0.2em] font-black text-white/60 mb-6 uppercase">
        {label}
      </span>
      <span className="text-5xl md:text-7xl font-black tracking-tighter gold-text gold-glow transition-transform duration-700 group-hover:scale-110 drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)]">
        {time}
      </span>
      
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none"></div>
    </div>
  );
};

export default TimeCard;
