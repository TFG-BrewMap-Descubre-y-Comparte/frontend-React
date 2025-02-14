import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "../components/navbar";

import Slideshow from "../components/Slideshow";
import Ventajas from "../components/Ventajas";
import SeccionTira from "../components/SeccionTira";
import SeccionEquipo from "../components/SeccionEquipo";
import Footer from "../components/Footer";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Ciudades from "../pages/Ciudades";
import RouteForm from "../components/Routes/RouteForm";
import TarjetaRoutes from "../components/TarjetasRoutes";

export default function Home() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Slideshow />
              <Ventajas />
              <SeccionTira />
              <SeccionEquipo />
              <Footer />
            </>
          }
        />
        <Route path="/route/:city" element={<RouteForm />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cities" element={<Ciudades />} />
        <Route path="/TarjetaRoutes" element={<TarjetaRoutes />} />
      </Routes>
    </Router>
  );
}
