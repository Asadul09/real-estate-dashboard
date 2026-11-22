import React from 'react';
import { UserRole, Employee } from '../types';
import { 
  Building2, 
  ShieldCheck, 
  User, 
  Calendar, 
  Database, 
  PlusCircle, 
  Download,
  ChevronDown,
  Sparkles
} from 'lucide-react';

interface NavbarProps {
  currentRole: UserRole;
  onRoleChange: (role: UserRole) => void;
  selectedEmployeeId: string;
  onSelectEmployee: (id: string) => void;
  employees: Employee[];
  selectedMonth: string;
  onMonthChange: (month: string) => void;
  onOpenRecordSale: () => void;
  onOpenApiConfig: () => void;
  onExportData: () => void;
  activeTab: 'overview' | 'employees' | 'emi-due' | 'projects';
  onTabChange: (tab: 'overview' | 'employees' | 'emi-due' | 'projects') => void;
  isCustomApi: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentRole,
  onRoleChange,
  selectedEmployeeId,
  onSelectEmployee,
  employees,
  selectedMonth,
  onMonthChange,
  onOpenRecordSale,
  onOpenApiConfig,
  onExportData,
  activeTab,
  onTabChange,
  isCustomApi,
}) => {
  const selectedEmp = employees.find(e => e.id === selectedEmployeeId) || employees[0];

  return (
    <header className="sticky top-0 z-40 bg-[#FFFFFF]/95 backdrop-blur-md border-b border-[#E2E8E5] text-[#1E242B]">
      {/* Top Banner / Utility Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Brand */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-[#1B6B38] flex items-center justify-center shadow-md shadow-[#1B6B38]/20 ring-1 ring-[#1B6B38]/30">
              <Building2 className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-xl tracking-tight text-[#1B6B38]">
                  SUNSET
                </span>
                <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#1B6B38]/10 text-[#1B6B38] border border-[#1B6B38]/20">
                  BD Real Estate
                </span>
              </div>
              <p className="text-xs text-[#5A6570] font-medium hidden sm:block">
                Monthly Target, EMI & Sales Performance Suite
              </p>
            </div>
          </div>

          {/* Center Navigation Tabs */}
          <nav className="hidden md:flex items-center space-x-1 bg-[#F4F6F5] p-1 rounded-xl border border-[#E2E8E5]">
            <button
              onClick={() => onTabChange('overview')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'overview'
                  ? 'bg-[#1B6B38] text-white shadow-sm'
                  : 'text-[#5A6570] hover:text-[#1E242B] hover:bg-[#FFFFFF]'
              }`}
            >
              Overall Overview
            </button>
            <button
              onClick={() => onTabChange('employees')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'employees'
                  ? 'bg-[#1B6B38] text-white shadow-sm'
                  : 'text-[#5A6570] hover:text-[#1E242B] hover:bg-[#FFFFFF]'
              }`}
            >
              Employee Visuals
            </button>
            <button
              onClick={() => onTabChange('emi-due')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'emi-due'
                  ? 'bg-[#1B6B38] text-white shadow-sm'
                  : 'text-[#5A6570] hover:text-[#1E242B] hover:bg-[#FFFFFF]'
              }`}
            >
              EMI & Due Manager
            </button>
            <button
              onClick={() => onTabChange('projects')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'projects'
                  ? 'bg-[#1B6B38] text-white shadow-sm'
                  : 'text-[#5A6570] hover:text-[#1E242B] hover:bg-[#FFFFFF]'
              }`}
            >
              BD Properties Showcase
            </button>
          </nav>

          {/* Right Action Controls */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            
            {/* Month Filter */}
            <div className="relative">
              <div className="flex items-center space-x-1.5 bg-[#FFFFFF] border border-[#E2E8E5] rounded-lg px-2.5 py-1.5 text-xs text-[#1E242B] shadow-sm">
                <Calendar className="w-3.5 h-3.5 text-[#1B6B38]" />
                <select
                  value={selectedMonth}
                  onChange={(e) => onMonthChange(e.target.value)}
                  className="bg-transparent border-none text-[#1E242B] text-xs font-medium focus:outline-none cursor-pointer pr-1"
                >
                  <option value="November 2026" className="bg-[#FFFFFF] text-[#1E242B]">Nov 2026</option>
                  <option value="October 2026" className="bg-[#FFFFFF] text-[#1E242B]">Oct 2026</option>
                  <option value="September 2026" className="bg-[#FFFFFF] text-[#1E242B]">Sep 2026</option>
                </select>
              </div>
            </div>

            {/* Role Switcher Pill */}
            <div className="flex items-center bg-[#F4F6F5] p-1 rounded-xl border border-[#E2E8E5]">
              <button
                onClick={() => onRoleChange('admin')}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  currentRole === 'admin'
                    ? 'bg-[#1B6B38] text-white shadow-sm'
                    : 'text-[#5A6570] hover:text-[#1E242B]'
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Admin View</span>
              </button>
              <button
                onClick={() => onRoleChange('employee')}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  currentRole === 'employee'
                    ? 'bg-[#1B6B38] text-white shadow-sm'
                    : 'text-[#5A6570] hover:text-[#1E242B]'
                }`}
              >
                <User className="w-3.5 h-3.5" />
                <span>User View</span>
              </button>
            </div>

            {/* When in Employee View, Select specific Employee */}
            {currentRole === 'employee' && (
              <div className="hidden lg:flex items-center space-x-2 bg-[#FFFFFF] border border-[#E2E8E5] rounded-lg px-2.5 py-1.5 shadow-sm">
                <img
                  src={selectedEmp?.avatar}
                  alt={selectedEmp?.name}
                  className="w-5 h-5 rounded-full object-cover ring-1 ring-[#1B6B38]/40"
                />
                <select
                  value={selectedEmployeeId}
                  onChange={(e) => onSelectEmployee(e.target.value)}
                  className="bg-transparent border-none text-xs text-[#1E242B] font-medium focus:outline-none cursor-pointer max-w-[130px] truncate"
                >
                  {employees.map((emp) => (
                    <option key={emp.id} value={emp.id} className="bg-[#FFFFFF] text-[#1E242B]">
                      {emp.name}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Record Sale Button (Admin or Employee) */}
            <button
              onClick={onOpenRecordSale}
              className="flex items-center space-x-1.5 bg-[#1B6B38] hover:bg-[#14522B] text-white font-bold px-3 py-1.5 rounded-lg text-xs transition-all shadow-sm active:scale-95"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Record Deal</span>
            </button>

            {/* API Config Modal Trigger */}
            <button
              onClick={onOpenApiConfig}
              title="Configure Backend API / BD Real Estate Data Source"
              className={`flex items-center space-x-1 p-2 rounded-lg border text-xs transition-all ${
                isCustomApi
                  ? 'bg-[#25D366]/20 text-[#14522B] border-[#25D366]/40'
                  : 'bg-[#FFFFFF] text-[#5A6570] border-[#E2E8E5] hover:text-[#1E242B] hover:bg-[#F4F6F5]'
              }`}
            >
              <Database className="w-4 h-4" />
              <span className="hidden xl:inline text-[11px] font-medium">
                {isCustomApi ? 'Custom API Active' : 'API Config'}
              </span>
            </button>

            {/* Export Report */}
            <button
              onClick={onExportData}
              title="Export Current Sales & EMI Summary"
              className="p-2 rounded-lg border border-[#E2E8E5] bg-[#FFFFFF] text-[#5A6570] hover:text-[#1E242B] hover:bg-[#F4F6F5] transition-all"
            >
              <Download className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Tab Navigation */}
      <div className="md:hidden flex items-center justify-around border-t border-[#E2E8E5] bg-[#FFFFFF] px-2 py-2">
        <button
          onClick={() => onTabChange('overview')}
          className={`text-xs font-semibold px-2.5 py-1 rounded-md transition-all ${
            activeTab === 'overview' ? 'bg-[#1B6B38] text-white' : 'text-[#5A6570]'
          }`}
        >
          Overview
        </button>
        <button
          onClick={() => onTabChange('employees')}
          className={`text-xs font-semibold px-2.5 py-1 rounded-md transition-all ${
            activeTab === 'employees' ? 'bg-[#1B6B38] text-white' : 'text-[#5A6570]'
          }`}
        >
          Employees
        </button>
        <button
          onClick={() => onTabChange('emi-due')}
          className={`text-xs font-semibold px-2.5 py-1 rounded-md transition-all ${
            activeTab === 'emi-due' ? 'bg-[#1B6B38] text-white' : 'text-[#5A6570]'
          }`}
        >
          EMI & Due
        </button>
        <button
          onClick={() => onTabChange('projects')}
          className={`text-xs font-semibold px-2.5 py-1 rounded-md transition-all ${
            activeTab === 'projects' ? 'bg-[#1B6B38] text-white' : 'text-[#5A6570]'
          }`}
        >
          BD Projects
        </button>
      </div>
    </header>
  );
};
