import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const FilterSection = ({ 
  categories, 
  selectedCategory, 
  setSelectedCategory, 
  sortBy, 
  setSortBy 
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Filters</Text>
      
      <View style={styles.filterRow}>
        <Text style={styles.label}>Category:</Text>
        <View style={styles.categoryButtons}>
          <TouchableOpacity
            style={[
              styles.filterButton,
              selectedCategory === 'All' && styles.activeFilterButton
            ]}
            onPress={() => setSelectedCategory('All')}
          >
            <Text style={[
              styles.filterButtonText,
              selectedCategory === 'All' && styles.activeFilterButtonText
            ]}>
              All
            </Text>
          </TouchableOpacity>
          
          {categories.map(category => (
            <TouchableOpacity
              key={category.id}
              style={[
                styles.filterButton,
                selectedCategory === category.name && styles.activeFilterButton
              ]}
              onPress={() => setSelectedCategory(category.name)}
            >
              <Text style={[
                styles.filterButtonText,
                selectedCategory === category.name && styles.activeFilterButtonText
              ]}>
                {category.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      
      <View style={styles.filterRow}>
        <Text style={styles.label}>Sort by:</Text>
        <View style={styles.sortButtons}>
          <TouchableOpacity
            style={[
              styles.filterButton,
              sortBy === 'date' && styles.activeFilterButton
            ]}
            onPress={() => setSortBy('date')}
          >
            <Text style={[
              styles.filterButtonText,
              sortBy === 'date' && styles.activeFilterButtonText
            ]}>
              Date
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[
              styles.filterButton,
              sortBy === 'amount' && styles.activeFilterButton
            ]}
            onPress={() => setSortBy('amount')}
          >
            <Text style={[
              styles.filterButtonText,
              sortBy === 'amount' && styles.activeFilterButtonText
            ]}>
              Amount
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  filterRow: {
    marginBottom: 12,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  categoryButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  sortButtons: {
    flexDirection: 'row',
  },
  filterButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'tomato',
    marginRight: 8,
    marginBottom: 8,
  },
  activeFilterButton: {
    backgroundColor: 'tomato',
  },
  filterButtonText: {
    color: 'tomato',
    fontSize: 12,
  },
  activeFilterButtonText: {
    color: 'white',
  },
});

export default FilterSection;