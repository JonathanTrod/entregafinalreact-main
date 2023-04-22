import {
  getDocs,
  collection,
  query,
  where,
  doc,
  getDoc,
  writeBatch,
  documentId,
  addDoc,
  Timestamp,
} from "firebase/firestore";
import { firestoreDb } from "./index";
import { createAdaptedProduct } from "../../adapters/productAdapters";

export const getProducts = (categoryId) => {
  return new Promise((resolve, reject) => {
    const collectionRef = categoryId
      ? query(
          collection(firestoreDb, "products"),
          where("category", "==", categoryId)
        )
      : collection(firestoreDb, "products");

    getDocs(collectionRef)
      .then((querySnapshot) => {
        const products = querySnapshot.docs.map((doc) => {
          return createAdaptedProduct(doc);
        });
        resolve(products);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const getProductById = (productId) => {
  return new Promise((resolve, reject) => {
    const docRef = doc(firestoreDb, "products", productId);

    getDoc(docRef)
      .then((querySnapshot) => {
        const product = createAdaptedProduct(querySnapshot);
        resolve(product);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const createOrderAndUpdateStock = (cart, objOrder) => {
  return new Promise((resolve) => {
    const objOrderWithTimestamp = {
      ...objOrder,
      date: Timestamp.fromDate(new Date()),
    };

    const batch = writeBatch(firestoreDb);
    const outOfStock = [];

    const ids = cart.map((prod) => prod.id);
    const collectionRef = collection(firestoreDb, "products");

    getDocs(query(collectionRef, where(documentId(), "in", ids)))
      .then((response) => {
        response.docs.forEach((doc) => {
          const dataDoc = doc.data();
          const prodQuantity = objOrder.items.find(
            (prod) => prod.id === doc.id
          ).quantity;

          if (dataDoc.stock >= prodQuantity) {
            batch.update(doc.ref, { stock: dataDoc.stock - prodQuantity });
          } else {
            outOfStock.push({ id: doc.id, dataDoc });
          }
        });
      })
      .then(() => {
        if (outOfStock.length === 0) {
          const collectionRef = collection(firestoreDb, "orders");
          return addDoc(collectionRef, objOrderWithTimestamp);
        } else {
          return Promise.reject({
            name: "outOfStockError",
            products: outOfStock,
          });
        }
      })
      .then(({ id }) => {
        batch.commit();
        resolve(id);
      })
      .catch((error) => {
        resolve(error);
      });
  });
};
