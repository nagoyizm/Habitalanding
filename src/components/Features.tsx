import { Calendar, Users, BarChart3, MessageSquare, Sparkles, Building } from "lucide-react";
import { AnimatedSection } from "./ui/AnimatedSection";

export function Features() {
  const features = [
    {
      title: "Calendario Intuitivo",
      description: "Visualiza la disponibilidad de tus habitaciones al instante. Crea, modifica y gestiona reservas con una interfaz limpia y rápida que reduce el tiempo de operación.",
      icon: <Calendar className="w-6 h-6 text-primary-300" />,
      imageAlt: "Vista del calendario"
    },
    {
      title: "Bases de Datos",
      description: "Mantén un registro centralizado de todos tus huéspedes. Conoce sus preferencias, historial de visitas y mejora su experiencia con atención personalizada.",
      icon: <Users className="w-6 h-6 text-primary-300" />,
      imageAlt: "Gestión de clientes"
    },
    {
      title: "Reportes y Analíticas",
      description: "Toma decisiones basadas en datos. Accede a métricas clave sobre ocupación, ingresos y rendimiento general de tu recinto en tiempo real.",
      icon: <BarChart3 className="w-6 h-6 text-primary-300" />,
      imageAlt: "Panel de analíticas"
    },
    {
      title: "Gestión de Roles",
      description: "Crea distintos tipos de usuarios para tu recinto y asigna permisos según sus funciones. Administra administradores, recepcionistas y personal operativo con acceso a las herramientas que realmente necesitan.",
      icon: <Sparkles className="w-6 h-6 text-primary-300" />,
      imageAlt: "Gestión de roles y usuarios"
    },  
    {
      title: "Automatización y Mensajería",
      description: "Conecta y notifica a tus huéspedes vía WhatsApp. Configura bots automatizados para enviar confirmaciones, recordatorios y responder consultas frecuentes.",
      icon: <MessageSquare className="w-6 h-6 text-primary-300" />,
      imageAlt: "Automatización de mensajes"
    },
    {
      title: "Multirecinto y Conexiones",
      description: "Sincroniza tus calendarios con Booking, Airbnb y otras plataformas. Gestiona múltiples propiedades desde una única cuenta maestra.",
      icon: <Building className="w-6 h-6 text-primary-300" />,
      imageAlt: "Múltiples recintos y canales"
    }
  ];

  return (
    <section id="features" className="scroll-mt-16 md:scroll-mt-20 min-h-[calc(100vh-5rem)] flex flex-col justify-center py-10 relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-primary-100">
      {/* Elementos decorativos para resaltar el efecto Aero de forma suave */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute -top-[10%] -left-[5%] w-[40%] h-[40%] rounded-full bg-primary-200/40 blur-[100px]" />
        <div className="absolute top-[30%] -right-[10%] w-[35%] h-[45%] rounded-full bg-emerald-100/40 blur-[100px]" />
        <div className="absolute -bottom-[10%] left-[20%] w-[50%] h-[30%] rounded-full bg-primary-200/40 blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10 w-full">
        <AnimatedSection className="text-center max-w-3xl mx-auto mb-10 md:mb-12">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-stone-900 mb-4 drop-shadow-sm">
            Todo lo que necesitas para operar sin fricción
          </h2>
          <p className="text-base md:text-lg text-stone-700 font-medium">
            agendio está diseñado para eliminar el caos diario de la gestión de alojamientos, uniendo todas tus herramientas en un flujo de trabajo increíblemente suave.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {features.map((feature, idx) => (
            <AnimatedSection key={feature.title} delay={idx * 100}>
              <div className="group relative p-5 md:p-6 rounded-3xl bg-white/60 backdrop-blur-xl border border-white/80 hover:bg-white/80 hover:border-white transition-all duration-300 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] h-full flex flex-col">
                <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-white/80 backdrop-blur-md shadow-sm border border-white group-hover:scale-110 transition-transform duration-300">
                  <div className="text-primary-600">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="font-heading text-lg font-bold text-stone-900 mb-2 drop-shadow-sm">
                  {feature.title}
                </h3>
                <p className="text-sm text-stone-700 leading-relaxed font-medium">
                  {feature.description}
                </p>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* Arrow to next section */}
        <div className="flex justify-center mt-10">
          <a
            href="#pricing"
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
