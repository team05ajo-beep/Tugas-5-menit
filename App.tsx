
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { format, addMinutes, differenceInSeconds } from 'date-fns';
import TimeCard from './components/TimeCard';
import { TimerState } from './types';

const TOTAL_SECONDS = 300; // 5 minutes
const BACKGROUND_IMAGE_URL = "https://assets-cf.armani.com/image/upload/f_auto,q_auto,ar_4:5,w_1638,c_lfill/Armani_Fiori_Floral_Boxes_01";

const App: React.FC = () => {
  const [timer, setTimer] = useState<TimerState | null>(null);

  const startSession = useCallback(() => {
    const start = new Date();
    const end = addMinutes(start, 5);
    setTimer({
      startTime: start,
      endTime: end,
      timeLeft: TOTAL_SECONDS,
    });
  }, []);

  useEffect(() => {
    startSession();
  }, [startSession]);

  useEffect(() => {
    if (!timer) return;

    const interval = setInterval(() => {
      const now = new Date();
      const secondsRemaining = differenceInSeconds(timer.endTime, now);
      
      if (secondsRemaining <= 0) {
        setTimer(prev => prev ? { ...prev, timeLeft: 0 } : null);
        clearInterval(interval);
      } else {
        setTimer(prev => prev ? { ...prev, timeLeft: secondsRemaining } : null);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [timer?.endTime]);

  // Calculate progress percentage
  const progress = useMemo(() => {
    if (!timer) return 0;
    const elapsed = TOTAL_SECONDS - timer.timeLeft;
    return Math.min(Math.round((elapsed / TOTAL_SECONDS) * 100), 100);
  }, [timer?.timeLeft]);

  return (
    <div className="min-h-screen bg-[#fdfdfb] flex flex-col items-center justify-center p-4 transition-colors duration-500">
      {/* Container with background image and refined light overlay */}
      <div 
        className="relative aspect-square w-full max-w-[800px] flex flex-col items-center justify-between p-12 overflow-hidden shadow-[0_40px_120px_rgba(0,0,0,0.12)] border border-[#d1d1cc]"
        style={{
          backgroundImage: `url(${BACKGROUND_IMAGE_URL})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Soft Light Overlay - Slightly opaque for better text contrast */}
        <div className="absolute inset-0 bg-white/30 backdrop-blur-[1px] pointer-events-none"></div>
        
        {/* Subtle Light Gradient Vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/50 via-transparent to-white/70 pointer-events-none"></div>

        {/* Corner Accents - Border maintained, yellow spots removed via index.html CSS */}
        <div className="absolute top-10 left-10 corner-accent z-20 border-black/20"></div>
        <div className="absolute top-10 right-10 corner-accent z-20 border-black/20"></div>
        <div className="absolute bottom-10 left-10 corner-accent z-20 border-black/20"></div>
        <div className="absolute bottom-10 right-10 corner-accent z-20 border-black/20"></div>

        {/* Header Section */}
        <div className="z-10 text-center space-y-1 pt-4">
          <h1 className="text-5xl md:text-6xl tracking-[0.1em] font-black gold-text uppercase drop-shadow-md">
            GIORGIO ARMANI
          </h1>
          <p className="text-[12px] tracking-[0.3em] text-black/80 font-black uppercase">FIORI EST 1975</p>
          <div className="pt-8">
            <h2 className="text-sm md:text-base tracking-[0.4em] text-[#7a610f] font-black uppercase drop-shadow-sm">
              WAKTU PEKERJAAN
            </h2>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="z-10 flex flex-col items-center justify-center w-full space-y-12">
          {/* Timer Cards */}
          <div className="flex items-center gap-6 md:gap-12">
            <TimeCard 
              label="MULAI" 
              time={timer ? format(timer.startTime, 'HH:mm') : '--:--'} 
              isActive={true} 
            />
            
            <div className="opacity-30 flex flex-col gap-3">
              <div className="w-10 h-1 bg-black rounded-full"></div>
              <div className="w-10 h-1 bg-black rounded-full"></div>
            </div>
            
            <TimeCard 
              label="SELESAI" 
              time={timer ? format(timer.endTime, 'HH:mm') : '--:--'} 
              isActive={true} 
            />
          </div>

          {/* Progress Indicator Section */}
          <div className="w-full max-w-md flex flex-col items-center">
            <div className="w-full flex justify-between items-end mb-3">
              <span className="text-[11px] tracking-[0.2em] text-black/90 font-black uppercase">PROSES KERJA</span>
              <span className="text-2xl font-black gold-text tracking-tighter drop-shadow-sm">{progress}%</span>
            </div>
            {/* Progress Bar Container */}
            <div className="w-full h-[10px] bg-black/10 rounded-full overflow-hidden border border-black/5 relative shadow-inner">
              {/* The "Garis" (Progress Line) - Thicker bar */}
              <div 
                className="h-full bg-gradient-to-r from-[#d4af37] to-[#a67c00] transition-all duration-1000 ease-out shadow-[0_0_15px_rgba(212,175,55,0.6)]"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            
            {/* Removed the three yellow pulse dots from here to satisfy "hilangkan bintik kuning" */}
          </div>
        </div>

        {/* Footer Text Box - Enhanced Thickness and Contrast */}
        <div className="z-10 w-full max-w-xl text-center px-4 mb-4">
          <div className="mb-4">
            <span className="text-[12px] font-black tracking-[0.2em] text-[#8b6d11] uppercase border-b-2 border-[#d4af37] pb-1.5 px-6">
              PROSES PEKERJAAN
            </span>
          </div>
          <div className="relative bg-white/60 backdrop-blur-md p-5 rounded-2xl border-2 border-white shadow-xl shadow-black/5">
            <p className="text-[11px] md:text-[12px] leading-[2.2] tracking-[0.1em] text-black font-black uppercase text-center max-w-lg mx-auto">
              PEKERJAAN AKAN DI PROSES SECARA OTOMATIS. PENGGUNA HANYA PERLU MENUNGGU DI DALAM "AKUN KERJA" SAMPAI PROSES PEKERJAAN SELESAI SESUAI DENGAN WAKTU YANG DITENTUKAN OLEH SISTEM
            </p>
          </div>
        </div>
      </div>

      {/* External Controls */}
      <div className="mt-12 flex gap-6 z-30">
        <button 
          onClick={startSession}
          className="px-16 py-5 border-2 border-black/20 bg-white text-black text-[13px] tracking-[0.3em] hover:bg-black hover:text-white hover:border-black transition-all duration-500 uppercase font-black rounded-full shadow-2xl active:scale-95"
        >
          RESET ULANG
        </button>
      </div>
      
      <p className="mt-10 text-[10px] tracking-[0.8em] text-black/40 uppercase font-black">
        GIORGIO ARMANI FIORI
      </p>
    </div>
  );
};

export default App;