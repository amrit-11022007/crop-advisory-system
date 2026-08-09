// login.js - Login page functionality
document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  const mobileInput = document.getElementById("mobileInput");

  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const phoneNumber = mobileInput.value.trim();

    if (phoneNumber && phoneNumber.length >= 10) {
      // Simulate OTP sending
      console.log("Sending OTP to:", phoneNumber);

      // Redirect to dashboard after successful login
      setTimeout(() => {
        window.location.href = "dashboard.html";
      }, 1000);
    } else {
      alert("Please enter a valid phone number");
    }
  });

  // Format phone number input
  mobileInput.addEventListener("input", (e) => {
    let value = e.target.value;

    // Ensure +91 prefix stays
    if (!value.startsWith("+91")) {
      value = "+91" + value.replace(/[^0-9]/g, "");
    }

    // Limit to 13 characters (+91 + 10 digits)
    if (value.length > 13) {
      value = value.slice(0, 13);
    }

    e.target.value = value;
  });
});
