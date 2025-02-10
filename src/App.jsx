// App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "../components/navbar";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Ciudades from "../pages/Ciudades";
import Home from "../pages/Home";
import RouteForm from "../components/Routes/RouteForm";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/start" element={<Ciudades />} />
        {/* Cambié RouterForm a RouteForm */}
        <Route path="/RouteForm" element={<RouteForm />} /> 
      </Routes>
    </Router>
  );
}

export default App;
