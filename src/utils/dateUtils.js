// Calculate end date based on start date (YYYY-MM-DD) and duration in months
export function calculateEndDate(startDateStr, durationMonths) {
  if (!startDateStr || !durationMonths) return '';
  try {
    const str = String(startDateStr);
    const parts = str.split('-').map(Number);
    if (parts.length < 3 || isNaN(parts[0]) || isNaN(parts[1]) || isNaN(parts[2])) {
      return '';
    }
    const [year, month, day] = parts;
    const end = new Date(year, month - 1 + Number(durationMonths), day);
    end.setDate(end.getDate() - 1);
    if (isNaN(end.getTime())) return '';
    
    const yyyy = end.getFullYear();
    const mm = String(end.getMonth() + 1).padStart(2, '0');
    const dd = String(end.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  } catch (e) {
    console.error("calculateEndDate error:", e);
    return '';
  }
}

export function formatDateIndian(dateStr) {
  if (!dateStr) return '__/__/____';
  try {
    const str = String(dateStr);
    const parts = str.split('-');
    if (parts.length === 3 && parts[0].length === 4) {
      return `${parts[2]}/${parts[1]}/${parts[0]}`;
    }
    return str;
  } catch {
    return String(dateStr || '__/__/____');
  }
}

export function getMonthYearString(dateStr) {
  if (!dateStr) return 'December 2026';
  try {
    const str = String(dateStr);
    const parts = str.split('-');
    if (parts.length === 3) {
      const d = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
      if (!isNaN(d.getTime())) {
        return d.toLocaleString('en-US', { month: 'long', year: 'numeric' });
      }
    }
    return str;
  } catch {
    return 'December 2026';
  }
}
