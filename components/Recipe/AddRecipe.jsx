import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./EditRecipe.css";
import cafeImage from "../../src/assets/imagenesRecetas/sibarist20223481_1200x1200.png";

const AddRecipe = () => {
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState({
    tittle: "",
    description: "",
    metodo: "",
    origen: "",
  });

  const [validated, setValidated] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setRecipe({
      ...recipe,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setValidated(true);

    const form = e.currentTarget;
    if (!form.checkValidity()) return;

    const token = localStorage.getItem("access_token");

    try {
      const response = await fetch("http://localhost:8084/api/v1/recipe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        body: JSON.stringify(recipe),
      });

      if (response.ok) {
        navigate("/recipes");
      } else {
        console.error("Error al crear la receta");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

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
            <h3 className="mb-4">Añadir Receta</h3>
            <form
              onSubmit={handleSubmit}
              className={`needs-validation ${validated ? "was-validated" : ""}`}
              noValidate
            >
              <div className="mb-3">
                <label className="form-label">Título</label>
                <input
                  className="form-control"
                  name="tittle"
                  value={recipe.tittle}
                  onChange={handleChange}
                  required
                />
                <div className="invalid-feedback">
                  El título es obligatorio.
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label">Descripción</label>
                <textarea
                  className="form-control"
                  name="description"
                  rows="4"
                  value={recipe.description}
                  onChange={handleChange}
                  required
                ></textarea>
                <div className="invalid-feedback">
                  La descripción es obligatoria.
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label">Método</label>
                <select
                  className="form-select"
                  name="metodo"
                  value={recipe.metodo}
                  onChange={handleChange}
                  required
                >
                  <option value="">Selecciona un método</option>
                  <option value="AeroPress">AeroPress</option>
                  <option value="Kalita">Kalita</option>
                  <option value="Orea">Orea</option>
                  <option value="V60">V60</option>
                  <option value="Origami">Origami</option>
                  <option value="ColdBrew">ColdBrew</option>
                  <option value="BlackList Drip">BlackList Drip</option>
                </select>
                <div className="invalid-feedback">Selecciona un método.</div>
              </div>

              <div className="mb-3">
                <label className="form-label">Origen</label>
                <select
                  className="form-select"
                  name="origen"
                  value={recipe.origen}
                  onChange={handleChange}
                  required
                >
                  <option value="">Selecciona un origen</option>
                  <option value="Etiopía">Etiopía</option>
                  <option value="Colombia">Colombia</option>
                  <option value="Brasil">Brasil</option>
                  <option value="Kenia">Kenia</option>
                  <option value="Guatemala">Guatemala</option>
                  <option value="Costa Rica">Costa Rica</option>
                  <option value="El Salvador">El Salvador</option>
                  <option value="Panamá">Panamá</option>
                </select>
                <div className="invalid-feedback">Selecciona un origen.</div>
              </div>

              <button type="submit" className="btn btn-dark mt-3">
                Crear Receta
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddRecipe;
