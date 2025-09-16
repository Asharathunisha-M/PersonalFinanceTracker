import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ExpenseItem = ({ expense, categories }) => {
  const category = categories.find(cat => cat.name === expense.category);
  
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Ionicons 
          name={category?.icon || 'help-circle'} 
          size={24} 
          color="tomato" 
        />
      </View>
      <View style={styles.details}>
        <Text style={styles.category}>{expense.category}</Text>
        {expense.note ? <Text style={styles.note}>{expense.note}</Text> : null}
      </View>
      <Text style={styles.amount}>${expense.amount.toFixed(2)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    borderRadius: 8,
    marginBottom: 8,
  },
  iconContainer: {
    marginRight: 12,
  },
  details: {
    flex: 1,
  },
  category: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  note: {
    color: '#666',
    marginTop: 4,
  },
  amount: {
    fontWeight: 'bold',
    fontSize: 16,
    color: 'tomato',
  },
});

export default ExpenseItem;