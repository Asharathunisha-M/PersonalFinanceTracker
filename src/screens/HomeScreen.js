import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, SectionList, RefreshControl } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { getExpenses } from '../utils/storage';
import { groupByDate } from '../utils/dateUtils';
import { calculateTotals } from '../utils/calculations';
import ExpenseItem from '../components/ExpenseItem';
import TotalSummary from '../components/TotalSummary';
import FilterSection from '../components/FilterSection';
import SearchBar from '../components/SearchBar';
import { useRefresh } from '../contexts/RefreshContext';

const HomeScreen = ({ categories }) => {
  const [expenses, setExpenses] = useState([]);
  const [filteredExpenses, setFilteredExpenses] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('date');
  const [searchQuery, setSearchQuery] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const { refreshCount } = useRefresh();

  // Choose ONE of these approaches - remove the other:

  // APPROACH 1: Using RefreshContext (recommended)
  useEffect(() => {
    loadExpenses();
  }, [refreshCount]);

  // OR

  // APPROACH 2: Using useFocusEffect (alternative)
  // useFocusEffect(
  //   useCallback(() => {
  //     loadExpenses();
  //   }, [])
  // );

  const loadExpenses = async () => {
    setRefreshing(true);
    try {
      const loadedExpenses = await getExpenses();
      setExpenses(loadedExpenses);
    } catch (error) {
      console.error('Error loading expenses:', error);
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    filterAndSortExpenses();
  }, [expenses, selectedCategory, sortBy, searchQuery]);

  const filterAndSortExpenses = () => {
    let filtered = [...expenses];
    
    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(expense => expense.category === selectedCategory);
    }
    
    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(expense => 
        expense.note && expense.note.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Sort expenses
    filtered.sort((a, b) => {
      if (sortBy === 'date') {
        return new Date(b.date) - new Date(a.date);
      } else if (sortBy === 'amount') {
        return b.amount - a.amount;
      }
      return 0;
    });
    
    setFilteredExpenses(filtered);
  };

  const groupedExpenses = groupByDate(filteredExpenses);
  const sectionData = Object.keys(groupedExpenses).map(date => ({
    title: date,
    data: groupedExpenses[date]
  }));

  const { todayTotal, weekTotal, monthTotal } = calculateTotals(expenses);

  const renderSectionHeader = ({ section: { title } }) => (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionHeaderText}>{title}</Text>
    </View>
  );

  const renderItem = ({ item }) => (
    <ExpenseItem expense={item} categories={categories} />
  );

  const onRefresh = () => {
    loadExpenses();
  };

  return (
    <View style={styles.container}>
      <TotalSummary 
        todayTotal={todayTotal} 
        weekTotal={weekTotal} 
        monthTotal={monthTotal} 
      />
      
      <FilterSection
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />
      
      <SearchBar 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      
      <SectionList
        sections={sectionData}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
        style={styles.list}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['tomato']}
            tintColor={'tomato'}
          />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No expenses found</Text>
            <Text style={styles.emptySubText}>Add your first expense to get started!</Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  list: {
    flex: 1,
  },
  listContent: {
    padding: 16,
    flexGrow: 1,
  },
  sectionHeader: {
    backgroundColor: '#e5e5e5',
    padding: 12,
    marginTop: 16,
    borderRadius: 8,
    marginBottom: 8,
  },
  sectionHeaderText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#333',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#666',
    marginBottom: 8,
  },
  emptySubText: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
  },
});

export default HomeScreen;