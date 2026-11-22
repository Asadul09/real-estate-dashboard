import React from 'react';
import { Employee, UserRole } from '../types';
import { formatBDT, formatPercentage, getStatusColor } from '../services/formatters';
import { 
  Target, 
  TrendingUp, 
  Clock, 
  CreditCard, 
  AlertCircle, 
  CheckCircle2, 
  Layers,
  ArrowUpRight,
  UserCheck
} from 'lucide-react';

interface StatsOverviewProps {
  currentRole: UserRole;
  employees: Employee[];
  selectedEmployee?: Employee;
  selectedMonth: string;
}

export const StatsOverview: React.FC<StatsOverviewProps> = ({
  currentRole,
  employees,
  selectedEmployee,
  selectedMonth,
}) => {
  // Compute metrics depending on whether Admin (all employees aggregate) or Employee view
  const isEmployeeView = currentRole === 'employee' && selectedEmployee;

  const target = isEmployeeView
    ? selectedEmployee.monthlyTarget
    : employees.reduce((acc, e) => acc + e.monthlyTarget, 0);

  const achieved = isEmployeeView
    ? selectedEmployee.totalAchieved
    : employees.reduce((acc, e) => acc + e.totalAchieved, 0);

  const achievementPct = target > 0 ? (achieved / target) * 100 : 0;

  // 3-Phase Breakdown: 1st 10 Days, 20 Days, Full Month
  const first10Target = isEmployeeView
    ? selectedEmployee.phases.first10Days.target
    : employees.reduce((acc, e) => acc + e.phases.first10Days.target, 0);

  const first10Achieved = isEmployeeView
    ? selectedEmployee.phases.first10Days.achieved
    : employees.reduce((acc, e) => acc + e.phases.first10Days.achieved, 0);

  const first10Pct = first10Target > 0 ? (first10Achieved / first10Target) * 100 : 0;
  const first10Deals = isEmployeeView
    ? selectedEmployee.phases.first10Days.dealsCount
    : employees.reduce((acc, e) => acc + e.phases.first10Days.dealsCount, 0);

  const second10Target = isEmployeeView
    ? selectedEmployee.phases.second10Days.target
    : employees.reduce((acc, e) => acc + e.phases.second10Days.target, 0);

  const second10Achieved = isEmployeeView
    ? selectedEmployee.phases.second10Days.achieved
    : employees.reduce((acc, e) => acc + e.phases.second10Days.achieved, 0);

  const second10Pct = second10Target > 0 ? (second10Achieved / second10Target) * 100 : 0;
  const second10Deals = isEmployeeView
    ? selectedEmployee.phases.second10Days.dealsCount
    : employees.reduce((acc, e) => acc + e.phases.second10Days.dealsCount, 0);

  const fullMonthTarget = isEmployeeView
    ? selectedEmployee.phases.fullMonth.target
    : employees.reduce((acc, e) => acc + e.phases.fullMonth.target, 0);

  const fullMonthAchieved = isEmployeeView
    ? selectedEmployee.phases.fullMonth.achieved
    : employees.reduce((acc, e) => acc + e.phases.fullMonth.achieved, 0);

  const fullMonthPct = fullMonthTarget > 0 ? (fullMonthAchieved / fullMonthTarget) * 100 : 0;
  const fullMonthDeals = isEmployeeView
    ? selectedEmployee.phases.fullMonth.dealsCount
    : employees.reduce((acc, e) => acc + e.phases.fullMonth.dealsCount, 0);

  // Total EMI and Total Due
  const totalEmi = isEmployeeView
    ? selectedEmployee.totalEmiCollected
    : employees.reduce((acc, e) => acc + e.totalEmiCollected, 0);

  const totalDue = isEmployeeView
    ? selectedEmployee.totalDue
    : employees.reduce((acc, e) => acc + e.totalDue, 0);

  const overdueCount = isEmployeeView
    ? selectedEmployee.overdueCount
    : employees.reduce((acc, e) => acc + e.overdueCount, 0);

  const overallStatus = getStatusColor(achievementPct);

  return (
    <div className="space-y-6">
      
      {/* View Context Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#FFFFFF] p-5 rounded-2xl border border-[#E2E8E5] shadow-sm">
        <div className="flex items-center space-x-3">
          {isEmployeeView ? (
            <div className="relative">
              <img
                src={selectedEmployee.avatar}
                alt={selectedEmployee.name}
                className="w-12 h-12 rounded-xl object-cover ring-2 ring-[#1B6B38]/30 shadow-sm"
              />
              <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-[#25D366] rounded-full border-2 border-white" />
            </div>
          ) : (
            <div className="w-12 h-12 rounded-xl bg-[#1B6B38]/10 text-[#1B6B38] flex items-center justify-center border border-[#1B6B38]/20">
              <Layers className="w-6 h-6" />
            </div>
          )}
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-lg font-bold text-[#1E242B] tracking-tight">
                {isEmployeeView ? selectedEmployee.name : 'All Employees Aggregate Dashboard'}
              </h2>
              <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${overallStatus.badge}`}>
                {formatPercentage(achievementPct)} Target Reached
              </span>
            </div>
            <p className="text-xs text-[#5A6570]">
              {isEmployeeView
                ? `${selectedEmployee.designation} • ${selectedEmployee.department} (${selectedEmployee.zone})`
                : `Aggregated Performance of ${employees.length} Sales Officers across Dhaka & BD Zones`}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-4 self-end sm:self-auto text-xs">
          <div className="text-right">
            <span className="text-[#5A6570] block text-[11px]">Reporting Cycle</span>
            <span className="font-semibold text-[#1B6B38]">{selectedMonth}</span>
          </div>
          <div className="h-8 w-px bg-[#E2E8E5]" />
          <div className="text-right">
            <span className="text-[#5A6570] block text-[11px]">Deals Closed</span>
            <span className="font-bold text-[#1E242B]">
              {first10Deals + second10Deals + fullMonthDeals} Units
            </span>
          </div>
        </div>
      </div>

      {/* Main KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Card 1: Monthly Target */}
        <div className="relative overflow-hidden bg-[#FFFFFF] rounded-2xl p-5 border border-[#E2E8E5] hover:border-[#1B6B38]/40 transition-all shadow-sm group">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-[#5A6570] uppercase tracking-wider">
              Monthly Sales Target
            </span>
            <div className="w-8 h-8 rounded-lg bg-[#1B6B38]/10 text-[#1B6B38] flex items-center justify-center">
              <Target className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-[#1E242B] tracking-tight mb-1">
            {formatBDT(target)}
          </div>
          <div className="flex items-center justify-between text-xs text-[#5A6570]">
            <span>Compact: <strong className="text-[#1B6B38]">{formatBDT(target, true)}</strong></span>
            <span className="text-[11px] text-[#5A6570]">Fixed Target</span>
          </div>
        </div>

        {/* Card 2: Total Achievement */}
        <div className="relative overflow-hidden bg-[#FFFFFF] rounded-2xl p-5 border border-[#E2E8E5] hover:border-[#1B6B38]/40 transition-all shadow-sm group">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-[#5A6570] uppercase tracking-wider">
              Total Achieved
            </span>
            <div className="w-8 h-8 rounded-lg bg-[#25D366]/20 text-[#14522B] flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-[#1E242B] tracking-tight mb-1">
            {formatBDT(achieved)}
          </div>
          
          {/* Progress bar */}
          <div className="mt-2 space-y-1.5">
            <div className="w-full bg-[#E2E8E5] h-2 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-700 ${
                  achievementPct >= 100 ? 'bg-[#1B6B38]' : 'bg-gradient-to-r from-[#1B6B38] to-[#25D366]'
                }`}
                style={{ width: `${Math.min(achievementPct, 100)}%` }}
              />
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-[#1B6B38]">{formatPercentage(achievementPct)}</span>
              <span className="text-[#5A6570]">
                {achieved >= target ? (
                  <span className="text-[#1B6B38] font-medium">Surplus: +{formatBDT(achieved - target, true)}</span>
                ) : (
                  <span>Gap: {formatBDT(target - achieved, true)}</span>
                )}
              </span>
            </div>
          </div>
        </div>

        {/* Card 3: Total EMI Collected */}
        <div className="relative overflow-hidden bg-[#FFFFFF] rounded-2xl p-5 border border-[#E2E8E5] hover:border-[#1B6B38]/40 transition-all shadow-sm group">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-[#5A6570] uppercase tracking-wider">
              Total EMI Collected
            </span>
            <div className="w-8 h-8 rounded-lg bg-[#1B6B38]/10 text-[#1B6B38] flex items-center justify-center">
              <CreditCard className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-[#1E242B] tracking-tight mb-1">
            {formatBDT(totalEmi)}
          </div>
          <div className="flex items-center justify-between text-xs text-[#5A6570] mt-2">
            <span>Compact: <strong className="text-[#1B6B38]">{formatBDT(totalEmi, true)}</strong></span>
            <span className="flex items-center text-[#1B6B38] text-[11px] font-medium">
              <CheckCircle2 className="w-3 h-3 mr-1 text-[#25D366]" /> On Track
            </span>
          </div>
        </div>

        {/* Card 4: Total Due & Overdue */}
        <div className="relative overflow-hidden bg-[#FFFFFF] rounded-2xl p-5 border border-[#E2E8E5] hover:border-rose-300 transition-all shadow-sm group">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-[#5A6570] uppercase tracking-wider">
              Total Outstanding Due
            </span>
            <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center border border-rose-100">
              <AlertCircle className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-rose-700 tracking-tight mb-1">
            {formatBDT(totalDue)}
          </div>
          <div className="flex items-center justify-between text-xs text-[#5A6570] mt-2">
            <span>Compact: <strong className="text-rose-700">{formatBDT(totalDue, true)}</strong></span>
            <span className="px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 text-[11px] font-semibold border border-rose-200">
              {overdueCount} Overdue
            </span>
          </div>
        </div>

      </div>

      {/* 3-Part Achievement Breakdown (First 10 Days, 20 Days, Full Month) */}
      <div className="bg-[#FFFFFF] rounded-2xl p-6 border border-[#E2E8E5] shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#E2E8E5] mb-5 gap-2">
          <div>
            <h3 className="text-base font-bold text-[#1E242B] flex items-center">
              <Clock className="w-4 h-4 mr-2 text-[#1B6B38]" />
              Monthly Sales Achievement: 3-Sprint Milestone Breakdown
            </h3>
            <p className="text-xs text-[#5A6570] mt-0.5">
              Monitoring deal velocity split across First 10 Days (1-10), Mid 20 Days (11-20), and Full Month Total (21-30/31)
            </p>
          </div>
          <div className="text-xs font-medium text-[#1B6B38] bg-[#1B6B38]/10 px-3 py-1.5 rounded-lg border border-[#1B6B38]/20 self-start sm:self-auto">
            Cycle Progress: Day 22 of 30
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          
          {/* Part 1: First 10 Days */}
          <div className="bg-[#F4F6F5] rounded-xl p-4 border border-[#E2E8E5] relative overflow-hidden group hover:border-[#1B6B38]/40 transition-all">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-[#1B6B38] uppercase tracking-wider flex items-center">
                Part 1 • First 10 Days
              </span>
              <span className="text-[10px] font-medium bg-[#FFFFFF] text-[#5A6570] px-2 py-0.5 rounded-md border border-[#E2E8E5]">
                Day 1 - 10
              </span>
            </div>

            <div className="flex items-baseline justify-between mt-1 mb-2">
              <div className="text-xl font-extrabold text-[#1E242B]">
                {formatBDT(first10Achieved, true)}
              </div>
              <div className="text-xs text-[#5A6570]">
                Target: {formatBDT(first10Target, true)}
              </div>
            </div>

            <div className="w-full bg-[#E2E8E5] h-2.5 rounded-full overflow-hidden mb-2">
              <div
                className="h-full transition-all duration-500 bg-[#1B6B38]"
                style={{ width: `${Math.min(first10Pct, 100)}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-[#1B6B38]">
                {formatPercentage(first10Pct)} Achieved
              </span>
              <span className="text-[#5A6570] text-[11px]">
                {first10Deals} deals closed
              </span>
            </div>
          </div>

          {/* Part 2: 20 Days (Mid-Sprint) */}
          <div className="bg-[#F4F6F5] rounded-xl p-4 border border-[#E2E8E5] relative overflow-hidden group hover:border-[#25D366]/40 transition-all">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-[#14522B] uppercase tracking-wider flex items-center">
                Part 2 • 20 Days Mark
              </span>
              <span className="text-[10px] font-medium bg-[#FFFFFF] text-[#5A6570] px-2 py-0.5 rounded-md border border-[#E2E8E5]">
                Day 11 - 20
              </span>
            </div>

            <div className="flex items-baseline justify-between mt-1 mb-2">
              <div className="text-xl font-extrabold text-[#1E242B]">
                {formatBDT(second10Achieved, true)}
              </div>
              <div className="text-xs text-[#5A6570]">
                Target: {formatBDT(second10Target, true)}
              </div>
            </div>

            <div className="w-full bg-[#E2E8E5] h-2.5 rounded-full overflow-hidden mb-2">
              <div
                className="h-full transition-all duration-500 bg-[#25D366]"
                style={{ width: `${Math.min(second10Pct, 100)}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-[#14522B]">
                {formatPercentage(second10Pct)} Achieved
              </span>
              <span className="text-[#5A6570] text-[11px]">
                {second10Deals} deals closed
              </span>
            </div>
          </div>

          {/* Part 3: Full Month Closing */}
          <div className="bg-[#F4F6F5] rounded-xl p-4 border border-[#E2E8E5] relative overflow-hidden group hover:border-[#1E242B]/40 transition-all">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-[#1E242B] uppercase tracking-wider flex items-center">
                Part 3 • Full Month Closing
              </span>
              <span className="text-[10px] font-medium bg-[#FFFFFF] text-[#5A6570] px-2 py-0.5 rounded-md border border-[#E2E8E5]">
                Day 21 - End
              </span>
            </div>

            <div className="flex items-baseline justify-between mt-1 mb-2">
              <div className="text-xl font-extrabold text-[#1E242B]">
                {formatBDT(fullMonthAchieved, true)}
              </div>
              <div className="text-xs text-[#5A6570]">
                Target: {formatBDT(fullMonthTarget, true)}
              </div>
            </div>

            <div className="w-full bg-[#E2E8E5] h-2.5 rounded-full overflow-hidden mb-2">
              <div
                className="h-full transition-all duration-500 bg-[#1E242B]"
                style={{ width: `${Math.min(fullMonthPct, 100)}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-[#1E242B]">
                {formatPercentage(fullMonthPct)} Achieved
              </span>
              <span className="text-[#5A6570] text-[11px]">
                {fullMonthDeals} deals closed
              </span>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};
