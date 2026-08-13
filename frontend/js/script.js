// app.js - Main application functionality with animated mobile sidebar
document.addEventListener("DOMContentLoaded", () => {
  // ==================== AUTHENTICATION CHECK ====================
  const checkAuth = () => {
    const accessToken = localStorage.getItem("access_token");
    const refreshToken = localStorage.getItem("refresh_token");
    const userData = localStorage.getItem("user");

    if (!accessToken || !userData) {
      // No tokens found, redirect to login
      window.location.href = "/frontend/login.html";
      return false;
    }

    // Optional: Check if token is expired (if you have JWT decode logic)
    try {
      const tokenPayload = JSON.parse(atob(accessToken.split(".")[1]));
      const expirationTime = tokenPayload.exp * 1000; // Convert to milliseconds

      if (Date.now() >= expirationTime) {
        // Token expired, try to refresh
        if (refreshToken) {
          refreshAccessToken(refreshToken);
          return true;
        } else {
          // No refresh token, redirect to login
          clearAuthData();
          window.location.href = "/frontend/login.html";
          return false;
        }
      }
    } catch (error) {
      console.error("Error parsing token:", error);
      // If token parsing fails, redirect to login
      clearAuthData();
      window.location.href = "/frontend/login.html";
      return false;
    }

    return true;
  };

  // Function to refresh access token
  const refreshAccessToken = async (refreshToken) => {
    try {
      const response = await fetch(
        "https://your-backend-url.com/api/token/refresh/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            refresh: refreshToken,
          }),
        },
      );

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("access_token", data.access);
        console.log("Token refreshed successfully");
        return true;
      } else {
        // Refresh failed, clear and redirect
        clearAuthData();
        window.location.href = "/frontend/login.html";
        return false;
      }
    } catch (error) {
      console.error("Token refresh failed:", error);
      clearAuthData();
      window.location.href = "/frontend/login.html";
      return false;
    }
  };

  // Function to clear auth data
  const clearAuthData = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user");
  };

  // Function to make authenticated API calls
  const authenticatedFetch = async (url, options = {}) => {
    const accessToken = localStorage.getItem("access_token");

    if (!accessToken) {
      window.location.href = "/frontend/login.html";
      return null;
    }

    const headers = {
      ...options.headers,
      Authorization: `Bearer ${accessToken}`,
    };

    try {
      let response = await fetch(url, { ...options, headers });

      // If unauthorized, try to refresh token
      if (response.status === 401) {
        const refreshToken = localStorage.getItem("refresh_token");
        if (refreshToken) {
          const refreshSuccess = await refreshAccessToken(refreshToken);
          if (refreshSuccess) {
            // Retry original request with new token
            const newAccessToken = localStorage.getItem("access_token");
            const newHeaders = {
              ...options.headers,
              Authorization: `Bearer ${newAccessToken}`,
            };
            response = await fetch(url, { ...options, headers: newHeaders });
          }
        }
      }

      return response;
    } catch (error) {
      console.error("API call failed:", error);
      return null;
    }
  };

  // ==================== AUTHENTICATION INITIALIZATION ====================
  if (!checkAuth()) {
    return; // Stop execution if not authenticated
  }

  const userNameElement = document.getElementById("userName");
  const avatarElement = document.getElementById("avatar");

  let storedUser = null;

  try {
    const rawUser = localStorage.getItem("user");
    storedUser = rawUser ? JSON.parse(rawUser) : null;
  } catch (error) {
    console.warn("Unable to parse stored user profile.", error);
    storedUser = null;
  }

  if (userNameElement) {
    const safeUserName =
      storedUser?.name ||
      storedUser?.username ||
      storedUser?.full_name ||
      "Guest";
    userNameElement.innerText = safeUserName;
  }

  if (avatarElement) {
    // Get first letter of user's name for avatar
    const safeUserName = storedUser?.name || storedUser?.username || "Guest";
    avatarElement.innerText = safeUserName.charAt(0).toUpperCase();
  }

  // ==================== DOM ELEMENTS ====================
  const sidebar = document.getElementById("sidebar");
  const sidebarOverlay = document.getElementById("sidebarOverlay");
  const hamburgerBtn = document.getElementById("hamburgerBtn");
  const sidebarCloseBtn = document.getElementById("sidebarCloseBtn");
  const mainContent = document.getElementById("mainContent");
  const navButtons = document.querySelectorAll(".nav-btn");
  const mobileNavButtons = document.querySelectorAll(".mobile-nav-btn");
  const viewSections = document.querySelectorAll(".view-section");
  const markDoneBtn = document.getElementById("markDoneBtn");
  const editProfileBtn = document.getElementById("editProfileBtn");
  const logoutBtn = document.getElementById("logoutBtn");
  const languageSelect = document.getElementById("languageSelect");
  const questionInput = document.getElementById("questionInput");
  const micBtn = document.getElementById("micBtn");

  // ==================== SIDEBAR TOGGLE ====================
  function openSidebar() {
    sidebar.classList.add("open");
    sidebarOverlay.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function closeSidebar() {
    sidebar.classList.remove("open");
    sidebarOverlay.classList.remove("active");
    document.body.style.overflow = "";
  }

  // Hamburger button to open sidebar
  if (hamburgerBtn) {
    hamburgerBtn.addEventListener("click", () => {
      if (sidebar.classList.contains("open")) {
        closeSidebar();
      } else {
        openSidebar();
      }
    });
  }

  // Close button inside sidebar
  if (sidebarCloseBtn) {
    sidebarCloseBtn.addEventListener("click", closeSidebar);
  }

  // Close sidebar when clicking overlay
  if (sidebarOverlay) {
    sidebarOverlay.addEventListener("click", closeSidebar);
  }

  // ==================== NAVIGATION HANDLER ====================
  function navigateToView(targetId) {
    // Hide all sections
    viewSections.forEach((section) => section.classList.add("hidden"));

    // Show target section
    const targetSection = document.getElementById(targetId);
    if (targetSection) {
      targetSection.classList.remove("hidden");
    }

    // Update sidebar nav buttons
    navButtons.forEach((btn) => {
      if (btn.getAttribute("data-target") === targetId) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    });

    // Update mobile nav buttons
    mobileNavButtons.forEach((btn) => {
      if (btn.getAttribute("data-target") === targetId) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    });

    // Scroll to top of main content
    if (mainContent) {
      mainContent.scrollTop = 0;
    }
    window.scrollTo(0, 0);

    // Close sidebar on mobile after navigation
    if (window.innerWidth <= 768) {
      closeSidebar();
    }
  }

  // ==================== DESKTOP SIDEBAR NAVIGATION ====================
  navButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const targetId = button.getAttribute("data-target");
      navigateToView(targetId);
    });
  });

  // ==================== MOBILE BOTTOM NAVIGATION ====================
  mobileNavButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const targetId = button.getAttribute("data-target");
      navigateToView(targetId);
    });
  });

  // ==================== MARK AS DONE BUTTON ====================
  if (markDoneBtn) {
    markDoneBtn.addEventListener("click", async () => {
      const isApplied = markDoneBtn.classList.contains("applied");

      if (!isApplied) {
        // Optionally save to backend
        try {
          const response = await authenticatedFetch(
            "https://your-backend-url.com/api/mark-done/",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ action: "mark_applied" }),
            },
          );

          if (response && response.ok) {
            markDoneBtn.classList.add("applied");
            markDoneBtn.innerHTML =
              '<i class="ri-check-double-line"></i> Applied';
            markDoneBtn.style.backgroundColor = "#4a7114";
            markDoneBtn.style.color = "#ffffff";
          }
        } catch (error) {
          console.error("Failed to save action:", error);
        }
      } else {
        markDoneBtn.classList.remove("applied");
        markDoneBtn.innerHTML = '<i class="ri-check-line"></i> Mark as applied';
        markDoneBtn.style.backgroundColor = "transparent";
        markDoneBtn.style.color = "#4a7114";
      }
    });
  }

  // ==================== SETTINGS FUNCTIONALITY ====================
  if (languageSelect) {
    languageSelect.addEventListener("change", async (e) => {
      const selectedLanguage = e.target.value;
      console.log(`Language switched to: ${selectedLanguage}`);

      // Save language preference to backend
      try {
        const response = await authenticatedFetch(
          "https://your-backend-url.com/api/user/preferences/",
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ language: selectedLanguage }),
          },
        );

        if (response && response.ok) {
          console.log("Language preference saved");
        }
      } catch (error) {
        console.error("Failed to save language preference:", error);
      }
    });
  }

  if (editProfileBtn) {
    editProfileBtn.addEventListener("click", () => {
      alert("Edit Profile modal or action triggered.");
      // You can redirect to an edit profile page or open a modal
    });
  }

  if (logoutBtn) {
    logoutBtn.addEventListener("click", async () => {
      if (confirm("Are you sure you want to log out?")) {
        // Optionally call logout endpoint on backend
        const refreshToken = localStorage.getItem("refresh_token");

        if (refreshToken) {
          try {
            await fetch("https://your-backend-url.com/api/logout/", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("access_token")}`,
              },
              body: JSON.stringify({ refresh: refreshToken }),
            });
          } catch (error) {
            console.error("Logout API call failed:", error);
          }
        }

        // Clear all auth data
        clearAuthData();
        console.log("User logged out.");
        window.location.href = "/frontend/login.html";
      }
    });
  }

  // ==================== HISTORY CARD EXPAND/COLLAPSE ====================
  const historyCards = document.querySelectorAll(".history-card");

  historyCards.forEach((card) => {
    card.addEventListener("click", () => {
      card.classList.toggle("active");
    });
  });

  // ==================== QUESTION INPUT ====================
  if (questionInput) {
    questionInput.addEventListener("keypress", async (e) => {
      if (e.key === "Enter") {
        const question = questionInput.value.trim();
        if (question) {
          console.log("Question asked:", question);

          // Send question to backend
          try {
            const response = await authenticatedFetch(
              "https://your-backend-url.com/api/ask-question/",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ question: question }),
              },
            );

            if (response && response.ok) {
              const data = await response.json();
              console.log("Answer received:", data);
              // Handle the response here
            }
          } catch (error) {
            console.error("Failed to send question:", error);
          }

          questionInput.value = "";
        }
      }
    });
  }

  if (micBtn) {
    micBtn.addEventListener("click", () => {
      console.log("Voice input triggered");

      // Check if browser supports speech recognition
      if (
        "webkitSpeechRecognition" in window ||
        "SpeechRecognition" in window
      ) {
        const SpeechRecognition =
          window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();

        recognition.lang = "en-US";
        recognition.interimResults = false;

        recognition.onresult = (event) => {
          const transcript = event.results[0][0].transcript;
          if (questionInput) {
            questionInput.value = transcript;
          }
        };

        recognition.onerror = (event) => {
          console.error("Speech recognition error:", event.error);
        };

        recognition.start();
      } else {
        alert("Voice input is not supported in your browser.");
      }
    });
  }

  // ==================== RESPONSIVE HANDLING ====================
  function handleResize() {
    if (window.innerWidth > 768) {
      // Ensure sidebar is visible and no overlay on desktop
      closeSidebar();
      sidebar.classList.remove("open");
      document.body.style.overflow = "";
    }
  }

  window.addEventListener("resize", handleResize);

  // ==================== KEYBOARD ACCESSIBILITY ====================
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && sidebar.classList.contains("open")) {
      closeSidebar();
    }
  });

  // ==================== TOUCH SWIPE TO CLOSE SIDEBAR ====================
  let touchStartX = 0;
  let touchEndX = 0;

  sidebar.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].screenX;
  });

  sidebar.addEventListener("touchend", (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  });

  function handleSwipe() {
    const swipeThreshold = 100;
    if (touchStartX - touchEndX > swipeThreshold) {
      closeSidebar();
    }
  }

  // ==================== INITIAL SETUP ====================
  // Ensure correct initial state based on screen size
  handleResize();
});
