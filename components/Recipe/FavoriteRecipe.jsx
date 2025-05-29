import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import "./RecipeList.css";
import "bootstrap/dist/css/bootstrap.min.css";

const FavoriteRecipe = () => {
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [userId, setUserId] = useState(null);
  const [username, setUsername] = useState("");
  const [userRole, setUserRole] = useState("");
  const recipesPerPage = 6;

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    console.log("TOKEN:", token);
    if (token) {
      try {
        const decoded = jwtDecode(token);
        console.log("Decoded token:", decoded);
        setUserId(Number(decoded.id_user));
        setUsername(decoded.sub);
        setUserRole(decoded.role);
      } catch (error) {
        console.error("Token inválido:", error);
        localStorage.removeItem("access_token");
      }
    }
  }, []);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const token = localStorage.getItem("access_token");
        console.log("Token enviado en Authorization:", token);

        const response = await fetch(
          `http://localhost:8084/api/v1/favouriteRecipes?page=${
            currentPage - 1
          }&size=${recipesPerPage}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("Estado de respuesta:", response.status);

        if (!response.ok) {
          throw new Error("Error al obtener recetas");
        }

        const data = await response.json();
        console.log("Datos recibidos:", data);
        setRecipes(data.content || []);
        setTotalPages(data.totalPages || 1);
      } catch (error) {
        console.error("Error al cargar recetas:", error);
      }
    };

    fetchRecipes();
  }, [currentPage]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="container mt-4">
      <h3 className="mb-4 text-center">
        {username
          ? `${username} Favorite Recipes`
          : "My List of Favorite Recipes"}
      </h3>

      <div className="row gx-4 gy-4">
        {recipes.map((recipe) => (
          <div className="col-md-6 d-flex" key={recipe.id}>
            <div className="card recipe-card shadow-sm mx-auto">
              <img
                src={`/src/assets/imagenesRecetas/sibarist20223481_1200x1200.png`}
                className="card-img-top"
                alt={recipe.tittle || "Imagen receta"}
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{recipe.tittle}</h5>
                <p className="card-text">{recipe.description}</p>
                <div className="mt-auto">
                  <small>
                    <strong>Method:</strong> {recipe.metodo}
                  </small>
                  <br />
                  <small>
                    <strong>Origin:</strong> {recipe.origen}
                  </small>
                  <br />
                  <small>
                    <strong>Author:</strong> {recipe.username}
                  </small>

                  <div className="mt-3 d-flex justify-content-between">
                    <button
                      className="btn btn-sm btn-outline-dark"
                      onClick={() => navigate(`/recipe/${recipe.id}`)}
                    >
                      Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Tarjetas vacías para diseño uniforme */}
        {recipes.length < recipesPerPage &&
          Array.from({ length: recipesPerPage - recipes.length }).map(
            (_, idx) => (
              <div className="col-md-6 d-flex" key={`empty-${idx}`}>
                <div className="card recipe-card empty-card mx-auto"></div>
              </div>
            )
          )}
      </div>

      {/* Paginación */}
      <div className="d-flex justify-content-center mt-4 gap-2">
        <button
          className="btn btn-outline-secondary"
          onClick={() => handlePageChange(1)}
          disabled={currentPage === 1}
        >
          First Page
        </button>
        <button
          className="btn btn-outline-secondary"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="align-self-center">
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="btn btn-outline-secondary"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
        <button
          className="btn btn-outline-secondary"
          onClick={() => handlePageChange(totalPages)}
          disabled={currentPage === totalPages}
        >
          Last Page
        </button>
      </div>
    </div>
  );
};

export default FavoriteRecipe;
