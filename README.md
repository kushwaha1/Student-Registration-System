# Student Registration System

A responsive, browser-based student management system that allows you to register, edit, and delete student records — all saved using `localStorage` for persistent data even after refresh.

---

## Features

- 🧍‍♂️ **Add Student** – Capture student name, ID, email, and contact.
- ✏️ **Edit Student** – Modify existing student data dynamically.
- 🗑️ **Delete Student** – Remove unwanted records with confirmation.
- 📊 **Real-Time Table** – Automatically updates student list and count.
- 💾 **Data Persistence** – Uses `localStorage` so records stay even after page reloads.
- 📱 **Responsive Design** – Works beautifully on mobile, tablet, and desktop.
- 🎨 **Modern UI** – Glossy buttons, gradient cards, and smooth animations.

---

## Tech Stack

| Technology | Purpose |
|------------|---------|
| HTML5 + CSS3 | Markup & styling |
| Tailwind CSS | Utility-first responsive design |
| JavaScript (Vanilla) | Logic, validation, and localStorage |
| Google Fonts (Bungee) | Custom font |
| Font Awesome | Icons for actions |

---

## Getting Started

### Prerequisites

- Modern web browser (Chrome, Firefox, Edge)
- No server or framework needed — runs locally in-browser

### Setup Instructions

1. Clone or download this repository (`git clone https://github.com/kushwaha1/Student-Registration-System.git`).
2. Run command in vscode terminal `npm i` for installing tailwind css packages.
3. Open vscode terminal and run `npx @tailwindcss/cli -i ./input.css -o ./output.css --watch`.
2. Open `index.html` using `open with live server` in your browser.
3. Start registering students — no backend needed!

---

## How It Works

1. Click **"Register Student"** to open a modal form.
2. Fill in all fields:
   - Name: only letters allowed
   - ID: unique number
   - Email: valid email format
   - Contact: 10-digit mobile number
3. Click **Register** or **Update** — data will appear in the table below.
4. Use ✏️ Edit or 🗑️ Delete to manage records.
5. All data is saved in the browser using `localStorage`.

---

## File Structure

```bash
student-registration/
├── index.html       # Main HTML structure
├── output.css       # Tailwind compiled CSS
├── index.js         # Javascript functionality
├── README.md        # Project overview and setup
├── gitignore        # For ignore node_modules
