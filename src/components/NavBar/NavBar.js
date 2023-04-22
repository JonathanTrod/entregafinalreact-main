import { useContext } from "react";
import CartWidget from "../CartWidget/CartWidget.js";
import { Link } from "react-router-dom";
import CartContext from "../Context/CartContext";
import "./NavBar.css";

const NavBar = () => {
  const { getQuantity } = useContext(CartContext);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Boca Juniors
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarTogglerDemo02"
          aria-controls="navbarTogglerDemo02"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                className="nav-link active"
                aria-current="page"
                to="/category/camisetas"
              >
                Camisetas
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link active"
                aria-current="page"
                to="/category/pantalones"
              >
                Pantalones
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link active"
                aria-current="page"
                to="/category/camperas"
              >
                Camperas
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link active"
                aria-current="page"
                to="/category/buzos"
              >
                Buzos
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link active"
                aria-current="page"
                to="/category/zapatillas"
              >
                Zapatillas
              </Link>
            </li>
            <li>{getQuantity() > 0 && <CartWidget />}</li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
