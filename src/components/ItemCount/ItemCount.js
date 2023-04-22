import { useState } from "react";
import { Button } from "react-bootstrap";
import "./ItemCount.css";

const ItemCount = ({ onAdd, initial = 1, stock }) => {
  const [count, setCount] = useState(initial);

  const increment = () => {
    if (count < stock) {
      setCount(count + 1);
    }
  };

  const decrement = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  return (
    <div>
      <div className="btn">
        <Button variant="primary" onClick={increment}>
          +
        </Button>
      </div>
      <p id="count">{count}</p>
      <div className="btn">
        <Button variant="primary" onClick={decrement}>
          -
        </Button>
      </div>
      <div className="btn">
        <Button variant="primary" onClick={() => onAdd(count)}>
          Agregar al carrito
        </Button>
      </div>
    </div>
  );
};

export default ItemCount;
