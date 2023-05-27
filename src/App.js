import Product from "./components/Products/Products";
import Cart from "./components/Cart/Cart";
import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const App = () => {
  const [cart, setCart] = useState([]);

  return (
    <div>
      <Router>
        <Routes>
          <Route
            path="/"
            element={<Product cart={cart} setCart={setCart} />}
          ></Route>
          <Route
            path="/cart"
            element={<Cart cart={cart} setCart={setCart} />}
          ></Route>
        </Routes>
      </Router>
    </div>
  );
};

export default App;
