document.addEventListener("DOMContentLoaded", () => {
  const emailInput = document.getElementById("username");
  const passwordInput = document.getElementById("password");
  const loginBtn = document.querySelector(".dashboard");
  const rememberMeCheckbox = document.querySelector("input[name='remember']");
  const backHomeBtn = document.querySelector(".home");
  const assistBtn = document.querySelector(".assist-btn");

  // Load saved email if "Remember me" was checked before
  if (localStorage.getItem("rememberedEmail")) {
    emailInput.value = localStorage.getItem("rememberedEmail");
    rememberMeCheckbox.checked = true;
  }

  loginBtn.addEventListener("click", () => {
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    // Basic validation
    if (!email || !password) {
      alert("Please enter both email and password.");
      return;
    }

    // Simulated login (replace with real backend validation later)
    if (email === "admin@example.com" && password === "password123") {
      if (rememberMeCheckbox.checked) {
        localStorage.setItem("rememberedEmail", email);
      } else {
        localStorage.removeItem("rememberedEmail");
      }
      // Redirect to dashboard
      window.location.href = "hr_dashboard.html";
    } else {
      alert("Invalid credentials. Try admin@example.com / password123.");
    }
  });

  backHomeBtn.addEventListener("click", () => {
    // Simulate home page redirection
    window.location.href = "index.html";
  });

  assistBtn.addEventListener("click", () => {
    alert("Please contact HR support at: hr-help@sspl.gov.in");
  });
});
