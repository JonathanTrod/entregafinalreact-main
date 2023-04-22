import './App.css';
import NavBar from './components/NavBar/NavBar.js';
import InitialPage from './components/InitialPage/InitialPage';
import ItemDetailContainer from './components/ItemDetailContainer/ItemDetailContainer';
import ItemListContainer from './components/ItemListContainer/ItemListContainer';
import Cart from './components/Cart/Cart'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartContextProvider } from "./components/Context/CartContext";
import { NotificationProvider } from "./notification/notification";

function App() {
  return (
    <>
      <NotificationProvider>
        <CartContextProvider>
          <BrowserRouter>
            <NavBar />
            <Routes>
              <Route path="/" element={<InitialPage />} />
              <Route
                path="/category/:categoryId"
                element={<ItemListContainer />}
              />
              <Route path="/item/:itemId" element={<ItemDetailContainer />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="*" element={<h1>404</h1>} />
            </Routes>
          </BrowserRouter>
        </CartContextProvider>
      </NotificationProvider>
    </>
  );
}

export default App;
