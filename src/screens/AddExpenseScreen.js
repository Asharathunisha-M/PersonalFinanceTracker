import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert, Platform } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { saveExpense } from '../utils/storage';
import CategoryModal from '../components/CategoryModal';
import { useRefresh } from '../contexts/RefreshContext'; // Import the hook

const AddExpenseScreen = ({ navigation, categories, setCategories }) => {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState(categories[0]?.name || '');
  const [note, setNote] = useState('');
  const [isCategoryModalVisible, setCategoryModalVisible] = useState(false);
  const [showWebPicker, setShowWebPicker] = useState(false);
  const { refresh } = useRefresh();
  const handleAddExpense = async () => {
    if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
      Alert.alert('Error', 'Please enter a valid amount');
      return;
    }

    if (!category) {
      Alert.alert('Error', 'Please select a category');
      return;
    }

    const newExpense = {
      id: Date.now().toString(),
      amount: parseFloat(amount),
      category,
      note,
      date: new Date().toISOString(),
    };

    await saveExpense(newExpense);
    
    // Reset form
    setAmount('');
    setNote('');
    setCategory(categories[0]?.name || '');
    refresh();
    Alert.alert('Success', 'Expense added successfully');
    
    // Navigate back to HomeScreen which will automatically refresh
    if (navigation) {
      navigation.navigate('Home');
    }
  };

  // For web, we'll use a custom dropdown-like UI
  const renderWebCategorySelector = () => (
    <View>
      <TouchableOpacity 
        style={styles.webPickerButton}
        onPress={() => setShowWebPicker(!showWebPicker)}
      >
        <Text style={styles.webPickerText}>{category || 'Select a category'}</Text>
        <Ionicons name={showWebPicker ? 'chevron-up' : 'chevron-down'} size={20} color="#666" />
      </TouchableOpacity>
      
      {showWebPicker && (
        <View style={styles.webPickerOptions}>
          {categories.map((cat) => (
            <TouchableOpacity
              key={cat.id}
              style={styles.webPickerOption}
              onPress={() => {
                setCategory(cat.name);
                setShowWebPicker(false);
              }}
            >
              <Text>{cat.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );

  // For native, use the standard Picker
  const renderNativeCategorySelector = () => (
    <View style={styles.pickerContainer}>
      <Picker
        selectedValue={category}
        onValueChange={setCategory}
        style={styles.picker}
      >
        {categories.map((cat) => (
          <Picker.Item key={cat.id} label={cat.name} value={cat.name} />
        ))}
      </Picker>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Add New Expense</Text>
      
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Amount</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter amount"
          keyboardType="numeric"
          value={amount}
          onChangeText={setAmount}
        />
      </View>
      
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Category</Text>
        {Platform.OS === 'web' ? renderWebCategorySelector() : renderNativeCategorySelector()}
        <TouchableOpacity 
          style={styles.addCategoryButton}
          onPress={() => setCategoryModalVisible(true)}
        >
          <Ionicons name="add" size={20} color="white" />
          <Text style={styles.addCategoryText}>Add New Category</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Note (Optional)</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Add a note"
          multiline
          numberOfLines={3}
          value={note}
          onChangeText={setNote}
        />
      </View>
      
      <TouchableOpacity style={styles.addButton} onPress={handleAddExpense}>
        <Text style={styles.addButtonText}>Add Expense</Text>
      </TouchableOpacity>
      
      <CategoryModal
        isVisible={isCategoryModalVisible}
        onClose={() => setCategoryModalVisible(false)}
        categories={categories}
        setCategories={setCategories}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 10,
    overflow: 'hidden',
  },
  picker: {
    height: 50,
  },
  webPickerButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
  },
  webPickerText: {
    fontSize: 16,
  },
  webPickerOptions: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 10,
    maxHeight: 200,
    overflow: 'scroll',
  },
  webPickerOption: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  addCategoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'tomato',
    padding: 12,
    borderRadius: 8,
  },
  addCategoryText: {
    color: 'white',
    fontWeight: 'bold',
    marginLeft: 8,
  },
  addButton: {
    backgroundColor: 'tomato',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default AddExpenseScreen;