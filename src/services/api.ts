import type { Employee, RealEstateProject, EmiRecord, DashboardSummary, ApiConfig } from '../types';
import { INITIAL_EMPLOYEES, INITIAL_PROJECTS, INITIAL_EMI_RECORDS, calculateDashboardSummary } from '../data/mockData';

const STORAGE_KEYS = {
  EMPLOYEES: 'sunset_employees_v1',
  PROJECTS: 'sunset_projects_v1',
  EMI_RECORDS: 'sunset_emi_records_v1',
  API_CONFIG: 'sunset_api_config_v1',
};

export class SunsetApiService {
  private config: ApiConfig;

  constructor() {
    this.config = this.loadConfig();
  }

  public getConfig(): ApiConfig {
    return { ...this.config };
  }

  public saveConfig(newConfig: Partial<ApiConfig>): ApiConfig {
    this.config = { ...this.config, ...newConfig };
    try {
      localStorage.setItem(STORAGE_KEYS.API_CONFIG, JSON.stringify(this.config));
    } catch (e) {
      console.warn('Failed to save API config to localStorage', e);
    }
    return { ...this.config };
  }

  private loadConfig(): ApiConfig {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.API_CONFIG);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Failed to load API config from localStorage', e);
    }
    return {
      useMockData: true,
      backendBaseUrl: 'http://localhost:5000/api/v1',
      status: 'untested'
    };
  }

  // --- Mock Data Management ---
  private getLocalEmployees(): Employee[] {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.EMPLOYEES);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Could not read employees from local storage', e);
    }
    this.saveLocalEmployees(INITIAL_EMPLOYEES);
    return INITIAL_EMPLOYEES;
  }

  private saveLocalEmployees(data: Employee[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.EMPLOYEES, JSON.stringify(data));
    } catch (e) {
      console.warn('Could not save employees to local storage', e);
    }
  }

  private getLocalProjects(): RealEstateProject[] {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PROJECTS);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Could not read projects from local storage', e);
    }
    this.saveLocalProjects(INITIAL_PROJECTS);
    return INITIAL_PROJECTS;
  }

  private saveLocalProjects(data: RealEstateProject[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(data));
    } catch (e) {
      console.warn('Could not save projects to local storage', e);
    }
  }

  private getLocalEmiRecords(): EmiRecord[] {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.EMI_RECORDS);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Could not read EMI records from local storage', e);
    }
    this.saveLocalEmiRecords(INITIAL_EMI_RECORDS);
    return INITIAL_EMI_RECORDS;
  }

  private saveLocalEmiRecords(data: EmiRecord[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.EMI_RECORDS, JSON.stringify(data));
    } catch (e) {
      console.warn('Could not save EMI records to local storage', e);
    }
  }

  // --- Public API Methods ---

  public async getEmployees(): Promise<Employee[]> {
    if (!this.config.useMockData && this.config.backendBaseUrl) {
      try {
        const res = await fetch(`${this.config.backendBaseUrl}/employees`, {
          headers: this.config.apiKey ? { Authorization: `Bearer ${this.config.apiKey}` } : {}
        });
        if (res.ok) {
          const data = await res.json();
          return data;
        }
      } catch (err) {
        console.warn('Backend fetch failed, falling back to cached BD mock data', err);
      }
    }
    return this.getLocalEmployees();
  }

  public async getProjects(): Promise<RealEstateProject[]> {
    if (!this.config.useMockData && this.config.backendBaseUrl) {
      try {
        const res = await fetch(`${this.config.backendBaseUrl}/projects`);
        if (res.ok) return await res.json();
      } catch (err) {
        console.warn('Backend fetch failed for projects', err);
      }
    }
    return this.getLocalProjects();
  }

  public async getEmiRecords(): Promise<EmiRecord[]> {
    if (!this.config.useMockData && this.config.backendBaseUrl) {
      try {
        const res = await fetch(`${this.config.backendBaseUrl}/emi-records`);
        if (res.ok) return await res.json();
      } catch (err) {
        console.warn('Backend fetch failed for EMI records', err);
      }
    }
    return this.getLocalEmiRecords();
  }

  public async getSummary(): Promise<DashboardSummary> {
    const employees = await this.getEmployees();
    const projects = await this.getProjects();
    return calculateDashboardSummary(employees, projects);
  }

  public async updateEmployeeTarget(employeeId: string, newTarget: number): Promise<Employee[]> {
    const employees = this.getLocalEmployees();
    const updated = employees.map(emp => {
      if (emp.id === employeeId) {
        const newPct = newTarget > 0 ? (emp.totalAchieved / newTarget) * 100 : 0;
        return {
          ...emp,
          monthlyTarget: newTarget,
          achievementPercentage: Number(newPct.toFixed(1))
        };
      }
      return emp;
    });
    this.saveLocalEmployees(updated);
    return updated;
  }

  public async recordSale(saleData: {
    employeeId: string;
    projectName: string;
    unit: string;
    amount: number;
    phase: 'first10Days' | 'second10Days' | 'fullMonth';
    emiMonths: number;
    clientName: string;
    clientPhone: string;
    downPayment: number;
  }): Promise<{ employees: Employee[]; emiRecords: EmiRecord[] }> {
    const employees = this.getLocalEmployees();
    const emiRecords = this.getLocalEmiRecords();

    // Update Employee
    const updatedEmployees = employees.map(emp => {
      if (emp.id === saleData.employeeId) {
        const currentPhase = emp.phases[saleData.phase];
        const newPhaseAchieved = currentPhase.achieved + saleData.amount;
        const newPhasePct = currentPhase.target > 0 ? (newPhaseAchieved / currentPhase.target) * 100 : 100;
        
        const newTotalAchieved = emp.totalAchieved + saleData.amount;
        const newTotalPct = emp.monthlyTarget > 0 ? (newTotalAchieved / emp.monthlyTarget) * 100 : 100;

        const newSaleItem = {
          id: `sale-${Date.now()}`,
          date: new Date().toISOString().split('T')[0],
          projectName: saleData.projectName,
          unit: saleData.unit,
          amount: saleData.amount,
          emiPlanMonths: saleData.emiMonths
        };

        return {
          ...emp,
          totalAchieved: newTotalAchieved,
          achievementPercentage: Number(newTotalPct.toFixed(1)),
          phases: {
            ...emp.phases,
            [saleData.phase]: {
              ...currentPhase,
              achieved: newPhaseAchieved,
              percentage: Number(newPhasePct.toFixed(1)),
              dealsCount: currentPhase.dealsCount + 1
            }
          },
          recentSales: [newSaleItem, ...emp.recentSales]
        };
      }
      return emp;
    });

    // Update EMI Records if plan chosen
    let updatedEmiRecords = [...emiRecords];
    if (saleData.emiMonths > 0) {
      const remainingBalance = saleData.amount - saleData.downPayment;
      const monthlyEmi = Math.round(remainingBalance / saleData.emiMonths);
      const newEmi: EmiRecord = {
        id: `emi-${Date.now()}`,
        clientName: saleData.clientName || 'Client ' + saleData.unit,
        clientPhone: saleData.clientPhone || '+880 1700-000000',
        projectName: saleData.projectName,
        unitNumber: saleData.unit,
        totalPrice: saleData.amount,
        downPayment: saleData.downPayment,
        monthlyEmiAmount: monthlyEmi,
        installmentsPaid: 0,
        totalInstallments: saleData.emiMonths,
        nextDueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        status: 'pending'
      };
      updatedEmiRecords = [newEmi, ...updatedEmiRecords];
    }

    this.saveLocalEmployees(updatedEmployees);
    this.saveLocalEmiRecords(updatedEmiRecords);

    return { employees: updatedEmployees, emiRecords: updatedEmiRecords };
  }

  public async collectEmiPayment(recordId: string): Promise<EmiRecord[]> {
    const records = this.getLocalEmiRecords();
    const updated = records.map(rec => {
      if (rec.id === recordId) {
        return {
          ...rec,
          installmentsPaid: Math.min(rec.totalInstallments, rec.installmentsPaid + 1),
          status: 'paid' as const,
          overdueDays: 0,
          nextDueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
        };
      }
      return rec;
    });
    this.saveLocalEmiRecords(updated);
    return updated;
  }

  public async testBackendConnection(url: string): Promise<{ success: boolean; message: string }> {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 4000);
      const res = await fetch(`${url}/health`, { signal: controller.signal });
      clearTimeout(timeoutId);
      if (res.ok) {
        return { success: true, message: `Connected successfully! (Status: ${res.status})` };
      }
      return { success: false, message: `Server replied with HTTP ${res.status}` };
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : String(err);
      return { 
        success: false, 
        message: `Connection failed: ${errorMsg}. Make sure your backend allows CORS.` 
      };
    }
  }

  public resetToDefaultMockData(): void {
    localStorage.removeItem(STORAGE_KEYS.EMPLOYEES);
    localStorage.removeItem(STORAGE_KEYS.PROJECTS);
    localStorage.removeItem(STORAGE_KEYS.EMI_RECORDS);
  }
}

export const apiService = new SunsetApiService();
