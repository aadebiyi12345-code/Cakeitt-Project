const API = "http://127.0.0.1:8000";

const form = document.getElementById("signup-form");

if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("signup-name").value.trim();
    const email = document.getElementById("signup-email").value.trim();
    const password = document.getElementById("signup-password").value;
    const room = document.getElementById("signup-room").value.trim();

    try {
      const response = await fetch(`${API}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, room })
      });

      const data = await response.json();

      if (data.error) {
        alert(data.error);
        return;
      }

      alert("Signup successful ");
      window.location.href = "login.html";

    } catch (err) {
      console.error("Signup error:", err);
      alert("Signup failed. Make sure the API is running.");
    }
  });
}