import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { QRCodeCanvas } from "qrcode.react";
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
  const [favorites, setFavorites] = useState({});
  const [selectedRecipeQR, setSelectedRecipeQR] = useState(null);
  const [showQR, setShowQR] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState("");
  const recipesPerPage = 6;

  useEffect(() => {
    const token = localStorage.getItem("access_token");

    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUserId(Number(decoded.id_user));
        setUsername(decoded.sub);
        setUserRole(decoded.role);
        fetchFavorites();
      } catch (error) {
        console.error("Token inválido:", error);
        localStorage.removeItem("access_token");
      }
    }

    fetchRecipes(currentPage, selectedMethod);
  }, [currentPage, selectedMethod]);

  const fetchRecipes = async (page, method = "") => {
    try {
      const baseUrl = method
        ? `http://localhost:8084/api/v1/method/${method}`
        : "http://localhost:8084/api/v1/recipes";

      const url = new URL(baseUrl);
      url.searchParams.append("page", page - 1);
      url.searchParams.append("size", recipesPerPage);

      const response = await fetch(url.toString());

      if (!response.ok) throw new Error("Error al obtener recetas");

      const data = await response.json();
      setRecipes(data.content || []);
      setTotalPages(data.totalPages || 1);
    } catch (error) {
      console.error("Error al cargar recetas:", error);
    }
  };

  const fetchFavorites = async () => {
    const token = localStorage.getItem("access_token");

    if (!token) return;

    try {
      const response = await fetch("http://localhost:8084/api/v1/favorites", {
        headers: {
          Authorization: `${token}`,
        },
      });

      if (!response.ok) throw new Error("Error al obtener favoritos");

      const data = await response.json();
      const favoritesMap = {};
      data.forEach((recipe) => {
        favoritesMap[recipe.id] = true;
      });

      setFavorites(favoritesMap);
    } catch (error) {
      console.error("Error al cargar favoritos:", error);
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
        fetchRecipes(currentPage);
      } else {
        console.error(`Error al eliminar receta con ID ${id}`);
      }
    } catch (error) {
      console.error("Error de red al eliminar receta:", error);
    }
  };

  const handleToggleFavorite = async (recipeId) => {
    const token = localStorage.getItem("access_token");

    if (!token || !userId) return;

    try {
      if (favorites[recipeId]) {
        const response = await fetch(
          `http://localhost:8084/api/v1/favorites/${recipeId}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `${token}`,
            },
          }
        );

        if (response.ok) {
          setFavorites((prev) => {
            const updated = { ...prev };
            delete updated[recipeId];
            return updated;
          });
        }
      } else {
        const response = await fetch(
          `http://localhost:8084/api/v1/${recipeId}`,
          {
            method: "POST",
            headers: {
              Authorization: `${token}`,
            },
            body: JSON.stringify({ userId, recipeId }),
          }
        );

        if (response.ok) {
          setFavorites((prev) => ({ ...prev, [recipeId]: true }));
        }
      }
    } catch (error) {
      console.error("Error al gestionar favorito:", error);
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="container mt-4">
      <h3 className="mb-4 text-center">List of recipes</h3>
      <div className="mb-3 d-flex justify-content-start">
        <select
          className="form-select w-auto"
          value={selectedMethod}
          onChange={(e) => {
            setCurrentPage(1);
            setSelectedMethod(e.target.value);
          }}
        >
          <option value="">All methods</option>
          <option value="AeroPress">AeroPress</option>
          <option value="Kalita">Kalita</option>
          <option value="Orea">Orea</option>
          <option value="V60">V60</option>
          <option value="Origami">Origami</option>
          <option value="ColdBrew">ColdBrew</option>
          <option value="BlackList Drip">BlackList Drip</option>
        </select>
      </div>

      <div className="row gx-4 gy-4">
        {recipes.map((recipe) => (
          <div
            className={`col-md-${recipes.length === 1 ? "12" : "6"} d-flex`}
            key={recipe.id}
          >
            <div className="card recipe-card shadow-sm mx-auto">
              <img
                src="/src/assets/imagenesRecetas/sibarist20223481_1200x1200.png"
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
                      Details
                    </button>
                    <button
                      className="btn btn-sm btn-outline-dark d-flex align-items-center gap-1"
                      onClick={() => {
                        setSelectedRecipeQR(recipe.id);
                        setShowQR(true);
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-share-fill"
                        viewBox="0 0 16 16"
                      >
                        <path d="M11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.5 2.5 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5" />
                      </svg>
                    </button>

                    <div className="d-flex align-items-center gap-2">
                      {userId && (
                        <button
                          className="btn btn-sm"
                          onClick={() => handleToggleFavorite(recipe.id)}
                          title={
                            favorites[recipe.id]
                              ? "Quitar de favoritos"
                              : "Añadir a favoritos"
                          }
                        >
                          {favorites[recipe.id] ? (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              className="bi bi-heart-fill"
                              viewBox="0 0 16 16"
                            >
                              <path
                                fillRule="evenodd"
                                d="M8 1.314C12.438-3.248 23.534 4.735 8 15C-7.534 4.736 3.562-3.248 8 1.314z"
                              />
                            </svg>
                          ) : (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              className="bi bi-heart"
                              viewBox="0 0 16 16"
                            >
                              <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
                            </svg>
                          )}
                        </button>
                      )}

                      {(userId === recipe.userId || userRole === "admin") && (
                        <div className="d-flex gap-2">
                          <button
                            className="btn btn-sm btn-outline-warning"
                            onClick={() =>
                              navigate(`/edit-recipe/${recipe.id}`)
                            }
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => handleDelete(recipe.id)}
                          >
                            Delete
                          </button>
                        </div>
                      )}
                      {showQR && selectedRecipeQR && (
                        <div
                          className="qr-modal-overlay"
                          onClick={() => setShowQR(false)}
                        >
                          <div
                            className="qr-modal-content"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <h5>Scan to see the recipe</h5>
                            <QRCodeCanvas
                              value={`http://localhost:5173/recipe/${selectedRecipeQR}`}
                              size={256}
                            />
                            <button
                              className="btn btn-sm btn-secondary mt-3"
                              onClick={() => setShowQR(false)}
                            >
                              Close
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {recipes.length < recipesPerPage &&
          Array.from({ length: recipesPerPage - recipes.length }).map(
            (_, idx) => (
              <div className="col-md-6 d-flex" key={`empty-${idx}`}>
                <div className="card recipe-card empty-card mx-auto"></div>
              </div>
            )
          )}
      </div>

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

export default RecipeList;
