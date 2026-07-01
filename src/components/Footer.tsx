import Link from "next/link";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="bg-[#FAF7F2] pt-20 pb-10 text-stone-800">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center gap-2.5 mb-6 hover:opacity-90 transition-opacity w-fit">
              <div className="flex items-center justify-center w-9 h-9 rounded-full overflow-hidden shrink-0">
                <Image src="/logo-habita-round.png" alt="Habita Logo" width={36} height={36} />
              </div>
              <span style={{ fontFamily: '"mooxy", sans-serif', fontSize: '24px', fontWeight: 800, color: '#252A26', letterSpacing: '0.15em', marginTop: '2px' }}>
                habita
              </span>
            </Link>
            <p className="text-stone-600 max-w-sm mb-6 leading-relaxed">
              La plataforma integral para gestionar cabañas, hoteles y todo tipo de recintos vacacionales. Simplifica tu operación diaria y aumenta tus reservas.
            </p>
          </div>
          
          <div>
            <h4 className="font-heading text-stone-900 font-semibold mb-6">Plataforma</h4>
            <ul className="space-y-4">
              <li>
                <Link href="#features" className="hover:text-primary-600 transition-colors">
                  Características
                </Link>
              </li>
              <li>
                <Link href="#pricing" className="hover:text-primary-600 transition-colors">
                  Planes y Precios
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary-600 transition-colors">
                  Integraciones
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-heading text-stone-900 font-semibold mb-6">Compañía</h4>
            <ul className="space-y-4">
              <li>
                <Link href="#" className="hover:text-primary-600 transition-colors">
                  Sobre nosotros
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary-600 transition-colors">
                  Contacto
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary-600 transition-colors">
                  Privacidad
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-stone-200 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-stone-500">
            © {new Date().getFullYear()} Habita. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-6 text-sm text-stone-500">
            <Link href="#" className="hover:text-primary-600 transition-colors">
              Términos de servicio
            </Link>
            <Link href="#" className="hover:text-primary-600 transition-colors">
              Política de privacidad
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
