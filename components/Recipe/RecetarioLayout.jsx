import { Link } from "react-router-dom";

function RecetarioLayout() {
  return (
    <>
      <nav>
        <Link to="/recetario">Recetas</Link>
        <Link to="/recetario/nueva">Añadir</Link>
        <Link to="/recetario/login">Login</Link>
        <Link to="/recetario/registro">Registro</Link>
      </nav>
    </>
  );
}

export default RecetarioLayout;
