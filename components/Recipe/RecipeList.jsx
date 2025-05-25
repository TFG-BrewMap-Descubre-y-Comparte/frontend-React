import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import "./RecipeList.css";
import "bootstrap/dist/css/bootstrap.min.css";

const RecipeList = () => {
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [userId, setUserId] = useState(null);
  const [username, setUsername] = useState("");
  const [userRole, setUserRole] = useState("");
  const recipesPerPage = 6;

  useEffect(() => {
    fetchRecipes(currentPage);
    const token = localStorage.getItem("access_token");

    if (token) {
      try {
        const decoded = jwtDecode(token);
        console.log("Token decodificado:", decoded);
        setUserId(Number(decoded.id_user));
        setUsername(decoded.sub);
        setUserRole(decoded.role);
        console.log("Rol del usuario:", decoded.role);
      } catch (error) {
        console.error("Token inválido:", error);
        localStorage.removeItem("access_token");
      }
    }
  }, [currentPage]);

  const fetchRecipes = async (page) => {
    try {
      const response = await fetch(
        `http://localhost:8084/api/v1/recipes?page=${
          page - 1
        }&size=${recipesPerPage}`
      );

      if (!response.ok) throw new Error("Error al obtener recetas");

      const data = await response.json();
      setRecipes(data.content || []);
      setTotalPages(data.totalPages || 1);
    } catch (error) {
      console.error("Error al cargar recetas:", error);
    }
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem("access_token");

    try {
      const response = await fetch(
        `http://localhost:8084/api/v1/recipe/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
        }
      );

      if (response.ok) {
        console.log(`Receta ${id} eliminada correctamente`);
        fetchRecipes(currentPage);
      } else {
        console.error(`Error al eliminar receta con ID ${id}`);
      }
    } catch (error) {
      console.error("Error de red al eliminar receta:", error);
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="container mt-4">
      <h3 className="mb-4 text-center">Lista de Recetas</h3>

      <div className="row gx-4 gy-4">
        {recipes.map((recipe) => (
          <div className="col-md-6 d-flex" key={recipe.id}>
            <div className="card recipe-card shadow-sm mx-auto">
              <img
                src="../../src/assets/imagenesRecetas/sibarist20223481_1200x1200.png"
                className="card-img-top"
                alt={recipe.tittle || "Imagen receta"}
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{recipe.tittle}</h5>
                <p className="card-text">{recipe.description}</p>
                <div className="mt-auto">
                  <small>
                    <strong>Método:</strong> {recipe.metodo}
                  </small>
                  <br />
                  <small>
                    <strong>Origen:</strong> {recipe.origen}
                  </small>
                  <br />
                  <small>
                    <strong>Autor:</strong> {recipe.username}
                  </small>

                  <div className="mt-3 d-flex justify-content-between">
                    <button
                      className="btn btn-sm btn-outline-dark"
                      onClick={() => navigate(`/recipe/${recipe.id}`)}
                    >
                      Detalles
                    </button>

                    {(userId === recipe.userId || userRole === "admin") && (
                      <div className="d-flex gap-2">
                        <button
                          className="btn btn-sm btn-outline-warning"
                          onClick={() => navigate(`/edit-recipe/${recipe.id}`)}
                        >
                          Editar
                        </button>
                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => handleDelete(recipe.id)}
                        >
                          Eliminar
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Tarjetas vacías para mantener diseño uniforme */}
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
      <div className="d-flex justify-content-center mt-4">
        <button
          className="btn btn-outline-dark me-2"
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          Anterior
        </button>
        <span className="align-self-center mx-2">
          Página {currentPage} de {totalPages}
        </span>
        <button
          className="btn btn-outline-dark ms-2"
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default RecipeList;
