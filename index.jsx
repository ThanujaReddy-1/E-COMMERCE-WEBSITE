import { useState } from "react";
import { Navbar } from "../../components/Navbar";
import "./index.css";

const products = [
  {
    id: 1,
    title: "Classic T-Shirt",
    price: 499,
    category: "Clothing",
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=500&q=80",
  },
  {
    id: 2,
    title: "Running Shoes",
    price: 1499,
    category: "Footwear",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=500&q=80",
  },
  {
    id: 3,
    title: "Smart Watch",
    price: 2499,
    category: "Electronics",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=500&q=80",
  },
  {
    id: 4,
    title: "Headphones",
    price: 999,
    category: "Electronics",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=500&q=80",
  },
  {
    id: 5,
    title: "Casual Shirt",
    price: 799,
    category: "Clothing",
    image:
      "https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&w=500&q=80",
  },
  {
    id: 6,
    title: "Casual Shoes",
    price: 1199,
    category: "Footwear",
    image:
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=500&q=80",
  },
];

export const Home = () => {
  const [cart, setCart] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const addToCart = (product) => {
    const productExists = cart.find((item) => item.id === product.id);

    if (productExists) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter((item) => item.id !== productId));
  };

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter(
          (product) => product.category === selectedCategory
        );

  const totalItems = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <>
      <Navbar cartCount={totalItems} />

      <main className="product-page">
        <h2>Our Products</h2>

        <div className="filter-section">
          <button
            className={selectedCategory === "All" ? "active-filter" : ""}
            onClick={() => setSelectedCategory("All")}
          >
            All
          </button>

          <button
            className={
              selectedCategory === "Clothing" ? "active-filter" : ""
            }
            onClick={() => setSelectedCategory("Clothing")}
          >
            Clothing
          </button>

          <button
            className={
              selectedCategory === "Footwear" ? "active-filter" : ""
            }
            onClick={() => setSelectedCategory("Footwear")}
          >
            Footwear
          </button>

          <button
            className={
              selectedCategory === "Electronics" ? "active-filter" : ""
            }
            onClick={() => setSelectedCategory("Electronics")}
          >
            Electronics
          </button>
        </div>

        <div className="product-grid">
          {filteredProducts.map((product) => (
            <div className="product-card" key={product.id}>
              <img src={product.image} alt={product.title} />

              <div className="product-info">
                <h3>{product.title}</h3>
                <p className="product-category">{product.category}</p>
                <p>₹{product.price}</p>

                <button onClick={() => addToCart(product)}>
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>

        <section className="cart-section">
          <h2>Shopping Cart</h2>

          {cart.length === 0 ? (
            <p>Your cart is empty</p>
          ) : (
            <>
              {cart.map((item) => (
                <div className="cart-item" key={item.id}>
                  <div>
                    <h3>{item.title}</h3>
                    <p>
                      ₹{item.price} × {item.quantity}
                    </p>
                  </div>

                  <button onClick={() => removeFromCart(item.id)}>
                    Remove
                  </button>
                </div>
              ))}

              <h3 className="cart-total">Total: ₹{totalPrice}</h3>
            </>
          )}
        </section>
      </main>
    </>
  );
};