// mentor_dash.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";
import {
  getFirestore,
  doc,
  getDoc,
  collection,
  getDocs
} from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCV872lfYENRzt2iAARrUHig7W95qQOJLI",
  authDomain: "hr-manage-484e5.firebaseapp.com",
  projectId: "hr-manage-484e5",
  storageBucket: "hr-manage-484e5.appspot.com",
  messagingSenderId: "142887546287",
  appId: "1:142887546287:web:5b3813a38a666834a3935a",
  measurementId: "G-TTRB6W6G0K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Show interns based on status
function renderInterns(interns, tbody) {
  tbody.innerHTML = "";
  interns.forEach(intern => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${intern.id}</td>
      <td>${intern.name}</td>
      <td>${intern.branch}</td>
      <td>${intern.location}</td>
    `;
    tbody.appendChild(row);
  });
}

// DOM Ready
document.addEventListener("DOMContentLoaded", () => {
  const logoutBtn = document.querySelector(".home");
  const newInternsBody = document.querySelector(".intern-table tbody"); // For New Interns
  const ongoingBtn = document.querySelectorAll(".tab")[1];
  const completedBtn = document.querySelectorAll(".tab")[2];

  const pageTitle = document.querySelector(".page-title");

  onAuthStateChanged(auth, async (user) => {
    if (user) {
      // Show mentor's name
      const docRef = doc(db, "mentors", user.uid);
      const docSnap = await getDoc(docRef);
      const name = docSnap.exists() ? docSnap.data().name : "Mentor";
      pageTitle.textContent = `Welcome ${name}`;

      // Fetch interns
      const internsCol = collection(docRef, "interns");
      const internSnaps = await getDocs(internsCol);

      const interns = [];
      internSnaps.forEach(doc => interns.push(doc.data()));

      // Show only New Interns initially
      renderInterns(interns.filter(i => i.status === "New Intern"), newInternsBody);

      // When tabs clicked
      ongoingBtn.addEventListener("click", () => {
        renderInterns(interns.filter(i => i.status === "Ongoing"), newInternsBody);
      });

      completedBtn.addEventListener("click", () => {
        renderInterns(interns.filter(i => i.status === "Completed"), newInternsBody);
      });

    } else {
      // Not logged in
      window.location.href = "mentor_login.html";
    }
  });

  // Logout button
  logoutBtn.addEventListener("click", () => {
    signOut(auth).then(() => {
      window.location.href = "mentor_login.html";
    });
  });
});