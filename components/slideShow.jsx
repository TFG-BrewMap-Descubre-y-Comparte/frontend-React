import { useState, useEffect } from 'react';

const SlideShow = () => {
  const images = [
    '../src/assets/catedralSevilla.jpg',
    '../src/assets/coliseoRomano.jpeg',
    '../src/assets/sagradaFamilia.jpg',
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const goToPreviousSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  // Cambia la imagen automáticamente cada 2 segundos
  useEffect(() => {
    const interval = setInterval(goToNextSlide, 2000); // 2000ms = 2 segundos

    // Limpiar el intervalo cuando el componente se desmonte
    return () => clearInterval(interval);
  }, []); // El array vacío [] asegura que solo se ejecute una vez cuando el componente se monta

  // Estilos en línea para el contenedor
  const slideShowContainerStyle = {
    width: '100vw',
    height: '100vh',
    position: 'relative',
    overflow: 'hidden',
    margin: 0,
    padding: 0,
  };

  // Estilos para la imagen
  const slideImageStyle = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    objectPosition: 'center',
  };

  // Estilos para el fondo opaco
  const overlayStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Color negro con opacidad del 50%
    zIndex: 1,
  };

  // Estilos generales para los botones
  const buttonStyle = {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    color: 'white',
    fontSize: '2rem',
    border: 'none',
    padding: '10px',
    cursor: 'pointer',
    zIndex: 10,
  };

  // Estilos específicos para los botones de siguiente y anterior
  const prevButtonStyle = {
    ...buttonStyle,
    left: '10px',
  };

  const nextButtonStyle = {
    ...buttonStyle,
    right: '10px',
  };

  // Estilo para el texto centrado
  const titleStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    color: '#fff',
    fontSize: '5rem', // Hacemos el texto más grande
    fontWeight: 'bold',
    textShadow: '4px 4px 10px rgba(0, 0, 0, 0.7)', // Sombra más fuerte
    letterSpacing: '5px', // Espaciado entre letras para que se vea más impactante
    zIndex: 5,
    textTransform: 'uppercase', // Convertimos el texto a mayúsculas para hacerlo más impactante
    fontFamily: 'Arial, sans-serif', // Cambiamos la fuente para un toque moderno
    animation: 'fadeIn 2s ease-in-out', // Animación suave al cargar
  };

  return (
    <div style={slideShowContainerStyle}>
      <div style={{ position: 'relative', width: '100%', height: '100%' }}>
        {/* Capa de fondo opaco */}
        <div style={overlayStyle}></div>

        {/* Título en el centro */}
        <div style={titleStyle}>Rutas App</div>

        {/* Botones de navegación */}
        <button style={prevButtonStyle} onClick={goToPreviousSlide}>
          &#10094;
        </button>

        {/* Imagen del slider */}
        <img
          src={images[currentIndex]}
          alt={`slide ${currentIndex}`}
          style={slideImageStyle}
        />

        <button style={nextButtonStyle} onClick={goToNextSlide}>
          &#10095;
        </button>
      </div>
    </div>
  );
};

export default SlideShow;
