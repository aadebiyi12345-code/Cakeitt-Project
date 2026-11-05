const API = "http://127.0.0.1:8000";

const form = document.getElementById("login-form");

if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("login-email").value.trim();
    const password = document.getElementById("login-password").value;

    try {
      const response = await fetch(`${API}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (data.error) {
        alert(data.error);
        return;
      }

      // Save token & user info
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      alert("Login successful ");
      window.location.href = "index.html";

    } catch (err) {
      console.error("Login error:", err);
      alert("Login failed. Make sure the API is running.");
    }
  });
}