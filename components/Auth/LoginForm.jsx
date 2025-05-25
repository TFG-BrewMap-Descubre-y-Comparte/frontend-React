import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import loginImage from "../../src/assets/login.jpg";
import "./LoginForm.css";

const LoginForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const [validated, setValidated] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setValidated(true);

    const form = e.currentTarget;
    if (!form.checkValidity()) return;

    try {
      console.log("🔐 Enviando datos de login:", formData);

      const response = await fetch("http://localhost:8083/api/v1/login/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log("📩 Respuesta del backend:", data);

      if (!response.ok) {
        const errorMessage =
          data?.detail || data?.error || "Credenciales inválidas";
        throw new Error(errorMessage);
      }

      if (data.access_token) {
        localStorage.setItem("access_token", data.access_token);
        console.log("✅ Login exitoso. Token guardado.");
        navigate("/");
      } else {
        throw new Error("Login failed: no token received");
      }
    } catch (error) {
      console.error("🚫 Error en login:", error.message);
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="login-screen">
      <div className="login-image-side">
        <img src={loginImage} alt="Login" className="login-image" />
      </div>

      <div className="login-form-side">
        <form
          onSubmit={handleSubmit}
          className={`needs-validation ${validated ? "was-validated" : ""}`}
          noValidate
        >
          <h2 className="text-center mb-4">Welcome</h2>

          {errorMessage && (
            <div className="alert alert-danger">{errorMessage}</div>
          )}

          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              className="form-control"
              placeholder="Enter username"
              value={formData.username}
              onChange={handleChange}
              required
            />
            <div className="invalid-feedback">Username is required</div>
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="form-control"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
              required
              minLength={6}
            />
            <div className="invalid-feedback">
              Password must be at least 6 characters
            </div>
          </div>

          <button type="submit" className="btn btn-dark w-100">
            Login
          </button>

          <div className="form-text text-center mt-3">
            Not Registered?{" "}
            <Link to="/register" className="text-dark fw-bold">
              Create an Account
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
