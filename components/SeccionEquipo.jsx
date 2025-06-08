import { useState } from "react";

const SeccionEquipo = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const teamMembers = [
    { name: "Miguel Ángel", img: "../src/assets/perfilMiguel.png" },
    { name: "Alejandro", img: "../src/assets/perfilAle.png" },
    { name: "Polo", img: "../src/assets/perfilPolo.jpg" },
    { name: "Fernando", img: "../src/assets/perfilFernando.png" },
    { name: "Ortega", img: "../src/assets/perfilOrtega.jpg" },
  ];

  return (
    <section style={styles.meetTheTeam}>
      <h2 style={styles.teamTitle}>Meet the team</h2>
      <div style={styles.teamContainer}>
        {teamMembers.map((member, index) => (
          <div key={index} style={styles.teamMember}>
            <img
              src={member.img}
              alt={member.name}
              style={{
                ...styles.teamMemberImage,
                filter:
                  hoveredIndex === index ? "grayscale(0%)" : "grayscale(100%)",
              }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            />
            <h3 style={styles.teamMemberName}>{member.name}</h3>
          </div>
        ))}
      </div>
    </section>
  );
};

// Estilos
const styles = {
  meetTheTeam: {
    padding: "3rem 1rem",
    textAlign: "center",
  },
  teamTitle: {
    fontSize: "2rem",
    fontWeight: "bold",
    marginBottom: "2rem",
  },
  teamContainer: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "2rem",
  },
  teamMember: {
    textAlign: "center",
  },
  teamMemberImage: {
    width: "100%",
    maxWidth: "200px",
    height: "auto",
    borderRadius: "50%",
    transition: "filter 0.3s ease-in-out",
  },
  teamMemberName: {
    fontSize: "1.2rem",
    fontWeight: "600",
  },
};

export default SeccionEquipo;
