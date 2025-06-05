import { useState } from "react";
import { useNavigate } from "react-router-dom";
import registerImage from "../../src/assets/login.jpg";
import "./LoginForm.css";

const RegisterForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
    role: "user",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [validated, setValidated] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    if (!form.checkValidity()) {
      e.stopPropagation();
      setValidated(true);
      return;
    }

    try {
      const response = await fetch("http://localhost:8083/api/v1/insert/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      console.log(result);

      if (!response.ok) {
        throw new Error(result.error || result.detail || "Registration failed");
      }

      navigate("/login");
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="login-screen">
      <div className="login-image-side">
        <img src={registerImage} alt="Register" className="login-image" />
      </div>

      <div className="login-form-side">
        <form
          noValidate
          className={validated ? "was-validated" : ""}
          onSubmit={handleSubmit}
        >
          <h2 className="text-center mb-4">Create Account</h2>

          {errorMessage && (
            <div className="alert alert-danger">{errorMessage}</div>
          )}

          <div className="form-group mb-3">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              className="form-control"
              placeholder="Enter full name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <div className="invalid-feedback">Name is required</div>
          </div>

          <div className="form-group mb-3">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-control"
              placeholder="Enter email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <div className="invalid-feedback">Valid email is required</div>
          </div>

          <div className="form-group mb-3">
            <label htmlFor="username">Username</label>
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

          <div className="form-group mb-3">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              className="form-control"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
              minLength={6}
              required
            />
            <div className="invalid-feedback">
              Password must be at least 6 characters
            </div>
          </div>

          <button type="submit" className="btn-login">
            Register
          </button>

          <div className="form-text text-center mt-3">
            Already have an account?{" "}
            <a href="/login" className="text-dark">
              Login here
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
