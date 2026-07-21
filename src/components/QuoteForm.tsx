"use client";

import { useState } from "react";
import { AnimatedSection } from "./ui/AnimatedSection";
import { Send } from "lucide-react";

export function QuoteForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Obtener valores del formulario
    const name = (document.getElementById('name') as HTMLInputElement).value;
    const email = (document.getElementById('email') as HTMLInputElement).value;
    const facility = (document.getElementById('facility') as HTMLInputElement).value;
    const message = (document.getElementById('message') as HTMLTextAreaElement).value;

    try {
      const response = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, facility, message })
      });

      if (response.ok) {
        setIsSuccess(true);
        // Limpiar el formulario
        (e.target as HTMLFormElement).reset();
        setTimeout(() => setIsSuccess(false), 5000);
      } else {
        const errorData = await response.json();
        console.error('Error al enviar la cotización:', errorData);
        alert(`No se pudo enviar: ${errorData.error || 'Problema desconocido'}`);
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
      alert('Error de conexión al enviar la solicitud.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-12 md:py-20 bg-stone-50">
      <div className="container mx-auto px-4 md:px-6">
        <AnimatedSection className="max-w-xl mx-auto bg-white rounded-3xl shadow-xl shadow-stone-200/50 p-8 md:p-10 border border-stone-100">
          <div className="text-center mb-8">
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-stone-900 mb-2">
              Solicita una cotización
            </h2>
            <p className="text-stone-600 text-sm md:text-base">
              Cuéntanos sobre tu recinto y te enviaremos una propuesta a medida.
            </p>
          </div>

          {isSuccess ? (
            <div className="bg-emerald-50 text-emerald-800 p-6 rounded-2xl text-center border border-emerald-100">
              <p className="font-bold mb-1">¡Solicitud enviada con éxito!</p>
              <p className="text-sm">Nos pondremos en contacto contigo pronto.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-stone-700 mb-1.5">
                  Nombre completo
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-colors"
                  placeholder="Ej. Juan Pérez"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-stone-700 mb-1.5">
                  Correo electrónico
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-colors"
                  placeholder="ejemplo@correo.com"
                />
              </div>

              <div>
                <label htmlFor="facility" className="block text-sm font-semibold text-stone-700 mb-1.5">
                  Nombre del recinto
                </label>
                <input
                  type="text"
                  id="facility"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-colors"
                  placeholder="Ej. Hostal El Olmo"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-stone-700 mb-1.5">
                  Mensaje o requerimientos
                </label>
                <textarea
                  id="message"
                  required
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-colors resize-none"
                  placeholder="Cuéntanos más sobre lo que necesitas..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary-600 hover:bg-primary-700 text-white font-bold py-3.5 px-6 rounded-xl transition-all active:scale-95 flex items-center justify-center gap-2 disabled:opacity-70 disabled:active:scale-100"
              >
                {isSubmitting ? (
                  <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Enviar solicitud
                  </>
                )}
              </button>
            </form>
          )}
        </AnimatedSection>
      </div>
    </section>
  );
}
