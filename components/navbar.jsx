import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [username, setUsername] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("access_token");

    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        setUsername(payload.sub);
      } catch (error) {
        console.error("Token inválido", error);
      }
    }
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    setUsername(null);
    navigate("/");
  };

  const styles = {
    navbar: {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      background: "white",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      zIndex: 10,
      padding: "8px 24px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    logo: {
      fontSize: "1.25rem",
      fontWeight: "bold",
    },
    navLinks: {
      display: "flex",
      gap: "20px",
      listStyle: "none",
      paddingRight: "60px",
      alignItems: "center",
    },
    link: {
      textDecoration: "none",
      color: "#4a4a4a",
      transition: "color 0.3s ease",
      fontWeight: "bold",
      position: "relative",
    },
    submenu: {
      position: "absolute",
      top: "100%",
      left: 0,
      backgroundColor: "white",
      boxShadow: "0px 4px 8px rgba(0,0,0,0.1)",
      padding: "8px 0",
      borderRadius: "4px",
      zIndex: 20,
    },
    submenuItem: {
      padding: "8px 16px",
      textDecoration: "none",
      color: "#4a4a4a",
      display: "block",
      fontWeight: "normal",
    },
    hamburger: {
      background: "none",
      border: "none",
      cursor: "pointer",
      display: "none",
      paddingRight: "60px",
    },
    icon: {
      width: "24px",
      height: "24px",
      color: "#4a4a4a",
    },
    mobileMenu: {
      position: "fixed",
      top: 0,
      right: isMobileMenuOpen ? "0" : "-100%",
      width: "60%",
      height: "100%",
      background: "white",
      zIndex: 20,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      transition: "right 0.3s ease-in-out",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    },
    closeBtn: {
      background: "none",
      border: "none",
      cursor: "pointer",
      alignSelf: "flex-end",
      margin: "16px",
    },
    mobileNavLinks: {
      display: "flex",
      flexDirection: "column",
      gap: "24px",
      listStyle: "none",
      textAlign: "center",
    },
    usernameContainer: {
      display: "flex",
      alignItems: "center",
      gap: "10px",
    },
    username: {
      fontWeight: "bold",
      color: "#4a4a4a",
    },
    logoutBtn: {
      backgroundColor: "#000000", // negro
      color: "#ffffff", // blanco
      border: "none",
      padding: "6px 12px",
      borderRadius: "4px",
      cursor: "pointer",
      fontWeight: "bold",
      marginLeft: "12px",
    },
  };

  return (
    <>
      <header style={styles.navbar}>
        <div style={styles.logo}>
          <Link to="/" style={{ ...styles.link, color: "black" }}>
            NomadTastes
          </Link>
        </div>

        <button
          onClick={() => setIsMobileMenuOpen(true)}
          style={{ ...styles.hamburger, display: "block" }}
          className="mobile-only"
        >
          <svg
            style={styles.icon}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        <ul
          style={{ ...styles.navLinks, display: "none" }}
          className="desktop-only"
        >
          <li>
            <Link to="/" style={styles.link}>
              Home
            </Link>
          </li>
          <li
            onMouseEnter={() => setOpenDropdown("rutas")}
            onMouseLeave={() => setOpenDropdown(null)}
            style={{ position: "relative" }}
          >
            <span style={styles.link}>Rutas</span>
            {openDropdown === "rutas" && (
              <div style={styles.submenu}>
                <Link to="/cities" style={styles.submenuItem}>
                  Tourist routes
                </Link>
                <Link to="/coffeeCities" style={styles.submenuItem}>
                  Coffee routes
                </Link>
              </div>
            )}
          </li>
          <li
            onMouseEnter={() => setOpenDropdown("recetas")}
            onMouseLeave={() => setOpenDropdown(null)}
            style={{ position: "relative" }}
          >
            <span style={styles.link}>Recipe</span>
            {openDropdown === "recetas" && (
              <div style={styles.submenu}>
                <Link to="/recipes" style={styles.submenuItem}>
                  List of recipes
                </Link>
                {username && (
                  <>
                    <Link to="/favorite-recipe" style={styles.submenuItem}>
                      My favourite recipes
                    </Link>
                    <Link to="/add-recipe" style={styles.submenuItem}>
                      Add Recipe
                    </Link>
                  </>
                )}
              </div>
            )}
          </li>
          <li>
            <Link to="/about" style={styles.link}>
              About
            </Link>
          </li>
          <li>
            <Link to="/contact" style={styles.link}>
              Contact
            </Link>
          </li>
          {!username && (
            <li>
              <Link to="/login" style={styles.link}>
                Login
              </Link>
            </li>
          )}
          {username && (
            <li style={styles.usernameContainer}>
              <span style={styles.username}>{username}</span>
              <button style={styles.logoutBtn} onClick={handleLogout}>
                Logout
              </button>
            </li>
          )}
        </ul>
      </header>

      {/* Menú móvil */}
      <div style={styles.mobileMenu}>
        <button
          onClick={() => setIsMobileMenuOpen(false)}
          style={styles.closeBtn}
        >
          <svg
            style={styles.icon}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <ul style={styles.mobileNavLinks}>
          <li>
            <Link
              to="/"
              style={styles.link}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
          </li>

          {/* Submenú Rutas */}
          <li>
            <span
              style={styles.link}
              onClick={() =>
                setOpenDropdown(openDropdown === "routes" ? null : "routes")
              }
            >
              Routes ▾
            </span>
            {openDropdown === "routes" && (
              <>
                <Link
                  to="/cities"
                  style={styles.submenuItem}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Tourist routes
                </Link>
                <Link
                  to="/coffeeCities"
                  style={styles.submenuItem}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Coffee routes
                </Link>
              </>
            )}
          </li>

          {/* Submenú Recetas */}
          <li>
            <span
              style={styles.link}
              onClick={() =>
                setOpenDropdown(openDropdown === "recetas" ? null : "recetas")
              }
            >
              Recipe ▾
            </span>
            {openDropdown === "recetas" && (
              <>
                <Link
                  to="/recipes"
                  style={styles.submenuItem}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  List of recipes
                </Link>
                {username && (
                  <>
                    <Link
                      to="/favorite-recipe"
                      style={styles.submenuItem}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      My favourite recipes
                    </Link>
                    <Link
                      to="/add-recipe"
                      style={styles.submenuItem}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Add Recipe
                    </Link>
                  </>
                )}
              </>
            )}
          </li>

          <li>
            <Link
              to="/about"
              style={styles.link}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              style={styles.link}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact
            </Link>
          </li>

          {!username && (
            <li>
              <Link
                to="/login"
                style={styles.link}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Login
              </Link>
            </li>
          )}

          {username && (
            <li style={styles.usernameContainer}>
              <span style={styles.username}>{username}</span>
              <button
                style={styles.logoutBtn}
                onClick={() => {
                  handleLogout();
                  setIsMobileMenuOpen(false);
                }}
              >
                Logout
              </button>
            </li>
          )}
        </ul>
      </div>

      <style>
        {`
          @media (min-width: 768px) {
            .mobile-only {
              display: none !important;
            }
            .desktop-only {
              display: flex !important;
            }
          }
        `}
      </style>
    </>
  );
};

export default Navbar;
