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

function App() {
  return (
    <>
      <Navbar />
      <Routes>
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
        <Route path="/favorite-recipe" element={<FavoriteRecipe />} />
        <Route path="/add-recipe" element={<AddRecipe />} />
        <Route path="/recipe/:id" element={<RecipeDetails />} />
        <Route path="/edit-recipe/:id" element={<EditRecipe />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
      </Routes>
    </>
  );
}

export default App;
