import { useContext } from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import ItemCount from "../ItemCount/ItemCount";
import CartContext from "../Context/CartContext";
import "./ItemDetail.css";
import { useNotification } from "../../notification/notification";

const ItemDetail = ({ id, name, img, price, stock, description }) => {
  const { addItem, isInCart } = useContext(CartContext);
  const { setNotification } = useNotification();

  const handleOnAdd = (count) => {
    addItem({ id, name, price }, count);
    setNotification(
      "success",
      "Se agregaron correctamente los productos al carrito"
    );
  };

  return (
    <div>
      <Card style={{ width: "18rem" }} key={id}>
        <Card.Img variant="top" src={img} />
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <Card.Text>{description}</Card.Text>
          <Card.Text>${price}</Card.Text>
          {isInCart(id) ? (
            <Button variant="primary">
              <Link to="/cart" className="Link">
                {" "}
                Ir al Carrito{" "}
              </Link>
            </Button>
          ) : (
            <ItemCount onAdd={handleOnAdd} stock={stock} />
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default ItemDetail;
