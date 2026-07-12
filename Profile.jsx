import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();

  const user =
    JSON.parse(localStorage.getItem("user")) || {};

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  return (
    <main style={styles.page}>
      <section style={styles.profileCard}>
        <div style={styles.profileIcon}>👤</div>

        <h1 style={styles.heading}>My Profile</h1>

        <div style={styles.detailBox}>
          <p>
            <strong>Name:</strong>{" "}
            {user.name || "User"}
          </p>

          <p>
            <strong>Email:</strong>{" "}
            {user.email || "Email not available"}
          </p>
        </div>

        <button
          type="button"
          style={styles.homeButton}
          onClick={() => navigate("/")}
        >
          Continue Shopping
        </button>

        <button
          type="button"
          style={styles.logoutButton}
          onClick={handleLogout}
        >
          Logout
        </button>
      </section>
    </main>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "30px",
    background:
      "linear-gradient(135deg, #f8f7ff, #f3f7ff, #fff7fb)",
  },

  profileCard: {
    width: "100%",
    maxWidth: "480px",
    padding: "35px",
    textAlign: "center",
    background: "white",
    borderRadius: "18px",
    boxShadow:
      "0 12px 35px rgba(0, 0, 0, 0.1)",
  },

  profileIcon: {
    fontSize: "70px",
  },

  heading: {
    color: "#1f2937",
  },

  detailBox: {
    margin: "25px 0",
    padding: "20px",
    textAlign: "left",
    background: "#f8f7ff",
    borderRadius: "12px",
  },

  homeButton: {
    width: "100%",
    padding: "13px",
    marginBottom: "10px",
    border: "none",
    borderRadius: "9px",
    background: "#7c3aed",
    color: "white",
    fontSize: "16px",
    fontWeight: "700",
    cursor: "pointer",
  },

  logoutButton: {
    width: "100%",
    padding: "13px",
    border: "none",
    borderRadius: "9px",
    background: "#dc2626",
    color: "white",
    fontSize: "16px",
    fontWeight: "700",
    cursor: "pointer",
  },
};

export default Profile;