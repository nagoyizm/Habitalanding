'use client'

import React, { useState, useEffect, useRef } from 'react';

export function InteractiveRooms() {
  const [time, setTime] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    let animationFrameId: number;
    let startTime: number | null = null;
    const duration = 10500; // 10.5 seconds loop (UI + 4s Video)

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = (timestamp - startTime) % duration;
      setTime(elapsed);
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  const t = time;

  // Compute states based on time
  const isDropdownOpen = t > 2200 && t < 3700;
  const isClean = t > 3700 && t < 10000;
  
  // Transition to video starts at 4500ms and goes back at 9500ms
  const showVideo = t > 4500 && t < 9500;

  // Auto-play the video when sliding in
  useEffect(() => {
    if (showVideo && videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.currentTime = 0;
        videoRef.current.play().catch(e => console.log('Autoplay blocked:', e));
      }
    } else if (!showVideo && videoRef.current) {
      if (!videoRef.current.paused) {
        videoRef.current.pause();
      }
    }
  }, [showVideo]);

  // Calculate mouse position (only matters during UI phase < 4500)
  let mouseX = 80;
  let mouseY = 80;
  let clickScale = 1;

  if (t < 1000) {
    mouseX = 80;
    mouseY = 80;
  } else if (t < 2000) {
    const progress = (t - 1000) / 1000;
    const ease = 1 - Math.pow(1 - progress, 3);
    mouseX = 80 - (80 - 25) * ease; // moving to 25% 
    mouseY = 80 - (80 - 90) * ease; // moving to 90% (dropdown button)
  } else if (t < 2200) {
    mouseX = 25;
    mouseY = 90;
    if (t > 2000 && t < 2100) clickScale = 0.8;
  } else if (t < 3000) {
    mouseX = 25;
    mouseY = 90;
  } else if (t < 3500) {
    const progress = (t - 3000) / 500;
    const ease = 1 - Math.pow(1 - progress, 3);
    mouseX = 25;
    mouseY = 90 - (90 - 72) * ease; // moving UP to 72% (Limpia y Lista option since menu opens upwards)
  } else if (t < 3700) {
    mouseX = 25;
    mouseY = 72;
    if (t > 3500 && t < 3600) clickScale = 0.8;
  } else if (t < 4500) {
    const progress = (t - 3700) / 800;
    const ease = 1 - Math.pow(1 - progress, 3);
    mouseX = 25 + (60 - 25) * ease;
    mouseY = 72 + (50 - 72) * ease;
  } else {
    mouseX = 60;
    mouseY = 50;
  }

  return (
    <div className="relative w-full h-full overflow-hidden" style={{ backgroundColor: '#f4f9f9' }}>
      
      {/* Slider Wrapper (moves up to reveal video) */}
      <div 
        className="w-full h-[200%] flex flex-col transition-transform duration-1000 ease-in-out absolute top-0 left-0"
        style={{ transform: showVideo ? 'translateY(-50%)' : 'translateY(0%)' }}
      >
        
        {/* PAGE 1: The SaaS UI (50% of 200% height = 100% of visible container) */}
        <div className="w-full h-1/2 relative flex flex-col font-sans">
          
          {/* Header with KPIs */}
          <div className="border-b px-6 py-4 shrink-0 shadow-sm relative z-10 bg-white" style={{ borderColor: '#e2e8f0' }}>
            <div className="flex items-center gap-4 mb-4">
              <div className="font-heading font-bold text-lg" style={{ color: '#0f172a' }}>Estado de Habitaciones</div>
            </div>
            
            <div className="flex gap-3 pb-1">
              {/* Ocupación */}
              <div className="flex-shrink-0 w-[140px] bg-white p-3 rounded-xl border shadow-sm" style={{ borderColor: '#e2e8f0' }}>
                 <div className="text-[10px] font-bold text-slate-500 mb-1 tracking-wide">OCUPACIÓN</div>
                 <div className="text-2xl font-black" style={{ color: '#0f172a' }}>25%</div>
                 <div className="w-full bg-slate-100 h-1.5 mt-2 rounded-full overflow-hidden">
                    <div className="bg-emerald-700 h-full w-1/4 rounded-full"></div>
                 </div>
              </div>
              
              {/* Listas */}
              <div className="flex-shrink-0 w-[140px] p-3 rounded-xl border shadow-sm transition-colors duration-500" style={{ borderColor: isClean ? '#a7f3d0' : '#e2e8f0', background: isClean ? '#f0fdf4' : 'white' }}>
                 <div className="text-[10px] font-bold flex items-center gap-1.5 mb-1 tracking-wide transition-colors duration-500" style={{ color: isClean ? '#047857' : '#64748b' }}>
                   <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg> 
                   LISTAS
                 </div>
                 <div className="text-2xl font-black transition-colors duration-500" style={{ color: isClean ? '#065f46' : '#0f172a' }}>
                   {isClean ? '3' : '2'}
                 </div>
              </div>
              
              {/* Sin limpieza */}
              <div className="flex-shrink-0 w-[140px] p-3 rounded-xl border shadow-sm transition-colors duration-500" style={{ borderColor: !isClean ? '#fca5a5' : '#e2e8f0', background: !isClean ? '#fef2f2' : 'white' }}>
                 <div className="text-[10px] font-bold flex items-center gap-1.5 mb-1 tracking-wide transition-colors duration-500" style={{ color: !isClean ? '#b91c1c' : '#64748b' }}>
                   <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg> 
                   SIN LIMPIEZA
                 </div>
                 <div className="text-2xl font-black transition-colors duration-500" style={{ color: !isClean ? '#991b1b' : '#0f172a' }}>
                   {isClean ? '0' : '1'}
                 </div>
              </div>

              {/* Urgencias */}
              <div className="flex-shrink-0 w-[140px] p-3 rounded-xl border shadow-sm" style={{ borderColor: '#fca5a5', background: '#fef2f2' }}>
                 <div className="text-[10px] font-bold flex items-center gap-1.5 mb-1 tracking-wide" style={{ color: '#b91c1c' }}>
                   <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg> 
                   URGENCIAS
                 </div>
                 <div className="text-2xl font-black" style={{ color: '#ef4444' }}>
                   0
                 </div>
              </div>
            </div>
          </div>

          {/* Grid container */}
          <div className="p-6 grid grid-cols-2 gap-4 flex-1 relative">
            
            {/* Room 1 (Occupied) */}
            <div className="rounded-xl border p-4 flex flex-col gap-3 shadow-sm bg-white" style={{ borderColor: '#fef08a', background: '#fefce8' }}>
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold" style={{ color: '#a16207' }}>Cabaña Los Robles</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
              </div>
              <div className="text-sm font-medium" style={{ color: '#854d0e' }}>Ocupada por Familia Pérez</div>
              <div className="mt-auto pt-3 border-t flex" style={{ borderColor: '#fef08a' }}>
                <div className="w-full p-2 rounded-md border text-sm" style={{ borderColor: '#e2e8f0', background: '#f8fafc', color: '#94a3b8' }}>Ocupada</div>
              </div>
            </div>

            {/* Room 2 (Clean) */}
            <div className="rounded-xl border p-4 flex flex-col gap-3 shadow-sm bg-white" style={{ borderColor: '#a7f3d0', background: '#f0fdf4' }}>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold" style={{ color: '#047857' }}>Cabaña Los Pinos</span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold flex items-center gap-1" style={{ background: '#d1fae5', color: '#047857' }}>Lista</span>
                </div>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
              </div>
              <div className="text-sm font-medium" style={{ color: '#065f46' }}>Disponible</div>
              <div className="mt-auto pt-3 border-t flex" style={{ borderColor: '#a7f3d0' }}>
                <div className="w-full p-2 rounded-md border text-sm" style={{ borderColor: '#e2e8f0', background: '#f8fafc', color: '#94a3b8' }}>Limpia y Lista</div>
              </div>
            </div>

            {/* Room 3 (Interactive Target) */}
            <div className="rounded-xl border p-4 flex flex-col gap-3 shadow-sm transition-colors duration-500 relative bg-white" style={{ 
                borderColor: isClean ? '#a7f3d0' : '#fed7aa', 
                background: isClean ? '#f0fdf4' : '#fff7ed' 
              }}>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold transition-colors duration-500" style={{ color: isClean ? '#047857' : '#9a3412' }}>Cabaña Araucarias</span>
                  {isClean ? (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold flex items-center gap-1" style={{ background: '#d1fae5', color: '#047857' }}>Lista</span>
                  ) : (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold flex items-center gap-1" style={{ background: '#ffedd5', color: '#9a3412' }}>Sin Limpieza</span>
                  )}
                </div>
                {isClean ? (
                   <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                ) : (
                   <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                )}
              </div>
              <div className="text-sm font-medium transition-colors duration-500" style={{ color: isClean ? '#065f46' : '#7c2d12' }}>Disponible</div>
              
              <div className="mt-auto pt-3 border-t flex transition-colors duration-500 relative" style={{ borderColor: isClean ? '#a7f3d0' : '#fed7aa' }}>
                <div className="w-full relative">
                  
                  {/* Dropdown Menu Overlay (Opens Upwards!) */}
                  <div className={`absolute bottom-full left-0 w-full mb-1 bg-white border border-slate-200 shadow-xl rounded-md z-20 overflow-hidden transition-all duration-200 origin-bottom ${isDropdownOpen ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0 pointer-events-none'}`}>
                    <div className="p-2.5 text-sm font-bold bg-emerald-50 text-emerald-700 cursor-pointer">Limpia y Lista</div>
                    <div className="p-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 cursor-pointer border-t border-slate-100">Limpieza Pendiente</div>
                    <div className="p-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 cursor-pointer border-t border-slate-100">En Mantenimiento</div>
                  </div>

                  <div className="w-full p-2 rounded-md border bg-white flex justify-between items-center text-sm cursor-pointer shadow-sm transition-all" style={{ borderColor: '#e2e8f0', color: '#0f172a' }}>
                    {isClean ? 'Limpia y Lista' : 'Limpieza Pendiente'}
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}><polyline points="6 9 12 15 18 9"/></svg>
                  </div>
                  
                </div>
              </div>
            </div>

            {/* Room 4 (Clean) */}
            <div className="rounded-xl border p-4 flex flex-col gap-3 shadow-sm bg-white" style={{ borderColor: '#a7f3d0', background: '#f0fdf4' }}>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold" style={{ color: '#047857' }}>Glamping Domo 1</span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold flex items-center gap-1" style={{ background: '#d1fae5', color: '#047857' }}>Lista</span>
                </div>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
              </div>
              <div className="text-sm font-medium" style={{ color: '#065f46' }}>Disponible</div>
              <div className="mt-auto pt-3 border-t flex" style={{ borderColor: '#a7f3d0' }}>
                <div className="w-full p-2 rounded-md border text-sm" style={{ borderColor: '#e2e8f0', background: '#f8fafc', color: '#94a3b8' }}>Limpia y Lista</div>
              </div>
            </div>
            
          </div>

          {/* The Mouse Cursor Overlay (Moves with Page 1) */}
          <div className="absolute z-50 pointer-events-none" style={{ left: mouseX + '%', top: mouseY + '%', transform: 'scale(' + clickScale + ')', transition: 'transform 0.1s, left 0.1s linear, top 0.1s linear' }}>
            <div className="relative">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="white" stroke="#252A26" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="drop-shadow-lg -ml-1 -mt-1 absolute top-0 left-0">
                <path d="m3 3 7.07 16.97 2.51-7.39 7.39-2.51L3 3z"/>
                <path d="m13 13 6 6"/>
              </svg>
            </div>
          </div>
        </div>

        {/* PAGE 2: The Video Notification (50% of 200% height) */}
        <div className="w-full h-1/2 relative bg-stone-900 flex items-center justify-center overflow-hidden">
           <video 
              ref={videoRef}
              src="/videos/demo.mp4"
              className="w-full h-full object-cover opacity-90 transition-opacity duration-1000"
              style={{ opacity: showVideo ? 1 : 0 }}
              muted
              playsInline
              loop
           />
           
           {/* Subtle decorative overlay for the video to explain the action */}
           <div className="absolute top-8 left-0 right-0 flex justify-center z-10 transition-opacity duration-1000" style={{ opacity: showVideo && t > 5500 ? 1 : 0 }}>
             <div className="bg-white/10 backdrop-blur-md px-6 py-2 rounded-full border border-white/20 text-white font-medium text-sm shadow-2xl flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                Notificación instantánea a tu equipo
             </div>
           </div>
        </div>
        
      </div>
    </div>
  );
}
