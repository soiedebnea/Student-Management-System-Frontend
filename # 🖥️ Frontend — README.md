# 🖥️ Frontend — File Management README
## Student Management System

Built with **React + Vite**

---

## 📁 Frontend Folder Structure

```
frontend/
│
├── public/                      ← Static assets (favicon, images)
│
├── src/
│   ├── components/
│   │   ├── StudentForm.jsx      ← Add / Edit student form
│   │   └── StudentTable.jsx     ← Student list table
│   │
│   ├── services/
│   │   └── api.js               ← All backend API calls
│   │
│   ├── App.jsx                  ← Root component / app brain
│   ├── main.jsx                 ← React entry point
│   └── index.css                ← Global styles
│
├── node_modules/                ← Auto-generated (never touch)
│
├── index.html                   ← HTML shell Vite injects into
├── package.json                 ← Dependencies + scripts
├── package-lock.json            ← Auto-generated lock file
└── vite.config.js               ← Vite + React plugin config
```

---

## 📄 File-by-File Breakdown

---

### `index.html` — HTML Shell

**Role:** The one and only HTML page. React injects everything into it.

**What it contains:**
- `<div id="root"></div>` — the single element React mounts into
- Google Fonts link
- Font Awesome CDN link for icons
- `<script type="module" src="/src/main.jsx">` — boots React

**When to edit:**
- Changing the browser tab title (`<title>`)
- Adding external CDN scripts or stylesheets
- Adding meta tags (SEO, social sharing)

⚠️ **This file must exist in the frontend root folder** (same level as `package.json`). If it's missing, Vite shows "404 Not Found".

---

### `vite.config.js` — Vite Configuration

**Role:** Tells Vite to use the React plugin so JSX compiles correctly.

**Contents:**
```js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
});
```

**When to edit:**
- Adding a proxy to avoid CORS issues in development
- Setting up path aliases (`@` = `src/`)
- Configuring environment-specific build options

⚠️ **This is the most critical config file.** If it's missing or empty, JSX will never compile and you'll get "React is not defined" on every component.

---

### `package.json` — Dependencies & Scripts

**Role:** Lists all packages the frontend needs and how to start it.

**Dependencies:**

| Package | Purpose |
|---|---|
| `react` | Core React library |
| `react-dom` | Renders React into the browser |
| `vite` | Dev server and build tool |
| `@vitejs/plugin-react` | Enables JSX compilation |

**Scripts:**
```json
"dev":     "vite"           ← start dev server (localhost:5173)
"build":   "vite build"     ← compile for production
"preview": "vite preview"   ← preview the production build
```

**When to edit:**
- After installing a new package (`npm install axios`)
- Changing the dev server port

---

### `src/main.jsx` — React Entry Point

**Role:** The first React file that runs. Mounts the app into `index.html`.

**What it does:**
- Finds `<div id="root">` in `index.html`
- Renders `<App />` inside `React.StrictMode`
- Imports global `index.css`

**Contents:**
```jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

**When to edit:**
- Adding a global Context Provider
- Adding React Router (`<BrowserRouter>`)
- Adding a global state manager (Redux, Zustand)

---

### `src/App.jsx` — Application Brain

**Role:** The root component. Manages all state and coordinates child components.

**State it manages:**

| State | Type | Default | Purpose |
|---|---|---|---|
| `students` | Array | `[]` | Full list of all students |
| `showForm` | Boolean | `false` | Whether the form is visible |
| `editingStudent` | Object/null | `null` | Student being edited (null = add mode) |
| `loading` | Boolean | `true` | Shows loading message while fetching |
| `error` | String | `''` | Error message if backend is unreachable |

**Functions it defines:**

| Function | Trigger | What it does |
|---|---|---|
| `loadStudents()` | Page load (useEffect) | Fetches all students from API |
| `handleSave()` | Form submit | Creates or updates a student |
| `handleEditClick()` | Edit button | Sets editing mode with chosen student |
| `handleDelete()` | Delete button | Confirms then deletes a student |
| `handleAddClick()` | Add Student button | Opens form in add mode |
| `handleCancel()` | Cancel button | Closes form, clears editing state |

**Data flow:**
```
App.jsx (holds state)
  ├── passes students → StudentTable.jsx (display)
  ├── passes editingStudent → StudentForm.jsx (pre-fill)
  ├── passes handlers → StudentTable.jsx (onEdit, onDelete)
  └── passes handlers → StudentForm.jsx (onSave, onCancel)
```

**When to edit:**
- Adding search or filter state
- Adding pagination
- Adding sorting logic
- Adding a notification/toast system

---

### `src/components/StudentForm.jsx` — Add / Edit Form

**Role:** A single reusable form used for BOTH adding and editing students.

**Props it receives:**

| Prop | Type | Purpose |
|---|---|---|
| `editingStudent` | Object/null | Student to edit, or null for add mode |
| `onSave` | Function | Called with form data on submit |
| `onCancel` | Function | Called when Cancel is clicked |

**Form fields:**

| Field | Input Type | Required |
|---|---|---|
| Full Name | text | ✅ |
| Student ID | text | ✅ (disabled during edit) |
| Email | email | ✅ |
| Phone | tel | ❌ |
| Department | select | ✅ |
| Year | select | ✅ |
| CGPA | number | ✅ |
| Status | select | ✅ |

**Key behaviours:**
- `useEffect` watches `editingStudent` → pre-fills fields when editing
- Student ID is **disabled** in edit mode (unique ID shouldn't change)
- On submit: collects all field values into one object, calls `onSave(data)`
- Does NOT call the API directly — leaves that to `App.jsx`

**When to edit:**
- Adding a new form field (must also update `models/Student.js` in backend)
- Changing dropdown options (departments, years, statuses)
- Adding client-side form validation

---

### `src/components/StudentTable.jsx` — Student List

**Role:** Purely presentational. Receives data and displays it. Contains zero business logic.

**Props it receives:**

| Prop | Type | Purpose |
|---|---|---|
| `students` | Array | List of student objects to render |
| `onEdit` | Function | Called with the full student object on Edit click |
| `onDelete` | Function | Called with `student._id` on Delete click |

**What it renders:**
- A `<table>` with one `<tr>` per student
- Columns: Name + Email, Student ID, Department, CGPA, Year, Status badge, Actions
- Edit button → `onEdit(student)` 
- Delete button → `onDelete(student._id)`
- Empty state message when `students.length === 0`

**Status badge colors:**

| Status | Color |
|---|---|
| Active | Green |
| Inactive | Gray |
| Graduated | Blue |
| Suspended | Red |

**When to edit:**
- Adding new columns to the table
- Changing how student names/emails display
- Adding sorting by clicking column headers
- Adding a checkbox for bulk delete

---

### `src/services/api.js` — Backend Communication

**Role:** The ONLY file that knows the backend's URL. All fetch() calls live here.

**Base URL:**
```js
const API_URL = 'http://localhost:5000/api/students';
```

**Functions exported:**

| Function | HTTP Method | Endpoint | Body Sent |
|---|---|---|---|
| `getStudents()` | GET | `/api/students` | None |
| `createStudent(data)` | POST | `/api/students` | Student data object |
| `updateStudent(id, data)` | PUT | `/api/students/:id` | Updated student data |
| `deleteStudent(id)` | DELETE | `/api/students/:id` | None |

**How a typical function works:**
```js
export async function createStudent(studentData) {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(studentData),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message);
  }
  return res.json();
}
```

**When to edit:**
- **Most important:** Change `API_URL` when deploying to a live server
- Adding new API functions for new backend endpoints
- Adding auth headers (`Authorization: Bearer token`)

---

### `src/index.css` — Global Styles

**Role:** Applies CSS styles to the entire application.

**What it styles:**

| Section | What it covers |
|---|---|
| Reset | Removes browser default margins/padding |
| Layout | Page layout, topbar, flexbox/grid |
| Card | White card container with shadow |
| Form | Input fields, labels, form grid |
| Buttons | Primary, ghost, small edit/delete variants |
| Table | Headers, rows, hover states |
| Badges | Status color badges (active, inactive, etc.) |
| Empty state | Message when no students exist |

**When to edit:**
- Changing the color scheme
- Adjusting font sizes or spacing
- Adding styles for new components
- Making the layout responsive for mobile

---

## 🔗 How Frontend Files Connect

```
index.html
  └── src/main.jsx              (mounts React into #root)
        └── src/App.jsx         (holds all state + logic)
              ├── src/components/StudentForm.jsx
              │     └── calls onSave() → App.jsx
              ├── src/components/StudentTable.jsx
              │     └── calls onEdit(), onDelete() → App.jsx
              └── src/services/api.js
                    └── fetch() to http://localhost:5000/api/students
```

---

## 🚀 How to Run the Frontend

```bash
# Step 1 — Go into the frontend folder
cd student-fullstack/frontend

# Step 2 — Install all packages
npm install

# Step 3 — Start the development server
npm run dev
```

**Success output:**
```
VITE v5.x.x  ready in xxx ms
➜  Local:   http://localhost:5173/
```

Open your browser at:
```
http://localhost:5173
```

---

## ⚠️ Common Frontend Problems

| Error | Cause | Fix |
|---|---|---|
| `React is not defined` | `vite.config.js` missing/empty | Recreate `vite.config.js` with the React plugin |
| Blank white page | JS error in a component | Open browser console (F12 → Console) and check errors |
| `vite not recognized` | `npm install` not run | Run `npm install` inside `/frontend` folder |
| `404 Not Found` | `index.html` missing or empty | Create `index.html` in the frontend root folder |
| `Could not connect to server` | Backend not running | Start backend with `npm run dev` in `/backend` |
| Styles not loading | `index.css` not imported in `main.jsx` | Add `import './index.css'` to `main.jsx` |
| Module not found | Wrong import path | Check filenames match exactly (case-sensitive on Windows) |
| Port already in use | Another process on 5173 | Vite will automatically try the next port (5174, 5175...) |

---

## 📝 When to Edit Each File

| Task | File to Edit |
|---|---|
| Change page title or add meta tags | `index.html` |
| Add a new student form field | `StudentForm.jsx` |
| Add a new table column | `StudentTable.jsx` |
| Change colors, fonts, spacing | `index.css` |
| Add search/filter functionality | `App.jsx` |
| Change the backend URL (deployment) | `services/api.js` |
| Add authentication headers | `services/api.js` |
| Add a new page/route | Install `react-router-dom`, update `App.jsx` |
| Add global state management | `main.jsx` (wrap with Provider) |
| Configure Vite (proxy, aliases) | `vite.config.js` |

---

*Frontend: React 18 + Vite 5 + Plain CSS*