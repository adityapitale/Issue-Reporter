# 🚀 Issue Reporter  
### An AI-Powered Civic Action & Infrastructure Management Platform

**Issue Reporter** is a modern, end-to-end platform designed to bridge the gap between citizens and local government authorities. It enables citizens to report public infrastructure problems—such as potholes, water leaks, or broken streetlights—and uses **Google Vision AI** to automatically categorize and prioritize them for rapid resolution.

Unlike traditional complaint portals, Issue Reporter manages the **entire lifecycle of a civic issue**: from AI-driven detection and community upvoting to real-time status tracking and final resolution.

---

## 🌟 Features

### 👩‍💼 Citizens
- **AI-Powered Reporting**  
  Snap a photo and Google Vision AI automatically detects the issue type (Road, Water, Electrical).

- **Community Pulse**  
  View nearby issues and upvote (Support) them to increase priority.

- **Real-time Tracking**  
  Track issue status: `Pending → In Progress → Resolved`.

- **Interactive Maps**  
  Accurate geolocation tagging to pinpoint exact issue locations.

---

### 🏛️ Authorities
- **Priority Dashboard**  
  Issues sorted using a **Dynamic Priority Algorithm** (Upvotes + Severity + Time).

- **Status Management**  
  Update issue progress with instant citizen notifications.

- **Resource Allocation**  
  AI-driven categorization routes issues to the correct department instantly.

- **Analytics**  
  Monitor resolution time, issue density, and problem hotspots.

---

## 🔐 Authentication & Security

- **Firebase Authentication**
  - Google Sign-In
  - Email & Password login

- **Identity-Based Access Control**  
  Only verified users can report or upvote issues.

- **Atomic Operations**  
  Firestore `arrayUnion()` prevents duplicate votes and handles concurrency.

- **Firestore Security Rules**  
  Database-level protection allowing only authenticated writes.

---

## ☁️ Tech Stack

### Frontend
- **React.js** – Dynamic and responsive UI  
- **Tailwind CSS** – Mobile-first modern styling  
- **Vite** – Fast development and build tooling  

### Backend & Intelligence
- **Firebase Authentication** – Secure user management  
- **Cloud Firestore** – Real-time NoSQL database  
- **Cloud Functions** – Serverless AI triggers  
- **Google Cloud Vision AI** – Image-based issue detection  
- **Firebase Storage** – Secure photo evidence storage  

---

## 📂 Project Structure
```
src/
├─ assets/ → Brand logos and static icons
├─ components/ → Reusable UI components (Navbar, IssueCard, UpvoteButton)
├─ hooks/ → Custom hooks (useAuth, useFirestoreSync)
├─ lib/ → Firebase & Vision AI configuration
├─ App.jsx → Routing and global state
└─ main.jsx → Application entry point
```
---

## 🔑 Environment Setup

Create a `.env` file in the project root:

```env
VITE_FIREBASE_API_KEY=xxxx
VITE_FIREBASE_AUTH_DOMAIN=xxxx
VITE_FIREBASE_PROJECT_ID=xxxx
VITE_FIREBASE_STORAGE_BUCKET=xxxx
VITE_FIREBASE_MESSAGING_SENDER_ID=xxxx
VITE_FIREBASE_APP_ID=xxxx
```
---

## 🎓 Use Cases

- **🏙️ Smart Cities** – Automating municipal infrastructure maintenance and citizen issue resolution.
- **🎓 Campus Management** – Student-driven reporting of campus facility issues with faster maintenance response.
- **🌪️ Disaster Response** – Rapid damage reporting, mapping, and priority-based emergency response.
- **🏢 Corporate Parks** – Large-scale private infrastructure and facilities management.

---

## 🔄 Real-Time Transparency

The platform uses **Firestore Snapshot Listeners (WebSocket-based)** to ensure that when an authority updates an issue’s status, the reporting citizen sees it **instantly**, enabling a transparent, accountable, and efficient civic workflow.
