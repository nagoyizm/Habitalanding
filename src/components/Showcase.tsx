import Image from "next/image";
import { AnimatedSection } from "./ui/AnimatedSection";
import { InteractiveCalendar } from "./ui/InteractiveCalendar";
import { InteractiveFinances } from "./ui/InteractiveFinances";
import { InteractiveRooms } from "./ui/InteractiveRooms";

export function Showcase() {
  const sections = [
    {
      title: "Calendario Visual e Intuitivo",
      description: "Despídete de las hojas de cálculo confusas y el caos de las reservas dobles. Nuestro Calendario te permite visualizar y gestionar toda la disponibilidad de tus habitaciones con un simple vistazo. Arrastra, suelta y organiza con total libertad en una interfaz diseñada para ser rápida y sin fricción.",
      component: <InteractiveCalendar />,
      image: "/images/calendar_ui.png",
      alt: "Interfaz del calendario",
      reversed: false,
      benefits: [
        "Reasigna estadías arrastrando y soltando",
        "Bloqueo automático para evitar reservas dobles"
      ]
    },
    {
      title: "Control Financiero Total",
      description: "Toma el control de la salud financiera de tu negocio con reportes detallados en tiempo real. Visualiza ingresos, pagos pendientes y proyecciones de ocupación, todo en gráficos claros que te permiten tomar mejores decisiones para maximizar tus ganancias.",
      component: <InteractiveFinances />,
      reversed: true,
      benefits: [
        "Métricas de ocupación y RevPAR automáticas",
        "Seguimiento visual de ingresos por periodos"
      ]
    },
    {
      title: "Gestión de Limpieza",
      description: "Mantén a tu equipo de limpieza sincronizado y tus habitaciones siempre listas. Identifica rápidamente qué cabañas necesitan aseo, marca prioridades y actualiza el estado en tiempo real. Un flujo de trabajo fluido que garantiza la mejor experiencia para tus huéspedes.",
      component: <InteractiveRooms />,
      reversed: false,
      benefits: [
        "Actualización de estados en tiempo real",
        "Notificaciones instantáneas para tu equipo de aseo"
      ]
    }
  ];

  return (
    <section className="py-24 md:py-32 bg-[#FEFDF9] overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="space-y-32">
          {sections.map((section, idx) => (
            <div key={section.title} id={`showcase-${idx}`} className="scroll-mt-16 md:scroll-mt-20 flex flex-col items-center gap-12 lg:gap-16 w-full">
              <div className={`w-full flex flex-col gap-12 lg:gap-20 items-center ${section.reversed ? 'lg:flex-row-reverse' : 'lg:flex-row'}`}>
              
              {/* Text content */}
              <AnimatedSection className="flex-1 space-y-6" delay={100}>
                <h2 className="font-heading text-3xl md:text-5xl font-bold text-stone-900 leading-[1.15]">
                  {section.title}
                </h2>
                <p className="text-lg md:text-xl text-stone-600 leading-relaxed max-w-xl">
                  {section.description}
                </p>
                <ul className="space-y-4 pt-4">
                  {section.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-center gap-3 text-stone-700 font-medium">
                      <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary-100 text-primary-600 shrink-0">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                      </div>
                      {benefit}
                    </li>
                  ))}
                </ul>
              </AnimatedSection>

              {/* Image content */}
              <AnimatedSection className="flex-1 w-full relative" delay={300}>
                <div className="absolute inset-0 -translate-x-4 translate-y-4 rounded-3xl bg-primary-100/50 -z-10" />
                <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-stone-900/10 border-4 border-white bg-white aspect-[4/3] group">
                  {section.component ? (
                    <div className="absolute inset-0 bg-stone-50 overflow-hidden">
                      {section.component}
                    </div>
                  ) : (
                    <Image 
                      src={section.image} 
                      alt={section.alt}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  )}
                  <div className="absolute inset-0 ring-1 ring-inset ring-black/5 rounded-3xl pointer-events-none" />
                </div>
              </AnimatedSection>
              </div>

              {/* Flecha hacia abajo */}
              <a 
                href={idx < sections.length - 1 ? `#showcase-${idx + 1}` : `#features`}
                className="mt-4 text-stone-300 hover:text-primary-500 transition-colors block p-2"
                aria-label="Ir a la siguiente sección"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="animate-bounce hover:scale-110 transition-transform">
                  <path d="m6 9 6 6 6-6"/>
                </svg>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
