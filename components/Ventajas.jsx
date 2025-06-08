import "@fortawesome/fontawesome-free/css/all.min.css";
import "./Ventajas.css"; // Crea este archivo CSS

const Ventajas = () => {
  const ventajas = [
    {
      icon: "fas fa-user",
      title: "Easy to Use",
      description:
        "Designed with a simple and user-friendly interface, our application allows you to enjoy your travels without hassle.",
    },
    {
      icon: "fas fa-headset",
      title: "24h Support",
      description:
        "We have a 24h customer service where we will solve all your problems.",
      link: "/contact",
      linkText: "See More",
    },
    {
      icon: "fas fa-map-marked-alt",
      title: "Intelligent Navigation",
      description:
        "Get optimised route guidance, with real-time updates on traffic and weather.",
    },
    {
      icon: "fas fa-volume-up",
      title: "Audioguide",
      description:
        "We offer audio guides for a better experience on your trip.",
    },
    {
      icon: "fas fa-mug-hot",
      title: "Coffee Recipes",
      description:
        "Discover and share your favorite coffee recipes with our community.",
      link: "/recipes",
      linkText: "List of Recipes",
    },
    {
      icon: "fas fa-route",
      title: "Specialty Coffee Routes",
      description:
        "Explore curated coffee routes in various cities, guiding you to the best specialty coffee shops.",
      link: "/coffeeCities",
      linkText: "Coffee Routes",
    },
  ];

  return (
    <section className="ventajas-section">
      <div className="ventajas-container">
        <h2 className="ventajas-title">Advantages</h2>
        <div className="ventajas-grid">
          <div className="ventajas-image">
            <img src="../src/assets/imagenMapaVertical.avif" alt="Tablet" />
          </div>
          <div className="ventajas-cards">
            {ventajas.map((v, index) => (
              <div key={index} className="ventaja-card">
                <i className={v.icon}></i>
                <h4>{v.title}</h4>
                <p>{v.description}</p>
                {v.link && (
                  <a href={v.link} className="ver-mas">
                    {v.linkText}
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Ventajas;
