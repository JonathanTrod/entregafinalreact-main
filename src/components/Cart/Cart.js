import { useContext } from "react";
import { useState } from "react";
import CartContext from "../Context/CartContext";
import { Button } from "react-bootstrap";
import { useNotification } from "../../notification/notification";
import { createOrderAndUpdateStock } from "../../services/firebase/firestore";
import "./Cart.css";

const Cart = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [showError, setShowError] = useState(false)

  const { cart, clearCart, getTotal, removeItem, getQuantity } =
    useContext(CartContext);

  const { setNotification } = useNotification();

  const createOrder = (event) => {
    event.preventDefault();

    if (!name || !phone || !email) {
      setShowError(true)
      return;
    }

    setLoading(true);

    const objOrder = {
      buyer: {
        name,
        phone,
        email,
      },
      items: cart,
      total: getTotal(),
    };

    console.log(objOrder)

    

    createOrderAndUpdateStock(cart, objOrder)
      .then((id) => {
        clearCart();
        setNotification(
          "success",
          `Orden generada, su código de orden es: ${id}.`
        );
      })
      .catch((error) => {
        if (
          error &&
          error.name === "outOfStockError" &&
          error.products.length > 0
        ) {
          const ids = error.products.map((prod) => prod.id);
          const stringProducts = error.products
            .map((prod) => prod.dataDoc.name)
            .join(", ");
          ids.forEach((id) => removeItem(id));
          setNotification(
            "error",
            `${
              error.products.length > 1 ? "Los productos" : "El producto"
            } ${stringProducts} no ${
              error.products.length > 1 ? "tienen" : "tiene"
            } stock`
          );
        } else {
          console.log(error);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  if (loading) {
    return <h1>Se está procesando la orden</h1>;
  }

  if (getQuantity() === 0) {
    return <h1>No hay productos en el carrito.</h1>;
  }

  return (
    <div>
      <h1>Cart</h1>
      <ul>
        {cart.map((prod) => (
          <li id="cartProducts" key={prod.id}>
            {prod.name} precio uni: {prod.price} cantidad: {prod.quantity}{" "}
            subtotal: {prod.price * prod.quantity}{" "}
            <button id="removeItem" onClick={() => removeItem(prod.id)}>
              x
            </button>
          </li>
        ))}
      </ul>
      <div className="form">
      <h3>Dejanos tus datos para enviarte la factura</h3>
      <form >
        <input type="email" placeholder="Email" required onChange={(event) => setEmail(event.target.value)} className="input" />
        <input type="text" placeholder="Name" required onChange={(event) => setName(event.target.value)}  className="input" />
        <input type="tel" placeholder="Phone" required onChange={(event) => setPhone(event.target.value)}  className="input"/>
     
{showError ? <div className="error">Te faltó completar uno o más campos</div> : null}

      <h2 className="total-title">Total: {getTotal()}</h2>
      <div id="clear-create-buttons">
        <Button variant="primary" onClick={clearCart}>
          Vaciar carrito
        </Button>
        <Button variant="primary" onClick={createOrder} type="submit">
          Confirmar compra
        </Button>
      </div>
      </form>
      </div>
    </div>
  );
};

export default Cart;
