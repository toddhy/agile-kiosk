# UHMC Business Department - Ka Lama Interactive Kiosk

An interactive touchscreen digital signage web application prototype designed for the two 43” commercial touchscreen kiosks on the 1st and 2nd floors of the Ka Lama building at **University of Hawaiʻi Maui College (UHMC)**.

---

## 🌟 Features Implemented

1. **Academic Programs Showcase:**
   * Detail cards, degree pathways, career outcomes, and faculty advisor contact information for:
     * **ABIT** (Applied Business & Information Technology - BAS)
     * **Business Administration** (AAS & transfer)
     * **Hospitality & Tourism** (HOST - AS & certificates)
     * **Accounting** (AAS & certificates)
2. **Ka Lama Building Directory & Interactive Map:**
   * 1st Floor (Ground Level) and 2nd Floor (Offices & Labs) floor toggles.
   * Search filter by room number (`KL-101`, `KL-202`), room name, or professor.
   * Interactive vector SVG floor plan with real-time clickable room highlighting.
3. **Student Voice Survey:**
   * Instant single-touch polling: *"What would you like to see/happen more on campus?"*
   * Real-time percentage bars and live vote counting.
   * Persists votes in browser storage.
4. **Career & Job Opportunities Board:**
   * Filterable cards (Student Internships, Part-Time Student Help, Full-Time Business Careers).
   * Highlights Maui-based companies and on-campus positions.
5. **Events & Spotlights:**
   * Visual calendar timeline for pitch days, career fairs, and graduation deadlines.
6. **UHMC Web Access Hub:**
   * Quick-launch cards for verified university portals: MyUH, Laulima, STAR GPS, UHMC official site, The Learning Center, and Bookstore.
7. **Digital Signage Attract Loop (Screensaver):**
   * Automatically activates after 60 seconds of inactivity.
   * Cycles marketing highlights and prompts the user with *"Touch Screen to Start"*.
   * Single tap immediately returns to the interactive dashboard.
8. **Kiosk Accessibility:**
   * High-contrast accessibility toggle for ADA compliance.
   * Fullscreen mode toggle for edge-to-edge kiosk display.

---

## 🚀 How to Run Locally

Because this prototype is built with standard web technologies (HTML5, CSS3, JavaScript), there are no build steps or dependencies required:

1. Double click [`index.html`](file:///c:/projects/ICSAgileApp/index.html) to open directly in Chrome, Edge, or Firefox.
2. Or open a terminal in this folder and run a quick local server:
   ```powershell
   npx serve .
   # or
   python -m http.server 8000
   ```
   Then navigate to `http://localhost:8000`.

---

## 🌐 How to Host on GitHub Pages (`github.io`)

To get a live public URL (e.g. `https://<your-username>.github.io/ICSAgileApp`):

1. **Initialize Git (if not already done) and Commit:**
   ```powershell
   git init
   git add .
   git commit -m "Initial commit of UHMC Ka Lama kiosk prototype"
   ```

2. **Push to your GitHub Repository:**
   ```powershell
   git remote add origin https://github.com/<your-username>/<your-repo-name>.git
   git branch -M main
   git push -u origin main
   ```

3. **Enable GitHub Pages:**
   * Go to your repository on GitHub.
   * Click **Settings** > **Pages** (in the left sidebar).
   * Under **Build and deployment** > **Source**, choose **Deploy from a branch**.
   * Under **Branch**, select `main` and folder `/ (root)`.
   * Click **Save**.
   * Within 1–2 minutes, your live site will be published at:
     `https://<your-username>.github.io/<your-repo-name>/`

---

## 📺 Recommended Kiosk Setup (When Hardware Arrives)

When the 43" KEINONE kiosks arrive:
* **If Android-based (standard for KEINONE):** Install **Fully Kiosk Browser** from Google Play or APK sideload. Set the Start URL to your GitHub Pages URL, enable full-screen kiosk lock, and configure auto-start on boot.
* **If Windows-based:** Launch Chrome or Edge in kiosk mode:
  ```powershell
  msedge.exe --kiosk https://<your-username>.github.io/<your-repo-name>/ --edge-kiosk-type=fullscreen
  ```
