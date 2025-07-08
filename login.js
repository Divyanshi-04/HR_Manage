document.addEventListener("DOMContentLoaded", () => {
  const hrButton = document.querySelector(".hr");
  const mentorButton = document.querySelector(".mentor");

  hrButton.addEventListener("click", () => {
    window.location.href = "hr_login.html";
  });

  mentorButton.addEventListener("click", () => {
    window.location.href = "mentor_login.html";
  });
});
