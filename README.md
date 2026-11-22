# 🌇 SUNSET — Bangladesh Real Estate Sales & EMI Dashboard

<p align="center">
  <strong>A Modern Real Estate Sales Performance, Target Tracking & EMI Management Dashboard</strong>
</p>

<p align="center">
  <a href="https://real-estate-dashboard-gold.vercel.app/">
    <img src="https://img.shields.io/badge/🚀_Live_Demo-Visit_Website-1B6B38?style=for-the-badge" alt="Live Demo"/>
  </a>
  <img src="https://img.shields.io/badge/React-18%2B-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React"/>
  <img src="https://img.shields.io/badge/TypeScript-Enabled-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript"/>
  <img src="https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS"/>
</p>

---

## 🌐 Live Demo

**Explore the live application:**

### 👉 https://real-estate-dashboard-gold.vercel.app/

SUNSET is a comprehensive Bangladesh-focused real estate management dashboard designed to monitor company-wide sales performance, employee productivity, monthly targets, property transactions, and EMI collections through an interactive analytics interface.

Built with a modern frontend architecture, the platform provides dedicated Admin and Employee dashboards, detailed financial insights, and an API-ready data integration system.

---

## ✨ Key Features

### 1. 🛡️ Dual Role-Based Dashboards

**Admin Dashboard**
- Company-wide sales performance monitoring across Bangladesh.
- Manage and update monthly sales targets for individual employees.
- Record property transactions with down payments and custom EMI schedules.
- Employee performance leaderboard based on achievement percentages.
- Monitor overall revenue, outstanding dues, and collection efficiency.
- Access consolidated business analytics and reports.

**Employee Dashboard**
- Personalized sales performance overview.
- Individual monthly targets and achievement tracking.
- Three-phase monthly sales progress visualization.
- Personal EMI collection and client due monitoring.
- Recent property transactions and payment status.
- Individual performance trends and historical analytics.

### 2. ⏱️ Three-Phase Monthly Sales Tracking

Monitor monthly sales performance across three milestones:

| Sales Phase | Period | Focus |
|---|---|---|
| Part 1 | Days 1–10 | Early-cycle bookings |
| Part 2 | Days 11–20 | Mid-month sales acceleration |
| Part 3 | Day 21–Month End | Final deal closures |

Each phase tracks:
- Sales target
- Achieved revenue
- Achievement percentage
- Number of completed deals

### 3. 💳 EMI & Financial Due Management

A dedicated EMI management system for monitoring installment collections and outstanding payments.

- Total EMI collected in Bangladeshi Taka (৳ BDT).
- Outstanding and overdue payment tracking.
- Client payment ledger.
- Buyer information and contact details.
- Property project and unit references.
- Installment progress (e.g., 14/36 months).
- Upcoming installment due dates.
- Payment statuses: Paid, Pending, and Overdue.
- One-click payment collection and status updates.

### 4. 📊 Advanced Business Analytics

**Company-Wide Analytics**
- Target vs. Achieved revenue comparison.
- Three-phase sales contribution charts.
- EMI collection vs. outstanding due analysis.
- Company-wide sales contribution distribution.
- Employee performance leaderboard.

**Individual Employee Analytics**
- Three-phase target vs. achievement charts.
- Five-month historical performance trends (July–November 2026).
- Sales pacing and target realization indicators.
- Individual EMI collection performance.

### 5. 🏢 Bangladesh Real Estate Project Showcase

Explore a collection of real estate developments across Dhaka and Bangladesh.

| Project | Location |
|---|---|
| Sunset Heights Luxury Condos | Gulshan-2, Dhaka |
| Sunset Bay Marina Suites | Purbachal |
| Sunset Lakeview Residences | Banani DOHS, Dhaka |
| Sunset Green Valley Villas | Bashundhara R/A, Dhaka |
| Sunset Apex Commercial Tower | Tejgaon-Gulshan Link Road |
| Sunset Imperial Horizon | Uttara, Dhaka |
| Sunset Ocean Breeze Condotel | Cox's Bazar |

Each project features:
- Total and available units.
- Sold unit absorption.
- Price per square foot (৳/sqft).
- Starting property prices.
- Flexible installment plans.

### 6. 🔌 Flexible Backend API Integration

SUNSET includes a configurable data provider engine that supports both internal mock data and external REST API integration.

**Internal BD Mock Data Engine**
- Built-in Bangladesh real estate sample data.
- LocalStorage-based data persistence.
- Ready-to-use employee, project, and EMI records.

**Custom REST Backend**
- Switch between Mock Data and External API.
- Configure a custom backend API base URL.
- Test backend connectivity using the Ping Test.
- View expected API response schemas.
- Copy sample JSON payloads for backend development.
- Support for employee, project, and EMI record endpoints.

**Expected API Endpoints**
```http
GET /employees
GET /projects
GET /emi-records
GET /employees/projects/emi-records
```

---

## 🛠️ Technology Stack

| Technology | Purpose |
|---|---|
| React | Frontend UI development |
| TypeScript | Type safety and maintainable code |
| Tailwind CSS v4 | Responsive styling |
| Recharts | Interactive data visualization |
| Lucide React | Modern icon library |
| Vite | Development and build tooling |
| LocalStorage | Mock data persistence |
| REST API | External backend integration |
| Vercel | Frontend deployment |

---

## 🎨 Design & User Experience

The application follows a modern, professional, and minimal dashboard design approach.

**Official Brand Color Palette**

| Role | Color | Hex |
|---|---|---|
| Primary Brand | Deep Forest Green | `#1B6B38` |
| Secondary Accent | Fresh Emerald Green | `#25D366` |
| Page Background | Soft Mint-Gray | `#F4F6F5` |
| Card Surface | Pure White | `#FFFFFF` |
| Primary Headings | Deep Charcoal Slate | `#1E242B` |
| Body Text | Muted Cool Gray | `#5A6570` |
| Borders | Light Neutral Gray | `#E2E8E5` |

The interface is designed for clarity, usability, and responsive viewing across desktop, tablet, and mobile devices.

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or later recommended)
- npm
- Git

### Installation

**1. Clone the repository**

```bash
git clone https://github.com/Asadul09/Sunset.git
```

**2. Navigate to the project directory**

```bash
cd Sunset
```

**3. Install dependencies**

```bash
npm install
```

**4. Start the development server**

```bash
npm run dev
```

**5. Build for production**

```bash
npm run build
```

---

## 📁 Project Structure

```text
Sunset/
├── src/
│   ├── types/
│   │   └── index.ts
│   ├── data/
│   │   └── mockData.ts
│   ├── services/
│   │   ├── api.ts
│   │   └── formatters.ts
│   ├── components/
│   │   ├── Navbar.tsx
│   │   ├── StatsOverview.tsx
│   │   ├── OverallCharts.tsx
│   │   ├── EmployeePerformance.tsx
│   │   ├── EmiDueManager.tsx
│   │   ├── RealEstateShowcase.tsx
│   │   ├── RecordSaleModal.tsx
│   │   ├── EmployeeModal.tsx
│   │   └── ApiConfigModal.tsx
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── package.json
├── vite.config.ts
└── README.md
```

---

## 🔮 Future Improvements

- Secure authentication and authorization.
- Production MongoDB database integration.
- Advanced employee and client management.
- Automated EMI payment reminders.
- PDF and Excel report exports.
- Real-time dashboard updates.
- Advanced financial reporting and forecasting.

---

## ⚠️ Project Information

The default application uses sample Bangladesh real estate data through its internal mock data engine. External backend integration requires a separately configured and deployed REST API.

The listed properties, employees, financial figures, and transactions are demonstration data and should not be interpreted as verified company records or actual property listings.

---

## 👨‍💻 Developer

**MD ASADUL ISLAM**

Software Engineer | Full-Stack MERN Developer

- GitHub: https://github.com/Asadul09
- Portfolio: https://portfolio-website-pi-five-83.vercel.app/
- Live Project: https://real-estate-dashboard-gold.vercel.app/

---

<p align="center">
  <strong>🌇 SUNSET — Smarter Sales. Better Insights. Stronger Growth.</strong>
</p>

<p align="center">
  Built with ❤️ using React, TypeScript & Tailwind CSS.
</p>
