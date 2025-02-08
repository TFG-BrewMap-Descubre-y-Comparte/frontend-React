

const SeccionEquipo = () => {
  const teamMembers = [
    { name: "Miguel Angel", role: "Backend Developer", img: "../src/assets/perfilMiguel.png" },
    { name: "Alejandro", role: "Backend Developer", img: "../src/assets/perfilAle.png" },
    { name: "Polo", role: "Frontend Developer", img: "../src/assets/perfilPolo.jpg" },
    { name: "Fernando", role: "Backend Developer", img: "../src/assets/perfilFernando.png" },
    { name: "Ortega", role: "Frontend Developer", img: "../src/assets/perfilOrtega.png" },
  ];

  return (
    <section style={styles.meetTheTeam}>
      <h2 style={styles.teamTitle}>Conoce El Equipo</h2>
      <div style={styles.teamContainer}>
        {teamMembers.map((member, index) => (
          <div key={index} style={styles.teamMember}>
            <img src={member.img} alt={member.name} style={styles.teamMemberImage} />
            <h3 style={styles.teamMemberName}>{member.name}</h3>
            <p style={styles.teamMemberRole}>{member.role}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

// Estilos en JavaScript (Inline CSS)
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
    marginBottom: "1rem",
    filter: "grayscale(100%)",
    transition: "filter 0.3s ease-in-out",
  },
  teamMemberImageHover: {
    filter: "grayscale(0%)",
  },
  teamMemberName: {
    fontSize: "1.2rem",
    fontWeight: "600",
  },
  teamMemberRole: {
    color: "gray",
  },
};

// Exportar componente
export default SeccionEquipo;
