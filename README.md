# 🏢 Echo Dwell (Echo Flat) — Gated Society Operations Console

Echo Dwell is a premium, production-grade, smart residential housing society management platform. It acts as a comprehensive, unified operating ecosystem designed to coordinate gate security staff, residents, maintenance teams, and administrative management committees.

Inspired by premium product aesthetics like **Notion**, **Linear**, and **CRED**, Echo Dwell features rich, functional content density, elegant micro-animations, glassmorphism visual overlays, fluid layouts, and a sleek modern dark/light dual-role shell.

---

## 🚀 Core Features

### 🛡️ Smart Visitor & Security Management
- **Guest Pre-Approval**: Residents can register incoming visitors, generating a secure digital QR code gate ticket.
- **Real-time Gate Logs**: Gantry staff can log visitor entries and exits instantly, updating live resident alerts.
- **Critical SOS Cockpit**: Instant emergency panic triggers immediately dispatch warning broadcasts to guard perimeters and show nearest hospital contacts.
- **Incident Logger**: Report double-parking, unrecognized vehicles, or security anomalies with severity filters.

### 🚗 Smart Parking Management
- **Interactive Gantry Slot Map**: Visual status grid of standard and EV charging spots in Tower A and Tower B.
- **Hourly EV Booking**: Hourly reservations sync solar injection benefits directly to the resident ledger, featuring zero surcharges during peak solar hours.
- **Vehicle RFID Registry**: Secure vehicle logs monitoring registered license plates and active gate sticker credentials.

### 💡 Utility & Consumption Telemetry
- **Telemetry Meters**: Real-time tracking of grid electricity, water usage, and solar panel arrays.
- **Abnormal Alert Logs**: Continuous seepage flow detection logs flag toilet or pipe leaks in real-time.
- **Outage Diesel Backlogs**: Generator fuel capacity trackers and diesel backup run statistics.

### 🧾 Advanced Financial Ledger
- **Invoices Clearing**: Consolidated outstanding balance panels mapping maintenance funds and water utility surcharges.
- **Downloadable Thermal Receipts**: Simulated payment checkouts issue printable receipt cards complete with tax breakdowns and transaction references.
- **Vendor Payment Sign-off**: Committee members can approve and disburse sinking funds directly to elevator or water vendors.

### 🛠️ Maintenance & SLA Coordinator
- **Ticket Dispatcher**: Residents can raise priority-filtered repair tickets (Electrical, Plumbing, Lift, Carpentry).
- **Technician Dispatches**: Admins dispatch available specialty engineers, triggering progress dot logs and SLA timers.
- **Spare Parts Inventory**: Live sensors track critical components (brass couplings, LED bulbs, pump impellers) with automatic low-stock prompts.

### 📦 Smart Locker Hubs
- **Locker Arrays Map**: Visual vacancies of lobby courier arrays (vacant vs. loaded).
- **Keypad OTP Pickups**: Physical-style terminal simulator. Select a package, input the 4-digit SMS OTP code, and release the locker latch.

### 🗳️ Governance & Community Ecosystem
- **Anonymous Ballot voting**: Poll tally bars update in real-time as users record their votes.
- **Document Archives Shelf**: Downloadable PDFs for past AGM minutes and public budget reports.
- **RSVP Events Planner**: Live scheduling logs to sign up for community carnivals or park tree plantation drives.

---

## 🎨 Color Palette & Aesthetic Tokens

- **Charcoal** (`#3b413c`): Primary UI boundaries, solid texts, and collapsible premium sidebars.
- **Sage** (`#9db5b2`): Subtle cards borders, secondary categories, and grid metadata.
- **Ice** (`#daf0ee`): Premium background washes, active hover matrices, and receipt modal backing.
- **Mint** (`#94d1be`): Highlights, successful check-ins, active EV slot bookings, and CTA buttons.
- **White** (`#ffffff`): Base container layers, modal plates, and text headlines on dark fields.

---

## 📁 Technical Architecture & File Directory

The project follows a modular, scalable architecture using **React, Vite, and JavaScript (no TypeScript)**. Styling is written purely in high-performance **modular Vanilla CSS**.

```
src/
├── main.jsx                       # Global entry point mounting App
├── App.jsx                        # App shell coordinates Lenis smooth-scrolling and GSAP tickers
├── styles/
│   ├── global.css                 # Base resets, HSL vars, Outfit/Inter typography, and utilities
│   ├── layout.css                 # App shell grid, collapsible sidebar, header toggles, and mobile bottom bars
│   └── dashboard.css              # Tabular card structures, custom SVG charts, parking grids, and keypads
├── context/
│   └── SocietyContext.jsx         # Central React Context state provider syncing data directly to localStorage
├── utils/
│   └── mockData.js                # Lived-in society database mapping towers, consumption histories, and active staff
└── components/
    ├── Sidebar.jsx                # Collapsible dark side navigation
    ├── Header.jsx                 # Role switcher, alert notification drawer, and COO profile cards
    ├── ResidentDashboard.jsx      # Resident dues alerts, smart lockers, and eco-recommendations
    ├── AdminDashboard.jsx         # Occupancy data grids, workforce loads, and incident heatmaps
    ├── SecurityManager.jsx        # Guest pre-approvals, QR codes, live gate tables, and SOS panic centers
    ├── ParkingSpace.jsx           # Parking slot matrices, EV hour bookings, RFID registries, and violation boards
    ├── UtilityTracker.jsx         # SVG monthly bar charts, diesel levels, water leak logs, and wet waste segs
    ├── FinanceLedger.jsx          # Billings, printable receipts, and committee vendor dispatches
    ├── MaintenanceHub.jsx         # Plumber dispatches, active SLA countdowns, and spare parts inventories
    ├── CourierLocker.jsx          # Locker status boxes and interactive digit OTP keypad terminals
    └── GovernancePolls.jsx        # Anonymous voting tallies, document libraries, and event RSVPs
```

---

## 🔧 Local Development & Installation

### 1. Prerequisites
Ensure you have [Node.js](https://nodejs.org/) installed (v18 or higher recommended).

### 2. Clone and Setup
Clone this repository to your local drive and enter the folder:
```bash
git clone https://github.com/Roshan1-0/Harmony.git
cd Harmony/echo-dwell-harmony-main
```

### 3. Install Dependencies
Install all required modules (Vite, React, GSAP, Lenis smooth scrolling, Lucide icons):
```bash
npm install
```

### 4. Boot Dev Server
Launch Vite's hot-reloaded local environment:
```bash
npm run dev
```
Open your browser and navigate to `http://localhost:5173`.

### 5. Production Compilation
Verify code building and prepare assets for Vercel/GitHub distribution:
```bash
npm run build
```

---

## 🌐 Production Deployment

This project is fully ready for zero-config deployment to **Vercel**:

1. Log into your [Vercel Dashboard](https://vercel.com).
2. Click **New Project** and import the linked GitHub Repository: `Roshan1-0/Harmony`.
3. Choose the root framework directory pointing to `echo-dwell-harmony-main`.
4. Click **Deploy**. Vercel will automatically compile the production bundle and issue a live custom URL.
