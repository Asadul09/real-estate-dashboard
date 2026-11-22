import React, { useState } from 'react';
import { EmiRecord } from '../types';
import { formatBDT } from '../services/formatters';
import { 
  CreditCard, 
  AlertCircle, 
  CheckCircle2, 
  Clock, 
  Search, 
  Filter, 
  PhoneCall, 
  Building2, 
  DollarSign, 
  ShieldAlert,
  ArrowRight
} from 'lucide-react';

interface EmiDueManagerProps {
  emiRecords: EmiRecord[];
  onCollectPayment: (recordId: string) => void;
}

export const EmiDueManager: React.FC<EmiDueManagerProps> = ({
  emiRecords,
  onCollectPayment,
}) => {
  const [statusFilter, setStatusFilter] = useState<'all' | 'paid' | 'pending' | 'overdue'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredRecords = emiRecords.filter(rec => {
    const matchesStatus = statusFilter === 'all' || rec.status === statusFilter;
    const matchesSearch = 
      rec.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rec.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rec.unitNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rec.clientPhone.includes(searchTerm);
    return matchesStatus && matchesSearch;
  });

  const totalCollectedSum = emiRecords
    .filter(r => r.status === 'paid')
    .reduce((sum, r) => sum + (r.monthlyEmiAmount * r.installmentsPaid), 0);

  const totalMonthlyEmiPortfolio = emiRecords.reduce((sum, r) => sum + r.monthlyEmiAmount, 0);

  const overdueRecords = emiRecords.filter(r => r.status === 'overdue');
  const totalOverdueAmount = overdueRecords.reduce((sum, r) => sum + r.monthlyEmiAmount, 0);

  return (
    <div className="space-y-6">
      
      {/* Header Overview Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="bg-[#FFFFFF] rounded-2xl p-5 border border-[#E2E8E5] shadow-sm">
          <div className="flex items-center justify-between text-xs text-[#5A6570] mb-2">
            <span className="font-semibold uppercase tracking-wider">Active EMI Portfolio</span>
            <div className="w-8 h-8 rounded-lg bg-[#1B6B38]/10 text-[#1B6B38] flex items-center justify-center">
              <CreditCard className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-[#1E242B]">
            {formatBDT(totalMonthlyEmiPortfolio)}
          </div>
          <p className="text-xs text-[#5A6570] mt-1">
            Monthly recurring installment run-rate
          </p>
        </div>

        <div className="bg-[#FFFFFF] rounded-2xl p-5 border border-[#E2E8E5] shadow-sm">
          <div className="flex items-center justify-between text-xs text-[#5A6570] mb-2">
            <span className="font-semibold uppercase tracking-wider">Total Received Till Date</span>
            <div className="w-8 h-8 rounded-lg bg-[#25D366]/20 text-[#14522B] flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-[#1B6B38]">
            {formatBDT(totalCollectedSum, true)}
          </div>
          <p className="text-xs text-[#5A6570] mt-1">
            Cumulative installments processed
          </p>
        </div>

        <div className="bg-[#FFFFFF] rounded-2xl p-5 border border-[#E2E8E5] shadow-sm">
          <div className="flex items-center justify-between text-xs text-[#5A6570] mb-2">
            <span className="font-semibold uppercase tracking-wider">Immediate Overdue Risk</span>
            <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center border border-rose-100">
              <AlertCircle className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-rose-700">
            {formatBDT(totalOverdueAmount)}
          </div>
          <p className="text-xs text-rose-600 mt-1 font-medium">
            {overdueRecords.length} clients requiring recovery action
          </p>
        </div>

        <div className="bg-[#FFFFFF] rounded-2xl p-5 border border-[#E2E8E5] shadow-sm">
          <div className="flex items-center justify-between text-xs text-[#5A6570] mb-2">
            <span className="font-semibold uppercase tracking-wider">Collection Efficiency</span>
            <div className="w-8 h-8 rounded-lg bg-[#1B6B38]/10 text-[#1B6B38] flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-[#1B6B38]">
            {emiRecords.length > 0 
              ? `${Math.round(((emiRecords.length - overdueRecords.length) / emiRecords.length) * 100)}%`
              : '100%'}
          </div>
          <p className="text-xs text-[#5A6570] mt-1">
            Standard 30-day on-time recovery rate
          </p>
        </div>

      </div>

      {/* Filter and Search Bar */}
      <div className="bg-[#FFFFFF] rounded-2xl p-4 border border-[#E2E8E5] shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        
        {/* Search */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#5A6570]" />
          <input
            type="text"
            placeholder="Search by client name, project, unit, or phone number..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#F4F6F5] border border-[#E2E8E5] rounded-xl pl-10 pr-4 py-2 text-xs text-[#1E242B] placeholder-[#5A6570] focus:outline-none focus:border-[#1B6B38]"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex items-center space-x-1.5 bg-[#F4F6F5] p-1 rounded-xl border border-[#E2E8E5] text-xs">
          <button
            onClick={() => setStatusFilter('all')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
              statusFilter === 'all' ? 'bg-[#1B6B38] text-white shadow-sm' : 'text-[#5A6570] hover:text-[#1E242B]'
            }`}
          >
            All ({emiRecords.length})
          </button>
          <button
            onClick={() => setStatusFilter('paid')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
              statusFilter === 'paid' ? 'bg-[#1B6B38] text-white shadow-sm' : 'text-[#5A6570] hover:text-[#1E242B]'
            }`}
          >
            Paid ({emiRecords.filter(r => r.status === 'paid').length})
          </button>
          <button
            onClick={() => setStatusFilter('pending')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
              statusFilter === 'pending' ? 'bg-[#1E242B] text-white shadow-sm' : 'text-[#5A6570] hover:text-[#1E242B]'
            }`}
          >
            Upcoming ({emiRecords.filter(r => r.status === 'pending').length})
          </button>
          <button
            onClick={() => setStatusFilter('overdue')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
              statusFilter === 'overdue' ? 'bg-rose-600 text-white shadow-sm' : 'text-[#5A6570] hover:text-[#1E242B]'
            }`}
          >
            Overdue ({overdueRecords.length})
          </button>
        </div>

      </div>

      {/* EMI & Due Ledger Table */}
      <div className="bg-[#FFFFFF] rounded-2xl p-6 border border-[#E2E8E5] shadow-sm">
        <div className="flex items-center justify-between pb-4 border-b border-[#E2E8E5] mb-4">
          <div>
            <h4 className="text-sm font-bold text-[#1E242B] flex items-center">
              <CreditCard className="w-4 h-4 mr-2 text-[#1B6B38]" />
              Bangladesh Real Estate EMI Schedule & Due Ledger
            </h4>
            <p className="text-xs text-[#5A6570] mt-0.5">
              Live installment tracking with one-click payment reconciliation
            </p>
          </div>
          <span className="text-xs text-[#5A6570] font-medium">
            Showing {filteredRecords.length} of {emiRecords.length} accounts
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F4F6F5] text-[#5A6570] uppercase font-semibold border-b border-[#E2E8E5]">
              <tr>
                <th className="py-3 px-4">Client & Contact</th>
                <th className="py-3 px-4">BD Project & Unit</th>
                <th className="py-3 px-4">Total Price</th>
                <th className="py-3 px-4">Monthly EMI</th>
                <th className="py-3 px-4">Installment Progress</th>
                <th className="py-3 px-4">Next Due Date</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8E5] text-[#1E242B]">
              {filteredRecords.map((rec) => {
                const progressPct = Math.round((rec.installmentsPaid / rec.totalInstallments) * 100);
                return (
                  <tr key={rec.id} className="hover:bg-[#F4F6F5]/80 transition-colors">
                    
                    {/* Client */}
                    <td className="py-3.5 px-4">
                      <p className="font-bold text-[#1E242B]">{rec.clientName}</p>
                      <p className="text-[11px] text-[#5A6570] flex items-center mt-0.5">
                        <PhoneCall className="w-3 h-3 mr-1 text-[#5A6570]" />
                        {rec.clientPhone}
                      </p>
                    </td>

                    {/* Project & Unit */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center space-x-1.5">
                        <Building2 className="w-3.5 h-3.5 text-[#1B6B38]" />
                        <span className="font-semibold text-[#1E242B]">{rec.projectName}</span>
                      </div>
                      <span className="text-[11px] text-[#1B6B38] font-mono block">
                        Unit {rec.unitNumber}
                      </span>
                    </td>

                    {/* Total Price & Down Payment */}
                    <td className="py-3.5 px-4">
                      <span className="font-bold text-[#1E242B]">{formatBDT(rec.totalPrice, true)}</span>
                      <span className="text-[10px] text-[#5A6570] block">
                        DP: {formatBDT(rec.downPayment, true)}
                      </span>
                    </td>

                    {/* Monthly EMI */}
                    <td className="py-3.5 px-4 font-bold text-[#1E242B]">
                      {formatBDT(rec.monthlyEmiAmount)}
                    </td>

                    {/* Installment Progress */}
                    <td className="py-3.5 px-4">
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="font-medium text-[#5A6570]">
                            {rec.installmentsPaid} of {rec.totalInstallments} mos
                          </span>
                          <span className="text-[#1B6B38] font-bold">{progressPct}%</span>
                        </div>
                        <div className="w-28 bg-[#E2E8E5] h-2 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-[#1B6B38]"
                            style={{ width: `${progressPct}%` }}
                          />
                        </div>
                      </div>
                    </td>

                    {/* Next Due Date */}
                    <td className="py-3.5 px-4 font-mono text-[11px] text-[#5A6570]">
                      {rec.nextDueDate}
                    </td>

                    {/* Status */}
                    <td className="py-3.5 px-4">
                      {rec.status === 'paid' && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-[#1B6B38]/10 text-[#1B6B38] text-[10px] font-bold border border-[#1B6B38]/30">
                          <CheckCircle2 className="w-3 h-3 mr-1" /> Paid
                        </span>
                      )}
                      {rec.status === 'pending' && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-[#F4F6F5] text-[#5A6570] text-[10px] font-bold border border-[#E2E8E5]">
                          <Clock className="w-3 h-3 mr-1" /> Upcoming
                        </span>
                      )}
                      {rec.status === 'overdue' && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 text-[10px] font-bold border border-rose-200">
                          <AlertCircle className="w-3 h-3 mr-1" /> {rec.overdueDays}d Overdue
                        </span>
                      )}
                    </td>

                    {/* Action */}
                    <td className="py-3.5 px-4 text-right">
                      {rec.status !== 'paid' ? (
                        <button
                          onClick={() => onCollectPayment(rec.id)}
                          className="px-3 py-1 rounded-lg bg-[#1B6B38] hover:bg-[#14522B] text-white font-bold text-xs shadow-sm transition-all flex items-center space-x-1 ml-auto"
                        >
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Collect</span>
                        </button>
                      ) : (
                        <span className="text-[#5A6570] text-[11px] font-medium">Reconciled</span>
                      )}
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
