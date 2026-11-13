# 🚀 Infinite Soft Tech — Official Website & Live Admin CRM

A next-generation enterprise website and serverless lead management system built with **React.js**, **Tailwind CSS**, and **Netlify Serverless Functions**. Designed with a cyber-dark aesthetic inspired by modern tech innovators, featuring real company credentials for **Infinite Soft Tech (Ahmedabad, India)**.

---

## 🌟 Key Highlights & Architecture

### 1. Modern Front-End Experience
* **Inspired by High-Conversion Tech Agencies:** Deep dark slate backdrop (`#070B14`), glowing cyber-cyan and indigo accents, glassmorphic cards, and micro-interactions.
* **In-House Enterprise Suites Showcase:** Dedicated spotlights for:
  * **Infinite Employee (HRMS):** Attendance, Payroll, Leave Management, Employee Portal.
  * **Vidyapeeth ERP:** School/College Management, Fees, Exam, Student & Parent Mobile App.
  * **Infinite Commerce (Uma Papad):** High-speed headless storefront, wholesale tier pricing, shipping API sync.
* **Interactive Project Cost Calculator:** Real-time ballpark estimation tool for Web, Mobile, ERP, and AI projects that directly captures qualified leads into your Admin Panel.
* **Comprehensive Services & Tech Stack Matrix:** Interactive tabs covering Frontend, Backend, Mobile (Flutter / React Native), AI/ML, Cloud/DevOps, Database, and Testing.
* **Verified Company Leadership:** Hardik Daki (CEO), Durgesh Jadav (CTO), Vinesh Jadav (Business Head).
* **Location & Direct Contact:** 205, Emerald Complex, C.G. Road, Ahmedabad, with one-click WhatsApp chat and interactive Google Map.

### 2. Live Admin Panel (`/#admin` or `/admin`)
* **Secure Access:** Protected by administrator password (default: `admin123` or PIN `1234`).
* **Real-Time Lead Tracking:** Automatically captures all inquiries from contact forms and cost calculator submissions.
* **1-Click WhatsApp Quick Reply:** Opens WhatsApp Web / Mobile app with a pre-filled personalized message to the customer in one click.
* **Pipeline Management:** Move leads across stages (`New Lead` ➔ `In Discussion` ➔ `Proposal Sent` ➔ `Closed Won`).
* **Internal Admin Notes:** Keep private notes on each lead.
* **1-Click CSV Export:** Download all leads directly to Microsoft Excel or Google Sheets.

### 3. Netlify Serverless Backend
* **Zero Monthly Server Fees:** Runs on Netlify Functions (`netlify/functions/api.js`).
* **Automatic Scaling & Zero Sleep:** Automatically handles customer inquiries, admin login, and statistics.
* **Seamless Local Fallback:** Works 100% out-of-the-box in local development with persistent browser storage.

---

## 🛠️ Quick Start (Local Development)

### Prerequisites
* Node.js v18 or higher (v20+ recommended)
* npm

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Start the Local Development Server
```bash
npm run dev
```
Open your browser at: `http://localhost:3000`

### Step 3: Access the Live Admin Panel
Visit: `http://localhost:3000/#admin`  
Enter Demo Password: `admin123` (or PIN: `1234`)

### Step 4: Build for Production
```bash
npm run build
```
Generates optimized static assets in the `/dist` directory.

---

## ☁️ How to Deploy to Netlify (Free Hosting)

### Method A: Connect With GitHub (Recommended)
1. Push this project to your GitHub repository:
   ```bash
   git init
   git add .
   git commit -m "Initial commit of Infinite Soft Tech website and admin panel"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/infinite-softtech-website.git
   git push -u origin main
   ```
2. Log in to [Netlify](https://www.netlify.com/).
3. Click **"Add new site"** ➔ **"Import an existing project"** ➔ Choose **GitHub**.
4. Select your repository. Netlify will automatically detect:
   * **Build command:** `npm run build`
   * **Publish directory:** `dist`
   * **Functions directory:** `netlify/functions`
5. Click **"Deploy Site"**. Your website and serverless backend will be live with a free SSL certificate!

---

### Method B: 1-Click Drag & Drop (Netlify Drop)
1. Run `npm run build` on your computer.
2. Go to [app.netlify.com/drop](https://app.netlify.com/drop).
3. Drag and drop the `dist` folder into the browser window.
4. Your site will instantly go live!

---

### Method C: Netlify CLI
```bash
npx netlify deploy --prod
```

---

## 🔒 Security & Admin Customization
To change the default admin password for production, set an environment variable in Netlify:
* Go to **Site settings** ➔ **Environment variables**.
* Add: `ADMIN_PASSWORD = YourStrongPassword123`

---

## 🏢 Contact & Company Coordinates
* **Company:** Infinite Soft Tech
* **Headquarters:** 205, Emerald Complex, C.G. Road, Ahmedabad, Gujarat, India - 380009
* **Phone:** +91 94092 59294 / +91 94292 59294
* **Email:** info@infinitesofttech.com
* **Founders:** Hardik Daki (CEO) & Durgesh Jadav (CTO)
