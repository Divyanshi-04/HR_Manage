document.addEventListener("DOMContentLoaded", () => {
  const emailInput = document.getElementById("username");
  const passwordInput = document.getElementById("password");
  const loginBtn = document.querySelector(".dashboard");
  const rememberMeCheckbox = document.querySelector("input[name='remember']");
  const backHomeBtn = document.querySelector(".home");
  const assistBtn = document.querySelector(".assist-btn");

  // Load remembered email if saved
  if (localStorage.getItem("mentorEmail")) {
    emailInput.value = localStorage.getItem("mentorEmail");
    rememberMeCheckbox.checked = true;
  }

  loginBtn.addEventListener("click", () => {
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    if (!email || !password) {
      alert("Please enter both email and password.");
      return;
    }

    // Example login credentials
    if (email === "mentor@example.com" && password === "mentor123") {
      if (rememberMeCheckbox.checked) {
        localStorage.setItem("mentorEmail", email);
      } else {
        localStorage.removeItem("mentorEmail");
      }

      // Redirect to mentor dashboard
      window.location.href = "mentor_dash.html";
    } else {
      alert("Invalid credentials.\nTry mentor@example.com / mentor123");
    }
  });

  backHomeBtn.addEventListener("click", () => {
    window.location.href = "index.html"; // Redirect to homepage
  });

  assistBtn.addEventListener("click", () => {
    alert("For assistance, please email: mentor-support@sspl.gov.in");
  });
});