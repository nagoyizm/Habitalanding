import { Check } from "lucide-react";
import { AnimatedSection } from "./ui/AnimatedSection";

export function Pricing() {
  const plans = [
    {
      name: "Básico",
      description: "Ideal para recintos que recién comienzan.",
      features: [
        "Calendario",
        "Base de datos de clientes",
        "Hasta 8 habitaciones",
        "Reportes básicos",
        "Soporte por email"
      ],
      highlighted: false
    },
    {
      name: "Pro",
      description: "Para recintos que necesitan control total.",
      features: [
        "Todo lo del plan Básico",
        "Reportes avanzados",
        "Automatización",
        "Manejo de limpieza",
        "Hasta 18 habitaciones"
      ],
      highlighted: true
    },
    {
      name: "Enterprise",
      description: "La solución para operaciones de alto volumen.",
      features: [
        "Todo lo del plan Pro",
        "Conexión Booking/Airbnb",
        "Más de 20 habitaciones",
        "Soporte prioritario"
      ],
      highlighted: false
    },
    {
      name: "Página Web",
      description: "Diseño de sitio web a medida para tu alojamiento.",
      features: [
        "Diseño responsivo",
        "Optimización SEO",
        "Hosting y dominio",
        "Mantenimiento"
      ],
      highlighted: false
    }
  ];

  return (
    <section id="pricing" className="scroll-mt-0 py-10 md:py-16 bg-[#FAF7F2]">
      <div className="container mx-auto px-4 md:px-6">
        <AnimatedSection className="text-center max-w-3xl mx-auto mb-10 md:mb-12">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-stone-900 mb-4">
            Planes diseñados para tu crecimiento
          </h2>
          <p className="text-base md:text-lg text-stone-600">
            Comienza gratis o elige el plan que mejor se adapte al tamaño de tu recinto. Sin contratos engañosos.
          </p>
        </AnimatedSection>

        {/* Fila 1: Plan Web Horizontal */}
        <AnimatedSection delay={0} className="max-w-6xl mx-auto mb-6">
          <WebPlanCard plan={plans[3]} />
        </AnimatedSection>

        {/* Fila 2: Planes Principales */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto items-stretch">
          <AnimatedSection delay={150} className="h-full">
            <PlanCard plan={plans[0]} />
          </AnimatedSection>

          <AnimatedSection delay={300} className="h-full">
            <PlanCard plan={plans[1]} />
          </AnimatedSection>

          <AnimatedSection delay={450} className="h-full">
            <PlanCard plan={plans[2]} />
          </AnimatedSection>
        </div>

      </div>
    </section>
  );
}

function PlanCard({ plan }: { plan: any }) {
  return (
    <div 
      className={`relative flex flex-col rounded-3xl h-full transition-transform duration-300 hover:shadow-lg p-6 ${
        plan.highlighted 
          ? 'bg-[#F4F9F6] text-stone-900 shadow-xl shadow-primary-900/10 border-2 border-primary-500' 
          : 'bg-white border border-stone-200'
      }`}
    >
      {plan.highlighted && (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-primary-400 to-primary-500 text-white text-[10px] font-bold uppercase tracking-wider py-1 px-3 rounded-full">
          Más popular
        </div>
      )}
      
      <div className="mb-6">
        <h3 className="font-heading font-bold mb-1 text-stone-900 text-xl">
          {plan.name}
        </h3>
        <p className="text-stone-600 leading-snug text-sm h-10">
          {plan.description}
        </p>
      </div>
      
      <ul className="flex-1 space-y-3 mb-6 mt-4">
        {plan.features.map((feature: string) => (
          <li key={feature} className="flex items-start gap-2">
            <Check className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${plan.highlighted ? 'text-primary-600' : 'text-primary-500'}`} />
            <span className="text-stone-700 leading-snug text-sm">
              {feature}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function WebPlanCard({ plan }: { plan: any }) {
  return (
    <div className="relative flex flex-col md:flex-row items-center justify-between p-4 md:p-6 rounded-3xl bg-white border border-stone-200 transition-transform duration-300 hover:shadow-lg gap-4 md:gap-8">
      
      {/* Info y Precio */}
      <div className="flex-1 min-w-0">
        <h3 className="font-heading font-bold text-xl text-stone-900 mb-1">
          {plan.name}
        </h3>
        <p className="text-stone-600 text-sm leading-snug mb-3 max-w-xs">
          {plan.description}
        </p>
      </div>
      
      {/* Características (Grid 2 columnas) */}
      <div className="flex-[1.5] w-full border-t border-b md:border-t-0 md:border-b-0 md:border-l md:border-r border-stone-100 py-4 md:py-0 md:px-6">
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
          {plan.features.map((feature: string) => (
            <li key={feature} className="flex items-start gap-2">
              <Check className="w-4 h-4 shrink-0 text-primary-500" />
              <span className="text-stone-700 text-sm leading-snug">
                {feature}
              </span>
            </li>
          ))}
        </ul>
      </div>

    </div>
  );
}
