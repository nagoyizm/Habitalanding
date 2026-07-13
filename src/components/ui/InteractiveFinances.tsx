'use client';

import React, { useState, useEffect } from 'react';

export function InteractiveFinances() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let start = performance.now();
    const DURATION = 16000; // 16 seconds loop

    const animate = (time: number) => {
      let elapsed = (time - start) % DURATION;
      let p = (elapsed / DURATION) * 100;
      setProgress(p);
      requestAnimationFrame(animate);
    };
    
    let frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, []);

  const formatCLP = (n: number) =>
    new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 0 }).format(n);

  // Define the 4 data states
  const STATES = [
    {
      tab: 'Semana',
      semana: 3930000, bestWeekDate: 'Sem. 3 De Junio',
      dia: 1580000, bestDayDate: '17/06/2026',
      debil: 80000, weakDayDate: '02/06/2026',
      ocupacion: 11, revpar: 11422,
      chartY: [240, 230, 240, 220, 100, 50, 180, 220, 240],
      roomPct: 0.65, payPct: 0.85,
      labels: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'],
      yLabels: ['$4M', '$3M', '$2M', '$1M', '$0']
    },
    {
      tab: 'Mes',
      semana: 6200000, bestWeekDate: 'Sem. 1 De Julio',
      dia: 2100000, bestDayDate: '04/07/2026',
      debil: 150000, weakDayDate: '23/06/2026',
      ocupacion: 28, revpar: 18500,
      chartY: [180, 200, 220, 150, 120, 100, 40, 80, 120],
      roomPct: 0.55, payPct: 0.70,
      labels: ['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4'],
      yLabels: ['$8M', '$6M', '$4M', '$2M', '$0']
    },
    {
      tab: 'Semestre',
      semana: 9800000, bestWeekDate: 'Sem. 2 De Enero',
      dia: 3500000, bestDayDate: '14/02/2026',
      debil: 0, weakDayDate: '04/05/2026',
      ocupacion: 45, revpar: 25000,
      chartY: [40, 60, 120, 180, 220, 250, 230, 200, 180],
      roomPct: 0.75, payPct: 0.50,
      labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
      yLabels: ['$12M', '$9M', '$6M', '$3M', '$0']
    },
    {
      tab: 'Año',
      semana: 14500000, bestWeekDate: 'Sem. 1 De Febrero',
      dia: 4200000, bestDayDate: '31/12/2026',
      debil: 0, weakDayDate: '12/06/2026',
      ocupacion: 52, revpar: 32000,
      chartY: [30, 80, 150, 250, 280, 200, 150, 100, 40],
      roomPct: 0.60, payPct: 0.60,
      labels: ['Ene', 'Mar', 'May', 'Jul', 'Sep', 'Nov'],
      yLabels: ['$16M', '$12M', '$8M', '$4M', '$0']
    }
  ];

  // Determine current active state and interpolation
  let currentIdx = 0;
  let nextIdx = 0;
  let transitionP = 0; // 0 to 1

  if (progress < 25) {
    if (progress < 3) {
      currentIdx = 3; nextIdx = 0; transitionP = progress / 3;
    } else {
      currentIdx = 0; nextIdx = 0; transitionP = 0;
    }
  } else if (progress < 50) {
    if (progress < 28) {
      currentIdx = 0; nextIdx = 1; transitionP = (progress - 25) / 3;
    } else {
      currentIdx = 1; nextIdx = 1; transitionP = 0;
    }
  } else if (progress < 75) {
    if (progress < 53) {
      currentIdx = 1; nextIdx = 2; transitionP = (progress - 50) / 3;
    } else {
      currentIdx = 2; nextIdx = 2; transitionP = 0;
    }
  } else {
    if (progress < 78) {
      currentIdx = 2; nextIdx = 3; transitionP = (progress - 75) / 3;
    } else {
      currentIdx = 3; nextIdx = 3; transitionP = 0;
    }
  }

  const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
  const t = easeOut(transitionP);
  const interpolate = (a: number, b: number) => a + (b - a) * t;

  const s1 = STATES[currentIdx];
  const s2 = STATES[nextIdx];

  // Interpolated Values
  const currentSemana = interpolate(s1.semana, s2.semana);
  const currentDia = interpolate(s1.dia, s2.dia);
  const currentDebil = interpolate(s1.debil, s2.debil);
  const currentOcupacion = interpolate(s1.ocupacion, s2.ocupacion);
  const currentRevPar = interpolate(s1.revpar, s2.revpar);
  
  const roomPct = interpolate(s1.roomPct, s2.roomPct);
  const payPct = interpolate(s1.payPct, s2.payPct);

  // SVG dimensions for Donut Charts
  const circ = 2 * Math.PI * 40; // 251.327
  const habBlueDash = circ * roomPct;
  const pagoRedDash = circ * payPct;

  // Chart Y Interpolation
  const chartY = s1.chartY.map((y1, i) => interpolate(y1, s2.chartY[i]));

  // Active Tab for UI styling
  const activeTab = (progress >= 0 && progress < 25) ? 0 
                  : (progress >= 25 && progress < 50) ? 1 
                  : (progress >= 50 && progress < 75) ? 2 : 3;

  // Mouse Animation Logic
  // The toolbar buttons are roughly at X percentages: Semana(50%), Mes(60%), Semestre(72%), Año(85%)
  // Mouse should rest outside, move to the next button, click, and rest.
  const mapProgress = (p: number, inMin: number, inMax: number, outMin: number, outMax: number) => {
    if (p < inMin) return outMin;
    if (p > inMax) return outMax;
    return outMin + ((p - inMin) / (inMax - inMin)) * (outMax - outMin);
  };

  let mouseX = 50; // default start
  let mouseY = 100;
  let clickScale = 1;

  const buttonX = [141, 225, 309, 393]; // pixel X center of each tab (px-6 toolbar, 84px tabs)
  const buttonY = 24; // Y pos of tabs (relative to outermost wrapper)

  // Helper to animate mouse for a specific phase (25% chunk)
  // Inside each 25% phase:
  // 0-10%: rest
  // 10-20%: move to next button
  // 20-25%: click next button (this triggers the transition in the next phase!)
  // Actually, the transition happens at 0-3% of the NEXT phase. So mouse should click exactly at 24-25%.
  const phaseProgress = progress % 25;
  const currentPhase = Math.floor(progress / 25);
  const nextPhaseButtonIdx = (currentPhase + 1) % 4;
  const currentPhaseButtonIdx = currentPhase;

  if (phaseProgress < 15) {
    // Rest at the button we just clicked
    mouseX = buttonX[currentPhaseButtonIdx];
    mouseY = buttonY;
  } else if (phaseProgress >= 15 && phaseProgress < 23) {
    // Move to NEXT button
    mouseX = mapProgress(phaseProgress, 15, 23, buttonX[currentPhaseButtonIdx], buttonX[nextPhaseButtonIdx]);
    mouseY = buttonY;
  } else if (phaseProgress >= 23 && phaseProgress < 25) {
    // Click NEXT button
    mouseX = buttonX[nextPhaseButtonIdx];
    mouseY = buttonY;
    clickScale = 0.85;
  }

  return (
    <div className="relative w-full h-full overflow-hidden flex flex-col font-sans" style={{ backgroundColor: '#f4f9f9' }}>
      
      {/* Toolbar */}
      <div className="h-12 border-b flex items-center justify-between px-6 shrink-0 shadow-sm relative z-10 bg-white" style={{ borderColor: '#e2e8f0' }}>
        <div className="flex items-center gap-4">
          <div className="font-heading font-bold" style={{ color: '#0f172a' }}>Finanzas</div>
          
          {/* Tabs */}
          <div className="flex p-1 rounded-md" style={{ backgroundColor: '#f1f5f9' }}>
             <div className={"w-[84px] flex justify-center items-center py-1 text-xs font-bold rounded " + (activeTab === 0 ? 'bg-white text-emerald-700 shadow-sm' : 'text-slate-500')}>Semana</div>
             <div className={"w-[84px] flex justify-center items-center py-1 text-xs font-bold rounded " + (activeTab === 1 ? 'bg-white text-emerald-700 shadow-sm' : 'text-slate-500')}>Mes</div>
             <div className={"w-[84px] flex justify-center items-center py-1 text-xs font-bold rounded " + (activeTab === 2 ? 'bg-white text-emerald-700 shadow-sm' : 'text-slate-500')}>Semestre</div>
             <div className={"w-[84px] flex justify-center items-center py-1 text-xs font-bold rounded " + (activeTab === 3 ? 'bg-white text-emerald-700 shadow-sm' : 'text-slate-500')}>Año</div>
          </div>
        </div>
      </div>

      {/* Generate smooth sinuous curves for the Area Chart */}
      {(() => {
        const X_POINTS = [0, 125, 250, 375, 500, 625, 750, 875, 1000];
        let curvePath = 'M 0,' + chartY[0] + ' ';
        for (let i = 0; i < 8; i++) {
          const mx = (X_POINTS[i] + X_POINTS[i+1]) / 2;
          curvePath += 'C ' + mx + ',' + chartY[i] + ' ' + mx + ',' + chartY[i+1] + ' ' + X_POINTS[i+1] + ',' + chartY[i+1] + ' ';
        }
        const areaPath = curvePath + 'L 1000,300 L 0,300 Z';

        return (
          <>
            <div className="p-6 flex flex-col gap-6 flex-1 overflow-hidden relative">
        
        {/* KPI Cards */}
        <div className="grid grid-cols-4 gap-4 shrink-0">
          {/* Mejor Semana */}
          <div className="rounded-xl border bg-white p-3 flex flex-col gap-1 shadow-sm transition-all" style={{ borderColor: '#fde68a' }}>
            <div className="text-[10px] font-extrabold uppercase tracking-wider flex items-center gap-1.5" style={{ color: '#b45309' }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M12 15v5s-2 2-2 2c0 0-2-2-2-2v-5"/><path d="M14 15v5s2 2 2 2c0 0 2-2 2-2v-5"/><circle cx="12" cy="9" r="4"/></svg>
              Mejor Semana
            </div>
            <div className="text-lg font-black mt-1 truncate" style={{ color: '#0f172a' }}>
              {formatCLP(currentSemana)}
            </div>
            <div className="text-[10px] font-bold truncate" style={{ color: '#64748b' }}>
              {t > 0.5 ? s2.bestWeekDate : s1.bestWeekDate}
            </div>
          </div>

          {/* Mejor Día */}
          <div className="rounded-xl border bg-white p-3 flex flex-col gap-1 shadow-sm transition-all" style={{ borderColor: '#a7f3d0' }}>
            <div className="text-[10px] font-extrabold uppercase tracking-wider flex items-center gap-1.5" style={{ color: '#047857' }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
              Mejor Día
            </div>
            <div className="text-lg font-black mt-1 truncate" style={{ color: '#0f172a' }}>
              {formatCLP(currentDia)}
            </div>
            <div className="text-[10px] font-bold truncate" style={{ color: '#64748b' }}>
              {t > 0.5 ? s2.bestDayDate : s1.bestDayDate}
            </div>
          </div>

          {/* Día Más Débil */}
          <div className="rounded-xl border bg-white p-3 flex flex-col gap-1 shadow-sm transition-all" style={{ borderColor: '#fecaca' }}>
            <div className="text-[10px] font-extrabold uppercase tracking-wider flex items-center gap-1.5" style={{ color: '#991b1b' }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 17 13.5 8.5 8.5 13.5 2 7"></polyline><polyline points="16 17 22 17 22 11"></polyline></svg>
              Día Más Débil
            </div>
            <div className="text-lg font-black mt-1 truncate" style={{ color: '#0f172a' }}>
              {formatCLP(currentDebil)}
            </div>
            <div className="text-[10px] font-bold truncate" style={{ color: '#64748b' }}>
              {t > 0.5 ? s2.weakDayDate : s1.weakDayDate}
            </div>
          </div>

          {/* Ocupación / RevPAR */}
          <div className="rounded-xl border bg-white p-3 flex flex-col gap-1 shadow-sm transition-all" style={{ borderColor: '#ddd6fe' }}>
            <div className="text-[10px] font-extrabold uppercase tracking-wider flex items-center gap-1.5" style={{ color: '#4c1d95' }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline><polyline points="16 7 22 7 22 13"></polyline></svg>
              Ocupación / RevPAR
            </div>
            <div className="text-lg font-black mt-1 truncate" style={{ color: '#0f172a' }}>
              {Math.floor(currentOcupacion)}%
            </div>
            <div className="text-[10px] font-bold truncate" style={{ color: '#64748b' }}>
              {formatCLP(currentRevPar)} RevPAR
            </div>
          </div>
        </div>

        {/* Charts Container */}
        <div className="flex-1 flex flex-row gap-4 shrink-0 min-h-[220px]">
          
          {/* Main Area Chart (Evolución de Ingresos) */}
          <div className="rounded-xl border bg-white flex-[2] p-4 flex flex-col shadow-sm relative overflow-hidden" style={{ borderColor: '#e2e8f0' }}>
            <div className="text-xs font-bold mb-4" style={{ color: '#0f172a' }}>Evolución de Ingresos (Llegadas)</div>
            
            <div className="flex-1 relative mt-2 mb-6 ml-8">
              
              {/* Y-axis grid lines */}
              <div className="absolute inset-0 flex flex-col justify-between">
                {STATES[activeTab].yLabels.map((val, i) => (
                  <div key={i} className="flex items-center w-full relative">
                    <span className="absolute -left-2 -translate-x-full text-[9px] font-medium text-slate-400">{val}</span>
                    <div className="w-full border-t border-dashed border-slate-200"></div>
                  </div>
                ))}
              </div>

              {/* Area Chart SVG */}
              <svg className="absolute inset-0 w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 1000 300">
                <defs>
                  <linearGradient id="blueGradient" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                {/* Dynamically interpolated curve path */}
                <path 
                  d={areaPath}
                  fill="url(#blueGradient)" 
                  stroke="none" 
                />
                <path 
                  d={curvePath}
                  fill="none" 
                  stroke="#3b82f6" 
                  strokeWidth="6" 
                  strokeLinecap="round"
                />
              </svg>

              {/* X-axis labels */}
              <div className="absolute -bottom-6 left-0 right-0 flex justify-between text-[9px] font-medium text-slate-400 px-1">
                {STATES[activeTab].labels.map((l, i) => (
                  <span key={i}>{l}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Donut Chart 1 (Habitación) */}
          <div className="rounded-xl border bg-white flex-1 p-4 flex flex-col items-center justify-between shadow-sm" style={{ borderColor: '#e2e8f0' }}>
            <div className="text-xs font-bold w-full text-left" style={{ color: '#0f172a' }}>Por Tipo de Habitación</div>
            
            <div className="relative w-32 h-32 my-4">
              <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                <circle cx="50" cy="50" r="40" fill="transparent" stroke="#10b981" strokeWidth="16" />
                <circle 
                  cx="50" cy="50" r="40" 
                  fill="transparent" 
                  stroke="#3b82f6" 
                  strokeWidth="16" 
                  strokeDasharray={habBlueDash + ' ' + circ} 
                />
              </svg>
            </div>
            
            <div className="flex gap-4 text-[9px] font-bold">
              <div className="flex items-center gap-1" style={{ color: '#3b82f6' }}>
                <div className="w-2 h-2 rounded-full bg-[#3b82f6]"></div>
                Cabaña Familiar ({Math.round(roomPct * 100)}%)
              </div>
              <div className="flex items-center gap-1" style={{ color: '#10b981' }}>
                <div className="w-2 h-2 rounded-full bg-[#10b981]"></div>
                Suite Termal
              </div>
            </div>
          </div>

          {/* Donut Chart 2 (Pago) */}
          <div className="rounded-xl border bg-white flex-1 p-4 flex flex-col items-center justify-between shadow-sm" style={{ borderColor: '#e2e8f0' }}>
            <div className="text-xs font-bold w-full text-left" style={{ color: '#0f172a' }}>Por Forma de Pago</div>
            
            <div className="relative w-32 h-32 my-4">
              <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                <circle cx="50" cy="50" r="40" fill="transparent" stroke="#8b5cf6" strokeWidth="16" />
                <circle 
                  cx="50" cy="50" r="40" 
                  fill="transparent" 
                  stroke="#ef4444" 
                  strokeWidth="16" 
                  strokeDasharray={pagoRedDash + ' ' + circ} 
                />
              </svg>
            </div>
            
            <div className="flex gap-4 text-[9px] font-bold">
              <div className="flex items-center gap-1" style={{ color: '#8b5cf6' }}>
                <div className="w-2 h-2 rounded-full bg-[#8b5cf6]"></div>
                Transferencia ({Math.round(payPct * 100)}%)
              </div>
              <div className="flex items-center gap-1" style={{ color: '#ef4444' }}>
                <div className="w-2 h-2 rounded-full bg-[#ef4444]"></div>
                Otros
              </div>
            </div>
          </div>
          
        </div>
      </div>

      {/* The Mouse Cursor Overlay (Moved to outermost wrapper to fix offset relative to toolbar) */}
      <div className="absolute z-50 pointer-events-none" style={{ left: mouseX + 'px', top: mouseY + 'px', transform: 'scale(' + clickScale + ')', transition: 'transform 0.1s, left 0.1s linear, top 0.1s linear' }}>
        <div className="relative">
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="white" stroke="#252A26" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="drop-shadow-lg -ml-1 -mt-1 absolute top-0 left-0">
            <path d="m3 3 7.07 16.97 2.51-7.39 7.39-2.51L3 3z"/>
            <path d="m13 13 6 6"/>
          </svg>
        </div>
      </div>
      </>
      );
      })()}

    </div>
  );
}
