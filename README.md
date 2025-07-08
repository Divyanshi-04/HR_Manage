# HR Management Portal

A web-based portal for managing HR and Mentor logins, dashboards, and intern data for the Solid State Physics Laboratory.

## Features

- **Login Selection:** Choose between HR and Mentor login.
- **HR Portal:**
  - Secure login with "Remember Me" functionality.
  - Dashboard to manage interns (New/Assigned, Ongoing, Completed, Issued Certificate).
  - Add new interns via prompt.
  - Logout and assistance options.
- **Mentor Portal:**
  - Secure login with "Remember Me" functionality.
  - Dashboard to view interns (New Interns, Ongoing, Completed).
  - Logout and assistance options.
- **Responsive Design:** Optimized for desktop and mobile devices.
- **Modern UI:** Uses background video, gradients, and card-based layouts.

## Tech Stack

- **HTML5** — Structure and markup
- **CSS3** — Styling and responsive layouts
- **JavaScript (ES6+)** — Client-side logic and interactivity

## File Overview

- **login.html / login.js / login.css**  
  Entry point for users to select HR or Mentor login.

- **hr_login.html / hr_login.js / hr_login.css**  
  HR login page with email/password and assistance.

- **hr_dash.html / hr_dash.js / hr_dash.css**  
  HR dashboard for managing interns and their statuses.

- **mentor_login.html / mentor_login.js / mentor_login.css**  
  Mentor login page with email/password and assistance.

- **mentor_dash.html / mentor_dash.js / mentor_dash.css**  
  Mentor dashboard for viewing assigned interns.

- **test.css**  
  Alternative/test CSS for login page styling.

- **login_img/**  
  Contains background video and logo image.

## How to Run

1. Open `login.html` in your browser to start.
2. Use the provided demo credentials:
   - **HR:**  
     Email: `admin@example.com`  
     Password: `password123`
   - **Mentor:**  
     Email: `mentor@example.com`  
     Password: `mentor123`
3. Navigate through the dashboards as HR or Mentor.

## Customization

- Update intern and mentor data in the respective JS files (`hr_dash.js`, `mentor_dash.js`).
- Change background video or logo by replacing files in `login_img/`.

## Notes

- This project uses only HTML, CSS, and JavaScript (no backend).
- All data is stored in-memory or in browser localStorage for demo purposes.
- For production, integrate with a backend for authentication and data persistence.

---

**Developed for Solid State Physics