# 🌇 SUNSET — Bangladesh Real Estate Sales & EMI Dashboard

A multi-feature real estate performance, target tracking, and EMI management dashboard built with **React**, **TypeScript**, **Tailwind CSS v4**, **Recharts**, and **Lucide Icons**.

---

## 🚀 Key Features

### 1. 🛡️ Dual Role Views: Admin vs User (Employee)
- **Admin View**:
  - Full company-wide aggregate sales metrics across all sales officers in Bangladesh (Dhaka North, Gulshan, Banani, Purbachal, Uttara, Chattogram).
  - Modify monthly sales targets for any employee with instant percentage recalculation.
  - Record new property transactions with down payments and custom EMI installment schedules.
  - Overall leaderboard ranking based on target achievement rate.
- **User (Employee) View**:
  - Personalized individual dashboard displaying personal monthly sales targets, current achievement, and sprint progress.
  - Dedicated visual graphs for individual sprint pacing, EMI collection efficiency, and personal client due logs.
  - List of recent deals booked by the employee with unit numbers and payment status.

---

### 2. ⏱️ 3-Sprint Monthly Achievement Milestone Breakdown
Track and visualize monthly sales in three distinct calendar phases:
1. **Part 1 • First 10 Days (Day 1 - 10)**: Early-cycle momentum and preliminary booking conversions.
2. **Part 2 • Mid 20 Days Mark (Day 11 - 20)**: Mid-month acceleration and milestone delivery.
3. **Part 3 • Full Month Closing (Day 21 - End of Month)**: Final deal closures, contract signings, and cumulative monthly achievement.

---

### 3. 💳 EMI & Due Tracking Management
- **Total EMI Collected**: Cumulative installment collections in Bangladeshi Taka (৳ BDT).
- **Total Outstanding Due**: Real-time overdue and upcoming payment monitoring.
- **Client Ledger**: Shows buyer names, contact numbers, project, unit, installment progress (e.g., 14/36 months), next due date, and status (`Paid`, `Pending`, `Overdue`).
- **One-Click Payment Collection**: Immediately reconciles installment payment and advances payment status.

---

### 4. 📊 High-Impact Visual Analytics
- **For All Employees**:
  - Side-by-side Target vs Achieved comparison bar charts in Crores (৳ Cr).
  - 3-Phase Stacked Sprint contribution distribution.
  - Total EMI Collected vs Outstanding Due comparative risk graphs.
  - Overall company sprint revenue share pie chart.
- **For Each Employee**:
  - Individual 3-Sprint milestone bar chart (Target vs Achieved per 10 days).
  - 5-Month Historical Trend area chart (July – November 2026).
  - Real-time pacing gauges and target realization indices.

---

### 5. 🏢 Bangladesh Real Estate Project Showcase
Featuring premier real estate developments across Dhaka and Bangladesh:
- **Sunset Heights Luxury Condos** — Road 84, Gulshan-2, Dhaka
- **Sunset Bay Marina Suites** — 300 Ft Expressway, Purbachal
- **Sunset Lakeview Residences** — Banani DOHS, Dhaka
- **Sunset Green Valley Villas** — Block I, Bashundhara R/A, Dhaka
- **Sunset Apex Commercial Tower** — Tejgaon-Gulshan Link Road, Dhaka
- **Sunset Imperial Horizon** — Sector 11, Uttara, Dhaka
- **Sunset Ocean Breeze Condotel** — Marine Drive, Cox's Bazar

Each property displays unit absorption (sold vs available), price per sqft in BDT (৳/sqft), starting price, and flexible installment plans.

---

### 6. 🔌 Backend API Integration & Schema Ready
- By default, runs on a high-fidelity **Bangladesh Real Estate Mock Data Engine** stored in `localStorage`.
- Includes an **API Configuration Drawer**:
  - Toggle between Mock Engine and your Custom REST Backend.
  - Enter backend endpoint (`http://localhost:5000/api` or `https://api.yourdomain.bd`).
  - Ping Test button to verify backend connectivity.
  - Complete JSON schema and copyable sample payloads for `/employees`, `/projects`, and `/emi-records`.

---

## 🛠️ How to Run Locally

```bash
# Navigate to the project directory
cd Sunset

# Install dependencies (already installed)
npm install

# Start Vite development server
npm run dev

# Build for production
npm run build
```

---

## 📁 Project Structure

```
Sunset/
├── src/
│   ├── types/
│   │   └── index.ts                 # TypeScript interfaces for Employee, Phases, EMI, Projects
│   ├── data/
│   │   └── mockData.ts              # Bangladesh Real Estate seed data & calculation logic
│   ├── services/
│   │   ├── api.ts                   # Unified API adapter (Local Storage Mock + REST Backend toggle)
│   │   └── formatters.ts            # Bangladeshi Taka (৳ Cr, ৳ L) & percentage formatters
│   ├── components/
│   │   ├── Navbar.tsx               # Header, Role Switcher (Admin/User), Month Filter, Export
│   │   ├── StatsOverview.tsx        # Top KPI cards & 3-Sprint milestone summary cards
│   │   ├── OverallCharts.tsx        # Visual graphs for ALL employees & Leaderboard
│   │   ├── EmployeePerformance.tsx  # In-depth visual graphs for EACH employee
│   │   ├── EmiDueManager.tsx        # EMI collection schedule & outstanding due ledger
│   │   ├── RealEstateShowcase.tsx   # Active Bangladesh property inventory cards
│   │   ├── RecordSaleModal.tsx      # Record deal modal with 10-day sprint attribution
│   │   ├── EmployeeModal.tsx        # Admin target modification modal
│   │   └── ApiConfigModal.tsx       # Live backend API connection modal & schema docs
│   ├── App.tsx                      # Root application layout & state management
│   ├── main.tsx
│   └── index.css                    # Tailwind CSS v4 setup
├── package.json
└── vite.config.ts
```
