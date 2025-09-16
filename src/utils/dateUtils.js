export const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

export const isToday = (date) => {
  const today = new Date();
  const compareDate = new Date(date);
  return (
    compareDate.getDate() === today.getDate() &&
    compareDate.getMonth() === today.getMonth() &&
    compareDate.getFullYear() === today.getFullYear()
  );
};

export const isThisWeek = (date) => {
  const today = new Date();
  const compareDate = new Date(date);
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - today.getDay());
  startOfWeek.setHours(0, 0, 0, 0);
  
  const endOfWeek = new Date(today);
  endOfWeek.setDate(today.getDate() + (6 - today.getDay()));
  endOfWeek.setHours(23, 59, 59, 999);
  
  return compareDate >= startOfWeek && compareDate <= endOfWeek;
};

export const isThisMonth = (date) => {
  const today = new Date();
  const compareDate = new Date(date);
  return (
    compareDate.getMonth() === today.getMonth() &&
    compareDate.getFullYear() === today.getFullYear()
  );
};

export const groupByDate = (expenses) => {
  const grouped = {};
  expenses.forEach(expense => {
    const date = formatDate(expense.date);
    if (!grouped[date]) {
      grouped[date] = [];
    }
    grouped[date].push(expense);
  });
  return grouped;
};