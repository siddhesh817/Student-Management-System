# Student Management System – React

This project is a role-based student management application built using React.  
It supports two user roles — **Admin** and **Student** — and stores all data in **localStorage** without any backend.

---

## 📌 Features

### Admin
- Login with admin credentials  
- View all students in a tabular format  
- Create, edit, and view student records  
- Side drawer interface for student forms  
- Build custom fields dynamically (text, textarea, dropdown, checkbox, date, time)  
- Custom fields automatically appear in student forms  
- All changes reflect instantly across all views  

### Student
- Login with student credentials  
- Can only view their own profile  
- Profile available across multiple views:
  - Table  
  - Gallery  
  - Kanban  
  - Timeline  
  - Calendar  

---

## 🧱 Tech Stack
- React  
- Vite  
- TypeScript  
- React Router  
- SWR  
- Context API  
- Tailwind CSS  
- shadcn/ui  

---

## 📂 Project Structure

src/
api/
services/
hooks/
context/
layouts/
components/
pages/
routes/
utils/


The architecture ensures that UI components remain clean while business logic stays in dedicated modules.

---

## 🗄️ Data Storage

All data is stored and managed using browser localStorage.  
The following keys are used:

- `users`
- `authUser`
- `students`
- `customFields`

Mock data is initialized when the app first loads.

---

## 🚀 Getting Started

### 1. Install dependencies

### 2. Run development server

### 3. Build for production


---

## 🔒 Authentication

- Role-based authentication (Admin / Student)  
- Auth state persists after refresh  
- Routes are protected based on user roles  
- UI adapts automatically depending on the logged-in user  

---

## 📊 Views Supported

The same dataset powers all views:

- **Table View**
- **Gallery View**
- **Kanban View** (grouped by status)
- **Timeline View** (using createdAt or date fields)
- **Calendar View** (using createdAt and custom date fields)

Updates reflect immediately through SWR + localStorage syncing.

---

## 📦 Deployment

This project can be deployed on platforms like Netlify or Vercel.  
Simply build the app and upload the production-ready files.

---

## 📝 Notes

This project focuses on clean architecture, modular design, and consistent data flow.  
It is built to be interview-friendly, with emphasis on:

- LocalStorage + SWR synchronization  
- Role-based rendering  
- Dynamic custom field engine  
- Reusable UI components  
- Maintainable folder structure  

---# Student-Management-System
