import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Cart() {
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const savedCart =
      JSON.parse(localStorage.getItem("cart")) || [];

    setCartItems(savedCart);
  }, []);

  const removeFromCart = (productId) => {
    const updatedCart = cartItems.filter(
      (item) => item.id !== productId
    );

    setCartItems(updatedCart);

    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );
  };

  const clearCart = () => {
    localStorage.removeItem("cart");
    setCartItems([]);
  };

  const totalPrice = cartItems.reduce(
    (total, item) => total + Number(item.price),
    0
  );

  const proceedToPayment = () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty");
      return;
    }

    navigate("/payment");
  };

  return (
    <main style={styles.page}>
      <div style={styles.header}>
        <button
          style={styles.backButton}
          onClick={() => navigate("/")}
        >
          ← Continue Shopping
        </button>

        <h1 style={styles.heading}>My Cart</h1>
      </div>

      {cartItems.length === 0 ? (
        <section style={styles.emptyBox}>
          <h2>Your cart is empty</h2>

          <p style={styles.emptyText}>
            Add some products before continuing to payment.
          </p>

          <button
            style={styles.shoppingButton}
            onClick={() => navigate("/")}
          >
            View Products
          </button>
        </section>
      ) : (
        <>
          <section style={styles.productsGrid}>
            {cartItems.map((product) => (
              <article
                key={product.id}
                style={styles.productCard}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  style={styles.productImage}
                />

                <h2 style={styles.productName}>
                  {product.name}
                </h2>

                <p style={styles.category}>
                  {product.category}
                </p>

                <p style={styles.price}>
                  ₹
                  {Number(product.price).toLocaleString(
                    "en-IN"
                  )}
                </p>

                <button
                  style={styles.removeButton}
                  onClick={() =>
                    removeFromCart(product.id)
                  }
                >
                  Remove from Cart
                </button>
              </article>
            ))}
          </section>

          <section style={styles.checkoutBox}>
            <div style={styles.summaryRow}>
              <span>Number of products</span>
              <strong>{cartItems.length}</strong>
            </div>

            <div style={styles.totalRow}>
              <span>Total Amount</span>

              <span>
                ₹{totalPrice.toLocaleString("en-IN")}
              </span>
            </div>

            <button
              style={styles.paymentButton}
              onClick={proceedToPayment}
            >
              Proceed to Payment
            </button>

            <button
              style={styles.continueButton}
              onClick={() => navigate("/")}
            >
              Continue Shopping
            </button>

            <button
              style={styles.clearButton}
              onClick={clearCart}
            >
              Clear Cart
            </button>
          </section>
        </>
      )}
    </main>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    padding: "35px 20px",
    background:
      "linear-gradient(135deg, #f8f7ff, #f3f7ff, #fff7fb)",
  },

  header: {
    maxWidth: "1200px",
    margin: "0 auto 30px",
  },

  heading: {
    margin: "20px 0 0",
    textAlign: "center",
    fontSize: "38px",
    color: "#1f2937",
  },

  backButton: {
    padding: "10px 16px",
    border: "1px solid #7c3aed",
    borderRadius: "8px",
    background: "#ffffff",
    color: "#7c3aed",
    fontWeight: "600",
    cursor: "pointer",
  },

  emptyBox: {
    maxWidth: "520px",
    margin: "70px auto",
    padding: "40px",
    textAlign: "center",
    background: "#ffffff",
    borderRadius: "18px",
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
  },

  emptyText: {
    color: "#6b7280",
    marginBottom: "25px",
  },

  shoppingButton: {
    padding: "12px 22px",
    border: "none",
    borderRadius: "9px",
    background: "#7c3aed",
    color: "#ffffff",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
  },

  productsGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit, minmax(230px, 1fr))",
    gap: "24px",
    maxWidth: "1200px",
    margin: "0 auto",
  },

  productCard: {
    padding: "16px",
    textAlign: "center",
    background: "#ffffff",
    borderRadius: "16px",
    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.09)",
  },

  productImage: {
    width: "100%",
    height: "210px",
    objectFit: "cover",
    borderRadius: "11px",
  },

  productName: {
    margin: "15px 0 6px",
    color: "#1f2937",
  },

  category: {
    margin: "0 0 8px",
    color: "#7c3aed",
    fontWeight: "600",
  },

  price: {
    margin: "10px 0 15px",
    fontSize: "21px",
    fontWeight: "700",
  },

  removeButton: {
    width: "100%",
    padding: "11px",
    border: "none",
    borderRadius: "8px",
    background: "#dc2626",
    color: "#ffffff",
    fontWeight: "600",
    cursor: "pointer",
  },

  checkoutBox: {
    maxWidth: "600px",
    margin: "35px auto 0",
    padding: "25px",
    background: "#ffffff",
    borderRadius: "16px",
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
  },

  summaryRow: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "15px",
    color: "#4b5563",
  },

  totalRow: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "22px",
    paddingTop: "16px",
    borderTop: "1px solid #e5e7eb",
    fontSize: "24px",
    fontWeight: "700",
    color: "#1f2937",
  },

  paymentButton: {
    width: "100%",
    padding: "14px",
    border: "none",
    borderRadius: "9px",
    background:
      "linear-gradient(135deg, #7c3aed, #9333ea)",
    color: "#ffffff",
    fontSize: "17px",
    fontWeight: "700",
    cursor: "pointer",
  },

  continueButton: {
    width: "100%",
    padding: "13px",
    marginTop: "10px",
    border: "1px solid #7c3aed",
    borderRadius: "9px",
    background: "#ffffff",
    color: "#7c3aed",
    fontSize: "16px",
    fontWeight: "700",
    cursor: "pointer",
  },

  clearButton: {
    width: "100%",
    padding: "12px",
    marginTop: "10px",
    border: "none",
    borderRadius: "9px",
    background: "#fee2e2",
    color: "#b91c1c",
    fontSize: "15px",
    fontWeight: "700",
    cursor: "pointer",
  },
};

export default Cart;