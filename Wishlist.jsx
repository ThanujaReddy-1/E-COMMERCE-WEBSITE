import { useEffect, useState } from "react";

function Wishlist() {
  const [wishlistItems, setWishlistItems] = useState([]);

  useEffect(() => {
    const savedWishlist =
      JSON.parse(localStorage.getItem("wishlist")) || [];

    setWishlistItems(savedWishlist);
  }, []);

  const removeFromWishlist = (productId) => {
    const updatedWishlist = wishlistItems.filter(
      (item) => item.id !== productId
    );

    setWishlistItems(updatedWishlist);

    localStorage.setItem(
      "wishlist",
      JSON.stringify(updatedWishlist)
    );
  };

  const moveToCart = (product) => {
    const cart =
      JSON.parse(localStorage.getItem("cart")) || [];

    const alreadyInCart = cart.some(
      (item) => item.id === product.id
    );

    if (!alreadyInCart) {
      cart.push(product);
      localStorage.setItem("cart", JSON.stringify(cart));
    }

    removeFromWishlist(product.id);

    alert(`${product.name} moved to cart`);
  };

  return (
    <div style={{ padding: "30px" }}>
      <h1>My Wishlist</h1>

      {wishlistItems.length === 0 ? (
        <h2>Your wishlist is empty</h2>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(230px, 1fr))",
            gap: "20px",
          }}
        >
          {wishlistItems.map((product) => (
            <div
              key={product.id}
              style={{
                border: "1px solid #ddd",
                borderRadius: "12px",
                padding: "15px",
                textAlign: "center",
                background: "white",
                boxShadow:
                  "0 4px 12px rgba(0, 0, 0, 0.1)",
              }}
            >
              <img
                src={product.image}
                alt={product.name}
                style={{
                  width: "100%",
                  height: "200px",
                  objectFit: "cover",
                  borderRadius: "8px",
                }}
              />

              <h2>{product.name}</h2>

              <p>{product.category}</p>

              <h3>
                ₹{product.price.toLocaleString("en-IN")}
              </h3>

              <div
                style={{
                  display: "flex",
                  gap: "8px",
                  justifyContent: "center",
                  flexWrap: "wrap",
                }}
              >
                <button
                  onClick={() => moveToCart(product)}
                  style={{
                    padding: "10px 16px",
                    border: "none",
                    borderRadius: "7px",
                    background: "#1f2937",
                    color: "white",
                    cursor: "pointer",
                  }}
                >
                  Move to Cart
                </button>

                <button
                  onClick={() =>
                    removeFromWishlist(product.id)
                  }
                  style={{
                    padding: "10px 16px",
                    border: "none",
                    borderRadius: "7px",
                    background: "#dc2626",
                    color: "white",
                    cursor: "pointer",
                  }}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Wishlist;