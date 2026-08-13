document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  const emailInput = document.getElementById("emailInput");
  const passwordInput = document.getElementById("passwordInput");

  if (!loginForm || !emailInput || !passwordInput) {
    return;
  }

  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    if (!email || !password) {
      alert("Please enter both email and password.");
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/api/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Store JWT tokens
        if (data.access) {
          localStorage.setItem("access_token", data.access);
        }
        if (data.refresh) {
          localStorage.setItem("refresh_token", data.refresh);
        }

        // Store user data
        const user = data.user || {};
        const safeUser = {
          id: user.id,
          username: user.username || user.email || "",
          email: user.email || "",
          name: user.name || user.username || user.email || "",
        };
        localStorage.setItem("user", JSON.stringify(safeUser));

        // Store farmer data if available
        if (data.farmer) {
          localStorage.setItem("farmer", JSON.stringify(data.farmer));
        }

        alert("Login successful!");
        window.location.href = "index.html";
      } else {
        alert(data.error || "Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error("Error connecting to backend:", error);
      alert(
        "Cannot connect to server. Ensure Django server is running on http://127.0.0.1:8000.",
      );
    }
  });
});
