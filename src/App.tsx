import { useState, useEffect } from 'react';
import type { UserRole, Employee, RealEstateProject, EmiRecord } from './types';
import { apiService } from './services/api';
import { Navbar } from './components/Navbar';
import { StatsOverview } from './components/StatsOverview';
import { OverallCharts } from './components/OverallCharts';
import { EmployeePerformance } from './components/EmployeePerformance';
import { EmiDueManager } from './components/EmiDueManager';
import { RealEstateShowcase } from './components/RealEstateShowcase';
import { RecordSaleModal } from './components/RecordSaleModal';
import { ApiConfigModal } from './components/ApiConfigModal';
import { EmployeeModal } from './components/EmployeeModal';
import { Building2, CheckCircle2 } from 'lucide-react';

export function App() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [projects, setProjects] = useState<RealEstateProject[]>([]);
  const [emiRecords, setEmiRecords] = useState<EmiRecord[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // View state
  const [currentRole, setCurrentRole] = useState<UserRole>('admin');
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string>('');
  const [selectedMonth, setSelectedMonth] = useState<string>('November 2026');
  const [activeTab, setActiveTab] = useState<'overview' | 'employees' | 'emi-due' | 'projects'>('overview');

  // Modals state
  const [isRecordSaleOpen, setIsRecordSaleOpen] = useState<boolean>(false);
  const [isApiConfigOpen, setIsApiConfigOpen] = useState<boolean>(false);
  const [isEditTargetOpen, setIsEditTargetOpen] = useState<boolean>(false);
  const [targetEmployeeToEdit, setTargetEmployeeToEdit] = useState<Employee | null>(null);
  const [defaultProjectForSale, setDefaultProjectForSale] = useState<string>('');
  const [defaultEmployeeForSale, setDefaultEmployeeForSale] = useState<string>('');

  // Toast alert
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const loadAllData = async () => {
    setLoading(true);
    try {
      const emps = await apiService.getEmployees();
      const projs = await apiService.getProjects();
      const emis = await apiService.getEmiRecords();

      setEmployees(emps);
      setProjects(projs);
      setEmiRecords(emis);

      if (emps.length > 0 && !selectedEmployeeId) {
        setSelectedEmployeeId(emps[0].id);
      }
    } catch (err) {
      console.error('Error loading dashboard data', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAllData();
  }, []);

  const selectedEmployee = employees.find(e => e.id === selectedEmployeeId) || employees[0];

  // Role toggle handler
  const handleRoleChange = (role: UserRole) => {
    setCurrentRole(role);
    if (role === 'employee') {
      setActiveTab('employees');
    } else {
      setActiveTab('overview');
    }
  };

  // Switch to employee visual from table or dropdown
  const handleSelectEmployeeForDetail = (employeeId: string) => {
    setSelectedEmployeeId(employeeId);
    setActiveTab('employees');
  };

  // Record Sale Submission
  const handleRecordSale = async (saleData: any) => {
    const res = await apiService.recordSale(saleData);
    setEmployees(res.employees);
    setEmiRecords(res.emiRecords);
    showToast(`Deal recorded successfully for ${saleData.projectName}!`);
  };

  // Collect EMI Payment
  const handleCollectPayment = async (recordId: string) => {
    const updated = await apiService.collectEmiPayment(recordId);
    setEmiRecords(updated);
    showToast('EMI payment received & reconciled successfully!');
  };

  // Update Target
  const handleUpdateTarget = async (employeeId: string, newTarget: number) => {
    const updated = await apiService.updateEmployeeTarget(employeeId, newTarget);
    setEmployees(updated);
    showToast('Monthly sales target updated successfully!');
  };

  // Open Record Sale Modal with prefilled project
  const handleBookProject = (projectName: string) => {
    setDefaultProjectForSale(projectName);
    setDefaultEmployeeForSale(selectedEmployeeId);
    setIsRecordSaleOpen(true);
  };

  // Open Record Sale Modal for specific employee
  const handleRecordSaleForEmployee = (employeeId: string) => {
    setDefaultEmployeeForSale(employeeId);
    setDefaultProjectForSale(projects[0]?.name || '');
    setIsRecordSaleOpen(true);
  };

  // Export Data to CSV
  const handleExportData = () => {
    const headers = [
      'Employee Name',
      'Designation',
      'Zone',
      'Monthly Target (BDT)',
      'Total Achieved (BDT)',
      'Achievement %',
      '1st 10 Days Achieved (BDT)',
      'Day 11-20 Achieved (BDT)',
      'Day 21-End Achieved (BDT)',
      'Total EMI Collected (BDT)',
      'Total Due (BDT)',
      'Overdue Accounts',
    ];

    const rows = employees.map(e => [
      `"${e.name}"`,
      `"${e.designation}"`,
      `"${e.zone}"`,
      e.monthlyTarget,
      e.totalAchieved,
      e.achievementPercentage,
      e.phases.first10Days.achieved,
      e.phases.second10Days.achieved,
      e.phases.fullMonth.achieved,
      e.totalEmiCollected,
      e.totalDue,
      e.overdueCount,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + 
      [headers.join(','), ...rows.map(r => r.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Sunset_Sales_Report_${selectedMonth.replace(' ', '_')}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showToast('Sales & EMI performance report downloaded!');
  };

  const isCustomApi = !apiService.getConfig().useMockData;

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F4F6F5] flex flex-col items-center justify-center text-[#5A6570]">
        <div className="w-12 h-12 rounded-2xl bg-[#1B6B38]/10 text-[#1B6B38] flex items-center justify-center animate-spin mb-4 border border-[#1B6B38]/20">
          <Building2 className="w-6 h-6" />
        </div>
        <p className="text-sm font-bold text-[#1E242B] tracking-wide">
          Loading Sunset Bangladesh Real Estate Dashboard...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F4F6F5] text-[#1E242B] flex flex-col font-sans selection:bg-[#1B6B38] selection:text-white">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-[#FFFFFF] border border-[#E2E8E5] text-[#1E242B] px-4 py-3 rounded-2xl shadow-xl flex items-center space-x-2 animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-[#25D366]" />
          <span className="text-xs font-bold">{toastMessage}</span>
        </div>
      )}

      {/* Navigation Bar */}
      <Navbar
        currentRole={currentRole}
        onRoleChange={handleRoleChange}
        selectedEmployeeId={selectedEmployeeId}
        onSelectEmployee={setSelectedEmployeeId}
        employees={employees}
        selectedMonth={selectedMonth}
        onMonthChange={setSelectedMonth}
        onOpenRecordSale={() => {
          setDefaultEmployeeForSale(selectedEmployeeId);
          setDefaultProjectForSale(projects[0]?.name || '');
          setIsRecordSaleOpen(true);
        }}
        onOpenApiConfig={() => setIsApiConfigOpen(true)}
        onExportData={handleExportData}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        isCustomApi={isCustomApi}
      />

      {/* Main Content Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Top KPI & Sprint Milestone Overview (Dynamic for Admin vs Employee) */}
        <StatsOverview
          currentRole={currentRole}
          employees={employees}
          selectedEmployee={selectedEmployee}
          selectedMonth={selectedMonth}
        />

        {/* Dynamic View Sections */}
        {activeTab === 'overview' && (
          <OverallCharts
            employees={employees}
            onSelectEmployeeForDetail={handleSelectEmployeeForDetail}
          />
        )}

        {activeTab === 'employees' && (
          <EmployeePerformance
            currentRole={currentRole}
            employees={employees}
            selectedEmployeeId={selectedEmployeeId}
            onSelectEmployee={setSelectedEmployeeId}
            onOpenEditTarget={(emp) => {
              setTargetEmployeeToEdit(emp);
              setIsEditTargetOpen(true);
            }}
            onOpenRecordSaleForEmployee={handleRecordSaleForEmployee}
          />
        )}

        {activeTab === 'emi-due' && (
          <EmiDueManager
            emiRecords={emiRecords}
            onCollectPayment={handleCollectPayment}
          />
        )}

        {activeTab === 'projects' && (
          <RealEstateShowcase
            projects={projects}
            onBookProject={handleBookProject}
          />
        )}

      </main>

      {/* Modals */}
      <RecordSaleModal
        isOpen={isRecordSaleOpen}
        onClose={() => setIsRecordSaleOpen(false)}
        employees={employees}
        projects={projects}
        defaultEmployeeId={defaultEmployeeForSale}
        defaultProjectName={defaultProjectForSale}
        onSubmit={handleRecordSale}
      />

      <ApiConfigModal
        isOpen={isApiConfigOpen}
        onClose={() => setIsApiConfigOpen(false)}
        onConfigUpdated={loadAllData}
      />

      <EmployeeModal
        isOpen={isEditTargetOpen}
        onClose={() => setIsEditTargetOpen(false)}
        employee={targetEmployeeToEdit}
        onUpdateTarget={handleUpdateTarget}
      />

      {/* Footer */}
      <footer className="border-t border-[#E2E8E5] bg-[#FFFFFF] py-6 mt-12 text-[#5A6570] text-xs">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center space-x-2">
            <span className="font-extrabold text-[#1B6B38] tracking-wider">SUNSET</span>
            <span>• Bangladesh Real Estate Analytics & Monthly Target Suite</span>
          </div>
          <div className="flex items-center space-x-4 text-[11px]">
            <span>Dhaka North & South</span>
            <span>Purbachal Expressway</span>
            <span>Gulshan & Banani Prime</span>
            <span>Chattogram Division</span>
          </div>
        </div>
      </footer>

    </div>
  );
}

export default App;
