import React, { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Link } from "react-router-dom";
import "./Products.css";

const Product = ({ cart, setCart }) => {
  const [products, setProducts] = useState([]);
  const [time, setTime] = useState("");
  const [weather, setWeather] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8000/products")
      .then((res) => {
        setProducts(res.data);
        console.log("this loaded");
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  useEffect(() => {
    fetchTimeAndWeatherData();
  }, []);

  const addToCart = (product) => {
    const newCart = [...cart, product];
    setCart(newCart);
  };

  const fetchTimeAndWeatherData = async () => {
    try {
      const timeResponse = await axios.get("http://worldtimeapi.org/api/ip");
      const weatherResponse = await axios.get(
        "http://api.openweathermap.org/data/2.5/weather?q=Tacloban&appid=344e9cedbb3c231ba11c196fc1fe7ac3&units=metric"
      );

      const dateTime = new Date(timeResponse.data.datetime);

      const formattedTime = `${dateTime.toLocaleDateString()} ${dateTime.toLocaleTimeString()}`;

      const weather = weatherResponse.data.weather[0].description;

      setTime(formattedTime);
      setWeather(weather);
    } catch (error) {
      console.error("Error fetching time and weather data:", error);
    }
  };
  return (
    <div>
      <div className="time-weather">
        <span>Time: {time}</span> {/* Display the time data */}
        <span>Weather: {weather}</span> {/* Display the weather data */}
      </div>
      <Link to="/cart" className="cart-link">
        <i className="fas fa-shopping-cart cart-icon"></i>
        <span className="cart-length">({cart.length})</span>
      </Link>
      <ul>
        {products.map((product) => (
          <li key={product._id} className="product-item">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="product-image"
            />
            <span>{product.name}</span>
            <button className="button" onClick={() => addToCart(product)}>
              Add to cart
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default Product;
