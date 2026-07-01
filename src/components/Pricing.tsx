import { Check } from "lucide-react";
import { AnimatedSection } from "./ui/AnimatedSection";

export function Pricing() {
  const plans = [
    {
      name: "Básico",
      description: "Ideal para recintos que recién comienzan.",
      price: "$29",
      period: "/mes",
      features: [
        "Calendario",
        "Base de datos de clientes",
        "Hasta 12 habitaciones",
        "Reportes básicos",
        "Soporte por email"
      ],
      highlighted: false,
      cta: "Comenzar gratis"
    },
    {
      name: "Pro",
      description: "Para recintos que necesitan control total.",
      price: "$79",
      period: "/mes",
      features: [
        "Todo lo del plan Básico",
        "Reportes avanzados",
        "Automatización",
        "Manejo de limpieza",
        "Hasta 18 habitaciones"
      ],
      highlighted: true,
      cta: "Probar plan Pro"
    },
    {
      name: "Enterprise",
      description: "La solución para operaciones de alto volumen.",
      price: "$199",
      period: "/mes",
      features: [
        "Todo lo del plan Pro",
        "Conexión Booking/Airbnb",
        "Bot de WhatsApp",
        "Más de 20 habitaciones",
        "Soporte prioritario"
      ],
      highlighted: false,
      cta: "Contactar a ventas"
    },
    {
      name: "Página Web",
      description: "Diseño de sitio web a medida para tu alojamiento.",
      price: "Precio ajustado a tus necesidades",
      period: "",
      features: [
        "Diseño responsivo",
        "Motor de reservas",
        "Optimización SEO",
        "Hosting y dominio",
        "Mantenimiento"
      ],
      highlighted: false,
      cta: "Cotizar ahora"
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
      
      <div className="mb-6 min-h-[3rem] flex items-baseline gap-1">
        <span className="font-heading font-bold text-stone-900 text-4xl">
          {plan.price}
        </span>
        {plan.period && (
          <span className="text-stone-500 text-xs">
            {plan.period}
          </span>
        )}
      </div>
      
      <ul className="flex-1 space-y-3 mb-6">
        {plan.features.map((feature: string) => (
          <li key={feature} className="flex items-start gap-2">
            <Check className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${plan.highlighted ? 'text-primary-600' : 'text-primary-500'}`} />
            <span className="text-stone-700 leading-snug text-sm">
              {feature}
            </span>
          </li>
        ))}
      </ul>
      
      <button 
        className={`w-full rounded-xl font-bold transition-all active:scale-95 py-3 text-sm ${
          plan.highlighted 
            ? 'bg-primary-600 text-white hover:bg-primary-700' 
            : 'bg-primary-50 text-primary-700 hover:bg-primary-100'
        }`}
      >
        {plan.cta}
      </button>
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
        <div className="flex items-baseline gap-1 mt-1">
          <span className="font-bold text-stone-700 text-sm md:text-base whitespace-normal">
            {plan.price}
          </span>
          {plan.period && (
            <span className="text-stone-500 text-xs">
              {plan.period}
            </span>
          )}
        </div>
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

      {/* Botón CTA */}
      <div className="w-full md:w-auto shrink-0 mt-2 md:mt-0">
        <button className="w-full md:w-48 rounded-xl font-bold transition-all active:scale-95 py-3 px-6 text-sm bg-primary-50 text-primary-700 hover:bg-primary-100">
          {plan.cta}
        </button>
      </div>

    </div>
  );
}
