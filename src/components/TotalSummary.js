import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const TotalSummary = ({ todayTotal, weekTotal, monthTotal }) => {
  return (
    <View style={styles.container}>
      <View style={styles.summaryItem}>
        <Text style={styles.summaryLabel}>Today</Text>
        <Text style={styles.summaryAmount}>${todayTotal.toFixed(2)}</Text>
      </View>
      
      <View style={styles.summaryItem}>
        <Text style={styles.summaryLabel}>This Week</Text>
        <Text style={styles.summaryAmount}>${weekTotal.toFixed(2)}</Text>
      </View>
      
      <View style={styles.summaryItem}>
        <Text style={styles.summaryLabel}>This Month</Text>
        <Text style={styles.summaryAmount}>${monthTotal.toFixed(2)}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    padding: 16,
  },
  summaryItem: {
    alignItems: 'center',
  },
  summaryLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  summaryAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'tomato',
  },
});

export default TotalSummary;