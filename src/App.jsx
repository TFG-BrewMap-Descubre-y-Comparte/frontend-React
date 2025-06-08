import { Routes, Route } from "react-router-dom";
import Navbar from "../components/navbar";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Ciudades from "../pages/Ciudades";
import CoffeeCity from "../pages/CoffeeCity";
import Home from "../pages/Home";
import RouteForm from "../components/Routes/RouteForm";
import RouteCoffeShop from "../components/Routes/RouteCoffeShop";
import TarjetaRoutes from "../components/TarjetasRoutes";
import TarjetaRoutesCoffee from "../components/TarjetaRoutesCoffee";
import LoginForm from "../components/Auth/LoginForm";
import RegisterForm from "../components/Auth/RegisterForm";
import RecipeList from "../components/Recipe/RecipeList";
import FavoriteRecipe from "../components/Recipe/FavoriteRecipe";
import RecipeDetails from "../components/Recipe/RecipeDetails";
import AddRecipe from "../components/Recipe/AddRecipe";
import EditRecipe from "../components/Recipe/EditRecipe";
import PrivateRoute from "../components/Auth/PrivateRoute";
import NotFound from "../pages/NotFound";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        {/* Rutas públicas */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cities" element={<Ciudades />} />
        <Route path="/coffeeCities" element={<CoffeeCity />} />
        <Route path="/tarjeta/:city/:category" element={<TarjetaRoutes />} />
        <Route
          path="/tarjetaCoffee/:city/:category"
          element={<TarjetaRoutesCoffee />}
        />
        <Route path="/route/:idRoute" element={<RouteForm />} />
        <Route path="/routeCoffee/:idRoute" element={<RouteCoffeShop />} />
        <Route path="/recipes" element={<RecipeList />} />
        <Route path="/recipe/:id" element={<RecipeDetails />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="*" element={<NotFound />} />
        {/* Rutas protegidas */}
        <Route
          path="/favorite-recipe"
          element={
            <PrivateRoute>
              <FavoriteRecipe />
            </PrivateRoute>
          }
        />
        <Route
          path="/add-recipe"
          element={
            <PrivateRoute>
              <AddRecipe />
            </PrivateRoute>
          }
        />
        <Route
          path="/edit-recipe/:id"
          element={
            <PrivateRoute>
              <EditRecipe />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
