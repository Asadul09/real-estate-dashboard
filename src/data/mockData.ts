import type { Employee, RealEstateProject, EmiRecord, DashboardSummary } from '../types';

export const INITIAL_PROJECTS: RealEstateProject[] = [
  {
    id: 'proj-01',
    name: 'Sunset Heights Luxury Condos',
    developer: 'Sunset Real Estate Ltd.',
    location: 'Road 84, Gulshan-2, Dhaka',
    city: 'Dhaka',
    type: 'Luxury Condominium',
    totalUnits: 48,
    soldUnits: 38,
    availableUnits: 10,
    startingPrice: 38000000, // 3.8 Cr
    maxPrice: 95000000,    // 9.5 Cr
    avgPricePerSqft: 24500, // BDT per sqft
    completionYear: 2027,
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80',
    featured: true,
    emiPlansAvailable: ['36 Months @ 0% Interest', '60 Months Flexible EMI', 'Balloon Payment Option']
  },
  {
    id: 'proj-02',
    name: 'Sunset Bay Marina Suites',
    developer: 'Sunset Real Estate Ltd.',
    location: 'Sector 17, 300 Ft Expressway, Purbachal',
    city: 'Dhaka',
    type: 'Duplex Villa',
    totalUnits: 64,
    soldUnits: 51,
    availableUnits: 13,
    startingPrice: 28000000, // 2.8 Cr
    maxPrice: 62000000,    // 6.2 Cr
    avgPricePerSqft: 14200,
    completionYear: 2026,
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    featured: true,
    emiPlansAvailable: ['48 Months Equal Installment', 'Quarterly EMI Schedule']
  },
  {
    id: 'proj-03',
    name: 'Sunset Lakeview Residences',
    developer: 'Sunset Real Estate Ltd.',
    location: 'Lake Road, Banani DOHS, Dhaka',
    city: 'Dhaka',
    type: 'Luxury Condominium',
    totalUnits: 36,
    soldUnits: 29,
    availableUnits: 7,
    startingPrice: 32000000, // 3.2 Cr
    maxPrice: 75000000,    // 7.5 Cr
    avgPricePerSqft: 21000,
    completionYear: 2026,
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
    featured: false,
    emiPlansAvailable: ['36 Months Standard EMI', 'Early Bird 10% Cash Rebate']
  },
  {
    id: 'proj-04',
    name: 'Sunset Green Valley Villas',
    developer: 'Sunset Real Estate Ltd.',
    location: 'Block I, Bashundhara R/A, Dhaka',
    city: 'Dhaka',
    type: 'Duplex Villa',
    totalUnits: 50,
    soldUnits: 42,
    availableUnits: 8,
    startingPrice: 22000000, // 2.2 Cr
    maxPrice: 48000000,    // 4.8 Cr
    avgPricePerSqft: 12500,
    completionYear: 2027,
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
    featured: true,
    emiPlansAvailable: ['60 Months Low Initial Down Payment', 'Biannual Bullet Installment']
  },
  {
    id: 'proj-05',
    name: 'Sunset Apex Commercial Tower',
    developer: 'Sunset Real Estate Ltd.',
    location: 'Tejgaon-Gulshan Link Road, Dhaka',
    city: 'Dhaka',
    type: 'Commercial Space',
    totalUnits: 80,
    soldUnits: 65,
    availableUnits: 15,
    startingPrice: 45000000, // 4.5 Cr
    maxPrice: 180000000,   // 18 Cr (Full floor)
    avgPricePerSqft: 28000,
    completionYear: 2028,
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
    featured: true,
    emiPlansAvailable: ['Corporate Custom EMI', '36 Months Commercial Loan Assist']
  },
  {
    id: 'proj-06',
    name: 'Sunset Imperial Horizon',
    developer: 'Sunset Real Estate Ltd.',
    location: 'Sector 11, Uttara, Dhaka',
    city: 'Dhaka',
    type: 'Luxury Condominium',
    totalUnits: 44,
    soldUnits: 36,
    availableUnits: 8,
    startingPrice: 19500000, // 1.95 Cr
    maxPrice: 38000000,
    avgPricePerSqft: 13000,
    completionYear: 2026,
    image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=800&q=80',
    featured: false,
    emiPlansAvailable: ['36 Months Zero Interest', 'Bank Mortgage Coordination']
  },
  {
    id: 'proj-07',
    name: 'Sunset Ocean Breeze Condotel',
    developer: 'Sunset Real Estate Ltd.',
    location: 'Marine Drive, Inani, Cox\'s Bazar',
    city: 'Cox\'s Bazar',
    type: 'Luxury Condominium',
    totalUnits: 90,
    soldUnits: 72,
    availableUnits: 18,
    startingPrice: 15000000, // 1.5 Cr
    maxPrice: 32000000,
    avgPricePerSqft: 16500,
    completionYear: 2027,
    image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80',
    featured: false,
    emiPlansAvailable: ['48 Months Vacation Rental Profit Share EMI']
  }
];

export const INITIAL_EMPLOYEES: Employee[] = [
  {
    id: 'emp-01',
    name: 'Tanvir Ahmed',
    designation: 'Senior Sales Director',
    department: 'Luxury Residential',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
    email: 'tanvir.ahmed@sunset-bd.com',
    phone: '+880 1711-234567',
    zone: 'Dhaka North',
    monthlyTarget: 120000000, // ৳ 12 Crore
    totalAchieved: 114000000, // ৳ 11.4 Crore (95%)
    achievementPercentage: 95.0,
    phases: {
      first10Days: {
        target: 35000000,
        achieved: 38000000,
        percentage: 108.6,
        dealsCount: 1
      },
      second10Days: {
        target: 45000000,
        achieved: 42000000,
        percentage: 93.3,
        dealsCount: 2
      },
      fullMonth: {
        target: 40000000,
        achieved: 34000000,
        percentage: 85.0,
        dealsCount: 1
      }
    },
    totalEmiCollected: 24500000,
    totalDue: 4200000,
    overdueCount: 2,
    activeClientsCount: 18,
    recentSales: [
      { id: 'sale-101', date: '2026-11-04', projectName: 'Sunset Heights Luxury Condos', unit: 'Penthouse A-12', amount: 38000000, emiPlanMonths: 36 },
      { id: 'sale-102', date: '2026-11-14', projectName: 'Sunset Lakeview Residences', unit: 'Unit 7B', amount: 24000000, emiPlanMonths: 48 },
      { id: 'sale-103', date: '2026-11-18', projectName: 'Sunset Heights Luxury Condos', unit: 'Unit 5C', amount: 18000000, emiPlanMonths: 36 },
      { id: 'sale-104', date: '2026-11-21', projectName: 'Sunset Green Valley Villas', unit: 'Villa 14', amount: 34000000, emiPlanMonths: 60 }
    ],
    monthlyHistory: [
      { month: 'Jul 26', target: 100000000, achieved: 102000000, emiCollected: 21000000, due: 3800000 },
      { month: 'Aug 26', target: 110000000, achieved: 115000000, emiCollected: 23000000, due: 4100000 },
      { month: 'Sep 26', target: 115000000, achieved: 108000000, emiCollected: 22000000, due: 4500000 },
      { month: 'Oct 26', target: 120000000, achieved: 126000000, emiCollected: 25000000, due: 3900000 },
      { month: 'Nov 26', target: 120000000, achieved: 114000000, emiCollected: 24500000, due: 4200000 }
    ]
  },
  {
    id: 'emp-02',
    name: 'Farhana Yasmin',
    designation: 'Executive Relationship Manager',
    department: 'Gulshan & Banani Prime',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=250&q=80',
    email: 'farhana.yasmin@sunset-bd.com',
    phone: '+880 1819-345678',
    zone: 'Dhaka North',
    monthlyTarget: 95000000,
    totalAchieved: 102000000,
    achievementPercentage: 107.4,
    phases: {
      first10Days: {
        target: 28000000,
        achieved: 34000000,
        percentage: 121.4,
        dealsCount: 2
      },
      second10Days: {
        target: 35000000,
        achieved: 40000000,
        percentage: 114.3,
        dealsCount: 2
      },
      fullMonth: {
        target: 32000000,
        achieved: 28000000,
        percentage: 87.5,
        dealsCount: 1
      }
    },
    totalEmiCollected: 18200000,
    totalDue: 2100000,
    overdueCount: 1,
    activeClientsCount: 15,
    recentSales: [
      { id: 'sale-201', date: '2026-11-03', projectName: 'Sunset Lakeview Residences', unit: 'Unit 4A', amount: 19000000, emiPlanMonths: 36 },
      { id: 'sale-202', date: '2026-11-09', projectName: 'Sunset Heights Luxury Condos', unit: 'Unit 9A', amount: 15000000, emiPlanMonths: 48 },
      { id: 'sale-203', date: '2026-11-16', projectName: 'Sunset Heights Luxury Condos', unit: 'Penthouse B', amount: 40000000, emiPlanMonths: 36 },
      { id: 'sale-204', date: '2026-11-22', projectName: 'Sunset Green Valley Villas', unit: 'Villa 09', amount: 28000000, emiPlanMonths: 60 }
    ],
    monthlyHistory: [
      { month: 'Jul 26', target: 80000000, achieved: 84000000, emiCollected: 15000000, due: 2400000 },
      { month: 'Aug 26', target: 85000000, achieved: 89000000, emiCollected: 16500000, due: 2200000 },
      { month: 'Sep 26', target: 90000000, achieved: 91000000, emiCollected: 17000000, due: 2300000 },
      { month: 'Oct 26', target: 90000000, achieved: 98000000, emiCollected: 17900000, due: 1900000 },
      { month: 'Nov 26', target: 95000000, achieved: 102000000, emiCollected: 18200000, due: 2100000 }
    ]
  },
  {
    id: 'emp-03',
    name: 'Rafiqul Islam',
    designation: 'Commercial Sales Head',
    department: 'Commercial & Expressways',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=250&q=80',
    email: 'rafiqul.islam@sunset-bd.com',
    phone: '+880 1912-456789',
    zone: 'Purbachal',
    monthlyTarget: 140000000,
    totalAchieved: 112000000,
    achievementPercentage: 80.0,
    phases: {
      first10Days: {
        target: 40000000,
        achieved: 25000000,
        percentage: 62.5,
        dealsCount: 1
      },
      second10Days: {
        target: 50000000,
        achieved: 45000000,
        percentage: 90.0,
        dealsCount: 1
      },
      fullMonth: {
        target: 50000000,
        achieved: 42000000,
        percentage: 84.0,
        dealsCount: 2
      }
    },
    totalEmiCollected: 31000000,
    totalDue: 8500000,
    overdueCount: 4,
    activeClientsCount: 22,
    recentSales: [
      { id: 'sale-301', date: '2026-11-06', projectName: 'Sunset Apex Commercial Tower', unit: 'Floor 4-West', amount: 25000000, emiPlanMonths: 36 },
      { id: 'sale-302', date: '2026-11-15', projectName: 'Sunset Apex Commercial Tower', unit: 'Floor 6-Full', amount: 45000000, emiPlanMonths: 48 },
      { id: 'sale-303', date: '2026-11-20', projectName: 'Sunset Bay Marina Suites', unit: 'Villa 04', amount: 28000000, emiPlanMonths: 48 },
      { id: 'sale-304', date: '2026-11-22', projectName: 'Sunset Bay Marina Suites', unit: 'Duplex 11', amount: 14000000, emiPlanMonths: 36 }
    ],
    monthlyHistory: [
      { month: 'Jul 26', target: 120000000, achieved: 110000000, emiCollected: 26000000, due: 7200000 },
      { month: 'Aug 26', target: 125000000, achieved: 118000000, emiCollected: 28000000, due: 7800000 },
      { month: 'Sep 26', target: 130000000, achieved: 122000000, emiCollected: 29500000, due: 8100000 },
      { month: 'Oct 26', target: 135000000, achieved: 129000000, emiCollected: 30000000, due: 8300000 },
      { month: 'Nov 26', target: 140000000, achieved: 112000000, emiCollected: 31000000, due: 8500000 }
    ]
  },
  {
    id: 'emp-04',
    name: 'Nusrat Jahan',
    designation: 'Assistant Sales Manager',
    department: 'Bashundhara & Purbachal',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=250&q=80',
    email: 'nusrat.jahan@sunset-bd.com',
    phone: '+880 1613-567890',
    zone: 'Dhaka North',
    monthlyTarget: 70000000,
    totalAchieved: 74500000,
    achievementPercentage: 106.4,
    phases: {
      first10Days: {
        target: 20000000,
        achieved: 22000000,
        percentage: 110.0,
        dealsCount: 1
      },
      second10Days: {
        target: 25000000,
        achieved: 28500000,
        percentage: 114.0,
        dealsCount: 2
      },
      fullMonth: {
        target: 25000000,
        achieved: 24000000,
        percentage: 96.0,
        dealsCount: 1
      }
    },
    totalEmiCollected: 14200000,
    totalDue: 1800000,
    overdueCount: 1,
    activeClientsCount: 14,
    recentSales: [
      { id: 'sale-401', date: '2026-11-05', projectName: 'Sunset Green Valley Villas', unit: 'Villa 03', amount: 22000000, emiPlanMonths: 60 },
      { id: 'sale-402', date: '2026-11-12', projectName: 'Sunset Bay Marina Suites', unit: 'Suite 21', amount: 14500000, emiPlanMonths: 36 },
      { id: 'sale-403', date: '2026-11-18', projectName: 'Sunset Bay Marina Suites', unit: 'Suite 22', amount: 14000000, emiPlanMonths: 36 },
      { id: 'sale-404', date: '2026-11-21', projectName: 'Sunset Green Valley Villas', unit: 'Villa 07', amount: 24000000, emiPlanMonths: 60 }
    ],
    monthlyHistory: [
      { month: 'Jul 26', target: 55000000, achieved: 56000000, emiCollected: 11000000, due: 1500000 },
      { month: 'Aug 26', target: 60000000, achieved: 62000000, emiCollected: 12000000, due: 1600000 },
      { month: 'Sep 26', target: 65000000, achieved: 68000000, emiCollected: 13000000, due: 1700000 },
      { month: 'Oct 26', target: 65000000, achieved: 70000000, emiCollected: 13800000, due: 1750000 },
      { month: 'Nov 26', target: 70000000, achieved: 74500000, emiCollected: 14200000, due: 1800000 }
    ]
  },
  {
    id: 'emp-05',
    name: 'Kamrul Hasan',
    designation: 'Senior Property Advisor',
    department: 'Uttara & Mirpur Division',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=250&q=80',
    email: 'kamrul.hasan@sunset-bd.com',
    phone: '+880 1714-678901',
    zone: 'Dhaka North',
    monthlyTarget: 60000000,
    totalAchieved: 58500000,
    achievementPercentage: 97.5,
    phases: {
      first10Days: {
        target: 18000000,
        achieved: 19500000,
        percentage: 108.3,
        dealsCount: 1
      },
      second10Days: {
        target: 22000000,
        achieved: 20000000,
        percentage: 90.9,
        dealsCount: 1
      },
      fullMonth: {
        target: 20000000,
        achieved: 19000000,
        percentage: 95.0,
        dealsCount: 1
      }
    },
    totalEmiCollected: 11500000,
    totalDue: 2400000,
    overdueCount: 2,
    activeClientsCount: 12,
    recentSales: [
      { id: 'sale-501', date: '2026-11-08', projectName: 'Sunset Imperial Horizon', unit: 'Unit 8A', amount: 19500000, emiPlanMonths: 36 },
      { id: 'sale-502', date: '2026-11-17', projectName: 'Sunset Imperial Horizon', unit: 'Unit 11C', amount: 20000000, emiPlanMonths: 48 },
      { id: 'sale-503', date: '2026-11-21', projectName: 'Sunset Imperial Horizon', unit: 'Unit 4B', amount: 19000000, emiPlanMonths: 36 }
    ],
    monthlyHistory: [
      { month: 'Jul 26', target: 50000000, achieved: 48000000, emiCollected: 9500000, due: 2100000 },
      { month: 'Aug 26', target: 55000000, achieved: 56000000, emiCollected: 10200000, due: 2200000 },
      { month: 'Sep 26', target: 55000000, achieved: 53000000, emiCollected: 10800000, due: 2500000 },
      { month: 'Oct 26', target: 60000000, achieved: 61000000, emiCollected: 11100000, due: 2300000 },
      { month: 'Nov 26', target: 60000000, achieved: 58500000, emiCollected: 11500000, due: 2400000 }
    ]
  },
  {
    id: 'emp-06',
    name: 'Anika Tabassum',
    designation: 'Corporate Sales Specialist',
    department: 'Commercial & Hospitality',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=250&q=80',
    email: 'anika.tabassum@sunset-bd.com',
    phone: '+880 1815-789012',
    zone: 'Chattogram',
    monthlyTarget: 80000000,
    totalAchieved: 77000000,
    achievementPercentage: 96.3,
    phases: {
      first10Days: {
        target: 25000000,
        achieved: 30000000,
        percentage: 120.0,
        dealsCount: 2
      },
      second10Days: {
        target: 30000000,
        achieved: 32000000,
        percentage: 106.7,
        dealsCount: 2
      },
      fullMonth: {
        target: 25000000,
        achieved: 15000000,
        percentage: 60.0,
        dealsCount: 1
      }
    },
    totalEmiCollected: 16800000,
    totalDue: 2900000,
    overdueCount: 2,
    activeClientsCount: 16,
    recentSales: [
      { id: 'sale-601', date: '2026-11-04', projectName: 'Sunset Ocean Breeze Condotel', unit: 'Suite 404', amount: 15000000, emiPlanMonths: 48 },
      { id: 'sale-602', date: '2026-11-09', projectName: 'Sunset Ocean Breeze Condotel', unit: 'Suite 502', amount: 15000000, emiPlanMonths: 48 },
      { id: 'sale-603', date: '2026-11-14', projectName: 'Sunset Apex Commercial Tower', unit: 'Unit 301', amount: 16000000, emiPlanMonths: 36 },
      { id: 'sale-604', date: '2026-11-19', projectName: 'Sunset Apex Commercial Tower', unit: 'Unit 302', amount: 16000000, emiPlanMonths: 36 },
      { id: 'sale-605', date: '2026-11-22', projectName: 'Sunset Ocean Breeze Condotel', unit: 'Suite 801', amount: 15000000, emiPlanMonths: 48 }
    ],
    monthlyHistory: [
      { month: 'Jul 26', target: 65000000, achieved: 68000000, emiCollected: 13500000, due: 2500000 },
      { month: 'Aug 26', target: 70000000, achieved: 71000000, emiCollected: 14800000, due: 2700000 },
      { month: 'Sep 26', target: 75000000, achieved: 74000000, emiCollected: 15500000, due: 2800000 },
      { month: 'Oct 26', target: 75000000, achieved: 81000000, emiCollected: 16200000, due: 2600000 },
      { month: 'Nov 26', target: 80000000, achieved: 77000000, emiCollected: 16800000, due: 2900000 }
    ]
  }
];

export const INITIAL_EMI_RECORDS: EmiRecord[] = [
  {
    id: 'emi-01',
    clientName: 'Barrister Sayeed Rahman',
    clientPhone: '+880 1711-998877',
    projectName: 'Sunset Heights Luxury Condos',
    unitNumber: 'Penthouse A-12',
    totalPrice: 38000000,
    downPayment: 11400000,
    monthlyEmiAmount: 738888,
    installmentsPaid: 14,
    totalInstallments: 36,
    nextDueDate: '2026-12-05',
    status: 'paid'
  },
  {
    id: 'emi-02',
    clientName: 'Dr. Shamima Akhter',
    clientPhone: '+880 1819-223344',
    projectName: 'Sunset Lakeview Residences',
    unitNumber: 'Unit 7B',
    totalPrice: 24000000,
    downPayment: 7200000,
    monthlyEmiAmount: 350000,
    installmentsPaid: 8,
    totalInstallments: 48,
    nextDueDate: '2026-11-15',
    status: 'overdue',
    overdueDays: 7
  },
  {
    id: 'emi-03',
    clientName: 'Engr. Kabir Ahmed Chowdhury',
    clientPhone: '+880 1912-334455',
    projectName: 'Sunset Apex Commercial Tower',
    unitNumber: 'Floor 6-Full',
    totalPrice: 45000000,
    downPayment: 15000000,
    monthlyEmiAmount: 625000,
    installmentsPaid: 6,
    totalInstallments: 48,
    nextDueDate: '2026-11-28',
    status: 'pending'
  },
  {
    id: 'emi-04',
    clientName: 'Md. Mostafa Kamal (CIP)',
    clientPhone: '+880 1713-445566',
    projectName: 'Sunset Green Valley Villas',
    unitNumber: 'Villa 14',
    totalPrice: 34000000,
    downPayment: 10200000,
    monthlyEmiAmount: 396666,
    installmentsPaid: 18,
    totalInstallments: 60,
    nextDueDate: '2026-12-01',
    status: 'paid'
  },
  {
    id: 'emi-05',
    clientName: 'Kazi Farhad Hossain',
    clientPhone: '+880 1611-556677',
    projectName: 'Sunset Bay Marina Suites',
    unitNumber: 'Villa 04',
    totalPrice: 28000000,
    downPayment: 8400000,
    monthlyEmiAmount: 408333,
    installmentsPaid: 11,
    totalInstallments: 48,
    nextDueDate: '2026-11-10',
    status: 'overdue',
    overdueDays: 12
  },
  {
    id: 'emi-06',
    clientName: 'Begum Rokeya Sultana',
    clientPhone: '+880 1715-667788',
    projectName: 'Sunset Imperial Horizon',
    unitNumber: 'Unit 8A',
    totalPrice: 19500000,
    downPayment: 5850000,
    monthlyEmiAmount: 379166,
    installmentsPaid: 22,
    totalInstallments: 36,
    nextDueDate: '2026-12-10',
    status: 'paid'
  },
  {
    id: 'emi-07',
    clientName: 'Mahmudur Rahman & Sons',
    clientPhone: '+880 1817-778899',
    projectName: 'Sunset Apex Commercial Tower',
    unitNumber: 'Floor 4-West',
    totalPrice: 25000000,
    downPayment: 7500000,
    monthlyEmiAmount: 486111,
    installmentsPaid: 9,
    totalInstallments: 36,
    nextDueDate: '2026-11-25',
    status: 'pending'
  },
  {
    id: 'emi-08',
    clientName: 'Nadia Sharmin',
    clientPhone: '+880 1914-889900',
    projectName: 'Sunset Ocean Breeze Condotel',
    unitNumber: 'Suite 404',
    totalPrice: 15000000,
    downPayment: 4500000,
    monthlyEmiAmount: 218750,
    installmentsPaid: 16,
    totalInstallments: 48,
    nextDueDate: '2026-12-05',
    status: 'paid'
  }
];

export function calculateDashboardSummary(employees: Employee[], projects: RealEstateProject[]): DashboardSummary {
  const totalTarget = employees.reduce((sum, e) => sum + e.monthlyTarget, 0);
  const totalAchieved = employees.reduce((sum, e) => sum + e.totalAchieved, 0);
  const overallPercentage = totalTarget > 0 ? (totalAchieved / totalTarget) * 100 : 0;

  const first10DaysAchieved = employees.reduce((sum, e) => sum + e.phases.first10Days.achieved, 0);
  const second10DaysAchieved = employees.reduce((sum, e) => sum + e.phases.second10Days.achieved, 0);
  const fullMonthAchieved = employees.reduce((sum, e) => sum + e.phases.fullMonth.achieved, 0);

  const totalEmiCollected = employees.reduce((sum, e) => sum + e.totalEmiCollected, 0);
  const totalDueAmount = employees.reduce((sum, e) => sum + e.totalDue, 0);

  const totalUnitsSoldThisMonth = employees.reduce((sum, e) => sum + e.recentSales.length, 0);

  return {
    totalTarget,
    totalAchieved,
    overallPercentage,
    first10DaysAchieved,
    second10DaysAchieved,
    fullMonthAchieved,
    totalEmiCollected,
    totalDueAmount,
    totalEmployees: employees.length,
    activeProjects: projects.length,
    totalUnitsSoldThisMonth
  };
}
