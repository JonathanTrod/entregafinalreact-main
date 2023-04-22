const products = [
  {
    id: 1,
    name: "Camiseta Boca Juniors Titular",
    category: "camisetas",
    price: 10000,
    img: "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/8b8aef7005e2450a8a26ada9016e071d_9366/camiseta-titular-boca-juniors-21-22.jpg",
    stock: 15,
    description: "Hombre fútbol",
  },
  {
    id: 2,
    name: "Short Boca Juniors Titular",
    category: "pantalones",
    price: 6500,
    img: "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/a6abea7164794158948eae4d0180fd68_9366/Shorts_Tercera_Boca_Juniors_22-23_Azul_HB0513_01_laydown.jpg",
    stock: 25,
    description: "Hombre fútbol",
  },
  {
    id: 3,
    name: "Buzo con capucha estampada Boca Juniors",
    category: "buzos",
    price: 9000,
    img: "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/a0d7c09f58ab47938d2babea00760fac_9366/buzo-con-capucha-estampada-boca-juniors-adn.jpg",
    stock: 25,
    description: "Hombre fútbol",
  },
  {
    id: 4,
    name: "Zapatillas Duramo SL",
    category: "zapatillas",
    price: 15000,
    img: "https://www.digitalsport.com.ar/files/products/615348d498a31-549013-500x500.jpg",
    stock: 25,
    description: "Zapatillas hombre",
  },
  {
    id: 5,
    name: "Campera deportiva Boca Juniors 3 tiras",
    category: "camperas",
    price: 12500,
    img: "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/43f6af4df6514c0e9737ad8200788453_9366/Campera_Deportiva_Boca_Juniors_3_Tiras_Azul_GU9589_21_model.jpg",
    stock: 25,
    description: "Campera hombre",
  },
];

export default products;

export const getProductsByCategory = (categoryId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(products.filter((prod) => prod.category === categoryId));
    }, 2000);
  });
};

export const getProductById = (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(products.find((prod) => prod.id === parseInt(id)));
    }, 2000);
  });
};
