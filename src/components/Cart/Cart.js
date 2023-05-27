import React from "react";
import { Link } from "react-router-dom";
import "./Cart.css";

const Cart = ({ cart, setCart }) => {
  const increaseQuantity = (productId) => {
    const productToIncrease = cart.find((product) => product._id === productId);
    if (productToIncrease) {
      setCart([...cart, productToIncrease]);
    }
  };

  const decreaseQuantity = (productId) => {
    const updatedCart = [...cart];
    const productIndex = updatedCart.findIndex(
      (item) => item._id === productId
    );
    updatedCart.splice(productIndex, 1);
    setCart(updatedCart);
  };

  const deleteProduct = (productId) => {
    const updatedCart = cart.filter((item) => item._id !== productId);
    setCart(updatedCart);
  };

  // Consolidate items and track their quantities
  const consolidatedCart = cart.reduce((acc, item) => {
    const existingItem = acc.find((i) => i._id === item._id);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      acc.push({ ...item, quantity: 1 });
    }
    return acc;
  }, []);

  return (
    <div>
      <Link to="/">Go back</Link>
      <h2>Your Cart</h2>
      <ul className="cart-list">
        {consolidatedCart.map((item) => (
          <li key={item._id} className="cart-item">
            <div className="cart-item-info">
              <img
                className="cart-item-img"
                src={item.imageUrl}
                alt={item.name}
              />
              <span className="cart-item-name">{item.name}</span>
              <span>Total: {item.quantity}</span>
              <div className="cart-item-actions">
                <button
                  className="button"
                  onClick={() => decreaseQuantity(item._id)}
                >
                  -
                </button>
                <button
                  className="button"
                  onClick={() => increaseQuantity(item._id)}
                >
                  +
                </button>
                <button
                  className="button"
                  onClick={() => deleteProduct(item._id)}
                >
                  Remove Product
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default Cart;
