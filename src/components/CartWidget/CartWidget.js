import "../CartWidget/CartWidget.css";
import { useContext } from "react";
import { Link } from "react-router-dom";
import CartContext from "../Context/CartContext";

const CartWidget = () => {
  const { getQuantity } = useContext(CartContext);

  return (
    <Link to={"/cart"} id="CartLink">
      <img
        id="CartImg"
        src="https://img.icons8.com/external-xnimrodx-lineal-color-xnimrodx/2x/external-cart-economy-xnimrodx-lineal-color-xnimrodx.png"
        alt="cart"
      />
      <p id="CartQuantity">{getQuantity()}</p>
    </Link>
  );
};

export default CartWidget;
