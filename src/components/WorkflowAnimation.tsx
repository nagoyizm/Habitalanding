"use client";

import { useState, useEffect } from "react";
import { 
  UserPlus, User, BedDouble, Coffee, Wifi, Database, 
  Sparkles, Bell, MousePointer2, Brush, CheckCircle2, Calendar
} from "lucide-react";

export function WorkflowAnimation() {
  const [step, setStep] = useState(0);
  const [targetNode, setTargetNode] = useState(0);
  const [isClicking, setIsClicking] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  // Ciclo automático con loop async para coordinación perfecta
  useEffect(() => {
    let mounted = true;
    
    const runSequence = async () => {
      // Bucle infinito
      while (mounted) {
        // Reset inicial
        setStep(0);
        setTargetNode(0);
        setIsClicking(false);
        setIsDragging(false);
        await new Promise(r => setTimeout(r, 1000));
        if (!mounted) break;

        // --- NODO 1: Reserva ---
        setTargetNode(1); 
        await new Promise(r => setTimeout(r, 1500)); // Lento
        if (!mounted) break;
        
        setIsClicking(true); 
        await new Promise(r => setTimeout(r, 300));
        setIsClicking(false);
        
        // Activa el nodo en la UI, aparece calendario vacío
        setStep(0.5); 
        await new Promise(r => setTimeout(r, 1000));
        
        // Baja al calendario simulado
        setTargetNode(1.5);
        await new Promise(r => setTimeout(r, 1000));
        
        // Clic y arrastrar en el calendario
        setIsClicking(true);
        await new Promise(r => setTimeout(r, 300));
        setIsDragging(true);
        setTargetNode(1.6); // Arrastra a la derecha
        await new Promise(r => setTimeout(r, 1200)); // tiempo de arrastre
        
        setIsClicking(false);
        await new Promise(r => setTimeout(r, 500));
        
        setStep(1); // Aparece la tarjeta de reserva
        await new Promise(r => setTimeout(r, 3500)); // Lento para leer

        // --- NODO 2: Estancia ---
        setIsDragging(false);
        setTargetNode(2);
        await new Promise(r => setTimeout(r, 1500));
        if (!mounted) break;
        
        setIsClicking(true);
        await new Promise(r => setTimeout(r, 300));
        setIsClicking(false);
        setStep(2); 
        await new Promise(r => setTimeout(r, 4000));

        // --- NODO 3: Check-out ---
        setTargetNode(3);
        await new Promise(r => setTimeout(r, 1500));
        if (!mounted) break;
        
        setIsClicking(true);
        await new Promise(r => setTimeout(r, 300));
        setIsClicking(false);
        setStep(3);
        await new Promise(r => setTimeout(r, 4000));

        // --- NODO 4: Limpieza ---
        setTargetNode(4);
        await new Promise(r => setTimeout(r, 1500));
        if (!mounted) break;
        
        setIsClicking(true);
        await new Promise(r => setTimeout(r, 300));
        setIsClicking(false);
        setStep(4);
        
        // Termina el flujo, se aleja el cursor y espera
        await new Promise(r => setTimeout(r, 1500));
        setTargetNode(5); // Cursor sale de pantalla
        await new Promise(r => setTimeout(r, 6000)); // Tiempo largo para admirar
      }
    };
    
    runSequence();
    
    return () => { mounted = false; };
  }, []);

  // Control estricto de la posición del cursor
  const getCursorStyle = () => {
    const base = "absolute z-[60] text-stone-800 transition-all ease-in-out pointer-events-none drop-shadow-2xl";
    let style: React.CSSProperties = {
      transitionDuration: '1000ms',
      transform: `translate(15px, 15px) ${isClicking ? 'scale(0.8)' : 'scale(1)'}`,
    };
    
    if (targetNode === 0) {
      style.left = '-10%'; style.top = '5rem'; style.opacity = 0;
    } else if (targetNode === 1) {
      style.left = '12.5%'; style.top = '5rem'; style.opacity = 1;
    } else if (targetNode === 1.5) { // Empieza drag en calendario
      style.left = '8%'; style.top = '12rem'; style.opacity = 1;
    } else if (targetNode === 1.6) { // Termina drag
      style.left = '16%'; style.top = '12rem'; style.opacity = 1;
    } else if (targetNode === 2) {
      style.left = '37.5%'; style.top = '5rem'; style.opacity = 1;
    } else if (targetNode === 3) {
      style.left = '62.5%'; style.top = '5rem'; style.opacity = 1;
    } else if (targetNode === 4) {
      style.left = '87.5%'; style.top = '5rem'; style.opacity = 1;
    } else if (targetNode === 5) {
      style.left = '110%'; style.top = '10rem'; style.opacity = 0;
    }

    return { base, style };
  };

  const cursor = getCursorStyle();
  
  const getActiveMobileStep = () => {
    if (targetNode >= 4 || step >= 4) return 4;
    if (targetNode >= 3 || step >= 3) return 3;
    if (targetNode >= 2 || step >= 2) return 2;
    return 1;
  };
  const activeMobileStep = getActiveMobileStep();

  return (
    <section id="workflow" className="scroll-mt-16 md:scroll-mt-20 py-12 md:py-24 bg-white overflow-hidden relative">
      <style dangerouslySetInnerHTML={{ __html: `
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />

      <div className="container mx-auto px-4 md:px-6 relative z-10">

        {/* ========================================================= */}
        {/* VISTA MÓVIL: CARROUSEL / TARJETAS PASO A PASO (< md)     */}
        {/* ========================================================= */}
        <div className="block md:hidden w-full max-w-md mx-auto bg-stone-50 rounded-3xl shadow-xl border border-stone-200 p-5 sm:p-6 relative overflow-hidden">
          
          {/* Header */}
          <div className="text-center mb-6">
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-stone-900 mb-1">
              Un Flujo limpio
            </h2>
            <p className="text-xs text-stone-500 font-medium">
              Flujo automatizado en tiempo real
            </p>
          </div>

          {/* Stepper Tabs */}
          <div className="flex items-center justify-between gap-1 mb-6 bg-white p-1.5 rounded-2xl border border-stone-200 shadow-sm relative">
            {/* Progress line indicator */}
            <div className="absolute bottom-0 left-2 right-2 h-1 bg-stone-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary-500 transition-all duration-500"
                style={{ width: `${((activeMobileStep - 1) / 3) * 100}%` }}
              />
            </div>

            {[
              { id: 1, label: 'Reserva', icon: UserPlus },
              { id: 2, label: 'Estancia', icon: BedDouble },
              { id: 3, label: 'Check-out', icon: Database },
              { id: 4, label: 'Limpieza', icon: Sparkles }
            ].map((node) => {
              const isActive = activeMobileStep === node.id;
              const isPast = activeMobileStep > node.id;

              return (
                <div
                  key={node.id}
                  className={`flex-1 flex flex-col items-center py-2 px-1 rounded-xl transition-all duration-300 relative z-10 ${
                    isActive 
                      ? 'bg-primary-600 text-white shadow-md scale-105' 
                      : isPast
                        ? 'text-primary-700 bg-primary-50'
                        : 'text-stone-400'
                  }`}
                >
                  <node.icon className="w-5 h-5 mb-1" />
                  <span className="text-[10px] font-bold tracking-tight leading-none">
                    {node.label}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Active Card Stage */}
          <div className="relative min-h-[350px] flex flex-col justify-center">
            
            {/* Step 1: Reserva */}
            <div className={`transition-all duration-500 transform ${
              activeMobileStep === 1 
                ? 'opacity-100 scale-100 translate-x-0 relative z-10' 
                : 'opacity-0 scale-95 pointer-events-none absolute inset-0'
            }`}>
              <div className="flex flex-col items-center w-full">
                <div className="bg-blue-50 text-blue-700 text-[11px] font-bold px-3 py-1 rounded-full mb-3 border border-blue-100 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-blue-500 animate-ping" />
                  Paso 1 · Reserva y Calendario
                </div>

                {/* Simulated Calendar UI */}
                <div className={`relative z-20 bg-white border border-stone-200 rounded-xl p-3 w-full shadow-md transition-all duration-700 transform origin-top mb-3 ${
                  step >= 0.5 ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-90 -translate-y-4'
                }`}>
                  <div className="text-[10px] font-bold text-stone-500 mb-2 uppercase tracking-wider flex items-center justify-between">
                     <span>Noviembre</span>
                     <Calendar className="w-3.5 h-3.5 text-stone-400" />
                  </div>
                  <div className="flex gap-1 mb-1">
                     <div className="w-1/4 text-center text-[9px] text-stone-400 font-semibold">14</div>
                     <div className="w-1/4 text-center text-[9px] text-stone-400 font-semibold">15</div>
                     <div className="w-1/4 text-center text-[9px] text-stone-400 font-semibold">16</div>
                     <div className="w-1/4 text-center text-[9px] text-stone-400 font-semibold">17</div>
                  </div>
                  <div className="flex gap-1 relative h-7 bg-stone-50 rounded p-0.5 border border-stone-100">
                     <div className="w-1/4 border-r border-stone-200/50"></div>
                     <div className="w-1/4 border-r border-stone-200/50"></div>
                     <div className="w-1/4 border-r border-stone-200/50"></div>
                     <div className="w-1/4"></div>
                     {/* Drag Bar */}
                     <div className="absolute top-0.5 bottom-0.5 left-[calc(25%+2px)] bg-blue-500 rounded text-[10px] font-bold text-white flex items-center px-2 overflow-hidden whitespace-nowrap transition-all duration-1000 ease-out shadow-sm"
                          style={{ width: isDragging || step >= 1 ? 'calc(75% - 4px)' : '0%', opacity: isDragging || step >= 1 ? 1 : 0 }}>
                          Carlos M.
                     </div>
                  </div>
                </div>

                {/* Connecting Line */}
                <div className={`w-0.5 bg-blue-300 transition-all duration-500 origin-top mb-3 ${
                  step >= 1 ? 'h-4 opacity-100' : 'h-0 opacity-0'
                }`} />

                {/* Guest Card */}
                <div className={`relative z-10 bg-white border border-blue-100 rounded-2xl p-4 w-full shadow-md transition-all duration-700 transform ${
                  step >= 1 ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-2'
                }`}>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="bg-blue-100 p-2.5 rounded-2xl text-blue-700 shrink-0">
                      <User className="w-5 h-5" />
                    </div>
                    <div>
                      <h5 className="font-bold text-blue-900 text-sm leading-tight">Carlos Mendoza</h5>
                      <p className="text-blue-600 text-xs font-medium">Reserva #1042</p>
                    </div>
                  </div>
                  <div className="space-y-1 text-xs text-blue-800 bg-blue-50 p-2.5 rounded-xl border border-blue-100/50">
                    <p className="flex justify-between"><span>Noches:</span> <strong>3</strong></p>
                    <p className="flex justify-between"><span>Huéspedes:</span> <strong>2</strong></p>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 2: Estancia */}
            <div className={`transition-all duration-500 transform ${
              activeMobileStep === 2 
                ? 'opacity-100 scale-100 translate-x-0 relative z-10' 
                : 'opacity-0 scale-95 pointer-events-none absolute inset-0'
            }`}>
              <div className="flex flex-col items-center w-full">
                <div className="bg-emerald-50 text-emerald-700 text-[11px] font-bold px-3 py-1 rounded-full mb-3 border border-emerald-100 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  Paso 2 · Estancia Activa
                </div>

                <div className="bg-white border border-emerald-100 rounded-2xl p-4 w-full shadow-md overflow-hidden relative mb-3">
                  <div className="absolute right-3 top-3 bg-emerald-500 text-white text-[9px] uppercase font-bold px-3 py-1 rounded-full shadow-sm">
                    Ocupada
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="bg-emerald-100 p-2.5 rounded-2xl text-emerald-700 shrink-0">
                      <BedDouble className="w-5 h-5" />
                    </div>
                    <div>
                      <h5 className="font-bold text-emerald-900 text-sm leading-tight">Hab. 101</h5>
                      <p className="text-emerald-600 text-xs">Suite Matrimonial</p>
                    </div>
                  </div>
                </div>

                <div className="w-0.5 h-3 bg-emerald-200 mb-2" />

                <div className="w-full bg-emerald-50 text-emerald-700 px-3.5 py-2.5 rounded-xl text-xs font-bold border border-emerald-100 flex items-center gap-2 shadow-sm mb-2">
                  <Coffee className="w-4 h-4 text-emerald-600"/> Desayuno a la cama incluido
                </div>

                <div className="w-0.5 h-3 bg-emerald-200 mb-2" />

                <div className="w-full bg-emerald-50 text-emerald-700 px-3.5 py-2.5 rounded-xl text-xs font-bold border border-emerald-100 flex items-center gap-2 shadow-sm">
                  <Wifi className="w-4 h-4 text-emerald-600"/> WiFi Premium de alta velocidad
                </div>
              </div>
            </div>

            {/* Step 3: Check-out */}
            <div className={`transition-all duration-500 transform ${
              activeMobileStep === 3 
                ? 'opacity-100 scale-100 translate-x-0 relative z-10' 
                : 'opacity-0 scale-95 pointer-events-none absolute inset-0'
            }`}>
              <div className="flex flex-col items-center w-full">
                <div className="bg-amber-50 text-amber-700 text-[11px] font-bold px-3 py-1 rounded-full mb-3 border border-amber-100 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
                  Paso 3 · Check-out y Registro
                </div>

                <div className="bg-white border border-stone-200 rounded-2xl p-4 w-full shadow-sm text-center mb-3">
                  <Database className="w-6 h-6 text-stone-400 mx-auto mb-1" />
                  <p className="text-[10px] text-stone-500 font-bold uppercase tracking-wider">Pasajero guardado en historial</p>
                </div>

                <div className="w-0.5 h-4 bg-amber-300 mb-3" />

                <div className="bg-white border border-amber-200 rounded-2xl p-4 w-full shadow-md overflow-hidden relative">
                  <div className="absolute right-3 top-3 bg-amber-500 text-white text-[9px] uppercase font-bold px-3 py-1 rounded-full shadow-sm">
                    Falta Mantención
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="bg-amber-100 p-2.5 rounded-2xl text-amber-700 shrink-0">
                      <Brush className="w-5 h-5 animate-pulse" />
                    </div>
                    <div>
                      <h5 className="font-bold text-amber-900 text-sm leading-tight">Hab. 101</h5>
                      <p className="text-amber-700 text-xs font-bold">Requiere Aseo Acelerado</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 4: Limpieza */}
            <div className={`transition-all duration-500 transform ${
              activeMobileStep === 4 
                ? 'opacity-100 scale-100 translate-x-0 relative z-10' 
                : 'opacity-0 scale-95 pointer-events-none absolute inset-0'
            }`}>
              <div className="flex flex-col items-center w-full">
                <div className="bg-emerald-50 text-emerald-700 text-[11px] font-bold px-3 py-1 rounded-full mb-3 border border-emerald-100 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  Paso 4 · Limpieza Completada
                </div>

                <div className="bg-emerald-500 text-white border border-emerald-400 rounded-2xl p-5 w-full shadow-lg overflow-hidden relative mb-3">
                  <div className="flex justify-center mb-2 relative">
                     <div className="absolute inset-0 bg-emerald-400 blur-lg opacity-60 animate-pulse" />
                     <Sparkles className="w-8 h-8 text-white relative z-10" />
                  </div>
                  <h5 className="font-bold text-center text-base mb-1">¡Todo Listo!</h5>
                  <p className="text-emerald-100 text-xs text-center mb-3">Habitación impecable y sanitizada</p>
                  
                  <div className="flex justify-center">
                    <div className="bg-white text-emerald-700 px-3 py-1 rounded-full flex items-center gap-1.5 text-xs font-bold shadow-sm">
                      <CheckCircle2 className="w-3.5 h-3.5" /> DISPONIBLE
                    </div>
                  </div>
                </div>

                <div className="w-0.5 h-3 bg-emerald-300 mb-2" />

                <div className="bg-white border-l-4 border-emerald-500 rounded-xl p-3.5 w-full shadow-md">
                  <div className="flex gap-3 items-center">
                    <Bell className="w-5 h-5 text-emerald-500 shrink-0 animate-[bounce_2s_infinite]" />
                    <div>
                      <h6 className="font-bold text-stone-900 text-xs uppercase">Notificación Enviada</h6>
                      <p className="text-stone-600 text-xs mt-0.5">La hab. 101 está lista para recibir nuevos huéspedes.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* ========================================================= */}
        {/* VISTA ESCRITORIO: LÍNEA DE TIEMPO ANIMADA (>= md)         */}
        {/* ========================================================= */}
        <div className="hidden md:block w-full overflow-x-auto scrollbar-hide pb-8">
          
          <div className="w-[1000px] md:w-full max-w-6xl mx-auto bg-stone-50 rounded-3xl shadow-xl border border-stone-200 p-8 md:p-12 relative overflow-hidden">

            {/* Title inside the container */}
            <div className="text-center mb-10 md:mb-14">
              <h2 className="font-heading text-3xl md:text-5xl font-bold text-stone-900 mb-4">
                Un Flujo limpio
              </h2>
            </div>
            
            {/* Animated Cursor */}
            <div className={cursor.base} style={cursor.style}>
              <MousePointer2 className="w-8 h-8 fill-white stroke-[1.5]" />
            </div>

            {/* Timeline Nodes */}
            <div className="flex relative w-full mb-12">
              <div className="absolute top-8 left-[12.5%] right-[12.5%] h-1.5 bg-stone-200 -translate-y-1/2 rounded-full" />
              
              <div className="absolute top-8 left-[12.5%] h-1.5 bg-primary-500 -translate-y-1/2 rounded-full transition-all duration-[2000ms] ease-out" 
                   style={{ width: step === 0 || step === 0.5 ? '0%' : step === 1 ? '0%' : step === 2 ? '25%' : step === 3 ? '50%' : '75%' }} />
                   
              {[
                { id: 1, label: 'Reserva', icon: UserPlus },
                { id: 2, label: 'Estancia', icon: BedDouble },
                { id: 3, label: 'Check-out', icon: Database },
                { id: 4, label: 'Limpieza', icon: Sparkles }
              ].map((node) => {
                const isTarget = targetNode >= node.id || (node.id === 1 && step >= 0.5);
                const isActive = step >= node.id || (node.id === 1 && step >= 0.5);
                
                return (
                  <div key={node.id} className="w-1/4 flex flex-col items-center relative z-10">
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-3 shadow-md transition-all duration-500
                      ${isActive ? 'bg-primary-600 text-white scale-110' : 
                        isTarget ? 'bg-white text-stone-600 border border-stone-200 scale-100' : 
                        'bg-stone-100 text-transparent border border-transparent scale-50 opacity-0'}
                    `}>
                      <node.icon className="w-8 h-8" />
                    </div>
                    <h4 className={`font-bold transition-all duration-500 
                      ${isActive ? 'text-stone-900' : 
                        isTarget ? 'text-stone-500' : 
                        'text-transparent opacity-0 translate-y-2'}
                    `}>
                      {node.label}
                    </h4>
                  </div>
                );
              })}
            </div>

            {/* Dynamic Content Grid */}
            <div className="grid grid-cols-4 gap-6 relative min-h-[400px]">
              
              {/* Columna 1: Guest & Calendar Simulation */}
              <div className="flex flex-col items-center w-full relative">
                
                {/* Simulated Calendar UI */}
                <div className={`relative z-20 bg-white border border-stone-200 rounded-xl p-3 w-full shadow-md transition-all duration-700 transform origin-top
                  ${step >= 0.5 ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-90 -translate-y-4 absolute pointer-events-none'}
                `}>
                  <div className="text-[10px] font-bold text-stone-500 mb-2 uppercase tracking-wider flex items-center justify-between">
                     <span>Noviembre</span>
                     <Calendar className="w-3 h-3" />
                  </div>
                  <div className="flex gap-1 mb-1">
                     <div className="w-1/4 text-center text-[8px] text-stone-400">14</div>
                     <div className="w-1/4 text-center text-[8px] text-stone-400">15</div>
                     <div className="w-1/4 text-center text-[8px] text-stone-400">16</div>
                     <div className="w-1/4 text-center text-[8px] text-stone-400">17</div>
                  </div>
                  <div className="flex gap-1 relative h-6 bg-stone-50 rounded p-0.5 border border-stone-100">
                     <div className="w-1/4 border-r border-stone-200/50"></div>
                     <div className="w-1/4 border-r border-stone-200/50"></div>
                     <div className="w-1/4 border-r border-stone-200/50"></div>
                     <div className="w-1/4"></div>
                     {/* Drag Bar */}
                     <div className={`absolute top-0.5 bottom-0.5 left-[calc(25%+2px)] bg-blue-500 rounded text-[9px] font-bold text-white flex items-center px-1.5 overflow-hidden whitespace-nowrap transition-all duration-1000 ease-out`}
                          style={{ width: isDragging || step >= 1 ? 'calc(75% - 4px)' : '0%', opacity: isDragging || step >= 1 ? 1 : 0 }}>
                          Carlos M.
                     </div>
                  </div>
                </div>

                {/* Connecting Line */}
                <div className={`w-0.5 bg-stone-300 transition-all duration-700 ease-out origin-top
                  ${step >= 1 ? 'h-6 opacity-100 delay-0' : 'h-0 opacity-0'}
                `} />

                {/* Guest Card */}
                <div className={`relative z-10 bg-white border border-blue-100 rounded-2xl p-5 w-full shadow-lg transition-all duration-[800ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] transform origin-top
                  ${step >= 1 ? 'opacity-100 scale-100 delay-300' : 'opacity-0 scale-50 absolute pointer-events-none'}
                `}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-blue-100 p-2.5 rounded-2xl text-blue-700 shrink-0">
                      <User className="w-5 h-5" />
                    </div>
                    <div>
                      <h5 className="font-bold text-blue-900 text-sm leading-tight">Carlos Mendoza</h5>
                      <p className="text-blue-600 text-xs font-medium">Reserva #1042</p>
                    </div>
                  </div>
                  <div className="space-y-1.5 text-xs text-blue-800 bg-blue-50 p-3 rounded-xl border border-blue-100/50">
                    <p className="flex justify-between"><span>Noches:</span> <strong>3</strong></p>
                    <p className="flex justify-between"><span>Huéspedes:</span> <strong>2</strong></p>
                  </div>
                </div>
              </div>

              {/* Columna 2: Occupied Room & Amenities */}
              <div className="flex flex-col items-center w-full relative">
                
                {/* Occupied Room */}
                <div className={`relative z-30 bg-white border border-emerald-100 rounded-2xl p-5 w-full shadow-lg overflow-hidden transition-all duration-700 transform origin-top
                  ${step >= 2 ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-90 -translate-y-8 absolute pointer-events-none'}
                `}>
                  <div className="absolute -right-6 -top-2 bg-emerald-500 text-white text-[10px] uppercase font-bold px-8 py-1.5 rounded-full rotate-12 shadow-sm">
                    Ocupada
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="bg-emerald-100 p-2.5 rounded-2xl text-emerald-700 shrink-0">
                      <BedDouble className="w-5 h-5" />
                    </div>
                    <div>
                      <h5 className="font-bold text-emerald-900 text-sm leading-tight">Hab. 101</h5>
                      <p className="text-emerald-600 text-[11px]">Suite Matrimonial</p>
                    </div>
                  </div>
                </div>

                {/* Connecting Line 1 */}
                <div className={`w-0.5 bg-emerald-200 transition-all duration-700 ease-out origin-top
                  ${step >= 2 ? 'h-4 opacity-100 delay-[500ms]' : 'h-0 opacity-0'}
                `} />

                {/* Amenity 1 */}
                <div className={`relative z-20 w-full bg-emerald-50 text-emerald-700 px-3 py-2.5 rounded-xl text-[11px] font-bold border border-emerald-100 flex items-center gap-2 shadow-sm transition-all duration-[800ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] transform origin-top
                  ${step >= 2 ? 'opacity-100 scale-100 delay-[800ms]' : 'opacity-0 scale-50 absolute pointer-events-none'}
                `}>
                  <Coffee className="w-3.5 h-3.5"/> Desayuno a la cama
                </div>

                {/* Connecting Line 2 */}
                <div className={`w-0.5 bg-emerald-200 transition-all duration-700 ease-out origin-top
                  ${step >= 2 ? 'h-4 opacity-100 delay-[1200ms]' : 'h-0 opacity-0'}
                `} />

                {/* Amenity 2 */}
                <div className={`relative z-10 w-full bg-emerald-50 text-emerald-700 px-3 py-2.5 rounded-xl text-[11px] font-bold border border-emerald-100 flex items-center gap-2 shadow-sm transition-all duration-[800ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] transform origin-top
                  ${step >= 2 ? 'opacity-100 scale-100 delay-[1500ms]' : 'opacity-0 scale-50 absolute pointer-events-none'}
                `}>
                  <Wifi className="w-3.5 h-3.5"/> WiFi Premium
                </div>

              </div>

              {/* Columna 3: Check-out DB & Dirty Room */}
              <div className="flex flex-col items-center w-full relative">
                
                {/* DB Node */}
                <div className={`relative z-20 bg-white border border-stone-200 rounded-2xl p-4 w-full shadow-sm text-center transition-all duration-700 transform origin-top
                  ${step >= 3 ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-90 -translate-y-8 absolute pointer-events-none'}
                `}>
                  <Database className="w-6 h-6 text-stone-400 mx-auto mb-2" />
                  <p className="text-[10px] text-stone-500 font-bold uppercase tracking-wider">Pasajero guardado</p>
                </div>

                {/* Connecting Line */}
                <div className={`w-0.5 bg-stone-300 transition-all duration-700 ease-out origin-top
                  ${step >= 3 ? 'h-6 opacity-100 delay-[500ms]' : 'h-0 opacity-0'}
                `} />

                {/* Dirty Room */}
                <div className={`relative z-10 bg-white border border-amber-200 rounded-2xl p-5 w-full shadow-lg overflow-hidden transition-all duration-[800ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] transform origin-top
                  ${step >= 3 ? 'opacity-100 scale-100 delay-[800ms]' : 'opacity-0 scale-50 absolute pointer-events-none'}
                `}>
                  <div className="absolute -right-8 -top-2 bg-amber-500 text-white text-[9px] uppercase font-bold px-8 py-1.5 rounded-full rotate-12 shadow-sm">
                    Falta Mantención
                  </div>
                  <div className="flex items-center gap-3 mb-4 mt-2">
                    <div className="bg-amber-100 p-2.5 rounded-2xl text-amber-700 shrink-0">
                      <Brush className="w-5 h-5 animate-pulse" />
                    </div>
                    <div>
                      <h5 className="font-bold text-amber-900 text-sm leading-tight">Hab. 101</h5>
                      <p className="text-amber-700 text-xs font-bold">Requiere Aseo</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Columna 4: Clean Room & Notification */}
              <div className="flex flex-col items-center w-full relative">
                
                {/* Clean Room */}
                <div className={`relative z-20 bg-emerald-500 text-white border border-emerald-400 rounded-3xl p-6 w-full shadow-xl overflow-hidden transition-all duration-700 transform origin-top
                  ${step >= 4 ? 'opacity-100 scale-100 translate-y-0 delay-200' : 'opacity-0 scale-90 -translate-y-8 absolute pointer-events-none'}
                `}>
                  <div className="flex justify-center mb-4 relative">
                     <div className="absolute inset-0 bg-emerald-400 blur-xl opacity-50 animate-pulse" />
                     <Sparkles className="w-10 h-10 text-white relative z-10" />
                  </div>
                  <h5 className="font-bold text-center text-lg mb-1">¡Todo Listo!</h5>
                  <p className="text-emerald-100 text-[11px] text-center mb-4 leading-snug">Habitación impecable</p>
                  
                  <div className="flex justify-center">
                    <div className="bg-white text-emerald-700 px-3 py-1.5 rounded-full flex items-center gap-1.5 text-[11px] font-bold shadow-sm">
                      <CheckCircle2 className="w-3.5 h-3.5" /> DISPONIBLE
                    </div>
                  </div>
                </div>

                {/* Connecting Line */}
                <div className={`w-0.5 bg-emerald-300 transition-all duration-700 ease-out origin-top
                  ${step >= 4 ? 'h-6 opacity-100 delay-[1200ms]' : 'h-0 opacity-0'}
                `} />

                {/* Notification */}
                <div className={`relative z-10 bg-white border-l-4 border-emerald-500 rounded-xl p-4 w-full shadow-xl transition-all duration-[800ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] transform origin-top
                  ${step >= 4 ? 'opacity-100 scale-100 delay-[1500ms]' : 'opacity-0 scale-50 absolute pointer-events-none'}
                `}>
                  <div className="flex gap-3">
                    <Bell className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5 animate-[bounce_2s_infinite]" />
                    <div>
                      <h6 className="font-bold text-stone-900 text-[11px] uppercase">Notificación</h6>
                      <p className="text-stone-600 text-[11px] mt-0.5 leading-snug">La hab. 101 está lista.</p>
                    </div>
                  </div>
                </div>

              </div>

            </div>
          </div>
        </div>

        {/* Arrow to next section */}
        <div className="flex justify-center mt-8">
          <a
            href="#features"
            className="text-stone-300 hover:text-primary-500 transition-colors block p-2"
            aria-label="Ir a la siguiente sección"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="animate-bounce hover:scale-110 transition-transform">
              <path d="m6 9 6 6 6-6"/>
            </svg>
          </a>
        </div>

      </div>
    </section>
  );
}
