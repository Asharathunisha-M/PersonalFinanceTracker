import { isToday, isThisWeek, isThisMonth } from './dateUtils';

export const calculateTotals = (expenses) => {
  let todayTotal = 0;
  let weekTotal = 0;
  let monthTotal = 0;
  
  expenses.forEach(expense => {
    const amount = expense.amount;
    const date = expense.date;
    
    if (isToday(date)) {
      todayTotal += amount;
    }
    
    if (isThisWeek(date)) {
      weekTotal += amount;
    }
    
    if (isThisMonth(date)) {
      monthTotal += amount;
    }
  });
  
  return { todayTotal, weekTotal, monthTotal };
};

export const calculateCategoryTotals = (expenses, categories) => {
  const categoryTotals = {};
  
  // Initialize all categories with 0
  categories.forEach(category => {
    categoryTotals[category.name] = 0;
  });
  
  // Add uncategorized expenses
  categoryTotals['Uncategorized'] = 0;
  
  // Calculate totals
  expenses.forEach(expense => {
    if (categoryTotals.hasOwnProperty(expense.category)) {
      categoryTotals[expense.category] += expense.amount;
    } else {
      categoryTotals['Uncategorized'] += expense.amount;
    }
  });
  
  return categoryTotals;
};