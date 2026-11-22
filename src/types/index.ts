export type UserRole = 'admin' | 'employee';

export interface TenDayPhase {
  target: number;
  achieved: number;
  percentage: number;
  dealsCount: number;
}

export interface SalesAchievementPhases {
  first10Days: TenDayPhase;  // Day 1 to 10
  second10Days: TenDayPhase; // Day 11 to 20
  fullMonth: TenDayPhase;    // Day 21 to end of month / Full cumulative total
}

export interface EmiRecord {
  id: string;
  clientName: string;
  clientPhone: string;
  projectName: string;
  unitNumber: string;
  totalPrice: number;
  downPayment: number;
  monthlyEmiAmount: number;
  installmentsPaid: number;
  totalInstallments: number;
  nextDueDate: string;
  status: 'paid' | 'pending' | 'overdue';
  overdueDays?: number;
}

export interface Employee {
  id: string;
  name: string;
  designation: string;
  department: string;
  avatar: string;
  email: string;
  phone: string;
  zone: 'Dhaka North' | 'Dhaka South' | 'Purbachal' | 'Chattogram' | 'Sylhet';
  monthlyTarget: number; // in BDT
  totalAchieved: number; // in BDT
  achievementPercentage: number;
  phases: SalesAchievementPhases;
  totalEmiCollected: number; // in BDT
  totalDue: number; // in BDT
  overdueCount: number;
  activeClientsCount: number;
  recentSales: {
    id: string;
    date: string;
    projectName: string;
    unit: string;
    amount: number;
    emiPlanMonths: number;
  }[];
  monthlyHistory: {
    month: string;
    target: number;
    achieved: number;
    emiCollected: number;
    due: number;
  }[];
}

export interface RealEstateProject {
  id: string;
  name: string;
  developer: string;
  location: string;
  city: 'Dhaka' | 'Chattogram' | 'Cox\'s Bazar' | 'Gazipur';
  type: 'Luxury Condominium' | 'Commercial Space' | 'Duplex Villa' | 'Residential Plot';
  totalUnits: number;
  soldUnits: number;
  availableUnits: number;
  startingPrice: number; // BDT
  maxPrice: number; // BDT
  avgPricePerSqft: number; // BDT
  completionYear: number;
  image: string;
  featured: boolean;
  emiPlansAvailable: string[];
}

export interface DashboardSummary {
  totalTarget: number;
  totalAchieved: number;
  overallPercentage: number;
  first10DaysAchieved: number;
  second10DaysAchieved: number;
  fullMonthAchieved: number;
  totalEmiCollected: number;
  totalDueAmount: number;
  totalEmployees: number;
  activeProjects: number;
  totalUnitsSoldThisMonth: number;
}

export interface ApiConfig {
  useMockData: boolean;
  backendBaseUrl: string;
  apiKey?: string;
  lastTested?: string;
  status: 'connected' | 'error' | 'untested';
}
