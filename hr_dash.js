document.addEventListener("DOMContentLoaded", function () {
  // DOM Elements
  const addBtn = document.querySelector(".add");
  const logoutBtn = document.querySelector(".home");
  const tabs = document.querySelectorAll(".tab");
  const tableBody = document.querySelector(".intern-table tbody");
  const modals = {
    add: document.getElementById("addInternModal"),
    preview: document.getElementById("previewModal"),
    view: document.getElementById("viewModal"),
    accept: document.getElementById("acceptModal"),
    reject: document.getElementById("rejectModal"),
  };
  const closeBtns = document.querySelectorAll(".close");
  const methodBtns = document.querySelectorAll(".method-btn");
  const methodContents = document.querySelectorAll(".method-content");
  const internForm = document.getElementById("internForm");
  const dobInput = document.getElementById("dob");
  const ageInput = document.getElementById("age");
  const foreignFamilyRadio = document.querySelectorAll(
    'input[name="foreignFamily"]'
  );
  const workExperienceRadio = document.querySelectorAll(
    'input[name="workExperience"]'
  );
  const drdoAssociationRadio = document.querySelectorAll(
    'input[name="drdoAssociation"]'
  );
  const foreignFamilyDetails = document.getElementById("foreignFamilyDetails");
  const workExperienceDetails = document.getElementById(
    "workExperienceDetails"
  );
  const drdoAssociationDetails = document.getElementById(
    "drdoAssociationDetails"
  );
  const addEducationBtn = document.getElementById("addEducation");
  const educationContainer = document.getElementById("educationContainer");
  const acceptForm = document.getElementById("acceptForm");
  const rejectForm = document.getElementById("rejectForm");

  // Sample data for demonstration
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

  // Initialize the page
  function init() {
    updateTable("New/Assigned");
    setupEventListeners();
    setupModalCloseHandlers(); // Add this line for modal close functionality
  }

  // Set up event listeners
  function setupEventListeners() {
    // Tab switching
    tabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        tabs.forEach((t) => t.classList.remove("active"));
        tab.classList.add("active");
        updateTable(tab.textContent.trim());
      });
    });

    // Add button
    addBtn.addEventListener("click", () => openModal("add"));

    // Logout button
    logoutBtn.addEventListener("click", () => {
      window.location.href = "hr_login.html";
    });

    // Input method tabs
    methodBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        const method = btn.dataset.method;
        switchMethod(method);
      });
    });

    // Age calculation from DOB
    dobInput.addEventListener("change", calculateAge);

    // Radio button toggles
    foreignFamilyRadio.forEach((radio) => {
      radio.addEventListener("change", () => {
        foreignFamilyDetails.style.display =
          document.querySelector('input[name="foreignFamily"]:checked')
            .value === "yes"
            ? "block"
            : "none";
      });
    });

    workExperienceRadio.forEach((radio) => {
      radio.addEventListener("change", () => {
        workExperienceDetails.style.display =
          document.querySelector('input[name="workExperience"]:checked')
            .value === "yes"
            ? "block"
            : "none";
      });
    });

    drdoAssociationRadio.forEach((radio) => {
      radio.addEventListener("change", () => {
        drdoAssociationDetails.style.display =
          document.querySelector('input[name="drdoAssociation"]:checked')
            .value === "yes"
            ? "block"
            : "none";
      });
    });

    // Add education entry
    addEducationBtn.addEventListener("click", addEducationEntry);

    // Form submissions
    internForm.addEventListener("submit", handleInternFormSubmit);
    acceptForm.addEventListener("submit", handleAcceptFormSubmit);
    rejectForm.addEventListener("submit", handleRejectFormSubmit);
  }

  // Setup modal close handlers
  function setupModalCloseHandlers() {
    // Close buttons
    closeBtns.forEach((btn) => {
      btn.addEventListener("click", function () {
        this.closest(".modal").style.display = "none";
      });
    });

    // Click outside modal to close
    document.addEventListener("click", function (e) {
      if (e.target.classList.contains("modal")) {
        e.target.style.display = "none";
      }
    });

    // Escape key to close modals
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") {
        Object.values(modals).forEach((modal) => {
          modal.style.display = "none";
        });
      }
    });

    // Close button in view modal
    const closeViewBtn = document.querySelector(".close-btn");
    if (closeViewBtn) {
      closeViewBtn.addEventListener("click", function () {
        modals.view.style.display = "none";
      });
    }
  }

  // Update table based on selected tab
  function updateTable(tabName) {
    const interns = internData[tabName] || [];
    let html = "";

    interns.forEach((intern) => {
      html += `
        <tr>
          <td>${intern.id}</td>
          <td>${intern.name}</td>
          <td>${intern.branch}</td>
          <td>${intern.location}</td>
          <td>${intern.mentor}</td>
          <td>${intern.status}</td>
          <td>
            <button class="action-btn view" data-id="${intern.id}">View</button>
            ${
              intern.status === "New"
                ? `<button class="action-btn assign" data-id="${intern.id}">Assign</button>`
                : ""
            }
          </td>
        </tr>
      `;
    });

    tableBody.innerHTML = html;
    document.querySelector(".tab-content h2").textContent = tabName;

    // Add event listeners to action buttons
    document.querySelectorAll(".action-btn.view").forEach((btn) => {
      btn.addEventListener("click", () => viewIntern(btn.dataset.id));
    });

    document.querySelectorAll(".action-btn.assign").forEach((btn) => {
      btn.addEventListener("click", () => assignIntern(btn.dataset.id));
    });
  }

  // Switch between input methods
  function switchMethod(method) {
    methodBtns.forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.method === method);
    });

    methodContents.forEach((content) => {
      content.classList.toggle("active", content.id === method);
    });
  }

  // Calculate age from DOB
  function calculateAge() {
    const dob = new Date(dobInput.value);
    const today = new Date();
    let age = today.getFullYear() - dob.getFullYear();
    const monthDiff = today.getMonth() - dob.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
      age--;
    }

    ageInput.value = age;
  }

  // Add education entry
  function addEducationEntry() {
    const entry = document.createElement("div");
    entry.className = "education-entry";
    entry.innerHTML = `
      <div class="form-row">
        <div class="form-group">
          <label>Qualification*</label>
          <input type="text" name="qualification[]" required>
        </div>
        <div class="form-group">
          <label>Institution Name*</label>
          <input type="text" name="institution[]" required>
        </div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label>Semester/Grades*</label>
          <input type="text" name="grades[]" required>
        </div>
        <button type="button" class="remove-edu-btn">Remove</button>
      </div>
    `;

    educationContainer.appendChild(entry);

    // Add event listener to remove button
    entry.querySelector(".remove-edu-btn").addEventListener("click", () => {
      educationContainer.removeChild(entry);
    });
  }

  // Handle intern form submission
  function handleInternFormSubmit(e) {
    e.preventDefault();

    // Form validation
    if (!internForm.checkValidity()) {
      alert("Please fill all required fields correctly.");
      return;
    }

    // Gather form data
    const formData = new FormData(internForm);
    const internDetails = {};

    for (let [key, value] of formData.entries()) {
      if (key.endsWith("[]")) {
        const baseKey = key.slice(0, -2);
        if (!internDetails[baseKey]) {
          internDetails[baseKey] = [];
        }
        internDetails[baseKey].push(value);
      } else {
        internDetails[key] = value;
      }
    }

    // Generate preview
    generatePreview(internDetails);

    // Close add modal and open preview modal
    modals.add.style.display = "none";
    modals.preview.style.display = "block";
  }

  // Generate preview of intern details
  function generatePreview(details) {
    const preview = document.getElementById("internDetails");
    const fullPreview = document.getElementById("fullDetails");
    let html = "";
    let fullHtml = "<h3>Personal Details</h3>";

    // Personal details
    fullHtml += `<p><strong>Full Name:</strong> ${details.fullName}</p>`;
    fullHtml += `<p><strong>Date of Birth:</strong> ${details.dob}</p>`;
    fullHtml += `<p><strong>Age:</strong> ${details.age}</p>`;
    fullHtml += `<p><strong>Present Address:</strong> ${details.presentAddress}</p>`;
    fullHtml += `<p><strong>Permanent Address:</strong> ${details.permanentAddress}</p>`;
    fullHtml += `<p><strong>Mobile Number:</strong> ${details.mobile}</p>`;
    fullHtml += `<p><strong>Email ID:</strong> ${details.email}</p>`;
    fullHtml += `<p><strong>Aadhar Number:</strong> ${details.aadhar}</p>`;

    // Summary for preview modal
    html += `<p><strong>Name:</strong> ${details.fullName}</p>`;
    html += `<p><strong>Age:</strong> ${details.age}</p>`;
    html += `<p><strong>Email:</strong> ${details.email}</p>`;
    html += `<p><strong>Mobile:</strong> ${details.mobile}</p>`;

    // Educational details
    fullHtml += "<h3>Educational Details</h3>";
    if (details.qualification && details.qualification.length > 0) {
      details.qualification.forEach((qual, index) => {
        fullHtml += `<p><strong>Qualification ${
          index + 1
        }:</strong> ${qual}</p>`;
        fullHtml += `<p><strong>Institution:</strong> ${details.institution[index]}</p>`;
        fullHtml += `<p><strong>Grades:</strong> ${details.grades[index]}</p>`;
        if (index < details.qualification.length - 1) {
          fullHtml += "<hr>";
        }
      });
    }

    // Additional information
    fullHtml += "<h3>Additional Information</h3>";
    fullHtml += `<p><strong>Family in Foreign Organizations:</strong> ${details.foreignFamily}</p>`;
    if (details.foreignFamily === "yes" && details.foreignFamilyDetails) {
      fullHtml += `<p><strong>Details:</strong> ${details.foreignFamilyDetails}</p>`;
    }

    fullHtml += `<p><strong>Work Experience:</strong> ${details.workExperience}</p>`;
    if (details.workExperience === "yes" && details.workExperienceDetails) {
      fullHtml += `<p><strong>Details:</strong> ${details.workExperienceDetails}</p>`;
    }

    fullHtml += `<p><strong>Prior DRDO Association:</strong> ${details.drdoAssociation}</p>`;
    if (details.drdoAssociation === "yes" && details.drdoAssociationDetails) {
      fullHtml += `<p><strong>Details:</strong> ${details.drdoAssociationDetails}</p>`;
    }

    // Documents
    fullHtml += "<h3>Documents</h3>";
    fullHtml += `<p><strong>Photo Uploaded:</strong> ${
      details.photo ? "Yes" : "No"
    }</p>`;
    fullHtml += `<p><strong>Signature Uploaded:</strong> ${
      details.signature ? "Yes" : "No"
    }</p>`;
    fullHtml += `<p><strong>Declaration Signed:</strong> ${
      details.declaration ? "Yes" : "No"
    }</p>`;

    preview.innerHTML = html;
    fullPreview.innerHTML = fullHtml;

    // Set data for accept/reject modals
    document.getElementById("internId").value =
      internData["New/Assigned"].length + 1;
    document.getElementById("internName").value = details.fullName;
    document.getElementById("rejectInternId").value =
      internData["New/Assigned"].length + 1;
    document.getElementById("rejectInternName").value = details.fullName;

    // Add event listeners to preview modal buttons
    document.querySelector(".view-btn").addEventListener("click", () => {
      modals.preview.style.display = "none";
      modals.view.style.display = "block";
    });

    document.querySelector(".accept-btn").addEventListener("click", () => {
      modals.preview.style.display = "none";
      modals.accept.style.display = "block";
    });

    document.querySelector(".reject-btn").addEventListener("click", () => {
      modals.preview.style.display = "none";
      modals.reject.style.display = "block";
    });
  }

  // Handle accept form submission
  function handleAcceptFormSubmit(e) {
    e.preventDefault();

    const formData = new FormData(acceptForm);
    const internId = formData.get("internId");
    const internName = formData.get("internName");
    const branch = formData.get("branch");
    const duration = formData.get("duration");
    const project = formData.get("project");

    // Add to ongoing interns
    const newId = internData["Ongoing"].length + 1;
    internData["Ongoing"].push({
      id: newId,
      name: internName,
      branch: branch,
      location: "Delhi", // Default location
      mentor: "To be assigned",
      status: "Ongoing",
      duration: duration,
      project: project,
    });

    // Update table
    updateTable("Ongoing");

    // Close modal
    modals.accept.style.display = "none";

    alert(
      `Intern ${internName} has been accepted and assigned to project: ${project}`
    );
  }

  // Handle reject form submission
  function handleRejectFormSubmit(e) {
    e.preventDefault();

    const formData = new FormData(rejectForm);
    const internId = formData.get("rejectInternId");
    const internName = formData.get("rejectInternName");
    const reason = formData.get("rejectReason");
    const alternativeMentor = formData.get("alternativeMentor");

    // In a real app, you would send this data to the server
    console.log(`Intern ${internName} rejected. Reason: ${reason}`);
    if (alternativeMentor) {
      console.log(`Alternative mentor suggested: ${alternativeMentor}`);
    }

    // Close modal
    modals.reject.style.display = "none";

    alert(`Intern ${internName} has been rejected.`);
  }

  // View intern details
  function viewIntern(id) {
    // Find intern in all categories
    let intern = null;
    for (const category in internData) {
      intern = internData[category].find((i) => i.id == id);
      if (intern) break;
    }

    if (intern) {
      const fullPreview = document.getElementById("fullDetails");
      let html = `<h3>Intern Details</h3>`;

      html += `<p><strong>ID:</strong> ${intern.id}</p>`;
      html += `<p><strong>Name:</strong> ${intern.name}</p>`;
      html += `<p><strong>Branch:</strong> ${intern.branch}</p>`;
      html += `<p><strong>Location:</strong> ${intern.location}</p>`;
      html += `<p><strong>Mentor:</strong> ${intern.mentor}</p>`;
      html += `<p><strong>Status:</strong> ${intern.status}</p>`;

      if (intern.duration) {
        html += `<p><strong>Duration:</strong> ${intern.duration} months</p>`;
      }

      if (intern.project) {
        html += `<p><strong>Project:</strong> ${intern.project}</p>`;
      }

      fullPreview.innerHTML = html;
      modals.view.style.display = "block";
    }
  }

  // Assign intern (opens accept modal)
  function assignIntern(id) {
    const intern = internData["New/Assigned"].find((i) => i.id == id);
    if (intern) {
      document.getElementById("internId").value = intern.id;
      document.getElementById("internName").value = intern.name;
      modals.accept.style.display = "block";
    }
  }

  // Open modal
  function openModal(modalName) {
    // Reset forms when opening
    if (modalName === "add") {
      internForm.reset();
      // Clear any dynamically added education entries
      while (educationContainer.children.length > 1) {
        educationContainer.removeChild(educationContainer.lastChild);
      }
      // Reset radio button details
      foreignFamilyDetails.style.display = "none";
      workExperienceDetails.style.display = "none";
      drdoAssociationDetails.style.display = "none";
    }

    modals[modalName].style.display = "block";
  }

  // Initialize the application
  init();
});

// Tab switching functionality
document.querySelectorAll(".tab").forEach((tab) => {
  tab.addEventListener("click", function () {
    // Update active tab
    document
      .querySelectorAll(".tab")
      .forEach((t) => t.classList.remove("tab-active"));
    this.classList.add("tab-active");

    // Show relevant content (currently only one .tab-content is used)
    const status = this.textContent.trim().toLowerCase().replace("/", "-");
    const activeContent = document.querySelector(".tab-content");
    if (activeContent) {
      activeContent.style.display = "block";
      activeContent.setAttribute("data-status", status);
    }
  });
});

// Certificate modal open logic
document.addEventListener("click", function (e) {
  if (e.target.classList.contains("btn-issue")) {
    const row = e.target.closest("tr");
    if (row) openCertificateModal(row);
  }
});

function openCertificateModal(row) {
  const modal = document.getElementById("certificateModal");
  if (!modal) return;

  document.getElementById("certInternId").value =
    row.cells[0]?.textContent.trim() || "";
  document.getElementById("certName").value =
    row.cells[1]?.textContent.trim() || "";
  document.getElementById("certBranch").value =
    row.cells[2]?.textContent.trim() || "";
  document.getElementById("certMentor").value =
    row.cells[4]?.textContent.trim() || "";

  modal.style.display = "block";
}

// Close modal on 'X'
const closeBtn = document.querySelector("#certificateModal .close");
if (closeBtn) {
  closeBtn.addEventListener("click", () => {
    document.getElementById("certificateModal").style.display = "none";
  });
}

// Form submission
document
  .getElementById("certificateForm")
  ?.addEventListener("submit", function (e) {
    e.preventDefault();

    const attendance = document.getElementById("certAttendance").value;
    if (isNaN(attendance)) {
      alert("Attendance must be a number");
      return;
    }

    const formData = new FormData(this);
    const data = Object.fromEntries(formData.entries());

    console.log("Issuing certificate with:", data);

    // Close modal
    document.getElementById("certificateModal").style.display = "none";

    // Simulate success action
    alert("Certificate issued successfully!");

    // Move to "Issued Certificate" tab
    document.querySelectorAll(".tab").forEach((tab) => {
      if (tab.textContent.trim() === "Issued Certificate") {
        tab.click();
      }
    });
  });

// Certificate Generation Functionality
document
  .getElementById("certificateForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    // Get form data
    const formData = new FormData(this);
    const certificateData = {
      internId: formData.get("internId"),
      name: formData.get("name"),
      college: formData.get("college"),
      branch: formData.get("branch"),
      completionRemarks: formData.get("completionRemarks"),
      mentorName: formData.get("mentorName"),
      attendance: formData.get("attendance"),
      finalRemarks: formData.get("finalRemarks"),
      date: new Date().toLocaleDateString("en-IN"), // Indian date format
    };

    // Generate PDF certificate
    generateCertificatePDF(certificateData);

    // Close modal
    document.getElementById("certificateModal").style.display = "none";
  });

function generateCertificatePDF(data) {
  // Create a temporary div for the certificate HTML
  const certificateDiv = document.createElement("div");
  certificateDiv.style.width = "210mm"; // A4 width
  certificateDiv.style.height = "297mm"; // A4 height
  certificateDiv.style.padding = "20mm";
  certificateDiv.style.boxSizing = "border-box";
  certificateDiv.style.fontFamily = "Arial, sans-serif";
  certificateDiv.style.border = "1px solid #000";
  certificateDiv.style.background = "#fff";
  certificateDiv.style.color = "#000";

  // Certificate HTML template
  certificateDiv.innerHTML = `
        <div style="text-align: center; margin-bottom: 30px;">
            <img src="login_img/logo_dr.jpeg" alt="DRDO Logo" style="height: 80px;">
            <h1 style="margin: 10px 0 5px 0; color: #0066cc;">Solid State Physics Laboratory</h1>
            <h2 style="margin: 0; color: #0066cc;">Certificate of Internship Completion</h2>
        </div>
        
        <div style="text-align: center; margin: 40px 0;">
            <p style="font-size: 18px;">This is to certify that</p>
            <h3 style="font-size: 24px; margin: 10px 0; color: #0066cc;">${data.name}</h3>
            <p style="font-size: 18px;">from ${data.college}, ${data.branch} Department</p>
            <p style="font-size: 18px;">has successfully completed the internship program</p>
        </div>
        
        <div style="margin: 30px 0;">
            <p><strong>Intern ID:</strong> ${data.internId}</p>
            <p><strong>Duration:</strong> ${data.attendance} hours</p>
            <p><strong>Mentor:</strong> ${data.mentorName}</p>
            <p><strong>Completion Remarks:</strong> ${data.completionRemarks}</p>
            <p><strong>Final Remarks:</strong> ${data.finalRemarks}</p>
        </div>
        
        <div style="margin-top: 50px; display: flex; justify-content: space-between;">
            <div style="text-align: center;">
                <div style="border-top: 1px solid #000; width: 200px; margin: 0 auto;"></div>
                <p>Mentor's Signature</p>
            </div>
            <div style="text-align: center;">
                <div style="border-top: 1px solid #000; width: 200px; margin: 0 auto;"></div>
                <p>Director's Signature</p>
            </div>
        </div>
        
        <div style="text-align: right; margin-top: 30px;">
            <p>Date: ${data.date}</p>
        </div>
        
        <div style="text-align: center; margin-top: 50px; font-size: 12px;">
            <p>Solid State Physics Laboratory, DRDO, Lucknow Road, Delhi-110054</p>
            <p>Phone: 011-23882345 | Email: sspl@drdo.in</p>
        </div>
    `;

  // Use html2pdf to generate PDF
  const options = {
    margin: 10,
    filename: `Certificate_${data.name.replace(" ", "_")}.pdf`,
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
  };

  // Add html2pdf library dynamically if not already loaded
  if (typeof html2pdf !== "undefined") {
    html2pdf().from(certificateDiv).set(options).save();
  } else {
    const script = document.createElement("script");
    script.src =
      "https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js";
    script.onload = () => {
      html2pdf().from(certificateDiv).set(options).save();
    };
    document.head.appendChild(script);
  }
}

// Certificate Generation Button Functionality
document.addEventListener("DOMContentLoaded", function () {
  // Add event listener to all "Issue Certificate" buttons
  document.addEventListener("click", function (e) {
    if (e.target.classList.contains("issue-certificate-btn")) {
      const row = e.target.closest("tr");
      if (row) {
        // Pre-fill form with intern data
        document.getElementById("certInternId").value =
          row.cells[0].textContent;
        document.getElementById("certName").value = row.cells[1].textContent;
        document.getElementById("certBranch").value = row.cells[2].textContent;
        document.getElementById("certMentor").value = row.cells[4].textContent;

        // Open certificate modal
        document.getElementById("certificateModal").style.display = "block";
      }
    }
  });

  // Certificate form submission
  document
    .getElementById("certificateForm")
    .addEventListener("submit", function (e) {
      e.preventDefault();
      generateCertificate();
    });
});

function generateCertificate() {
  // Get form data
  const formData = {
    internId: document.getElementById("certInternId").value,
    name: document.getElementById("certName").value,
    college: document.getElementById("certCollege").value,
    branch: document.getElementById("certBranch").value,
    completionRemarks: document.getElementById("certCompletion").value,
    mentorName: document.getElementById("certMentor").value,
    attendance: document.getElementById("certAttendance").value,
    finalRemarks: document.getElementById("certRemarks").value,
    date: new Date().toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }),
  };

  // Create certificate HTML
  const certificateHTML = `
        <div style="width:210mm; height:297mm; padding:20mm; box-sizing:border-box; font-family:Arial; background:#fff; color:#000;">
            <div style="text-align:center; margin-bottom:30px;">
                <img src="login_img/logo_dr.jpeg" alt="DRDO Logo" style="height:80px;">
                <h1 style="margin:10px 0 5px 0; color:#0066cc;">Solid State Physics Laboratory</h1>
                <h2 style="margin:0; color:#0066cc;">Certificate of Internship Completion</h2>
            </div>
            
            <div style="text-align:center; margin:40px 0;">
                <p style="font-size:18px;">This is to certify that</p>
                <h3 style="font-size:24px; margin:10px 0; color:#0066cc;">${formData.name}</h3>
                <p style="font-size:18px;">from ${formData.college}, ${formData.branch} Department</p>
                <p style="font-size:18px;">has successfully completed the internship program</p>
            </div>
            
            <div style="margin:30px 0;">
                <p><strong>Intern ID:</strong> ${formData.internId}</p>
                <p><strong>Duration:</strong> ${formData.attendance} hours</p>
                <p><strong>Mentor:</strong> ${formData.mentorName}</p>
                <p><strong>Completion Remarks:</strong> ${formData.completionRemarks}</p>
                <p><strong>Final Remarks:</strong> ${formData.finalRemarks}</p>
            </div>
            
            <div style="margin-top:50px; display:flex; justify-content:space-between;">
                <div style="text-align:center;">
                    <div style="border-top:1px solid #000; width:200px; margin:0 auto;"></div>
                    <p>Mentor's Signature</p>
                </div>
                <div style="text-align:center;">
                    <div style="border-top:1px solid #000; width:200px; margin:0 auto;"></div>
                    <p>Director's Signature</p>
                </div>
            </div>
            
            <div style="text-align:right; margin-top:30px;">
                <p>Date: ${formData.date}</p>
            </div>
            
            <div style="text-align:center; margin-top:50px; font-size:12px;">
                <p>Solid State Physics Laboratory, DRDO, Lucknow Road, Delhi-110054</p>
                <p>Phone: 011-23882345 | Email: sspl@drdo.in</p>
            </div>
        </div>
    `;

  // Create temporary element for PDF generation
  const element = document.createElement("div");
  element.innerHTML = certificateHTML;

  // PDF generation options
  const opt = {
    margin: 10,
    filename: `DRDO_Internship_Certificate_${formData.name.replace(
      / /g,
      "_"
    )}.pdf`,
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
  };

  // Generate and download PDF
  html2pdf()
    .set(opt)
    .from(element)
    .save()
    .then(() => {
      // Close modal after generation
      document.getElementById("certificateModal").style.display = "none";
      // Reset form
      document.getElementById("certificateForm").reset();
    });
}
