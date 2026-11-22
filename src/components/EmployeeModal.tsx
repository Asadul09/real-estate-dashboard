import React, { useState, useEffect } from 'react';
import { Employee } from '../types';
import { formatBDT } from '../services/formatters';
import { Target, X } from 'lucide-react';

interface EmployeeModalProps {
  isOpen: boolean;
  onClose: () => void;
  employee: Employee | null;
  onUpdateTarget: (employeeId: string, newTarget: number) => void;
}

export const EmployeeModal: React.FC<EmployeeModalProps> = ({
  isOpen,
  onClose,
  employee,
  onUpdateTarget,
}) => {
  const [newTarget, setNewTarget] = useState<number>(employee?.monthlyTarget || 0);

  useEffect(() => {
    if (employee) {
      setNewTarget(employee.monthlyTarget);
    }
  }, [employee]);

  if (!isOpen || !employee) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTarget > 0) {
      onUpdateTarget(employee.id, Number(newTarget));
      onClose();
    }
  };

  const newPct = newTarget > 0 ? ((employee.totalAchieved / newTarget) * 100).toFixed(1) : '0';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1E242B]/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-[#FFFFFF] border border-[#E2E8E5] rounded-3xl w-full max-w-md shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="p-6 border-b border-[#E2E8E5] flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-[#1B6B38]/10 text-[#1B6B38] flex items-center justify-center border border-[#1B6B38]/20">
              <Target className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#1E242B]">
                Adjust Monthly Target
              </h3>
              <p className="text-xs text-[#5A6570]">{employee.name} • {employee.designation}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-[#5A6570] hover:text-[#1E242B] rounded-xl hover:bg-[#F4F6F5]">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
          <div>
            <label className="text-[11px] font-bold text-[#1E242B] block mb-1">
              New Monthly Sales Target (BDT):
            </label>
            <input
              type="number"
              value={newTarget}
              onChange={(e) => setNewTarget(Number(e.target.value))}
              className="w-full bg-[#F4F6F5] border border-[#E2E8E5] rounded-xl px-4 py-2.5 text-xs text-[#1E242B] focus:outline-none focus:border-[#1B6B38] font-bold"
              required
            />
            <div className="flex items-center justify-between text-xs text-[#5A6570] mt-1.5">
              <span>Formatted: <strong className="text-[#1B6B38]">{formatBDT(newTarget)}</strong></span>
              <span>Compact: <strong className="text-[#1B6B38]">{formatBDT(newTarget, true)}</strong></span>
            </div>
          </div>

          {/* Quick preset buttons */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            <button
              type="button"
              onClick={() => setNewTarget(60000000)}
              className="px-2.5 py-1 rounded-lg bg-[#F4F6F5] text-[#5A6570] hover:text-[#1E242B] border border-[#E2E8E5] text-[10px]"
            >
              ৳ 6 Cr
            </button>
            <button
              type="button"
              onClick={() => setNewTarget(80000000)}
              className="px-2.5 py-1 rounded-lg bg-[#F4F6F5] text-[#5A6570] hover:text-[#1E242B] border border-[#E2E8E5] text-[10px]"
            >
              ৳ 8 Cr
            </button>
            <button
              type="button"
              onClick={() => setNewTarget(100000000)}
              className="px-2.5 py-1 rounded-lg bg-[#F4F6F5] text-[#5A6570] hover:text-[#1E242B] border border-[#E2E8E5] text-[10px]"
            >
              ৳ 10 Cr
            </button>
            <button
              type="button"
              onClick={() => setNewTarget(120000000)}
              className="px-2.5 py-1 rounded-lg bg-[#F4F6F5] text-[#5A6570] hover:text-[#1E242B] border border-[#E2E8E5] text-[10px]"
            >
              ৳ 12 Cr
            </button>
          </div>

          {/* Recalculation Preview */}
          <div className="p-3.5 rounded-xl bg-[#F4F6F5] border border-[#E2E8E5] space-y-1.5">
            <div className="flex justify-between">
              <span className="text-[#5A6570]">Current Total Achieved:</span>
              <span className="text-[#1B6B38] font-bold">{formatBDT(employee.totalAchieved, true)}</span>
            </div>
            <div className="flex justify-between border-t border-[#E2E8E5] pt-1.5">
              <span className="text-[#1E242B] font-medium">Projected Achievement Rate:</span>
              <span className="text-[#1B6B38] font-extrabold">{newPct}%</span>
            </div>
          </div>

          {/* Footer */}
          <div className="pt-2 flex items-center justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-[#5A6570] hover:text-[#1E242B]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-[#1B6B38] hover:bg-[#14522B] text-white font-bold text-xs shadow-sm"
            >
              Save New Target
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
