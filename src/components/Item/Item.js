import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import "./Item.css";

const Item = ({ item }) => {
  return (
    <div className="crd">
      <Card style={{ width: "18rem" }} key={item.id}>
        <Card.Img variant="top" src={item.img} />
        <Card.Body>
          <Card.Title>{item.name}</Card.Title>
          <Card.Text>${item.price}</Card.Text>
          <Button variant="primary">
            <Link to={`/item/${item.id}`} className="Link">
              {" "}
              Detalle{" "}
            </Link>
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Item;
