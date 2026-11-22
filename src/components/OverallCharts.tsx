import React, { useState } from 'react';
import { Employee } from '../types';
import { formatBDT, formatPercentage } from '../services/formatters';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ComposedChart,
  Line,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { 
  BarChart3, 
  TrendingUp, 
  PieChart as PieIcon, 
  Award, 
  Layers, 
  Filter,
  DollarSign,
  AlertTriangle
} from 'lucide-react';

interface OverallChartsProps {
  employees: Employee[];
  onSelectEmployeeForDetail: (employeeId: string) => void;
}

export const OverallCharts: React.FC<OverallChartsProps> = ({
  employees,
  onSelectEmployeeForDetail,
}) => {
  const [zoneFilter, setZoneFilter] = useState<string>('all');
  const [chartMetric, setChartMetric] = useState<'sales' | 'phases' | 'emiDue'>('sales');

  const filteredEmployees = zoneFilter === 'all'
    ? employees
    : employees.filter(e => e.zone === zoneFilter);

  // Prepare chart dataset 1: Sales Target vs Achieved
  const salesComparisonData = filteredEmployees.map(emp => ({
    name: emp.name.split(' ')[0], // First name for clean X-axis
    fullName: emp.name,
    target: emp.monthlyTarget / 10000000, // In Crores for chart readability
    achieved: emp.totalAchieved / 10000000,
    targetBDT: emp.monthlyTarget,
    achievedBDT: emp.totalAchieved,
    percentage: emp.achievementPercentage,
  }));

  // Prepare chart dataset 2: 3-Phase Breakdown (1st 10 Days, 20 Days, Full Month)
  const phasesComparisonData = filteredEmployees.map(emp => ({
    name: emp.name.split(' ')[0],
    fullName: emp.name,
    first10Days: emp.phases.first10Days.achieved / 10000000, // in Cr
    second10Days: emp.phases.second10Days.achieved / 10000000,
    fullMonth: emp.phases.fullMonth.achieved / 10000000,
    first10BDT: emp.phases.first10Days.achieved,
    second10BDT: emp.phases.second10Days.achieved,
    fullMonthBDT: emp.phases.fullMonth.achieved,
    totalCr: emp.totalAchieved / 10000000,
  }));

  // Prepare chart dataset 3: EMI Collection vs Total Due
  const emiDueData = filteredEmployees.map(emp => ({
    name: emp.name.split(' ')[0],
    fullName: emp.name,
    emiCollected: emp.totalEmiCollected / 100000, // In Lakhs for chart readability
    totalDue: emp.totalDue / 100000,
    emiBDT: emp.totalEmiCollected,
    dueBDT: emp.totalDue,
    overdueCount: emp.overdueCount,
  }));

  // Leaderboard sorted by achievement percentage descending
  const leaderboard = [...filteredEmployees].sort((a, b) => b.achievementPercentage - a.achievementPercentage);

  // Aggregated Phase Totals for Pie Chart
  const aggregatePhases = [
    { 
      name: 'First 10 Days', 
      value: filteredEmployees.reduce((sum, e) => sum + e.phases.first10Days.achieved, 0),
      color: '#1B6B38' // Deep Forest Green
    },
    { 
      name: 'Mid 20 Days (11-20)', 
      value: filteredEmployees.reduce((sum, e) => sum + e.phases.second10Days.achieved, 0),
      color: '#25D366' // Fresh Emerald Green
    },
    { 
      name: 'Full Month Closing', 
      value: filteredEmployees.reduce((sum, e) => sum + e.phases.fullMonth.achieved, 0),
      color: '#1E242B' // Deep Charcoal Slate
    },
  ];

  const CustomSalesTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-[#FFFFFF] border border-[#E2E8E5] p-3 rounded-xl shadow-xl text-xs space-y-1 z-50">
          <p className="font-bold text-[#1E242B] text-sm">{data.fullName}</p>
          <p className="text-[#5A6570] font-medium">Target: {formatBDT(data.targetBDT)}</p>
          <p className="text-[#1B6B38] font-bold">Achieved: {formatBDT(data.achievedBDT)}</p>
          <p className="text-[#5A6570] font-semibold border-t border-[#E2E8E5] pt-1">
            Performance: <span className={data.percentage >= 100 ? 'text-[#1B6B38]' : 'text-[#25D366]'}>{data.percentage}%</span>
          </p>
        </div>
      );
    }
    return null;
  };

  const CustomPhaseTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-[#FFFFFF] border border-[#E2E8E5] p-3 rounded-xl shadow-xl text-xs space-y-1.5 z-50">
          <p className="font-bold text-[#1E242B] text-sm">{data.fullName}</p>
          <div className="space-y-1 border-t border-[#E2E8E5] pt-1">
            <p className="text-[#1B6B38]">1st 10 Days: <strong>{formatBDT(data.first10BDT)}</strong></p>
            <p className="text-[#25D366]">Day 11-20: <strong>{formatBDT(data.second10BDT)}</strong></p>
            <p className="text-[#1E242B]">Day 21-End: <strong>{formatBDT(data.fullMonthBDT)}</strong></p>
            <p className="text-[#1B6B38] font-bold border-t border-[#E2E8E5] pt-1">
              Total Month: {formatBDT(data.first10BDT + data.second10BDT + data.fullMonthBDT)}
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  const CustomEmiTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-[#FFFFFF] border border-[#E2E8E5] p-3 rounded-xl shadow-xl text-xs space-y-1 z-50">
          <p className="font-bold text-[#1E242B] text-sm">{data.fullName}</p>
          <p className="text-[#1B6B38] font-medium">EMI Collected: {formatBDT(data.emiBDT)}</p>
          <p className="text-rose-600 font-medium">Outstanding Due: {formatBDT(data.dueBDT)}</p>
          <p className="text-[#5A6570] font-semibold">Overdue Accounts: {data.overdueCount}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      
      {/* Chart Filter & Mode Toggle Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#FFFFFF] p-4 rounded-2xl border border-[#E2E8E5] shadow-sm">
        <div>
          <h3 className="text-base font-bold text-[#1E242B] flex items-center">
            <BarChart3 className="w-5 h-5 mr-2 text-[#1B6B38]" />
            Overall Team Visual Analytics (All Employees)
          </h3>
          <p className="text-xs text-[#5A6570] mt-0.5">
            Comparative graphs displaying monthly targets, sprint phases, EMI collections, and due risk
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Chart metric selector */}
          <div className="flex bg-[#F4F6F5] p-1 rounded-xl border border-[#E2E8E5] text-xs">
            <button
              onClick={() => setChartMetric('sales')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                chartMetric === 'sales'
                  ? 'bg-[#1B6B38] text-white shadow-sm'
                  : 'text-[#5A6570] hover:text-[#1E242B]'
              }`}
            >
              Target vs Achieved
            </button>
            <button
              onClick={() => setChartMetric('phases')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                chartMetric === 'phases'
                  ? 'bg-[#1B6B38] text-white shadow-sm'
                  : 'text-[#5A6570] hover:text-[#1E242B]'
              }`}
            >
              3-Phase Sprints
            </button>
            <button
              onClick={() => setChartMetric('emiDue')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                chartMetric === 'emiDue'
                  ? 'bg-[#1B6B38] text-white shadow-sm'
                  : 'text-[#5A6570] hover:text-[#1E242B]'
              }`}
            >
              EMI vs Due
            </button>
          </div>

          {/* Zone filter */}
          <div className="flex items-center space-x-1.5 bg-[#FFFFFF] border border-[#E2E8E5] rounded-lg px-2.5 py-1.5 text-xs text-[#1E242B] shadow-sm">
            <Filter className="w-3.5 h-3.5 text-[#5A6570]" />
            <select
              value={zoneFilter}
              onChange={(e) => setZoneFilter(e.target.value)}
              className="bg-transparent border-none text-xs text-[#1E242B] focus:outline-none cursor-pointer"
            >
              <option value="all" className="bg-[#FFFFFF] text-[#1E242B]">All BD Zones</option>
              <option value="Dhaka North" className="bg-[#FFFFFF] text-[#1E242B]">Dhaka North</option>
              <option value="Purbachal" className="bg-[#FFFFFF] text-[#1E242B]">Purbachal</option>
              <option value="Chattogram" className="bg-[#FFFFFF] text-[#1E242B]">Chattogram</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Interactive Chart Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Main Bar / Comparative Chart */}
        <div className="lg:col-span-2 bg-[#FFFFFF] rounded-2xl p-6 border border-[#E2E8E5] shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h4 className="text-sm font-bold text-[#1E242B] flex items-center">
                {chartMetric === 'sales' && 'Monthly Target vs Total Achievement (in Crore ৳)'}
                {chartMetric === 'phases' && '3-Phase Achievement Distribution: 1st 10d vs 20d vs Month End (in Crore ৳)'}
                {chartMetric === 'emiDue' && 'Total EMI Collected vs Outstanding Due (in Lakh ৳)'}
              </h4>
              <p className="text-xs text-[#5A6570] mt-0.5">
                Side-by-side performance comparison for each sales officer
              </p>
            </div>
            <span className="text-[11px] font-medium text-[#1B6B38] bg-[#1B6B38]/10 px-2.5 py-1 rounded-md border border-[#1B6B38]/20">
              Interactive Tooltips
            </span>
          </div>

          <div className="w-full h-[320px] pt-2">
            <ResponsiveContainer width="100%" height="100%">
              {chartMetric === 'sales' ? (
                <BarChart data={salesComparisonData} margin={{ top: 20, right: 20, left: -10, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E2E8E5" opacity={0.8} />
                  <XAxis dataKey="name" stroke="#5A6570" fontSize={12} tickLine={false} />
                  <YAxis stroke="#5A6570" fontSize={12} unit=" Cr" tickLine={false} />
                  <Tooltip content={<CustomSalesTooltip />} />
                  <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                  <Bar dataKey="target" name="Monthly Target (Cr ৳)" fill="#5A6570" radius={[6, 6, 0, 0]} />
                  <Bar dataKey="achieved" name="Total Achieved (Cr ৳)" fill="#1B6B38" radius={[6, 6, 0, 0]} />
                </BarChart>
              ) : chartMetric === 'phases' ? (
                <BarChart data={phasesComparisonData} margin={{ top: 20, right: 20, left: -10, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E2E8E5" opacity={0.8} />
                  <XAxis dataKey="name" stroke="#5A6570" fontSize={12} tickLine={false} />
                  <YAxis stroke="#5A6570" fontSize={12} unit=" Cr" tickLine={false} />
                  <Tooltip content={<CustomPhaseTooltip />} />
                  <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                  <Bar dataKey="first10Days" name="1st 10 Days (Cr ৳)" stackId="a" fill="#1B6B38" radius={[0, 0, 0, 0]} />
                  <Bar dataKey="second10Days" name="Day 11-20 (Cr ৳)" stackId="a" fill="#25D366" radius={[0, 0, 0, 0]} />
                  <Bar dataKey="fullMonth" name="Full Month Closing (Cr ৳)" stackId="a" fill="#1E242B" radius={[6, 6, 0, 0]} />
                </BarChart>
              ) : (
                <BarChart data={emiDueData} margin={{ top: 20, right: 20, left: -10, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E2E8E5" opacity={0.8} />
                  <XAxis dataKey="name" stroke="#5A6570" fontSize={12} tickLine={false} />
                  <YAxis stroke="#5A6570" fontSize={12} unit=" L" tickLine={false} />
                  <Tooltip content={<CustomEmiTooltip />} />
                  <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                  <Bar dataKey="emiCollected" name="EMI Collected (Lakh ৳)" fill="#1B6B38" radius={[6, 6, 0, 0]} />
                  <Bar dataKey="totalDue" name="Outstanding Due (Lakh ৳)" fill="#E11D48" radius={[6, 6, 0, 0]} />
                </BarChart>
              )}
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right 1 Col: Overall Sprint Distribution Pie */}
        <div className="bg-[#FFFFFF] rounded-2xl p-6 border border-[#E2E8E5] shadow-sm flex flex-col justify-between">
          <div>
            <h4 className="text-sm font-bold text-[#1E242B] flex items-center">
              <PieIcon className="w-4 h-4 mr-2 text-[#1B6B38]" />
              Company Sprint Revenue Share
            </h4>
            <p className="text-xs text-[#5A6570] mt-0.5">
              Cumulative sales distribution across the 3 calendar sprints
            </p>
          </div>

          <div className="w-full h-[220px] relative my-2">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={aggregatePhases}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={85}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {aggregatePhases.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(val: any) => [formatBDT(Number(val)), 'Sales Volume']}
                  contentStyle={{ backgroundColor: '#FFFFFF', borderColor: '#E2E8E5', borderRadius: '0.75rem', fontSize: '12px', color: '#1E242B' }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-[11px] text-[#5A6570] font-medium">Total Achieved</span>
              <span className="text-sm font-extrabold text-[#1B6B38]">
                {formatBDT(filteredEmployees.reduce((sum, e) => sum + e.totalAchieved, 0), true)}
              </span>
            </div>
          </div>

          {/* Legend Items */}
          <div className="space-y-2 pt-2 border-t border-[#E2E8E5]">
            {aggregatePhases.map((phase) => (
              <div key={phase.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center space-x-2">
                  <span className="w-3 h-3 rounded-full" style={{ backgroundColor: phase.color }} />
                  <span className="text-[#5A6570] font-medium">{phase.name}</span>
                </div>
                <span className="text-[#1E242B] font-bold">{formatBDT(phase.value, true)}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* All Employee Performance Leaderboard Table */}
      <div className="bg-[#FFFFFF] rounded-2xl p-6 border border-[#E2E8E5] shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#E2E8E5] mb-4 gap-2">
          <div>
            <h4 className="text-sm font-bold text-[#1E242B] flex items-center">
              <Award className="w-4 h-4 mr-2 text-[#1B6B38]" />
              Sales Officer Leaderboard & Sprint Metrics
            </h4>
            <p className="text-xs text-[#5A6570] mt-0.5">
              Click any employee to open their in-depth visual dashboard & breakdown
            </p>
          </div>
          <span className="text-xs text-[#5A6570] font-medium self-start sm:self-auto">
            Showing {filteredEmployees.length} Officers
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F4F6F5] text-[#5A6570] uppercase tracking-wider font-semibold border-b border-[#E2E8E5]">
              <tr>
                <th className="py-3 px-4">Rank & Officer</th>
                <th className="py-3 px-4">Monthly Target</th>
                <th className="py-3 px-4">Total Achieved</th>
                <th className="py-3 px-4">Performance</th>
                <th className="py-3 px-4">1st 10 Days</th>
                <th className="py-3 px-4">Day 11-20</th>
                <th className="py-3 px-4">Day 21-End</th>
                <th className="py-3 px-4">Total EMI</th>
                <th className="py-3 px-4">Due Status</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8E5] text-[#1E242B]">
              {leaderboard.map((emp, index) => {
                return (
                  <tr 
                    key={emp.id} 
                    className="hover:bg-[#F4F6F5]/80 transition-colors group cursor-pointer"
                    onClick={() => onSelectEmployeeForDetail(emp.id)}
                  >
                    <td className="py-3.5 px-4">
                      <div className="flex items-center space-x-3">
                        <span className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs ${
                          index === 0 ? 'bg-[#1B6B38] text-white shadow-sm' :
                          index === 1 ? 'bg-[#25D366] text-[#14522B]' :
                          index === 2 ? 'bg-[#E2E8E5] text-[#1E242B]' :
                          'bg-[#F4F6F5] text-[#5A6570]'
                        }`}>
                          {index + 1}
                        </span>
                        <img 
                          src={emp.avatar} 
                          alt={emp.name} 
                          className="w-8 h-8 rounded-full object-cover ring-1 ring-[#E2E8E5] group-hover:ring-[#1B6B38] transition-all" 
                        />
                        <div>
                          <p className="font-bold text-[#1E242B] group-hover:text-[#1B6B38] transition-colors">{emp.name}</p>
                          <p className="text-[10px] text-[#5A6570]">{emp.designation}</p>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 font-semibold text-[#5A6570]">
                      {formatBDT(emp.monthlyTarget, true)}
                    </td>

                    <td className="py-3.5 px-4 font-bold text-[#1E242B]">
                      {formatBDT(emp.totalAchieved, true)}
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="flex items-center space-x-2">
                        <span className={`font-bold ${emp.achievementPercentage >= 100 ? 'text-[#1B6B38]' : 'text-[#25D366]'}`}>
                          {emp.achievementPercentage}%
                        </span>
                        <div className="w-16 bg-[#E2E8E5] h-1.5 rounded-full overflow-hidden">
                          <div
                            className={`h-full ${emp.achievementPercentage >= 100 ? 'bg-[#1B6B38]' : 'bg-[#25D366]'}`}
                            style={{ width: `${Math.min(emp.achievementPercentage, 100)}%` }}
                          />
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="text-[#1B6B38] font-semibold">{formatBDT(emp.phases.first10Days.achieved, true)}</span>
                      <span className="text-[10px] text-[#5A6570] block">({emp.phases.first10Days.dealsCount} deal)</span>
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="text-[#14522B] font-semibold">{formatBDT(emp.phases.second10Days.achieved, true)}</span>
                      <span className="text-[10px] text-[#5A6570] block">({emp.phases.second10Days.dealsCount} deals)</span>
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="text-[#1E242B] font-semibold">{formatBDT(emp.phases.fullMonth.achieved, true)}</span>
                      <span className="text-[10px] text-[#5A6570] block">({emp.phases.fullMonth.dealsCount} deals)</span>
                    </td>

                    <td className="py-3.5 px-4 font-medium text-[#1B6B38]">
                      {formatBDT(emp.totalEmiCollected, true)}
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="font-medium text-rose-600 block">{formatBDT(emp.totalDue, true)}</span>
                      {emp.overdueCount > 0 ? (
                        <span className="text-[10px] text-rose-600 flex items-center">
                          <AlertTriangle className="w-2.5 h-2.5 mr-0.5" /> {emp.overdueCount} overdue
                        </span>
                      ) : (
                        <span className="text-[10px] text-[#1B6B38]">0 overdue</span>
                      )}
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectEmployeeForDetail(emp.id);
                        }}
                        className="px-2.5 py-1 rounded-md bg-[#1B6B38]/10 hover:bg-[#1B6B38] text-[#1B6B38] hover:text-white text-xs font-semibold border border-[#1B6B38]/30 transition-all"
                      >
                        Inspect Visuals
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
