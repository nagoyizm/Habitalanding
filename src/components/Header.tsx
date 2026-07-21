import Link from "next/link";
import Image from "next/image";

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-stone-200">
      <div className="container mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 hover:opacity-90 transition-opacity">
          <div className="flex items-center justify-center w-9 h-9 rounded-full overflow-hidden shrink-0">
            <Image src="/logo-habita-round.png" alt="agendio Logo" width={36} height={36} />
          </div>
          <span style={{ fontFamily: '"mooxy", sans-serif', fontSize: '24px', fontWeight: 800, color: '#252A26', letterSpacing: '0.15em', marginTop: '2px' }}>
            agendio
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <Link href="#features" className="text-sm font-medium text-stone-600 hover:text-primary-600 transition-colors">
            Características
          </Link>
          <Link href="#pricing" className="text-sm font-medium text-stone-600 hover:text-primary-600 transition-colors">
            Planes
          </Link>
        </nav>

        <div className="flex items-center">
          <Link href="http://app.agendio.cl/login" className="bg-primary-600 hover:bg-primary-700 text-white text-sm font-bold px-6 py-2.5 rounded-xl transition-all active:scale-95 shadow-sm">
            Iniciar Sesión
          </Link>
        </div>
      </div>
    </header>
  );
}
