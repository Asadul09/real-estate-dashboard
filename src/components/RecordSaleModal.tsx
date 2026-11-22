import React, { useState } from 'react';
import { Employee, RealEstateProject } from '../types';
import { formatBDT } from '../services/formatters';
import { 
  PlusCircle, 
  X, 
  Building2, 
  User, 
  Calendar, 
  CreditCard, 
  DollarSign, 
  Clock,
  Sparkles
} from 'lucide-react';

interface RecordSaleModalProps {
  isOpen: boolean;
  onClose: () => void;
  employees: Employee[];
  projects: RealEstateProject[];
  defaultEmployeeId?: string;
  defaultProjectName?: string;
  onSubmit: (saleData: {
    employeeId: string;
    projectName: string;
    unit: string;
    amount: number;
    phase: 'first10Days' | 'second10Days' | 'fullMonth';
    emiMonths: number;
    clientName: string;
    clientPhone: string;
    downPayment: number;
  }) => void;
}

export const RecordSaleModal: React.FC<RecordSaleModalProps> = ({
  isOpen,
  onClose,
  employees,
  projects,
  defaultEmployeeId,
  defaultProjectName,
  onSubmit,
}) => {
  const [employeeId, setEmployeeId] = useState(defaultEmployeeId || employees[0]?.id || '');
  const [projectName, setProjectName] = useState(defaultProjectName || projects[0]?.name || '');
  const [unit, setUnit] = useState('Condo A-7');
  const [amount, setAmount] = useState<number>(25000000); // 2.5 Crore default
  const [downPayment, setDownPayment] = useState<number>(7500000); // 75 Lakhs default
  const [phase, setPhase] = useState<'first10Days' | 'second10Days' | 'fullMonth'>('second10Days');
  const [emiMonths, setEmiMonths] = useState<number>(36);
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('+880 17');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!employeeId || !projectName || amount <= 0) {
      alert('Please fill out all required fields');
      return;
    }

    onSubmit({
      employeeId,
      projectName,
      unit,
      amount: Number(amount),
      phase,
      emiMonths: Number(emiMonths),
      clientName: clientName || `Client for ${unit}`,
      clientPhone: clientPhone || '+880 1700-000000',
      downPayment: Number(downPayment),
    });

    onClose();
  };

  const setPresetAmount = (val: number) => {
    setAmount(val);
    setDownPayment(Math.round(val * 0.3)); // 30% standard BD real estate down payment
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1E242B]/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-[#FFFFFF] border border-[#E2E8E5] rounded-3xl w-full max-w-xl max-h-[92vh] overflow-y-auto shadow-2xl flex flex-col justify-between">
        
        {/* Header */}
        <div className="p-6 border-b border-[#E2E8E5] flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-[#1B6B38] text-white flex items-center justify-center font-bold shadow-md shadow-[#1B6B38]/20">
              <PlusCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#1E242B]">
                Record Real Estate Sale & EMI Agreement
              </h3>
              <p className="text-xs text-[#5A6570]">
                Log closed transaction and attribute into the 10-day / 20-day / full month sprint
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-[#5A6570] hover:text-[#1E242B] rounded-xl hover:bg-[#F4F6F5]">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
          
          {/* Employee & Project row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-[11px] font-bold text-[#1E242B] block mb-1">
                Sales Officer:
              </label>
              <select
                value={employeeId}
                onChange={(e) => setEmployeeId(e.target.value)}
                className="w-full bg-[#F4F6F5] border border-[#E2E8E5] rounded-xl px-3 py-2 text-xs text-[#1E242B] focus:outline-none focus:border-[#1B6B38]"
              >
                {employees.map(emp => (
                  <option key={emp.id} value={emp.id} className="bg-[#FFFFFF] text-[#1E242B]">
                    {emp.name} ({emp.zone})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-[11px] font-bold text-[#1E242B] block mb-1">
                BD Real Estate Project:
              </label>
              <select
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                className="w-full bg-[#F4F6F5] border border-[#E2E8E5] rounded-xl px-3 py-2 text-xs text-[#1E242B] focus:outline-none focus:border-[#1B6B38]"
              >
                {projects.map(proj => (
                  <option key={proj.id} value={proj.name} className="bg-[#FFFFFF] text-[#1E242B]">
                    {proj.name} ({proj.city})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Unit Number & Sprint Phase */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-[11px] font-bold text-[#1E242B] block mb-1">
                Unit / Plot / Suite Number:
              </label>
              <input
                type="text"
                placeholder="e.g. Unit 9B or Villa 14"
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                className="w-full bg-[#F4F6F5] border border-[#E2E8E5] rounded-xl px-3 py-2 text-xs text-[#1E242B] placeholder-[#5A6570] focus:outline-none focus:border-[#1B6B38]"
                required
              />
            </div>

            <div>
              <label className="text-[11px] font-bold text-[#1E242B] block mb-1">
                Sprint Achievement Attribution:
              </label>
              <select
                value={phase}
                onChange={(e) => setPhase(e.target.value as any)}
                className="w-full bg-[#F4F6F5] border border-[#E2E8E5] rounded-xl px-3 py-2 text-xs text-[#1B6B38] font-bold focus:outline-none focus:border-[#1B6B38]"
              >
                <option value="first10Days" className="bg-[#FFFFFF] text-[#1E242B]">
                  Part 1 • First 10 Days (Day 1 - 10)
                </option>
                <option value="second10Days" className="bg-[#FFFFFF] text-[#1E242B]">
                  Part 2 • 20 Days Mark (Day 11 - 20)
                </option>
                <option value="fullMonth" className="bg-[#FFFFFF] text-[#1E242B]">
                  Part 3 • Full Month Closing (Day 21 - End)
                </option>
              </select>
            </div>
          </div>

          {/* Sale Value in BDT */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-[11px] font-bold text-[#1E242B]">
                Total Deal Value (BDT):
              </label>
              <span className="text-[#1B6B38] font-bold text-xs">{formatBDT(amount)}</span>
            </div>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="w-full bg-[#F4F6F5] border border-[#E2E8E5] rounded-xl px-3 py-2 text-xs text-[#1E242B] focus:outline-none focus:border-[#1B6B38]"
              required
            />
            {/* Quick Presets */}
            <div className="flex flex-wrap gap-1.5 mt-1.5">
              <button
                type="button"
                onClick={() => setPresetAmount(15000000)}
                className="px-2 py-0.5 rounded-md bg-[#F4F6F5] text-[#5A6570] hover:text-[#1E242B] border border-[#E2E8E5] text-[10px]"
              >
                ৳ 1.5 Cr
              </button>
              <button
                type="button"
                onClick={() => setPresetAmount(25000000)}
                className="px-2 py-0.5 rounded-md bg-[#F4F6F5] text-[#5A6570] hover:text-[#1E242B] border border-[#E2E8E5] text-[10px]"
              >
                ৳ 2.5 Cr
              </button>
              <button
                type="button"
                onClick={() => setPresetAmount(38000000)}
                className="px-2 py-0.5 rounded-md bg-[#F4F6F5] text-[#5A6570] hover:text-[#1E242B] border border-[#E2E8E5] text-[10px]"
              >
                ৳ 3.8 Cr (Gulshan Condo)
              </button>
              <button
                type="button"
                onClick={() => setPresetAmount(50000000)}
                className="px-2 py-0.5 rounded-md bg-[#F4F6F5] text-[#5A6570] hover:text-[#1E242B] border border-[#E2E8E5] text-[10px]"
              >
                ৳ 5.0 Cr
              </button>
            </div>
          </div>

          {/* Down Payment & EMI Plan */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-[11px] font-bold text-[#1E242B]">
                  Initial Down Payment:
                </label>
                <span className="text-[#1B6B38] font-semibold">{formatBDT(downPayment, true)}</span>
              </div>
              <input
                type="number"
                value={downPayment}
                onChange={(e) => setDownPayment(Number(e.target.value))}
                className="w-full bg-[#F4F6F5] border border-[#E2E8E5] rounded-xl px-3 py-2 text-xs text-[#1E242B] focus:outline-none focus:border-[#1B6B38]"
              />
            </div>

            <div>
              <label className="text-[11px] font-bold text-[#1E242B] block mb-1">
                EMI Installment Plan:
              </label>
              <select
                value={emiMonths}
                onChange={(e) => setEmiMonths(Number(e.target.value))}
                className="w-full bg-[#F4F6F5] border border-[#E2E8E5] rounded-xl px-3 py-2 text-xs text-[#1E242B] focus:outline-none focus:border-[#1B6B38]"
              >
                <option value={0} className="bg-[#FFFFFF] text-[#1E242B]">Full 100% Cash / No EMI</option>
                <option value={24} className="bg-[#FFFFFF] text-[#1E242B]">24 Months EMI</option>
                <option value={36} className="bg-[#FFFFFF] text-[#1E242B]">36 Months Standard EMI</option>
                <option value={48} className="bg-[#FFFFFF] text-[#1E242B]">48 Months Flexible EMI</option>
                <option value={60} className="bg-[#FFFFFF] text-[#1E242B]">60 Months Extended EMI</option>
              </select>
            </div>
          </div>

          {/* Client Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-[#E2E8E5]">
            <div>
              <label className="text-[11px] font-bold text-[#1E242B] block mb-1">
                Client Name:
              </label>
              <input
                type="text"
                placeholder="e.g. Barrister / Engr. / Dr. / Mr."
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                className="w-full bg-[#F4F6F5] border border-[#E2E8E5] rounded-xl px-3 py-2 text-xs text-[#1E242B] placeholder-[#5A6570] focus:outline-none focus:border-[#1B6B38]"
              />
            </div>

            <div>
              <label className="text-[11px] font-bold text-[#1E242B] block mb-1">
                Client Phone (Bangladesh):
              </label>
              <input
                type="text"
                placeholder="+880 1..."
                value={clientPhone}
                onChange={(e) => setClientPhone(e.target.value)}
                className="w-full bg-[#F4F6F5] border border-[#E2E8E5] rounded-xl px-3 py-2 text-xs text-[#1E242B] placeholder-[#5A6570] focus:outline-none focus:border-[#1B6B38]"
              />
            </div>
          </div>

          {/* EMI Calculation Preview */}
          {emiMonths > 0 && (
            <div className="p-3 rounded-xl bg-[#F4F6F5] border border-[#E2E8E5] flex items-center justify-between text-xs">
              <span className="text-[#5A6570]">Estimated Monthly EMI Installment:</span>
              <span className="font-extrabold text-[#1B6B38]">
                {formatBDT(Math.round((amount - downPayment) / emiMonths))} / month
              </span>
            </div>
          )}

          {/* Footer Submit */}
          <div className="pt-4 flex items-center justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-[#5A6570] hover:text-[#1E242B]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-[#1B6B38] hover:bg-[#14522B] text-white font-extrabold text-xs transition-all shadow-md active:scale-95"
            >
              Confirm & Book Sale
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
