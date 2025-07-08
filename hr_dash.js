document.addEventListener("DOMContentLoaded", () => {
  const tabs = document.querySelectorAll(".tab");
  const tabContent = document.querySelector(".tab-content");
  const tableBody = tabContent.querySelector("tbody");
  const addBtn = document.querySelector(".add");
  const logoutBtn = document.querySelector(".home");

  // Sample data for tabs
  const internData = {
    "New/Assigned": [
      {
        id: 1,
        name: "Bhavaya Aggarwal",
        branch: "ECE",
        location: "Delhi",
        mentor: "-",
        status: "New",
      },
    ],
    Ongoing: [
      {
        id: 2,
        name: "Anya Singh",
        branch: "CSE",
        location: "Noida",
        mentor: "Dr. Ahuja",
        status: "Ongoing",
      },
    ],
    Completed: [
      {
        id: 3,
        name: "Rohit Sharma",
        branch: "ME",
        location: "Bangalore",
        mentor: "Dr. Kumar",
        status: "Completed",
      },
    ],
    "Issued Certificate": [
      {
        id: 4,
        name: "Sneha Jain",
        branch: "IT",
        location: "Hyderabad",
        mentor: "Dr. Mehta",
        status: "Certified",
      },
    ],
  };

  // Function to update table based on selected tab
  function updateTable(tabName) {
    const interns = internData[tabName] || [];
    let html = interns
      .map(
        (intern) => `
        <tr>
          <td>${intern.id}</td>
          <td>${intern.name}</td>
          <td>${intern.branch}</td>
          <td>${intern.location}</td>
          <td>${intern.mentor}</td>
          <td>${intern.status}</td>
        </tr>
      `
      )
      .join("");

    tableBody.innerHTML = html;

    // Update title
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

  // Add new intern logic (simple prompt-based)
  addBtn.addEventListener("click", () => {
    const name = prompt("Enter Intern Name:");
    const branch = prompt("Enter Branch:");
    const location = prompt("Enter Location:");

    if (name && branch && location) {
      const newId = internData["New/Assigned"].length + 1;
      internData["New/Assigned"].push({
        id: newId,
        name: name,
        branch: branch,
        location: location,
        mentor: "-",
        status: "New",
      });
      updateTable("New/Assigned");
      alert("Intern added successfully!");
    } else {
      alert("All fields are required to add an intern.");
    }
  });

  // Logout redirect
  logoutBtn.addEventListener("click", () => {
    window.location.href = "hr_login.html";
  });

  // Initialize default tab
  updateTable("New/Assigned");
});
