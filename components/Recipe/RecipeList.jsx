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
  const recipesPerPage = 6;

  useEffect(() => {
    fetchRecipes(currentPage);

    const token = localStorage.getItem("access_token");
    const decoded = token && window.atob(token.split(".")[1]);
    console.log(JSON.parse(decoded));

    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUserId(Number(decoded.id_user));

        // Ajusta según tu JWT
      } catch (error) {
        console.error("Error al decodificar el token:", error);
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
      const data = await response.json();
      setRecipes(data.content || []);
      setTotalPages(data.totalPages || 1);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

  const handleDelete = (id) => {
    const token = localStorage.getItem("access_token");
    fetch(`http://localhost:8084/api/v1/recipe/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          console.log(`Receta con id ${id} eliminada correctamente.`);
          fetchRecipes(currentPage);
        } else {
          console.error(`Error al eliminar la receta con id ${id}.`);
        }
      })
      .catch((error) => {
        console.error("Error al intentar eliminar la receta:", error);
      });
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="container mt-4">
      <h3 className="mb-4 text-center">Recipe List</h3>

      <div className="row gx-4 gy-4">
        {recipes.map((recipe, index) => (
          <div className="col-md-6 d-flex" key={index}>
            <div className="card recipe-card shadow-sm mx-auto">
              <img
                src="../../src/assets/imagenesRecetas/sibarist20223481_1200x1200.png"
                className="card-img-top"
                alt={recipe.tittle}
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

                  {/* Botones de acción */}
                  <div className="mt-3 d-flex justify-content-between">
                    <button
                      className="btn btn-sm btn-outline-dark"
                      onClick={() => navigate(`/recipe/${recipe.id}`)}
                    >
                      Details
                    </button>

                    {userId && recipe.userId === userId && (
                      <>
                        <button
                          className="btn btn-sm btn-outline-warning"
                          onClick={() => navigate(`/edit-recipe/${recipe.id}`)}
                        >
                          Update
                        </button>
                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => handleDelete(recipe.id)}
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Tarjetas vacías para cuadrar diseño */}
        {Array.from({ length: recipesPerPage - recipes.length }).map(
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
          Previous
        </button>
        <span className="align-self-center mx-2">
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="btn btn-outline-dark ms-2"
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default RecipeList;
