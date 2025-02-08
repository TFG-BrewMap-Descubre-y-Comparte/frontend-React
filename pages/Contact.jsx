import { useState } from 'react';


const About = () => {
  // Estado para manejar el menú móvil
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="font-sans bg-gray-100">
      {/* Header */}
      <header className="fixed top-0 left-0 w-full bg-white shadow-md z-10">
        <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-xl font-bold">RutasApp</div>
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="focus:outline-none"
            >
              <svg className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
          <ul className={`md:flex space-x-6 ${isMobileMenuOpen ? 'block' : 'hidden'}`} id="menu">
            <li><a href="/" className="text-gray-700 hover:text-blue-500">Inicio</a></li>
            <li><a href="#" className="text-gray-700 hover:text-blue-500">Empezar</a></li>
            <li><a href="/about" className="text-gray-700 hover:text-blue-500">Acerca</a></li>
            <li><a href="/contact" className="text-gray-700 hover:text-blue-500">Contacto</a></li>
          </ul>
        </nav>
      </header>

      {/* Menu móvil */}
      {isMobileMenuOpen && (
        <div id="mobile-menu" className="fixed top-0 right-0 w-1/2 h-1/2 bg-white z-20 flex flex-col">
          <div className="container mx-auto px-4 py-8 flex-1 flex flex-col justify-center">
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="focus:outline-none mb-4 self-end"
            >
              <svg className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <ul className="space-y-4">
              <li><a href="/" className="text-2xl font-bold text-gray-700 hover:text-blue-500">Inicio</a></li>
              <li><a href="#" className="text-2xl font-bold text-gray-700 hover:text-blue-500">Empezar</a></li>
              <li><a href="/about" className="text-2xl font-bold text-gray-700 hover:text-blue-500">Acerca</a></li>
              <li><a href="/contact" className="text-2xl font-bold text-gray-700 hover:text-blue-500">Contacto</a></li>
            </ul>
          </div>
        </div>
      )}

      <br /><br />
      
      {/* Sección de contenido */}
      <section className="bg-gray-100 py-12">
        <div className="container mx-auto px-6">
          <h2 className="text-5xl font-bold text-center mb-8">Sobre Nosotros</h2>

          {/* Tarjeta 1 */}
          <div className="flex bg-white shadow-lg rounded-lg overflow-hidden mb-6 h-48">
            <div className="w-1/4 h-full">
              <img className="w-full h-full object-cover" src="./img/claseInformatica.jpeg" alt="Equipo de trabajo" />
            </div>
            <div className="p-6 flex-1">
              <h3 className="text-2xl font-semibold mb-2">Quiénes Somos</h3>
              <p className="text-gray-600">Somos un equipo apasionado y comprometido en ofrecer soluciones innovadoras que generan valor y satisfacción a nuestros clientes.</p>
            </div>
          </div>

          {/* Tarjeta 2 */}
          <div className="flex bg-white shadow-lg rounded-lg overflow-hidden mb-6 h-48">
            <div className="w-1/4 h-full">
              <img className="w-full h-full object-cover" src="./img/movilGPS.jpeg" alt="Misión" />
            </div>
            <div className="p-6 flex-1">
              <h3 className="text-2xl font-semibold mb-2">Nuestra Misión</h3>
              <p className="text-gray-600">Transformar ideas en realidades mediante servicios de alta calidad que impulsen el crecimiento de nuestros clientes.</p>
            </div>
          </div>

          {/* Tarjeta 3 */}
          <div className="flex bg-white shadow-lg rounded-lg overflow-hidden h-48">
            <div className="w-1/4 h-full">
              <img className="w-full h-full object-cover" src="./img/imagenTuristas.jpeg" alt="Valores" />
            </div>
            <div className="p-6 flex-1">
              <h3 className="text-2xl font-semibold mb-2">Nuestros Valores</h3>
              <p className="text-gray-600">Nos guiamos por la integridad, el respeto y la innovación, trabajando siempre en equipo para alcanzar el éxito.</p>
            </div>
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-10 text-center">
        <div className="mb-6">
          <h3 className="text-lg font-semibold">Contáctanos</h3>
          <p>Email: contacto@rutasapp.com</p>
          <p>Teléfono: +34 123 456 789</p>
        </div>
        <div className="mb-6">
          <h3 className="text-lg font-semibold">Síguenos</h3>
          <a href="#" className="text-white mx-2 hover:text-blue-400">Facebook</a>
          <a href="#" className="text-white mx-2 hover:text-blue-400">Twitter</a>
          <a href="#" className="text-white mx-2 hover:text-blue-400">Instagram</a>
        </div>
        <div>
          <p>&copy; 2025 Tu Empresa. Todos los derechos reservados.</p>
          <nav className="mt-2">
            <a href="/" className="text-white mx-2 hover:text-blue-400">Inicio</a>
            <a href="/about" className="text-white mx-2 hover:text-blue-400">Acerca de</a>
            <a href="/contact" className="text-white mx-2 hover:text-blue-400">Contacto</a>
          </nav>
        </div>
      </footer>
    </div>
  );
};

export default About;
