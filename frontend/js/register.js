document.addEventListener("DOMContentLoaded", () => {
  const registerForm = document.getElementById("loginForm");
  const nameInput = document.getElementById("nameInput");
  const emailInput = document.getElementById("emailInput");
  const passwordInput = document.getElementById("passwordInput");

  if (!registerForm || !nameInput || !emailInput || !passwordInput) {
    return;
  }

  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    if (!name || !email || !password) {
      alert("Please enter all the details.");
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/api/register/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        const user = data.user || {};
        const safeUser = {
          id: user.id,
          username: user.username || user.email || "",
          email: user.email || "",
          name: user.name || user.username || user.email || "",
        };

        localStorage.setItem("user", JSON.stringify(safeUser));

        alert("Registration successful!");
        window.location.href = "index.html";
      } else {
        alert(data.error || "Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("Error connecting to backend:", error);
      alert(
        "Cannot connect to server. Ensure Django server is running on http://127.0.0.1:8000.",
      );
    }
  });
});
