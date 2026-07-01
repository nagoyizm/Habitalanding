import React from 'react';

export function InteractiveCalendar() {
  const days = ['Lun 10', 'Mar 11', 'Mié 12', 'Jue 13', 'Vie 14', 'Sáb 15', 'Dom 16', 'Lun 17'];
  const rooms = ['Cabaña 1', 'Cabaña 2', 'Cabaña 3', 'Suite A', 'Suite B', 'Suite C', 'Doble 1', 'Doble 2'];

  return (
    <>
      <style>{`
        @keyframes saas-camera-anim {
          0%, 15% { transform: scale(0.8); transform-origin: center center; }
          22.5%, 64% { transform: scale(1.05); transform-origin: center center; }
          71%, 98% { transform: scale(0.8); transform-origin: center center; }
          100% { transform: scale(0.8); transform-origin: center center; }
        }
        @keyframes saas-cursor-anim {
          0%, 3.75% { left: 5%; top: 100px; transform: scale(1); }
          9%, 11.25% { left: 18.75%; top: 10px; transform: scale(1); } 
          12.75% { left: 18.75%; top: 10px; transform: scale(0.85); } 
          15% { left: 18.75%; top: 10px; transform: scale(1); } 
          18.75%, 26.25% { left: 25%; top: 10px; transform: scale(1); } 
          28.5% { left: 25%; top: 10px; transform: scale(0.85); } 
          32.25%, 43.5% { left: 50%; top: 10px; transform: scale(0.85); } 
          45%, 56.25% { left: 50%; top: 10px; transform: scale(1); } 
          64%, 85% { left: 20%; top: 150px; transform: scale(1); } 
          100% { left: 5%; top: 100px; transform: scale(1); }
        }
        @keyframes saas-arrow-opacity {
          0%, 22.5% { opacity: 1; }
          23.25%, 44.25% { opacity: 0; }
          45%, 100% { opacity: 1; }
        }
        @keyframes saas-resize-opacity {
          0%, 22.5% { opacity: 0; }
          23.25%, 44.25% { opacity: 1; }
          45%, 100% { opacity: 0; }
        }
        @keyframes saas-ripple-anim {
          0%, 12% { opacity: 0; transform: scale(0.5); }
          12.75% { opacity: 0.6; transform: scale(1); }
          18.75%, 100% { opacity: 0; transform: scale(2.5); }
        }
        @keyframes saas-block-anim {
          0%, 12% { opacity: 0; width: 0; }
          12.75%, 28.5% { opacity: 1; width: calc(12.5% - 4px); } 
          32.25%, 43.5% { opacity: 1; width: calc(37.5% - 4px); } 
          43.5%, 96% { opacity: 1; width: calc(37.5% - 4px); }
          98%, 100% { opacity: 0; width: 0; }
        }
        @keyframes saas-toast1-anim {
          0%, 43.5% { opacity: 0; transform: translateY(10px) scale(0.95); }
          45.75%, 55.5% { opacity: 1; transform: translateY(0) scale(1); }
          57%, 100% { opacity: 0; transform: translateY(-10px) scale(0.95); }
        }
        @keyframes saas-toast2-anim {
          0%, 57% { opacity: 0; transform: translateY(10px) scale(0.95); }
          59.25%, 96% { opacity: 1; transform: translateY(0) scale(1); }
          98%, 100% { opacity: 0; transform: translateY(-10px) scale(0.95); }
        }
      `}</style>
      <div className="relative w-full h-full rounded-3xl overflow-hidden flex flex-col font-sans text-sm" style={{ backgroundColor: '#faf6ee' }}>
        
        {/* Main Container - The Camera Layer */}
        <div className="absolute -top-[12.5%] -bottom-[12.5%] -left-[12.5%] -right-[12.5%]" style={{ animation: 'saas-camera-anim 16s ease-in-out infinite' }}>
          
          {/* Toolbar */}
          <div className="absolute top-0 left-0 right-0 h-12 border-b flex items-center justify-between px-4 z-10 shadow-sm" style={{ backgroundColor: '#faf6ee', borderColor: '#dfd6c2' }}>
            
            <div className="flex items-center gap-4">
              <div className="font-heading font-bold" style={{ color: '#2e251a' }}>Calendario</div>
              
              <div className="flex p-1 rounded-md" style={{ backgroundColor: '#e6dec9' }}>
                 <div className="px-3 py-0.5 text-[10px] font-bold rounded" style={{ backgroundColor: '#dfa35c', color: '#fff' }}>Mes</div>
                 <div className="px-3 py-0.5 text-[10px] font-bold" style={{ color: '#5e4e3b' }}>Semana</div>
              </div>

              <div className="flex gap-1">
                <div className="w-6 h-6 rounded flex items-center justify-center font-bold text-xs" style={{ backgroundColor: '#e6dec9', color: '#5e4e3b' }}>«</div>
                <div className="w-12 h-6 rounded flex items-center justify-center text-[10px] font-bold" style={{ backgroundColor: '#e6dec9', color: '#5e4e3b' }}>Hoy</div>
                <div className="w-6 h-6 rounded flex items-center justify-center font-bold text-xs" style={{ backgroundColor: '#e6dec9', color: '#5e4e3b' }}>»</div>
              </div>
            </div>

            <div className="flex gap-2">
               <div className="w-8 h-7 rounded-md flex items-center justify-center" style={{ backgroundColor: '#e6dec9' }}>
                 <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#5e4e3b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 1 1-6.219-8.56"></path><path d="M8 12h8"></path><path d="M12 8v8"></path></svg>
               </div>
               <div className="px-3 h-7 rounded-md flex items-center justify-center text-[11px] font-bold" style={{ backgroundColor: '#4b6f50', color: '#fff' }}>
                 + Nueva Reserva
               </div>
            </div>

          </div>

          {/* Calendar Grid Container */}
          <div className="absolute top-12 bottom-0 left-0 right-0 flex">
            
            {/* Sidebar Rooms */}
            <div className="w-24 border-r flex flex-col shrink-0 z-10" style={{ backgroundColor: '#f4eee1', borderColor: '#dfd6c2' }}>
              <div className="h-8 border-b" style={{ borderColor: '#dfd6c2' }}></div>
              {rooms.map((room, i) => (
                <div key={i} className="flex-1 border-b flex items-center px-3 text-[10px] font-medium" style={{ borderColor: '#dfd6c2', color: '#5e4e3b' }}>
                  {room}
                </div>
              ))}
            </div>

            {/* Grid Area */}
            <div className="flex-1 relative overflow-hidden" style={{ backgroundColor: '#faf6ee' }}>
              {/* Timeline Header */}
              <div className="h-8 border-b flex items-center relative" style={{ borderColor: '#dfd6c2', backgroundColor: '#f4eee1' }}>
                {days.map((day, i) => (
                  <div key={i} className="flex-1 border-l h-full flex items-center px-1.5 text-[9px] font-medium" style={{ borderColor: '#dfd6c2', color: '#9e8c78' }}>
                    {day}
                  </div>
                ))}
              </div>

              {/* Grid Body */}
              <div className="absolute top-8 bottom-0 left-0 right-0 flex flex-col">
                {rooms.map((_, rowIdx) => (
                  <div key={rowIdx} className="flex-1 border-b flex relative" style={{ borderColor: '#dfd6c2' }}>
                    {days.map((_, colIdx) => (
                      <div key={colIdx} className="flex-1 border-l opacity-30 h-full" style={{ borderColor: '#dfd6c2' }}></div>
                    ))}
                    
                    {/* Cabaña 1 */}
                    {rowIdx === 0 && (
                      <>
                        <div className="absolute left-[0%] top-1 bottom-1 w-[calc(25%-4px)] ml-[2px] rounded shadow-sm border flex items-center px-2" style={{ backgroundColor: 'rgba(245, 158, 11, 0.70)', borderColor: '#d97706' }}>
                          <span className="text-[9px] font-medium truncate" style={{ color: '#2e251a' }}>Huésped 1 (In)</span>
                        </div>
                        <div className="absolute left-[50%] top-1 bottom-1 w-[calc(37.5%-4px)] ml-[2px] rounded shadow-sm border flex items-center px-2" style={{ backgroundColor: 'rgba(16, 185, 129, 0.70)', borderColor: '#059669' }}>
                          <span className="text-[9px] font-medium truncate" style={{ color: '#2e251a' }}>Huésped 2 (Conf)</span>
                        </div>
                      </>
                    )}

                    {/* Cabaña 2 - Animated Interaction */}
                    {rowIdx === 1 && (
                      <>
                        <div 
                          className="absolute left-[12.5%] ml-[2px] top-1 bottom-1 rounded shadow-sm border flex items-center px-2 overflow-hidden opacity-0"
                          style={{ backgroundColor: 'rgba(59, 130, 246, 0.70)', borderColor: '#2563eb', animation: 'saas-block-anim 16s ease-in-out infinite', willChange: 'width, opacity' }}
                        >
                          <div className="w-full flex justify-between items-center">
                            <span className="text-[9px] font-medium truncate" style={{ color: '#2e251a' }}>Nueva Reserva</span>
                            {/* Fake drag handle */}
                            <div className="w-1 h-3 border-l shrink-0" style={{ borderColor: 'rgba(46,37,26,0.3)' }}></div>
                          </div>
                        </div>

                        {/* Ripple Effect on Click */}
                        <div className="absolute z-40 w-6 h-6 rounded-full border-2 pointer-events-none -ml-3 -mt-3" style={{ left: '18.75%', top: '10px', borderColor: '#3b82f6', animation: 'saas-ripple-anim 16s ease-out infinite' }}></div>

                        {/* The Mouse Cursor */}
                        <div className="absolute z-50 pointer-events-none will-change-transform" style={{ animation: 'saas-cursor-anim 16s linear infinite' }}>
                          <div className="relative">
                            <svg style={{ animation: 'saas-arrow-opacity 16s linear infinite' }} xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="white" stroke="#252A26" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="drop-shadow-lg -ml-1 -mt-1 absolute top-0 left-0">
                              <path d="m3 3 7.07 16.97 2.51-7.39 7.39-2.51L3 3z"/>
                              <path d="m13 13 6 6"/>
                            </svg>
                            <svg style={{ animation: 'saas-resize-opacity 16s linear infinite' }} xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="white" stroke="#252A26" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="drop-shadow-lg -ml-[14px] -mt-[14px] absolute top-0 left-0">
                              <path d="M8 8l-4 4 4 4" />
                              <path d="M16 8l4 4-4 4" />
                              <path d="M4 12h16" />
                            </svg>
                          </div>
                        </div>
                      </>
                    )}

                    {/* Cabaña 3 */}
                    {rowIdx === 2 && (
                      <div className="absolute left-[25%] top-1 bottom-1 w-[calc(25%-4px)] ml-[2px] rounded shadow-sm border flex items-center px-2" style={{ backgroundColor: 'rgba(31, 41, 55, 0.70)', borderColor: '#1f2937' }}>
                        <span className="text-[9px] text-white font-medium truncate">Bloqueo Temp.</span>
                      </div>
                    )}

                    {/* Suite A */}
                    {rowIdx === 3 && (
                      <div className="absolute left-[62.5%] top-1 bottom-1 w-[calc(37.5%-4px)] ml-[2px] rounded shadow-sm border flex items-center px-2" style={{ backgroundColor: 'rgba(59, 130, 246, 0.70)', borderColor: '#2563eb' }}>
                        <span className="text-[9px] font-medium truncate" style={{ color: '#2e251a' }}>Huésped 3</span>
                      </div>
                    )}

                    {/* Suite B */}
                    {rowIdx === 4 && (
                      <div className="absolute left-[12.5%] top-1 bottom-1 w-[calc(50%-4px)] ml-[2px] rounded shadow-sm border flex items-center px-2" style={{ backgroundColor: 'rgba(16, 185, 129, 0.70)', borderColor: '#059669' }}>
                        <span className="text-[9px] font-medium truncate" style={{ color: '#2e251a' }}>Huésped 4</span>
                      </div>
                    )}

                    {/* Suite C */}
                    {rowIdx === 5 && null}

                    {/* Doble 1 */}
                    {rowIdx === 6 && (
                      <div className="absolute left-[0%] top-1 bottom-1 w-[calc(12.5%-4px)] ml-[2px] rounded shadow-sm border flex items-center px-2" style={{ backgroundColor: 'rgba(107, 114, 128, 0.70)', borderColor: '#4b5563' }}>
                        <span className="text-[9px] text-white font-medium truncate">H. 5 (Out)</span>
                      </div>
                    )}

                    {/* Doble 2 */}
                    {rowIdx === 7 && (
                      <div className="absolute left-[75%] top-1 bottom-1 w-[calc(25%-4px)] ml-[2px] rounded shadow-sm border flex items-center px-2" style={{ backgroundColor: 'rgba(245, 158, 11, 0.70)', borderColor: '#d97706' }}>
                        <span className="text-[9px] font-medium truncate" style={{ color: '#2e251a' }}>Huésped 6</span>
                      </div>
                    )}

                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Toasts have been moved outside the camera layer */}
        </div>

        {/* Toast 1: Guardando... */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-stone-700 px-4 py-2 rounded-lg shadow-xl border flex items-center gap-2 z-50 opacity-0 bg-white" style={{ borderColor: '#dfd6c2', animation: 'saas-toast1-anim 16s ease-in-out infinite' }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="animate-spin text-stone-400">
            <path d="M21 12a9 9 0 1 1-6.219-8.56"></path>
          </svg>
          <span className="text-xs font-bold tracking-wide">Guardando...</span>
        </div>

        {/* Toast 2: Guardado! */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white px-4 py-2 rounded-lg shadow-xl border flex items-center gap-2 z-50 opacity-0" style={{ backgroundColor: '#4b6f50', borderColor: '#3d5a41', animation: 'saas-toast2-anim 16s ease-in-out infinite' }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          <span className="text-xs font-bold tracking-wide">¡Guardado!</span>
        </div>

      </div>
    </>
  );
}
