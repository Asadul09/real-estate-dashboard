/**
 * Bangladesh Currency & Number Formatting Utilities
 */

export function formatBDT(amount: number, compact: boolean = false): string {
  if (amount === undefined || amount === null || isNaN(amount)) {
    return '৳ 0';
  }

  if (compact) {
    if (Math.abs(amount) >= 10000000) {
      // 1 Crore = 10,000,000
      const crore = amount / 10000000;
      return `৳ ${crore.toFixed(2)} Cr`;
    } else if (Math.abs(amount) >= 100000) {
      // 1 Lakh = 100,000
      const lakh = amount / 100000;
      return `৳ ${lakh.toFixed(2)} L`;
    } else if (Math.abs(amount) >= 1000) {
      const k = amount / 1000;
      return `৳ ${k.toFixed(1)} K`;
    }
    return `৳ ${amount.toLocaleString('en-BD')}`;
  }

  // South Asian numbering system formatting (e.g. 1,25,00,000)
  const isNegative = amount < 0;
  const absVal = Math.abs(Math.round(amount)).toString();
  
  if (absVal.length <= 3) {
    return `${isNegative ? '-' : ''}৳ ${absVal}`;
  }

  const lastThree = absVal.substring(absVal.length - 3);
  const otherNumbers = absVal.substring(0, absVal.length - 3);
  const formattedOther = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ',');
  
  return `${isNegative ? '-' : ''}৳ ${formattedOther},${lastThree}`;
}

export function formatPercentage(val: number): string {
  if (isNaN(val)) return '0%';
  return `${val.toFixed(1)}%`;
}

export function getStatusColor(percentage: number): {
  badge: string;
  text: string;
  bg: string;
  border: string;
} {
  if (percentage >= 100) {
    return {
      badge: 'bg-[#1B6B38]/10 text-[#1B6B38] border-[#1B6B38]/30',
      text: 'text-[#1B6B38]',
      bg: 'bg-[#1B6B38]',
      border: 'border-[#1B6B38]',
    };
  } else if (percentage >= 75) {
    return {
      badge: 'bg-[#25D366]/15 text-[#14522B] border-[#25D366]/40',
      text: 'text-[#1B6B38]',
      bg: 'bg-[#25D366]',
      border: 'border-[#25D366]',
    };
  } else if (percentage >= 50) {
    return {
      badge: 'bg-[#F4F6F5] text-[#5A6570] border-[#E2E8E5]',
      text: 'text-[#5A6570]',
      bg: 'bg-[#5A6570]',
      border: 'border-[#E2E8E5]',
    };
  } else {
    return {
      badge: 'bg-rose-50 text-rose-700 border-rose-200',
      text: 'text-rose-700',
      bg: 'bg-rose-600',
      border: 'border-rose-300',
    };
  }
}
