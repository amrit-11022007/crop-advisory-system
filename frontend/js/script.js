document.addEventListener('DOMContentLoaded', () => {
  // Navigation Tab Switching
  const navButtons = document.querySelectorAll('.nav-btn');
  const viewSections = document.querySelectorAll('.view-section');

  navButtons.forEach(button => {
    button.addEventListener('click', () => {
      const targetId = button.getAttribute('data-target');

      // 1. Hide all section views
      viewSections.forEach(section => {
        section.classList.add('hidden');
      });

      // 2. Show requested section view
      const targetSection = document.getElementById(targetId);
      if (targetSection) {
        targetSection.classList.remove('hidden');
      }

      // 3. Update navigation active state
      navButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
    });
  });

  // Action Button Toggle
  const markDoneBtn = document.getElementById('markDoneBtn');

  if (markDoneBtn) {
    markDoneBtn.addEventListener('click', () => {
      // Check if the button is currently in the applied state
      const isApplied = markDoneBtn.classList.contains('applied');

      if (!isApplied) {
        // Switch to Applied state
        markDoneBtn.classList.add('applied');
        markDoneBtn.innerHTML = '<i class="ri-check-double-line"></i> Applied';
        markDoneBtn.style.backgroundColor = '#4a7114';
        markDoneBtn.style.color = '#ffffff';
      } else {
        // Switch back to Default state
        markDoneBtn.classList.remove('applied');
        markDoneBtn.innerHTML = '<i class="ri-check-line"></i> Mark as applied';
        markDoneBtn.style.backgroundColor = 'transparent';
        markDoneBtn.style.color = '#4a7114';
      }
    });
  }
});










// setting 

document.addEventListener('DOMContentLoaded', () => {
  const editProfileBtn = document.getElementById('editProfileBtn');
  const logoutBtn = document.getElementById('logoutBtn');
  const languageSelect = document.getElementById('languageSelect');

  // Language Change Listener
  languageSelect.addEventListener('change', (e) => {
    const selectedLanguage = e.target.options[e.target.selectedIndex].text;
    console.log(`Language switched to: ${selectedLanguage}`);
  });

  // Edit Profile Trigger
  editProfileBtn.addEventListener('click', () => {
    alert('Edit Profile modal or action triggered.');
  });

  // Log Out Trigger
  logoutBtn.addEventListener('click', () => {
    if (confirm('Are you sure you want to log out?')) {
      console.log('User logged out.');
    }
  });
});


// resposive

document.addEventListener("DOMContentLoaded", () => {
  const allNavButtons = document.querySelectorAll(".nav-btn, .mobile-nav-btn");
  const viewSections = document.querySelectorAll(".view-section");

  allNavButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const targetViewId = btn.getAttribute("data-target");

      // Hide all sections
      viewSections.forEach((section) => section.classList.add("hidden"));

      // Show targeted view section
      document.getElementById(targetViewId).classList.remove("hidden");

      // Update active state across all matching buttons
      allNavButtons.forEach((navBtn) => {
        if (navBtn.getAttribute("data-target") === targetViewId) {
          navBtn.classList.add("active");
        } else {
          navBtn.classList.remove("active");
        }
      });
    });
  });
});