import { useState } from "react";
import Navbar from "../components/Navbar";
import "./Home.css";

const products = [
  {
    id: 1,
    name: "Laptop",
    category: "Electronics",
    price: 50000,
    image:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600",
  },
  {
    id: 2,
    name: "Headphones",
    category: "Electronics",
    price: 2000,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600",
  },
  {
    id: 3,
    name: "Smart Watch",
    category: "Electronics",
    price: 3000,
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600",
  },
  {
    id: 4,
    name: "Smartphone",
    category: "Electronics",
    price: 25000,
    image:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600",
  },
  {
    id: 5,
    name: "Camera",
    category: "Electronics",
    price: 45000,
    image:
      "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=600",
  },
  {
    id: 6,
    name: "Bluetooth Speaker",
    category: "Electronics",
    price: 3500,
    image:
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600",
  },
  {
    id: 7,
    name: "Boys T-Shirt",
    category: "Boys",
    price: 799,
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600",
  },
  {
    id: 8,
    name: "Boys Jeans",
    category: "Boys",
    price: 1499,
    image:
      "https://images.unsplash.com/photo-1542272604-787c3835535d?w=600",
  },
  {
    id: 9,
    name: "Boys Shoes",
    category: "Boys",
    price: 2499,
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600",
  },
  {
    id: 10,
    name: "Boys Jacket",
    category: "Boys",
    price: 2999,
    image:
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600",
  },
  {
    id: 11,
    name: "Girls Dress",
    category: "Girls",
    price: 1999,
    image:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600",
  },
  {
    id: 12,
    name: "Girls Handbag",
    category: "Girls",
    price: 1800,
    image:
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600",
  },
  {
    id: 13,
    name: "Girls Shoes",
    category: "Girls",
    price: 2200,
    image:
      "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600",
  },
  {
    id: 14,
    name: "Girls Sunglasses",
    category: "Girls",
    price: 1200,
    image:
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600",
  },
  {
    id: 15,
    name: "Novel Book",
    category: "Books",
    price: 499,
    image:
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600",
  },
  {
    id: 16,
    name: "Cooking Pan",
    category: "Kitchen",
    price: 1200,
    image:
      "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=600",
  },
  {
    id: 17,
    name: "Teddy Bear",
    category: "Toys",
    price: 999,
    image:
      "https://images.unsplash.com/photo-1562040506-a9b32cb51b94?w=600",
  },
];

const categories = [
  "All",
  "Electronics",
  "Boys",
  "Girls",
  "Books",
  "Kitchen",
  "Toys",
];

function Home() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter(
          (product) => product.category === selectedCategory
        );

  const addToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const alreadyExists = cart.some(
      (item) => item.id === product.id
    );

    if (alreadyExists) {
      alert(`${product.name} is already in the cart`);
      return;
    }

    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));

    alert(`${product.name} added to cart`);
  };

  const addToWishlist = (product) => {
    const wishlist =
      JSON.parse(localStorage.getItem("wishlist")) || [];

    const alreadyExists = wishlist.some(
      (item) => item.id === product.id
    );

    if (alreadyExists) {
      alert(`${product.name} is already in the wishlist`);
      return;
    }

    wishlist.push(product);
    localStorage.setItem(
      "wishlist",
      JSON.stringify(wishlist)
    );

    alert(`${product.name} added to wishlist`);
  };

  return (
    <main className="home-page">
      <Navbar />
      <h1>Our Products</h1>

      <div className="filters">
        {categories.map((category) => (
          <button
            key={category}
            className={
              selectedCategory === category
                ? "filter-button active"
                : "filter-button"
            }
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="products-container">
        {filteredProducts.map((product) => (
          <article className="product-card" key={product.id}>
            <img
              src={product.image}
              alt={product.name}
              className="product-image"
            />

            <h2>{product.name}</h2>

            <p className="category-name">
              {product.category}
            </p>

            <p className="price">
              ₹{product.price.toLocaleString("en-IN")}
            </p>

            <div className="product-buttons">
              <button
                className="cart-button"
                onClick={() => addToCart(product)}
              >
                Add to Cart
              </button>

              <button
                className="wishlist-button"
                onClick={() => addToWishlist(product)}
              >
                Add to Wishlist
              </button>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}

export default Home;