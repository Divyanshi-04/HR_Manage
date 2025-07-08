document.addEventListener("DOMContentLoaded", () => {
  const tabs = document.querySelectorAll(".tab");
  const tabContent = document.querySelector(".tab-content");
  const tableBody = tabContent.querySelector("tbody");
  const logoutBtn = document.querySelector(".home");

  // Sample data
  const mentorData = {
    "New Interns": [
      { id: 1, name: "Bhavaya Aggarwal", branch: "ECE", location: "Delhi" },
      { id: 2, name: "Naina Verma", branch: "CSE", location: "Pune" },
    ],
    Ongoing: [{ id: 3, name: "Ravi Kumar", branch: "IT", location: "Chennai" }],
    Completed: [
      { id: 4, name: "Simran Kaul", branch: "ME", location: "Noida" },
    ],
  };

  // Function to update the table
  function updateTable(tabName) {
    const interns = mentorData[tabName] || [];
    const rows = interns
      .map(
        (intern) => `
        <tr>
          <td>${intern.id}</td>
          <td>${intern.name}</td>
          <td>${intern.branch}</td>
          <td>${intern.location}</td>
        </tr>
      `
      )
      .join("");

    tableBody.innerHTML = rows;

    const title = tabContent.querySelector("h2");
    title.textContent = tabName;
  }

  // Tab switching
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");
      updateTable(tab.textContent.trim());
    });
  });

  // Logout function
  logoutBtn.addEventListener("click", () => {
    window.location.href = "mentor_login.html";
  });

  // Default tab
  updateTable("New Interns");
});
