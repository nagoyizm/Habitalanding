import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle2, CalendarDays } from "lucide-react";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-24 pb-12 overflow-hidden bg-stone-950">

      {/* Background Image - Pure Cabin Interior */}
      <div className="absolute inset-0 z-0 animate-hero-bg">
        <Image
          src="/images/cabin_bg.png"
          alt="Cabaña interior"
          fill
          className="object-cover object-center opacity-80"
          quality={100}
          unoptimized
          priority
        />
      </div>

      {/* Left side blur & darken overlay */}
      <div
        className="absolute inset-y-0 left-0 w-full lg:w-[60%] z-10 bg-stone-950/70 backdrop-blur-[12px] animate-hero-bg pointer-events-none"
        style={{
          maskImage: 'linear-gradient(to right, black 60%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to right, black 60%, transparent 100%)'
        }}
      />

      <div className="container mx-auto px-4 md:px-6 relative z-30">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-8">

          {/* Text Content - Left Side */}
          <div className="w-full lg:w-[45%] flex flex-col items-start text-left">
            <p className="text-primary-300 font-medium tracking-wider uppercase text-sm mb-6 animate-hero-fg">
              Descubre la nueva forma de operar
            </p>

            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6 leading-[1.1] drop-shadow-xl animate-hero-fg" style={{ animationDelay: '0.1s' }}>
              Centraliza y maneja tu recinto <span className="text-primary-400">fácilmente</span>
            </h1>

            <p className="text-lg md:text-xl text-stone-300 mb-10 leading-relaxed font-medium drop-shadow-md animate-hero-fg" style={{ animationDelay: '0.2s' }}>
              Maneja tus reservas, huéspedes, finanzas, limpieza e inventario en un solo lugar. Todo lo que tu negocio necesita para crecer y operar sin problemas.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto animate-hero-fg" style={{ animationDelay: '0.3s' }}>
              <Link
                href="#pricing"
                className="inline-flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-500 text-white px-8 py-4 rounded-full font-bold transition-all active:scale-95 shadow-lg shadow-primary-600/30"
              >
                Ver planes
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="#features"
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/30 px-8 py-4 rounded-full font-bold transition-all active:scale-95 shadow-sm"
              >
                Explorar características
              </Link>
            </div>

            <div className="mt-16 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 text-sm text-stone-200 font-medium w-full flex-wrap animate-hero-fg" style={{ animationDelay: '0.4s' }}>
              <div className="flex items-center gap-2 bg-black/30 px-5 py-2.5 rounded-full backdrop-blur-sm border border-white/10 shadow-md">
                <CheckCircle2 className="w-4 h-4 text-primary-400" />
                <span>Configuración rápida</span>
              </div>
              <div className="flex items-center gap-2 bg-black/30 px-5 py-2.5 rounded-full backdrop-blur-sm border border-white/10 shadow-md">
                <CheckCircle2 className="w-4 h-4 text-primary-400" />
                <span>Soporte prioritario</span>
              </div>
            </div>
          </div>

          {/* Right Side - Custom CSS UI Mockup */}
          <div className="w-full lg:w-[55%] relative z-30 mt-12 lg:mt-0 animate-hero-fg lg:pl-10 group" style={{ animationDelay: '0.5s' }}>

            {/* The Floating Browser Window */}
            <div className="relative rounded-2xl overflow-hidden bg-white border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
              {/* Browser Header Bar */}
              <div className="bg-stone-100 border-b border-stone-200 px-4 py-3 flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
              </div>

              {/* Ultra-Sharp UI Image (Animated Auto-Scroll) */}
              <div className="relative aspect-[16/10] w-full bg-stone-50 overflow-hidden @container group/window">
                <img
                  src="/images/ui_dashboard_es.png"
                  alt="Interfaz de agendio"
                  className="w-full h-full object-cover animate-object-scroll"
                />

                {/* Fake Scrollbar Track */}
                <div className="absolute top-0 right-0 bottom-0 w-3 bg-stone-100/80 border-l border-stone-200 backdrop-blur-sm z-10">
                  {/* Fake Scrollbar Thumb & Mouse Container */}
                  <div className="absolute right-[2px] w-2 h-16 animate-fake-scrollbar">
                    <div className="w-full h-full bg-stone-400/80 rounded-full" />

                    {/* Animated Mouse inside the thumb container */}
                    <div className="absolute -left-3 top-4 z-50 animate-auto-mouse pointer-events-none drop-shadow-md text-stone-900 origin-top-left">
                      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="white" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m3 3 7.07 16.97 2.51-7.39 7.39-2.51L3 3z" />
                        <path d="m13 13 6 6" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Flecha para bajar a la siguiente sección */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-40 animate-hero-fg" style={{ animationDelay: '0.6s' }}>
        <a
          href="#showcase-0"
          className="text-stone-300 hover:text-white transition-colors block p-2"
          aria-label="Ir a la siguiente sección"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="animate-bounce hover:scale-110 transition-transform">
            <path d="m6 9 6 6 6-6" />
          </svg>
        </a>
      </div>
    </section>
  );
}
