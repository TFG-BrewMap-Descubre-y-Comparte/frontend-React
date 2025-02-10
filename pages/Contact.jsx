import  { useState } from 'react';

const Contact = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="bg-gray-100">
      {/* Header */}
      <header className="fixed top-0 left-0 w-full bg-white shadow-md z-10">
        <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-xl font-bold">RutasApp</div>
          <div className="md:hidden">
            <button onClick={() => setIsMobileMenuOpen(true)} className="focus:outline-none">
              <svg className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
          <ul className={`hidden md:flex space-x-6 ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
            <li><a href="/index.html" className="text-gray-700 hover:text-blue-500">Inicio</a></li>
            <li><a href="#" className="text-gray-700 hover:text-blue-500">Empezar</a></li>
            <li><a href="/about.html" className="text-gray-700 hover:text-blue-500">Acerca</a></li>
            <li><a href="/contact.html" className="text-gray-700 hover:text-blue-500">Contacto</a></li>
          </ul>
        </nav>
      </header>

      {/* Menu móvil */}
      {isMobileMenuOpen && (
        <div className="fixed top-0 right-0 w-1/2 h-full bg-white z-20 flex flex-col">
          <div className="container mx-auto px-4 py-8 flex-1 flex flex-col justify-center">
            <button onClick={() => setIsMobileMenuOpen(false)} className="focus:outline-none mb-4 self-end">
              <svg className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <ul className="space-y-4">
              <li><a href="/index.html" className="text-2xl font-bold text-gray-700 hover:text-blue-500">Inicio</a></li>
              <li><a href="#" className="text-2xl font-bold text-gray-700 hover:text-blue-500">Empezar</a></li>
              <li><a href="/about.html" className="text-2xl font-bold text-gray-700 hover:text-blue-500">Acerca</a></li>
              <li><a href="/contact.html" className="text-2xl font-bold text-gray-700 hover:text-blue-500">Contacto</a></li>
            </ul>
          </div>
        </div>
      )}

      <main className="max-w-2xl mx-auto p-6 mt-24">
        <h2 className="text-5xl font-bold text-center mb-10">Contacto</h2>
        <h2 className="text-xl font-semibold mb-4">Estamos aquí para ayudarte</h2>
        <p className="mb-6">Si tienes alguna pregunta, no dudes en ponerte en contacto con nosotros a través del siguiente formulario o utilizando los datos de contacto proporcionados.</p>

        <form action="/contactConfirmation.html" method="GET" className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Nombre</label>
            <input type="text" id="name" name="name" required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Tu nombre" />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email</label>
            <input type="email" id="email" name="email" required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Tu correo electrónico" />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="message">Mensaje</label>
            <textarea id="message" name="message" required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" rows="4" placeholder="Escribe tu mensaje aquí"></textarea>
          </div>

          <div className="flex items-center justify-between">
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Enviar
            </button>
          </div>
        </form>

        <div className="mt-8">
          <h3 className="text-lg font-semibold">O contáctanos directamente:</h3>
          <p>Email: contacto@rutasapp.com</p>
          <p>Teléfono: +34 123 456 789</p>
        </div>
      </main>

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
            <a href="/index.html" className="text-white mx-2 hover:text-blue-400">Inicio</a>
            <a href="/about.html" className="text-white mx-2 hover:text-blue-400">Acerca de</a>
            <a href="/contact.html" className="text-white mx-2 hover:text-blue-400">Contacto</a>
          </nav>
        </div>
      </footer>
    </div>
  );
};

export default Contact;