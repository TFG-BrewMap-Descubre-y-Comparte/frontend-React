import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./EditRecipe.css";
import cafeImage from "../../src/assets/imagenesRecetas/sibarist20223481_1200x1200.png";

const RecipeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState({
    tittle: "",
    description: "",
    metodo: "",
    origen: "",
  });

  useEffect(() => {
    fetch(`http://localhost:8084/api/v1/recipe/${id}`)
      .then((res) => res.json())
      .then((data) => setRecipe(data))
      .catch((error) => console.error("Error fetching recipe:", error));
  }, [id]);

  return (
    <div className="container mt-5">
      <div className="edit__wrapper shadow-lg">
        <div className="row no-gutters">
          <div className="col-lg-5 info__wrapper gradient-brand-color p-0 order-lg-2">
            <img
              src={cafeImage}
              alt="Imagen de café"
              className="img-fluid h-100 w-100 object-fit-cover"
              style={{
                borderRadius: "0 .625rem .625rem 0",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </div>

          <div className="col-lg-7 form__wrapper p-5 order-lg-1">
            <h3 className="mb-4">Recipe Details</h3>

            <div className="mb-3">
              <label className="form-label">Title</label>
              <input
                className="form-control"
                name="tittle"
                value={recipe.tittle}
                readOnly
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Description</label>
              <textarea
                className="form-control"
                name="description"
                rows="4"
                value={recipe.description}
                readOnly
              ></textarea>
            </div>

            <div className="mb-3">
              <label className="form-label">Method</label>
              <input className="form-control" value={recipe.metodo} readOnly />
            </div>

            <div className="mb-3">
              <label className="form-label">Origin</label>
              <input className="form-control" value={recipe.origen} readOnly />
            </div>

            <button
              type="button"
              className="btn btn-dark mt-3"
              onClick={() => navigate("/recipes")}
            >
              Back to List
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetails;
