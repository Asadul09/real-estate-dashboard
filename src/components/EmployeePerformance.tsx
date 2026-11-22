import React, { useState } from 'react';
import { Employee, UserRole } from '../types';
import { formatBDT, formatPercentage, getStatusColor } from '../services/formatters';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
  LineChart,
  Line,
} from 'recharts';
import {
  User,
  Target,
  TrendingUp,
  CreditCard,
  AlertCircle,
  Clock,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Building,
  CheckCircle2,
  Edit3,
  PlusCircle,
  FileText
} from 'lucide-react';

interface EmployeePerformanceProps {
  currentRole: UserRole;
  employees: Employee[];
  selectedEmployeeId: string;
  onSelectEmployee: (id: string) => void;
  onOpenEditTarget: (employee: Employee) => void;
  onOpenRecordSaleForEmployee: (employeeId: string) => void;
}

export const EmployeePerformance: React.FC<EmployeePerformanceProps> = ({
  currentRole,
  employees,
  selectedEmployeeId,
  onSelectEmployee,
  onOpenEditTarget,
  onOpenRecordSaleForEmployee,
}) => {
  const currentEmp = employees.find(e => e.id === selectedEmployeeId) || employees[0];
  const [activeSubTab, setActiveSubTab] = useState<'visuals' | 'deals' | 'history'>('visuals');

  if (!currentEmp) {
    return <div className="text-center py-12 text-slate-400">No employee found</div>;
  }

  // 3-Phase Data for this employee
  const employeePhasesData = [
    {
      phaseName: 'First 10 Days',
      range: 'Day 1 - 10',
      target: currentEmp.phases.first10Days.target / 10000000,
      achieved: currentEmp.phases.first10Days.achieved / 10000000,
      targetBDT: currentEmp.phases.first10Days.target,
      achievedBDT: currentEmp.phases.first10Days.achieved,
      percentage: currentEmp.phases.first10Days.percentage,
      deals: currentEmp.phases.first10Days.dealsCount,
    },
    {
      phaseName: 'Mid 20 Days',
      range: 'Day 11 - 20',
      target: currentEmp.phases.second10Days.target / 10000000,
      achieved: currentEmp.phases.second10Days.achieved / 10000000,
      targetBDT: currentEmp.phases.second10Days.target,
      achievedBDT: currentEmp.phases.second10Days.achieved,
      percentage: currentEmp.phases.second10Days.percentage,
      deals: currentEmp.phases.second10Days.dealsCount,
    },
    {
      phaseName: 'Full Month Closing',
      range: 'Day 21 - End',
      target: currentEmp.phases.fullMonth.target / 10000000,
      achieved: currentEmp.phases.fullMonth.achieved / 10000000,
      targetBDT: currentEmp.phases.fullMonth.target,
      achievedBDT: currentEmp.phases.fullMonth.achieved,
      percentage: currentEmp.phases.fullMonth.percentage,
      deals: currentEmp.phases.fullMonth.dealsCount,
    },
  ];

  // Monthly History Data (scaled in Crores)
  const historyData = currentEmp.monthlyHistory.map(item => ({
    month: item.month,
    target: item.target / 10000000,
    achieved: item.achieved / 10000000,
    emiCollected: item.emiCollected / 10000000,
    due: item.due / 100000, // Lakhs
    targetBDT: item.target,
    achievedBDT: item.achieved,
    emiBDT: item.emiCollected,
  }));

  const status = getStatusColor(currentEmp.achievementPercentage);

  const CustomPhaseTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-[#FFFFFF] border border-[#E2E8E5] p-3 rounded-xl shadow-xl text-xs space-y-1">
          <p className="font-bold text-[#1E242B] text-sm">{data.phaseName} ({data.range})</p>
          <p className="text-[#5A6570]">Target: {formatBDT(data.targetBDT)}</p>
          <p className="text-[#1B6B38] font-bold">Achieved: {formatBDT(data.achievedBDT)}</p>
          <p className="text-[#5A6570] font-semibold border-t border-[#E2E8E5] pt-1">
            Achievement: {data.percentage}% • Deals: {data.deals}
          </p>
        </div>
      );
    }
    return null;
  };

  const CustomHistoryTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-[#FFFFFF] border border-[#E2E8E5] p-3 rounded-xl shadow-xl text-xs space-y-1">
          <p className="font-bold text-[#1E242B] text-sm">{label}</p>
          <p className="text-[#5A6570]">Target: {formatBDT(data.targetBDT)}</p>
          <p className="text-[#1B6B38] font-bold">Achieved: {formatBDT(data.achievedBDT)}</p>
          <p className="text-[#25D366] font-bold">EMI Collected: {formatBDT(data.emiBDT)}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      
      {/* Employee Selector & Header Profile Card */}
      <div className="bg-[#FFFFFF] rounded-2xl p-6 border border-[#E2E8E5] shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          
          {/* Left: Avatar & Info */}
          <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-5">
            <div className="relative self-start sm:self-auto">
              <img
                src={currentEmp.avatar}
                alt={currentEmp.name}
                className="w-20 h-20 rounded-2xl object-cover ring-2 ring-[#1B6B38]/30 shadow-sm"
              />
              <span className="absolute -bottom-1.5 -right-1.5 bg-[#25D366] text-white p-1 rounded-full ring-2 ring-white shadow">
                <CheckCircle2 className="w-3.5 h-3.5" />
              </span>
            </div>

            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-xl font-black text-[#1E242B] tracking-tight">
                  {currentEmp.name}
                </h3>
                <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${status.badge}`}>
                  {currentEmp.achievementPercentage}% Achieved
                </span>
                <span className="text-[11px] font-semibold bg-[#F4F6F5] text-[#5A6570] px-2.5 py-0.5 rounded-full border border-[#E2E8E5]">
                  {currentEmp.department}
                </span>
              </div>

              <p className="text-xs text-[#1B6B38] font-semibold">
                {currentEmp.designation}
              </p>

              <div className="flex flex-wrap items-center gap-4 text-xs text-[#5A6570] pt-1">
                <span className="flex items-center">
                  <MapPin className="w-3.5 h-3.5 mr-1 text-[#5A6570]" />
                  {currentEmp.zone}
                </span>
                <span className="flex items-center">
                  <Mail className="w-3.5 h-3.5 mr-1 text-[#5A6570]" />
                  {currentEmp.email}
                </span>
                <span className="flex items-center">
                  <Phone className="w-3.5 h-3.5 mr-1 text-[#5A6570]" />
                  {currentEmp.phone}
                </span>
              </div>
            </div>
          </div>

          {/* Right: Switch Employee Dropdown & Action Buttons */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            
            {/* Employee Quick Switcher */}
            <div className="bg-[#F4F6F5] p-2 rounded-xl border border-[#E2E8E5]">
              <label className="text-[10px] uppercase font-bold text-[#5A6570] block mb-1">
                Select Employee Visual:
              </label>
              <select
                value={currentEmp.id}
                onChange={(e) => onSelectEmployee(e.target.value)}
                className="bg-[#FFFFFF] text-[#1E242B] text-xs font-semibold rounded-lg px-3 py-2 border border-[#E2E8E5] focus:outline-none focus:border-[#1B6B38] cursor-pointer w-full"
              >
                {employees.map(emp => (
                  <option key={emp.id} value={emp.id} className="bg-[#FFFFFF]">
                    {emp.name} ({emp.designation})
                  </option>
                ))}
              </select>
            </div>

            {/* Admin Action Buttons */}
            {currentRole === 'admin' && (
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => onOpenEditTarget(currentEmp)}
                  className="flex items-center space-x-1 px-3 py-2 bg-[#FFFFFF] hover:bg-[#F4F6F5] text-[#1E242B] text-xs font-semibold rounded-xl border border-[#E2E8E5] transition-all shadow-sm"
                  title="Modify this employee's monthly target"
                >
                  <Edit3 className="w-3.5 h-3.5 text-[#1B6B38]" />
                  <span>Set Target</span>
                </button>
                <button
                  onClick={() => onOpenRecordSaleForEmployee(currentEmp.id)}
                  className="flex items-center space-x-1 px-3 py-2 bg-[#1B6B38] hover:bg-[#14522B] text-white text-xs font-bold rounded-xl transition-all shadow-sm"
                >
                  <PlusCircle className="w-3.5 h-3.5" />
                  <span>Add Deal</span>
                </button>
              </div>
            )}
          </div>

        </div>
      </div>

      {/* Specific Employee Key Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        
        {/* Target */}
        <div className="bg-[#FFFFFF] rounded-2xl p-4 border border-[#E2E8E5] shadow-sm">
          <div className="flex items-center justify-between text-xs text-[#5A6570] mb-1">
            <span>Target This Month</span>
            <Target className="w-4 h-4 text-[#1B6B38]" />
          </div>
          <div className="text-xl font-bold text-[#1E242B]">
            {formatBDT(currentEmp.monthlyTarget, true)}
          </div>
          <div className="text-[11px] text-[#5A6570] mt-1">
            Full: {formatBDT(currentEmp.monthlyTarget)}
          </div>
        </div>

        {/* Achieved */}
        <div className="bg-[#FFFFFF] rounded-2xl p-4 border border-[#E2E8E5] shadow-sm">
          <div className="flex items-center justify-between text-xs text-[#5A6570] mb-1">
            <span>Achieved</span>
            <TrendingUp className="w-4 h-4 text-[#1B6B38]" />
          </div>
          <div className="text-xl font-bold text-[#1B6B38]">
            {formatBDT(currentEmp.totalAchieved, true)}
          </div>
          <div className="text-[11px] text-[#5A6570] mt-1">
            Progress: <strong className="text-[#1B6B38]">{currentEmp.achievementPercentage}%</strong>
          </div>
        </div>

        {/* Total EMI */}
        <div className="bg-[#FFFFFF] rounded-2xl p-4 border border-[#E2E8E5] shadow-sm">
          <div className="flex items-center justify-between text-xs text-[#5A6570] mb-1">
            <span>EMI Collected</span>
            <CreditCard className="w-4 h-4 text-[#1B6B38]" />
          </div>
          <div className="text-xl font-bold text-[#1B6B38]">
            {formatBDT(currentEmp.totalEmiCollected, true)}
          </div>
          <div className="text-[11px] text-[#5A6570] mt-1">
            {currentEmp.activeClientsCount} active clients
          </div>
        </div>

        {/* Total Due */}
        <div className="bg-[#FFFFFF] rounded-2xl p-4 border border-[#E2E8E5] shadow-sm">
          <div className="flex items-center justify-between text-xs text-[#5A6570] mb-1">
            <span>Outstanding Due</span>
            <AlertCircle className="w-4 h-4 text-rose-600" />
          </div>
          <div className="text-xl font-bold text-rose-700">
            {formatBDT(currentEmp.totalDue, true)}
          </div>
          <div className="text-[11px] text-rose-600 font-semibold mt-1">
            {currentEmp.overdueCount} accounts overdue
          </div>
        </div>

      </div>

      {/* Sub Tabs: Visual Graphs vs Deals List vs History */}
      <div className="flex items-center space-x-2 border-b border-[#E2E8E5] pb-2">
        <button
          onClick={() => setActiveSubTab('visuals')}
          className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
            activeSubTab === 'visuals'
              ? 'bg-[#1B6B38] text-white shadow-sm'
              : 'text-[#5A6570] hover:text-[#1E242B]'
          }`}
        >
          Visual Sprint Graphs
        </button>
        <button
          onClick={() => setActiveSubTab('history')}
          className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
            activeSubTab === 'history'
              ? 'bg-[#1B6B38] text-white shadow-sm'
              : 'text-[#5A6570] hover:text-[#1E242B]'
          }`}
        >
          5-Month Historical Trend
        </button>
        <button
          onClick={() => setActiveSubTab('deals')}
          className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
            activeSubTab === 'deals'
              ? 'bg-[#1B6B38] text-white shadow-sm'
              : 'text-[#5A6570] hover:text-[#1E242B]'
          }`}
        >
          Recent Deals Closed ({currentEmp.recentSales.length})
        </button>
      </div>

      {/* Tab 1: Visual Sprint Graphs (10 Days, 20 Days, Full Month) */}
      {activeSubTab === 'visuals' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Visual Graph 1: 3-Sprint Milestone Bar Chart */}
          <div className="bg-[#FFFFFF] rounded-2xl p-6 border border-[#E2E8E5] shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h4 className="text-sm font-bold text-[#1E242B] flex items-center">
                  <Clock className="w-4 h-4 mr-2 text-[#1B6B38]" />
                  3-Part Sprint Breakdown: First 10d vs 20d vs Month-End
                </h4>
                <p className="text-xs text-[#5A6570] mt-0.5">
                  Target vs Actual Achievement for {currentEmp.name} (in Crore ৳)
                </p>
              </div>
            </div>

            <div className="w-full h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={employeePhasesData} margin={{ top: 20, right: 20, left: -10, bottom: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E2E8E5" opacity={0.8} />
                  <XAxis dataKey="phaseName" stroke="#5A6570" fontSize={12} tickLine={false} />
                  <YAxis stroke="#5A6570" fontSize={12} unit=" Cr" tickLine={false} />
                  <Tooltip content={<CustomPhaseTooltip />} />
                  <Legend wrapperStyle={{ fontSize: '12px' }} />
                  <Bar dataKey="target" name="Sprint Target (Cr ৳)" fill="#5A6570" radius={[6, 6, 0, 0]} />
                  <Bar dataKey="achieved" name="Sprint Achieved (Cr ৳)" fill="#1B6B38" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Sprint Summary Cards Below Graph */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-[#E2E8E5] mt-2">
              <div className="p-2.5 rounded-xl bg-[#F4F6F5] border border-[#E2E8E5] text-center">
                <span className="text-[10px] text-[#1B6B38] font-bold block uppercase">First 10 Days</span>
                <span className="text-xs font-black text-[#1E242B]">{formatBDT(currentEmp.phases.first10Days.achieved, true)}</span>
                <span className="text-[10px] text-[#5A6570] block">{currentEmp.phases.first10Days.percentage}%</span>
              </div>
              <div className="p-2.5 rounded-xl bg-[#F4F6F5] border border-[#E2E8E5] text-center">
                <span className="text-[10px] text-[#14522B] font-bold block uppercase">Day 11 - 20</span>
                <span className="text-xs font-black text-[#1E242B]">{formatBDT(currentEmp.phases.second10Days.achieved, true)}</span>
                <span className="text-[10px] text-[#5A6570] block">{currentEmp.phases.second10Days.percentage}%</span>
              </div>
              <div className="p-2.5 rounded-xl bg-[#F4F6F5] border border-[#E2E8E5] text-center">
                <span className="text-[10px] text-[#1E242B] font-bold block uppercase">Day 21 - End</span>
                <span className="text-xs font-black text-[#1E242B]">{formatBDT(currentEmp.phases.fullMonth.achieved, true)}</span>
                <span className="text-[10px] text-[#5A6570] block">{currentEmp.phases.fullMonth.percentage}%</span>
              </div>
            </div>
          </div>

          {/* Visual Graph 2: Pacing & Target Velocity Gauge */}
          <div className="bg-[#FFFFFF] rounded-2xl p-6 border border-[#E2E8E5] shadow-sm flex flex-col justify-between">
            <div>
              <h4 className="text-sm font-bold text-[#1E242B] flex items-center">
                <TrendingUp className="w-4 h-4 mr-2 text-[#1B6B38]" />
                Target Realization & EMI Health Index
              </h4>
              <p className="text-xs text-[#5A6570] mt-0.5">
                Monthly pacing status and EMI collection efficiency
              </p>
            </div>

            <div className="space-y-5 my-4">
              
              {/* Sales Target Progress */}
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-semibold text-[#1E242B]">Total Sales Target Realization</span>
                  <span className="font-bold text-[#1B6B38]">{currentEmp.achievementPercentage}%</span>
                </div>
                <div className="w-full bg-[#E2E8E5] h-3 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#1B6B38]"
                    style={{ width: `${Math.min(currentEmp.achievementPercentage, 100)}%` }}
                  />
                </div>
                <div className="flex justify-between text-[11px] text-[#5A6570] mt-1">
                  <span>Achieved: {formatBDT(currentEmp.totalAchieved, true)}</span>
                  <span>Target: {formatBDT(currentEmp.monthlyTarget, true)}</span>
                </div>
              </div>

              {/* First 10 Days Pacing */}
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-semibold text-[#1E242B]">Phase 1 (1-10 Days) Pacing</span>
                  <span className="font-bold text-[#1B6B38]">{currentEmp.phases.first10Days.percentage}%</span>
                </div>
                <div className="w-full bg-[#E2E8E5] h-2 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#1B6B38]"
                    style={{ width: `${Math.min(currentEmp.phases.first10Days.percentage, 100)}%` }}
                  />
                </div>
              </div>

              {/* Day 11-20 Pacing */}
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-semibold text-[#1E242B]">Phase 2 (11-20 Days) Pacing</span>
                  <span className="font-bold text-[#25D366]">{currentEmp.phases.second10Days.percentage}%</span>
                </div>
                <div className="w-full bg-[#E2E8E5] h-2 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#25D366]"
                    style={{ width: `${Math.min(currentEmp.phases.second10Days.percentage, 100)}%` }}
                  />
                </div>
              </div>

              {/* Day 21-End Pacing */}
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-semibold text-[#1E242B]">Phase 3 (21-End Days) Pacing</span>
                  <span className="font-bold text-[#1E242B]">{currentEmp.phases.fullMonth.percentage}%</span>
                </div>
                <div className="w-full bg-[#E2E8E5] h-2 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#1E242B]"
                    style={{ width: `${Math.min(currentEmp.phases.fullMonth.percentage, 100)}%` }}
                  />
                </div>
              </div>

            </div>

            {/* EMI & Due Summary pill */}
            <div className="p-3.5 rounded-xl bg-[#F4F6F5] border border-[#E2E8E5] flex items-center justify-between text-xs">
              <div>
                <span className="text-[#5A6570] block text-[11px]">EMI Collection Ratio</span>
                <span className="text-[#1B6B38] font-bold">
                  {currentEmp.totalDue > 0 
                    ? `${((currentEmp.totalEmiCollected / (currentEmp.totalEmiCollected + currentEmp.totalDue)) * 100).toFixed(1)}%`
                    : '100%'}
                </span>
              </div>
              <div className="text-right">
                <span className="text-[#5A6570] block text-[11px]">Overdue Action</span>
                <span className="text-rose-600 font-bold">{currentEmp.overdueCount} Accounts Pending Follow-up</span>
              </div>
            </div>

          </div>

        </div>
      )}

      {/* Tab 2: 5-Month Historical Trend Graph */}
      {activeSubTab === 'history' && (
        <div className="bg-[#FFFFFF] rounded-2xl p-6 border border-[#E2E8E5] shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h4 className="text-sm font-bold text-[#1E242B] flex items-center">
                <Calendar className="w-4 h-4 mr-2 text-[#1B6B38]" />
                5-Month Historical Performance Trend (July - November 2026)
              </h4>
              <p className="text-xs text-[#5A6570] mt-0.5">
                Target, Sales Achieved, and EMI Collections (in Crore ৳)
              </p>
            </div>
          </div>

          <div className="w-full h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={historyData} margin={{ top: 20, right: 20, left: -10, bottom: 10 }}>
                <defs>
                  <linearGradient id="colorAchieved" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1B6B38" stopOpacity={0.35}/>
                    <stop offset="95%" stopColor="#1B6B38" stopOpacity={0.0}/>
                  </linearGradient>
                  <linearGradient id="colorEmi" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#25D366" stopOpacity={0.35}/>
                    <stop offset="95%" stopColor="#25D366" stopOpacity={0.0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8E5" opacity={0.8} />
                <XAxis dataKey="month" stroke="#5A6570" fontSize={12} tickLine={false} />
                <YAxis stroke="#5A6570" fontSize={12} unit=" Cr" tickLine={false} />
                <Tooltip content={<CustomHistoryTooltip />} />
                <Legend wrapperStyle={{ fontSize: '12px' }} />
                <Line type="monotone" dataKey="target" name="Target (Cr ৳)" stroke="#5A6570" strokeDasharray="4 4" strokeWidth={2} />
                <Area type="monotone" dataKey="achieved" name="Achieved (Cr ৳)" stroke="#1B6B38" strokeWidth={2.5} fillOpacity={1} fill="url(#colorAchieved)" />
                <Area type="monotone" dataKey="emiCollected" name="EMI Collected (Cr ৳)" stroke="#25D366" strokeWidth={2} fillOpacity={1} fill="url(#colorEmi)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Tab 3: Recent Deals Closed Log */}
      {activeSubTab === 'deals' && (
        <div className="bg-[#FFFFFF] rounded-2xl p-6 border border-[#E2E8E5] shadow-sm">
          <div className="flex items-center justify-between pb-4 border-b border-[#E2E8E5] mb-4">
            <div>
              <h4 className="text-sm font-bold text-[#1E242B] flex items-center">
                <FileText className="w-4 h-4 mr-2 text-[#1B6B38]" />
                Recent Sales Closed by {currentEmp.name}
              </h4>
              <p className="text-xs text-[#5A6570] mt-0.5">
                Deals booked during current cycle with unit allocation and EMI terms
              </p>
            </div>
            {currentRole === 'admin' && (
              <button
                onClick={() => onOpenRecordSaleForEmployee(currentEmp.id)}
                className="flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-[#1B6B38] text-white font-bold text-xs shadow-sm hover:bg-[#14522B] transition-all"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>Add Deal</span>
              </button>
            )}
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#F4F6F5] text-[#5A6570] uppercase font-semibold border-b border-[#E2E8E5]">
                <tr>
                  <th className="py-3 px-4">Deal ID</th>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">BD Real Estate Project</th>
                  <th className="py-3 px-4">Unit Allocated</th>
                  <th className="py-3 px-4">Sale Value</th>
                  <th className="py-3 px-4">EMI Term</th>
                  <th className="py-3 px-4 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2E8E5] text-[#1E242B]">
                {currentEmp.recentSales.map((sale) => (
                  <tr key={sale.id} className="hover:bg-[#F4F6F5]/80 transition-colors">
                    <td className="py-3.5 px-4 font-mono text-[11px] text-[#5A6570]">{sale.id}</td>
                    <td className="py-3.5 px-4 text-[#5A6570]">{sale.date}</td>
                    <td className="py-3.5 px-4 font-semibold text-[#1E242B] flex items-center space-x-1.5">
                      <Building className="w-3.5 h-3.5 text-[#1B6B38]" />
                      <span>{sale.projectName}</span>
                    </td>
                    <td className="py-3.5 px-4 text-[#1B6B38] font-medium">{sale.unit}</td>
                    <td className="py-3.5 px-4 font-bold text-[#1B6B38]">{formatBDT(sale.amount)}</td>
                    <td className="py-3.5 px-4 text-[#5A6570]">
                      {sale.emiPlanMonths > 0 ? `${sale.emiPlanMonths} Months EMI` : 'Full Down Payment'}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <span className="px-2 py-0.5 rounded-full bg-[#1B6B38]/10 text-[#1B6B38] text-[10px] font-bold border border-[#1B6B38]/30">
                        Booked & Verified
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
};
