/**
 * Sunset Bangladesh Real Estate - Standalone REST API Backend
 * Zero-dependency Node.js HTTP server with full CORS support.
 *
 * Usage:
 *   node server.js
 *
 * Runs on: http://localhost:5000/api/v1
 */

import http from 'http';

const PORT = 5000;
const BASE_PATH = '/api/v1';

// Sample in-memory database matching the expected dashboard schema
let employees = [
  {
    id: "emp-01",
    name: "Tanvir Ahmed",
    designation: "Senior Sales Director",
    department: "Luxury Residential",
    zone: "Dhaka North",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
    email: "tanvir.ahmed@sunset.com.bd",
    phone: "+880 1711-234567",
    monthlyTarget: 120000000,
    totalAchieved: 114000000,
    achievementPercentage: 95.0,
    phases: {
      first10Days: { target: 35000000, achieved: 38000000, percentage: 108.6, dealsCount: 1 },
      second10Days: { target: 45000000, achieved: 42000000, percentage: 93.3, dealsCount: 2 },
      fullMonth: { target: 40000000, achieved: 34000000, percentage: 85.0, dealsCount: 1 }
    },
    totalEmiCollected: 24500000,
    totalDue: 4200000,
    overdueCount: 2,
    activeClientsCount: 18,
    monthlyHistory: [
      { month: "Jul", target: 90000000, achieved: 85000000, emiCollected: 18000000, due: 3500000 },
      { month: "Aug", target: 95000000, achieved: 92000000, emiCollected: 19500000, due: 3200000 },
      { month: "Sep", target: 100000000, achieved: 104000000, emiCollected: 21000000, due: 2800000 },
      { month: "Oct", target: 110000000, achieved: 108000000, emiCollected: 23000000, due: 3800000 },
      { month: "Nov", target: 120000000, achieved: 114000000, emiCollected: 24500000, due: 4200000 }
    ],
    recentSales: [
      { id: "sale-901", date: "2026-11-04", projectName: "Sunset Heights Luxury Condos", unit: "Penthouse A-12", amount: 38000000, emiPlanMonths: 36 },
      { id: "sale-902", date: "2026-11-14", projectName: "Sunset Lakeview Residences", unit: "Suite 4B", amount: 24000000, emiPlanMonths: 48 },
      { id: "sale-903", date: "2026-11-18", projectName: "Sunset Apex Commercial Tower", unit: "Floor 7 North", amount: 18000000, emiPlanMonths: 0 },
      { id: "sale-904", date: "2026-11-21", projectName: "Sunset Green Valley Villas", unit: "Villa #14", amount: 34000000, emiPlanMonths: 60 }
    ]
  },
  {
    id: "emp-02",
    name: "Nusrat Jahan",
    designation: "Principal Property Consultant",
    department: "Villas & Penthouses",
    zone: "Purbachal",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80",
    email: "nusrat.jahan@sunset.com.bd",
    phone: "+880 1819-345678",
    monthlyTarget: 100000000,
    totalAchieved: 103000000,
    achievementPercentage: 103.0,
    phases: {
      first10Days: { target: 30000000, achieved: 28000000, percentage: 93.3, dealsCount: 1 },
      second10Days: { target: 35000000, achieved: 39000000, percentage: 111.4, dealsCount: 2 },
      fullMonth: { target: 35000000, achieved: 36000000, percentage: 102.9, dealsCount: 1 }
    },
    totalEmiCollected: 21800000,
    totalDue: 1800000,
    overdueCount: 0,
    activeClientsCount: 15,
    monthlyHistory: [
      { month: "Jul", target: 80000000, achieved: 82000000, emiCollected: 16000000, due: 2100000 },
      { month: "Aug", target: 85000000, achieved: 88000000, emiCollected: 17500000, due: 1900000 },
      { month: "Sep", target: 90000000, achieved: 95000000, emiCollected: 19000000, due: 1500000 },
      { month: "Oct", target: 95000000, achieved: 98000000, emiCollected: 20500000, due: 1400000 },
      { month: "Nov", target: 100000000, achieved: 103000000, emiCollected: 21800000, due: 1800000 }
    ],
    recentSales: [
      { id: "sale-905", date: "2026-11-06", projectName: "Sunset Bay Marina Suites", unit: "Duplex Villa 09", amount: 28000000, emiPlanMonths: 48 },
      { id: "sale-906", date: "2026-11-12", projectName: "Sunset Green Valley Villas", unit: "Duplex V-02", amount: 22000000, emiPlanMonths: 60 },
      { id: "sale-907", date: "2026-11-19", projectName: "Sunset Heights Luxury Condos", unit: "Suite 11A", amount: 17000000, emiPlanMonths: 36 },
      { id: "sale-908", date: "2026-11-22", projectName: "Sunset Imperial Horizon", unit: "Condo 8B", amount: 36000000, emiPlanMonths: 48 }
    ]
  }
];

let projects = [
  {
    id: "proj-01",
    name: "Sunset Heights Luxury Condos",
    developer: "Sunset Real Estate Ltd.",
    location: "Road 84, Gulshan-2, Dhaka",
    city: "Dhaka",
    type: "Luxury Condominium",
    totalUnits: 48,
    soldUnits: 38,
    availableUnits: 10,
    startingPrice: 38000000,
    maxPrice: 95000000,
    avgPricePerSqft: 24500,
    completionYear: 2027,
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80",
    featured: true,
    emiPlansAvailable: ["36 Months @ 0% Interest", "60 Months Flexible EMI", "Balloon Payment Option"]
  },
  {
    id: "proj-02",
    name: "Sunset Bay Marina Suites",
    developer: "Sunset Real Estate Ltd.",
    location: "Sector 17, 300 Ft Expressway, Purbachal",
    city: "Dhaka",
    type: "Duplex Villa",
    totalUnits: 64,
    soldUnits: 51,
    availableUnits: 13,
    startingPrice: 28000000,
    maxPrice: 62000000,
    avgPricePerSqft: 14200,
    completionYear: 2026,
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    featured: true,
    emiPlansAvailable: ["48 Months Equal Installment", "Quarterly EMI Schedule"]
  }
];

let emiRecords = [
  {
    id: "emi-01",
    clientName: "Barrister Sayeed Rahman",
    clientPhone: "+880 1711-987654",
    projectName: "Sunset Heights Luxury Condos",
    unitNumber: "Penthouse A-12",
    totalPrice: 38000000,
    downPayment: 11400000,
    monthlyEmiAmount: 738888,
    installmentsPaid: 14,
    totalInstallments: 36,
    nextDueDate: "2026-12-05",
    status: "paid",
    overdueDays: 0
  },
  {
    id: "emi-02",
    clientName: "Dr. Farzana Chowdhury",
    clientPhone: "+880 1819-876543",
    projectName: "Sunset Bay Marina Suites",
    unitNumber: "Duplex Villa 09",
    totalPrice: 28000000,
    downPayment: 8400000,
    monthlyEmiAmount: 408333,
    installmentsPaid: 8,
    totalInstallments: 48,
    nextDueDate: "2026-11-28",
    status: "pending",
    overdueDays: 0
  }
];

function setCorsHeaders(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Content-Type', 'application/json');
}

const server = http.createServer((req, res) => {
  setCorsHeaders(res);

  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  const url = new URL(req.url, `http://${req.headers.host}`);
  const pathname = url.pathname;

  // Health check endpoint (for Ping Test)
  if (pathname === `${BASE_PATH}/health`) {
    res.writeHead(200);
    res.end(JSON.stringify({
      status: 'ok',
      message: 'Sunset BD Real Estate Backend API is online and operational',
      timestamp: new Date().toISOString()
    }));
    return;
  }

  // GET /api/v1/employees
  if (pathname === `${BASE_PATH}/employees` && req.method === 'GET') {
    res.writeHead(200);
    res.end(JSON.stringify(employees));
    return;
  }

  // GET /api/v1/projects
  if (pathname === `${BASE_PATH}/projects` && req.method === 'GET') {
    res.writeHead(200);
    res.end(JSON.stringify(projects));
    return;
  }

  // GET /api/v1/emi-records
  if (pathname === `${BASE_PATH}/emi-records` && req.method === 'GET') {
    res.writeHead(200);
    res.end(JSON.stringify(emiRecords));
    return;
  }

  // 404 handler
  res.writeHead(404);
  res.end(JSON.stringify({ error: 'Endpoint not found', path: pathname }));
});

server.listen(PORT, () => {
  console.log(`\n🌇 Sunset REST API Backend running at: http://localhost:${PORT}${BASE_PATH}`);
  console.log(`📡 Health Check URL: http://localhost:${PORT}${BASE_PATH}/health`);
  console.log(`👥 Employees: http://localhost:${PORT}${BASE_PATH}/employees`);
  console.log(`🏢 Projects: http://localhost:${PORT}${BASE_PATH}/projects`);
  console.log(`💳 EMI Records: http://localhost:${PORT}${BASE_PATH}/emi-records\n`);
});
