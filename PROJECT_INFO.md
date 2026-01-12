# Project Report: AI-Based Local Issue Reporter

## 1. Project Status
**Current State:** Working Prototype (High-Fidelity MVP)
*   **Ready for Demo:** The application is live, deployed, and fully functional.
*   **Key Features:** User authentication, issue reporting with geotagging, image uploads, authority management dashboard, and real-time status updates.
*   **UI/UX:** Premium "Glassmorphism" interface with responsive design for mobile and desktop.

## 2. Google Technologies & Tools Used
This project heavily leverages the **Google Firebase** ecosystem for a serverless, scalable architecture:

*   **Firebase Authentication:**
    *   Secure generic sign-in and registration handling.
    *   Manages sensitive user data and sessions transparently.
*   **Cloud Firestore (NoSQL Database):**
    *   Stores reported issues, user profiles, and authority data.
    *   Enables real-time data fetching for instant dashboard updates.
    *   Scalable document-based structure.
*   **Firebase Hosting:**
    *   Provides fast, secure, and global content delivery (CDN) for the web application.
    *   Serves the Single Page Application (SPA) functionality.
*   **Google Fonts:**
    *   Utilizes the **Inter** font family for modern, high-legibility typography across the app.
*   **Geolocation API (Browser Standard):**
    *   Used to capture precise latitude/longitude coordinates for issue mapping.

## 3. Short Project Description
The **AI-Based Local Issue Reporter** is a civic engagement platform designed to bridge the gap between residents and local municipal authorities.
*   **For Residents:** A streamlined interface to report community problems (like potholes, garbage dumps, or water leakage). The system captures photo evidence and precise location automatically.
*   **For Authorities:** A dedicated command dashboard to view, track, and update the status of complaints from "Pending" to "Resolved".
*   **Smart Features:** Includes a basic keyword-heuristic engine (simulating AI) that automatically categorizes issues based on user descriptions, reducing manual triage time.

## 4. Selected Challenge Category
**Target Category:** **SDG 11 - Sustainable Cities and Communities**
*   *Why?* This project directly contributes to making cities more inclusive, safe, resilient, and sustainable by:
    *   Improving municipal response times to infrastructure failures.
    *   Empowering citizens to take active roles in maintaining their living environments.
    *    digitization of civic grievance redressal.

## 5. Technical Highlights (For Evaluators)
*   **Architecture:** Serverless React SPA (Single Page Application).
*   **State Management:** React Context API for global Authentication state.
*   **Security:** Role-Based Access Control (RBAC) ensuring only Authorities can resolve issues.
*   **Performance:** Vite-powered build tooling for high-performance production bundles.
