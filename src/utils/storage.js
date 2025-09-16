import AsyncStorage from '@react-native-async-storage/async-storage';

const EXPENSES_KEY = '@expenses';
const CATEGORIES_KEY = '@categories';

export const saveExpense = async (expense) => {
  try {
    const existingExpenses = await getExpenses();
    const newExpenses = [...existingExpenses, expense];
    await AsyncStorage.setItem(EXPENSES_KEY, JSON.stringify(newExpenses));
  } catch (error) {
    console.error('Error saving expense:', error);
  }
};

export const getExpenses = async () => {
  try {
    const expenses = await AsyncStorage.getItem(EXPENSES_KEY);
    return expenses ? JSON.parse(expenses) : [];
  } catch (error) {
    console.error('Error getting expenses:', error);
    return [];
  }
};

export const saveCategories = async (categories) => {
  try {
    await AsyncStorage.setItem(CATEGORIES_KEY, JSON.stringify(categories));
  } catch (error) {
    console.error('Error saving categories:', error);
  }
};

export const getCategories = async () => {
  try {
    const categories = await AsyncStorage.getItem(CATEGORIES_KEY);
    return categories ? JSON.parse(categories) : [];
  } catch (error) {
    console.error('Error getting categories:', error);
    return [];
  }
};

export const clearAllData = async () => {
  try {
    await AsyncStorage.removeItem(EXPENSES_KEY);
    await AsyncStorage.removeItem(CATEGORIES_KEY);
  } catch (error) {
    console.error('Error clearing data:', error);
  }
};