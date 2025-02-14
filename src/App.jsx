import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "../components/navbar";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Ciudades from "../pages/Ciudades";
import Home from "../pages/Home";
import RouteForm from "../components/Routes/RouteForm";
import TarjetaRoutes from "../components/TarjetasRoutes";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cities" element={<Ciudades />} />
        <Route path="/tarjeta/:city" element={<TarjetaRoutes />} />
        <Route path="/route/:idRoute" element={<RouteForm />} />
      </Routes>
    </Router>
  );
}

export default App;
