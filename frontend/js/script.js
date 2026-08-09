// app.js - Main application functionality with animated mobile sidebar
document.addEventListener("DOMContentLoaded", () => {
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
  hamburgerBtn.addEventListener("click", () => {
    if (sidebar.classList.contains("open")) {
      closeSidebar();
    } else {
      openSidebar();
    }
  });

  // Close button inside sidebar
  sidebarCloseBtn.addEventListener("click", closeSidebar);

  // Close sidebar when clicking overlay
  sidebarOverlay.addEventListener("click", closeSidebar);

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
    mainContent.scrollTop = 0;
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
    markDoneBtn.addEventListener("click", () => {
      const isApplied = markDoneBtn.classList.contains("applied");

      if (!isApplied) {
        markDoneBtn.classList.add("applied");
        markDoneBtn.innerHTML = '<i class="ri-check-double-line"></i> Applied';
        markDoneBtn.style.backgroundColor = "#4a7114";
        markDoneBtn.style.color = "#ffffff";
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
    languageSelect.addEventListener("change", (e) => {
      const selectedLanguage = e.target.options[e.target.selectedIndex].text;
      console.log(`Language switched to: ${selectedLanguage}`);
      // You can add actual language switching logic here
    });
  }

  if (editProfileBtn) {
    editProfileBtn.addEventListener("click", () => {
      alert("Edit Profile modal or action triggered.");
      // You can add actual edit profile logic here
    });
  }

  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      if (confirm("Are you sure you want to log out?")) {
        console.log("User logged out.");
        window.location.href = "index.html";
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
  const questionInput = document.getElementById("questionInput");
  const micBtn = document.getElementById("micBtn");

  if (questionInput) {
    questionInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        const question = questionInput.value.trim();
        if (question) {
          console.log("Question asked:", question);
          // Add your question handling logic here
          questionInput.value = "";
        }
      }
    });
  }

  if (micBtn) {
    micBtn.addEventListener("click", () => {
      console.log("Voice input triggered");
      // Add your voice input logic here
      alert("Voice input feature coming soon!");
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
