
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { format, addMinutes, differenceInSeconds } from 'date-fns';
import TimeCard from './components/TimeCard';
import { TimerState } from './types';

const TOTAL_SECONDS = 300; // 5 minutes
const BACKGROUND_IMAGE_URL = "https://img.freepik.com/free-vector/background-realistic-abstract-technology-particle_23-2148431735.jpg?semt=ais_hybrid&w=740&q=80";

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
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center p-4 transition-colors duration-500">
      {/* Container with background image and DARK overlay */}
      <div 
        className="relative aspect-square w-full max-w-[800px] flex flex-col items-center justify-between p-12 overflow-hidden shadow-[0_40px_120px_rgba(0,0,0,0.5)] border border-white/10"
        style={{
          backgroundImage: `url(${BACKGROUND_IMAGE_URL})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Dark Overlay for "Sedikit Gelap" (Slightly Darker) effect */}
        <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px] pointer-events-none"></div>
        
        {/* Subtle Dark Gradient Vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80 pointer-events-none"></div>

        {/* Corner Accents - Border maintained, color lightened for visibility on dark bg */}
        <div className="absolute top-10 left-10 corner-accent z-20 border-white/20"></div>
        <div className="absolute top-10 right-10 corner-accent z-20 border-white/20"></div>
        <div className="absolute bottom-10 left-10 corner-accent z-20 border-white/20"></div>
        <div className="absolute bottom-10 right-10 corner-accent z-20 border-white/20"></div>

        {/* Header Section */}
        <div className="z-10 text-center space-y-1 pt-4">
          <h1 className="text-5xl md:text-6xl tracking-[0.1em] font-black gold-text uppercase drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
            GIORGIO ARMANI
          </h1>
          <p className="text-[12px] tracking-[0.3em] text-white/70 font-black uppercase">FIORI EST 1975</p>
          <div className="pt-8">
            <h2 className="text-sm md:text-base tracking-[0.4em] text-[#d4af37] font-black uppercase drop-shadow-sm">
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
            
            <div className="opacity-40 flex flex-col gap-3">
              <div className="w-10 h-1 bg-white rounded-full shadow-lg"></div>
              <div className="w-10 h-1 bg-white rounded-full shadow-lg"></div>
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
              <span className="text-[11px] tracking-[0.2em] text-white/80 font-black uppercase">PROSES KERJA</span>
              <span className="text-2xl font-black gold-text tracking-tighter drop-shadow-sm">{progress}%</span>
            </div>
            {/* Progress Bar Container - Darker background for more depth */}
            <div className="w-full h-[12px] bg-white/10 rounded-full overflow-hidden border border-white/5 relative shadow-inner">
              {/* The "Garis" (Progress Line) - Glowing gold bar */}
              <div 
                className="h-full bg-gradient-to-r from-[#d4af37] via-[#f7e4a1] to-[#a67c00] transition-all duration-1000 ease-out shadow-[0_0_20px_rgba(212,175,55,0.8)]"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Footer Text Box - High Contrast on Dark Bg */}
        <div className="z-10 w-full max-w-xl text-center px-4 mb-4">
          <div className="mb-4">
            <span className="text-[12px] font-black tracking-[0.2em] text-[#d4af37] uppercase border-b-2 border-[#d4af37] pb-1.5 px-6">
              PROSES PEKERJAAN
            </span>
          </div>
          <div className="relative bg-black/60 backdrop-blur-md p-6 rounded-2xl border border-white/10 shadow-2xl">
            <p className="text-[11px] md:text-[12px] leading-[2.2] tracking-[0.1em] text-white/90 font-black uppercase text-center max-w-lg mx-auto">
              PEKERJAAN AKAN DI PROSES SECARA OTOMATIS. PENGGUNA HANYA PERLU MENUNGGU DI DALAM "AKUN KERJA" SAMPAI PROSES PEKERJAAN SELESAI SESUAI DENGAN WAKTU YANG DITENTUKAN OLEH SISTEM
            </p>
          </div>
        </div>
      </div>

      {/* External Controls */}
      <div className="mt-12 flex gap-6 z-30">
        <button 
          onClick={startSession}
          className="px-16 py-5 border-2 border-white/10 bg-white/5 text-white text-[13px] tracking-[0.3em] hover:bg-white hover:text-black hover:border-white transition-all duration-500 uppercase font-black rounded-full shadow-2xl active:scale-95 backdrop-blur-sm"
        >
          RESET ULANG
        </button>
      </div>
      
      <p className="mt-10 text-[10px] tracking-[0.8em] text-white/40 uppercase font-black">
        GIORGIO ARMANI FIORI
      </p>
    </div>
  );
};

export default App;
