import { useState, useEffect } from "react";
import ItemList from "../ItemList/ItemList.js";
import { getProducts } from "../../services/firebase/firestore.js";
import { useParams } from "react-router-dom";

const ItemListContainer = ({ greeting }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { categoryId } = useParams();

  useEffect(() => {
    setLoading(true);

    getProducts(categoryId)
      .then((products) => {
        setProducts(products);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });

    return () => {
      setProducts([]);
    };
  }, [categoryId]);

  if (loading) {
    return <h1>Cargando productos...</h1>;
  }

  if (products.length === 0) {
    return <h1>No hay productos de esta categoria</h1>;
  }

  return (
    <div>
      <h1>{greeting}</h1>
      <ItemList products={products} />
    </div>
  );
};

export default ItemListContainer;
