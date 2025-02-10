import { useState } from 'react';  // Importamos useState para manejar el estado
import Footer from '../components/Footer'; // Importa el Footer desde la carpeta de componentes

const Contact = () => {
  const [formSent, setFormSent] = useState(false); // Estado para controlar el mensaje de éxito

  const handleSubmit = (e) => {
    e.preventDefault(); // Previene que el formulario recargue la página
    setFormSent(true);  // Muestra el mensaje de éxito
  };

  return (
    <div className="contact-container">
      <section className="content-section">
        <div className="content-container">
          <h2 className="content-title">Contacto</h2>
          <p>
            Estamos aquí para ayudarte. Si tienes alguna pregunta, no dudes en
            ponerte en contacto con nosotros a través del siguiente formulario o
            utilizando los datos de contacto proporcionados.
          </p>

          {/* Mostrar mensaje de éxito si el formulario fue enviado */}
          {formSent && <p className="success-message">¡Mensaje enviado correctamente!</p>}

          <form onSubmit={handleSubmit}>
            <label htmlFor="name">Nombre</label>
            <input type="text" id="name" name="name" required placeholder="Tu nombre" />

            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" required placeholder="Tu correo electrónico" />

            <label htmlFor="message">Mensaje</label>
            <textarea id="message" name="message" required rows="4" placeholder="Escribe tu mensaje aquí"></textarea>

            <button type="submit">Enviar</button>
          </form>

          <div>
            <h3>O contáctanos directamente:</h3>
            <p>Email: contacto@rutasapp.com</p>
            <p>Teléfono: +34 123 456 789</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />

      <style>{`
        .contact-container {
          font-family: sans-serif;
          background-color: #f7fafc;
          width: 100vw;
          overflow-x: hidden;
          display: flex;
          flex-direction: column;
          min-height: 100vh;
        }

        .content-section {
          background-color: #f7fafc;
          padding: 3rem 1rem;
          width: 100vw;
          flex: 1;
        }

        .content-container {
          max-width: 800px;
          margin: 0 auto;
        }

        .content-title {
          font-size: 3rem;
          text-align: center;
          margin-bottom: 2rem;
        }

        form {
          background: white;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          margin-bottom: 20px;
        }

        label {
          display: block;
          font-weight: bold;
          margin-bottom: 5px;
        }

        input,
        textarea {
          width: 100%;
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 4px;
          margin-bottom: 15px;
        }

        button {
          background-color: #4299e1;
          color: white;
          padding: 10px 20px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }

        button:hover {
          background-color: #3182ce;
        }

        /* Asegura que el Footer se mantenga abajo pero sin bloquear el scroll */
        footer {
          margin-top: auto; /* Empuja el footer a la parte inferior de la página */
        }

        .success-message {
          background-color: #d4edda;
          color: #155724;
          border: 1px solid #c3e6cb;
          padding: 10px;
          border-radius: 4px;
          margin-top: 20px;
          text-align: center;
        }
      `}</style>
    </div>
  );
};

export default Contact;
