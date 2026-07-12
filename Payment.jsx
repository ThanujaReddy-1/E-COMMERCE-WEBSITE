import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Payment() {
  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] =
    useState("card");

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
    upiId: "",
    bank: "",
  });

  const cartItems =
    JSON.parse(localStorage.getItem("cart")) || [];

  const totalPrice = cartItems.reduce(
    (total, item) => total + Number(item.price),
    0
  );

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  const formatCardNumber = (event) => {
    const numbersOnly = event.target.value.replace(
      /\D/g,
      ""
    );

    const formattedValue = numbersOnly
      .slice(0, 16)
      .replace(/(.{4})/g, "$1 ")
      .trim();

    setFormData((previousData) => ({
      ...previousData,
      cardNumber: formattedValue,
    }));
  };

  const handlePayment = (event) => {
    event.preventDefault();

    if (cartItems.length === 0) {
      alert("Your cart is empty");
      navigate("/cart");
      return;
    }

    if (
      !formData.name.trim() ||
      !formData.phone.trim() ||
      !formData.address.trim()
    ) {
      alert(
        "Please enter your name, phone number and delivery address"
      );
      return;
    }

    if (paymentMethod === "card") {
      if (
        formData.cardNumber.replace(/\s/g, "").length !==
          16 ||
        !formData.expiry.trim() ||
        formData.cvv.length !== 3
      ) {
        alert("Please enter valid card details");
        return;
      }
    }

    if (
      paymentMethod === "upi" &&
      !formData.upiId.includes("@")
    ) {
      alert("Please enter a valid UPI ID");
      return;
    }

    if (
      paymentMethod === "netbanking" &&
      !formData.bank
    ) {
      alert("Please select a bank");
      return;
    }

    const order = {
      orderId: `ORDER-${Date.now()}`,
      products: cartItems,
      total: totalPrice,
      customerName: formData.name,
      phone: formData.phone,
      address: formData.address,
      paymentMethod,
      orderDate: new Date().toLocaleString(),
    };

    const previousOrders =
      JSON.parse(localStorage.getItem("orders")) || [];

    previousOrders.push(order);

    localStorage.setItem(
      "orders",
      JSON.stringify(previousOrders)
    );

    localStorage.removeItem("cart");

    if (paymentMethod === "cod") {
      alert("Order placed successfully!");
    } else {
      alert("Demo payment successful! Order placed.");
    }

    navigate("/");
  };

  return (
    <main style={styles.page}>
      <section style={styles.paymentBox}>
        <button
          type="button"
          style={styles.backButton}
          onClick={() => navigate("/cart")}
        >
          ← Back to Cart
        </button>

        <h1 style={styles.heading}>Checkout</h1>

        <section style={styles.summary}>
          <h2 style={styles.sectionHeading}>
            Order Summary
          </h2>

          {cartItems.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.id}
                style={styles.summaryItem}
              >
                <span>{item.name}</span>

                <span>
                  ₹
                  {Number(item.price).toLocaleString(
                    "en-IN"
                  )}
                </span>
              </div>
            ))
          )}

          <hr style={styles.divider} />

          <div style={styles.totalRow}>
            <strong>Total</strong>

            <strong>
              ₹{totalPrice.toLocaleString("en-IN")}
            </strong>
          </div>
        </section>

        <form onSubmit={handlePayment}>
          <h2 style={styles.sectionHeading}>
            Delivery Details
          </h2>

          <label style={styles.label}>Full Name</label>

          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your full name"
            style={styles.input}
          />

          <label style={styles.label}>
            Phone Number
          </label>

          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter your phone number"
            maxLength="10"
            style={styles.input}
          />

          <label style={styles.label}>
            Delivery Address
          </label>

          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Enter your complete delivery address"
            style={styles.textarea}
          />

          <h2 style={styles.sectionHeading}>
            Select Payment Method
          </h2>

          <div style={styles.paymentOptions}>
            <PaymentOption
              value="card"
              label="💳 Credit / Debit Card"
              selectedMethod={paymentMethod}
              setSelectedMethod={setPaymentMethod}
            />

            <PaymentOption
              value="upi"
              label="📱 UPI"
              selectedMethod={paymentMethod}
              setSelectedMethod={setPaymentMethod}
            />

            <PaymentOption
              value="netbanking"
              label="🏦 Net Banking"
              selectedMethod={paymentMethod}
              setSelectedMethod={setPaymentMethod}
            />

            <PaymentOption
              value="cod"
              label="💵 Cash on Delivery"
              selectedMethod={paymentMethod}
              setSelectedMethod={setPaymentMethod}
            />
          </div>

          {paymentMethod === "card" && (
            <section style={styles.methodBox}>
              <label style={styles.label}>
                Card Number
              </label>

              <input
                type="text"
                name="cardNumber"
                value={formData.cardNumber}
                onChange={formatCardNumber}
                placeholder="1234 5678 9012 3456"
                maxLength="19"
                style={styles.input}
              />

              <div style={styles.row}>
                <div style={styles.column}>
                  <label style={styles.label}>
                    Expiry Date
                  </label>

                  <input
                    type="text"
                    name="expiry"
                    value={formData.expiry}
                    onChange={handleChange}
                    placeholder="MM/YY"
                    maxLength="5"
                    style={styles.input}
                  />
                </div>

                <div style={styles.column}>
                  <label style={styles.label}>
                    CVV
                  </label>

                  <input
                    type="password"
                    name="cvv"
                    value={formData.cvv}
                    onChange={handleChange}
                    placeholder="123"
                    maxLength="3"
                    style={styles.input}
                  />
                </div>
              </div>
            </section>
          )}

          {paymentMethod === "upi" && (
            <section style={styles.methodBox}>
              <label style={styles.label}>UPI ID</label>

              <input
                type="text"
                name="upiId"
                value={formData.upiId}
                onChange={handleChange}
                placeholder="yourname@upi"
                style={styles.input}
              />

              <p style={styles.helpText}>
                Example: name@paytm, name@ybl or
                name@okaxis
              </p>
            </section>
          )}

          {paymentMethod === "netbanking" && (
            <section style={styles.methodBox}>
              <label style={styles.label}>
                Select Bank
              </label>

              <select
                name="bank"
                value={formData.bank}
                onChange={handleChange}
                style={styles.input}
              >
                <option value="">
                  Choose your bank
                </option>

                <option value="sbi">
                  State Bank of India
                </option>

                <option value="hdfc">
                  HDFC Bank
                </option>

                <option value="icici">
                  ICICI Bank
                </option>

                <option value="axis">
                  Axis Bank
                </option>

                <option value="canara">
                  Canara Bank
                </option>
              </select>
            </section>
          )}

          {paymentMethod === "cod" && (
            <section style={styles.methodBox}>
              <h3 style={styles.codHeading}>
                Cash on Delivery
              </h3>

              <p style={styles.helpText}>
                Pay when the order is delivered to your
                address.
              </p>
            </section>
          )}

          <button
            type="submit"
            style={styles.payButton}
            disabled={cartItems.length === 0}
          >
            {paymentMethod === "cod"
              ? "Place Order"
              : `Pay ₹${totalPrice.toLocaleString(
                  "en-IN"
                )}`}
          </button>
        </form>

        <p style={styles.demoWarning}>
          Demo checkout only. This page does not process real
          card, UPI or bank payments.
        </p>
      </section>
    </main>
  );
}

function PaymentOption({
  value,
  label,
  selectedMethod,
  setSelectedMethod,
}) {
  const isSelected = selectedMethod === value;

  return (
    <label
      style={{
        ...styles.option,
        ...(isSelected
          ? styles.selectedOption
          : {}),
      }}
    >
      <input
        type="radio"
        name="paymentMethod"
        value={value}
        checked={isSelected}
        onChange={() => setSelectedMethod(value)}
      />

      <span>{label}</span>
    </label>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    padding: "40px 20px",
    background:
      "linear-gradient(135deg, #f8f7ff, #f3f7ff, #fff7fb)",
  },

  paymentBox: {
    maxWidth: "680px",
    margin: "0 auto",
    padding: "30px",
    background: "#ffffff",
    borderRadius: "18px",
    boxShadow: "0 12px 35px rgba(0, 0, 0, 0.1)",
  },

  backButton: {
    padding: "9px 14px",
    border: "1px solid #7c3aed",
    borderRadius: "8px",
    background: "#ffffff",
    color: "#7c3aed",
    fontWeight: "600",
    cursor: "pointer",
  },

  heading: {
    marginTop: "20px",
    marginBottom: "25px",
    textAlign: "center",
    fontSize: "36px",
    color: "#1f2937",
  },

  sectionHeading: {
    marginTop: "10px",
    marginBottom: "16px",
    fontSize: "21px",
    color: "#1f2937",
  },

  summary: {
    marginBottom: "28px",
    padding: "20px",
    background: "#f8f7ff",
    borderRadius: "13px",
  },

  summaryItem: {
    display: "flex",
    justifyContent: "space-between",
    gap: "15px",
    marginBottom: "10px",
  },

  divider: {
    margin: "15px 0",
    border: 0,
    borderTop: "1px solid #ddd",
  },

  totalRow: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: "20px",
  },

  label: {
    display: "block",
    marginBottom: "7px",
    fontWeight: "600",
    color: "#374151",
  },

  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "18px",
    border: "1px solid #d1d5db",
    borderRadius: "9px",
    fontSize: "16px",
    outline: "none",
    boxSizing: "border-box",
  },

  textarea: {
    width: "100%",
    minHeight: "95px",
    padding: "12px",
    marginBottom: "24px",
    border: "1px solid #d1d5db",
    borderRadius: "9px",
    fontSize: "16px",
    resize: "vertical",
    boxSizing: "border-box",
  },

  paymentOptions: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit, minmax(210px, 1fr))",
    gap: "12px",
    marginBottom: "20px",
  },

  option: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "14px",
    border: "1px solid #d1d5db",
    borderRadius: "11px",
    cursor: "pointer",
    background: "#ffffff",
    fontWeight: "600",
  },

  selectedOption: {
    border: "2px solid #7c3aed",
    background: "#f4f0ff",
    color: "#6d28d9",
  },

  methodBox: {
    marginBottom: "22px",
    padding: "20px",
    background: "#fafafa",
    border: "1px solid #ececec",
    borderRadius: "12px",
  },

  row: {
    display: "flex",
    gap: "15px",
  },

  column: {
    flex: 1,
  },

  helpText: {
    margin: 0,
    color: "#6b7280",
    lineHeight: "1.5",
  },

  codHeading: {
    marginTop: 0,
    marginBottom: "8px",
  },

  payButton: {
    width: "100%",
    padding: "15px",
    border: "none",
    borderRadius: "10px",
    background:
      "linear-gradient(135deg, #7c3aed, #9333ea)",
    color: "#ffffff",
    fontSize: "17px",
    fontWeight: "700",
    cursor: "pointer",
  },

  demoWarning: {
    marginTop: "18px",
    marginBottom: 0,
    textAlign: "center",
    color: "#b45309",
    fontSize: "14px",
  },
};

export default Payment;