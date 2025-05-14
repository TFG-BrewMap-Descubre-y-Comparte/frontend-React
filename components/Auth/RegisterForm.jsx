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
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);

    if (
      !formData.name ||
      !formData.email ||
      !formData.username ||
      formData.password.length < 6
    ) {
      setErrorMessage("All fields are required. Password min 6 characters.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8083/api/v1/insert/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Registration failed");
      }

      // Registro
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
        <form onSubmit={handleSubmit}>
          <h2 className="text-center mb-4">Create Account</h2>

          {errorMessage && (
            <div className="alert alert-danger">{errorMessage}</div>
          )}

          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              className="form-control"
              placeholder="Enter full name"
              value={formData.name}
              onChange={handleChange}
            />
            {submitted && formData.name === "" && (
              <div className="text-danger">Name is required</div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-control"
              placeholder="Enter email"
              value={formData.email}
              onChange={handleChange}
            />
            {submitted && formData.email === "" && (
              <div className="text-danger">Email is required</div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              className="form-control"
              placeholder="Enter username"
              value={formData.username}
              onChange={handleChange}
            />
            {submitted && formData.username === "" && (
              <div className="text-danger">Username is required</div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              className="form-control"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
            />
            {submitted && formData.password.length < 6 && (
              <div className="text-danger">
                Password must be at least 6 characters
              </div>
            )}
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
