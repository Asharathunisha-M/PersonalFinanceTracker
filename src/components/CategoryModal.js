import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, StyleSheet, Alert, ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { saveCategories } from '../utils/storage';

const CategoryModal = ({ isVisible, onClose, categories, setCategories }) => {
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newCategoryIcon, setNewCategoryIcon] = useState('help-circle');

  const handleAddCategory = async () => {
    if (!newCategoryName.trim()) {
      Alert.alert('Error', 'Please enter a category name');
      return;
    }

    if (categories.some(cat => cat.name.toLowerCase() === newCategoryName.toLowerCase())) {
      Alert.alert('Error', 'Category already exists');
      return;
    }

    const newCategory = {
      id: Date.now().toString(),
      name: newCategoryName.trim(),
      icon: newCategoryIcon,
    };

    const updatedCategories = [...categories, newCategory];
    setCategories(updatedCategories);
    await saveCategories(updatedCategories);
    
    setNewCategoryName('');
    setNewCategoryIcon('help-circle');
    onClose();
    
    Alert.alert('Success', 'Category added successfully');
  };

  const commonIcons = [
    'fast-food', 'car', 'cart', 'document-text', 'ellipsis-horizontal',
    'home', 'medical', 'book', 'cafe', 'airplane', 'train', 'bus',
    'film', 'gift', 'shirt', 'fitness', 'card', 'school', 'pizza',
    'beer', 'wine', 'musical-notes', 'cut', 'heart', 'star'
  ];

  return (
    <Modal
      visible={isVisible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Add New Category</Text>
          
          <TextInput
            style={styles.input}
            placeholder="Category Name"
            value={newCategoryName}
            onChangeText={setNewCategoryName}
          />
          
          <Text style={styles.iconLabel}>Select Icon:</Text>
          <ScrollView style={styles.iconScrollView}>
            <View style={styles.iconGrid}>
              {commonIcons.map(icon => (
                <TouchableOpacity
                  key={icon}
                  style={[
                    styles.iconButton,
                    newCategoryIcon === icon && styles.selectedIconButton
                  ]}
                  onPress={() => setNewCategoryIcon(icon)}
                >
                  <Ionicons 
                    name={icon} 
                    size={24} 
                    color={newCategoryIcon === icon ? 'white' : 'tomato'} 
                  />
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
          
          <View style={styles.modalButtons}>
            <TouchableOpacity 
              style={[styles.modalButton, styles.cancelButton]}
              onPress={onClose}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.modalButton, styles.addButton]}
              onPress={handleAddCategory}
            >
              <Text style={styles.addButtonText}>Add Category</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    width: '90%',
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 16,
  },
  iconLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  iconScrollView: {
    maxHeight: 200,
    marginBottom: 20,
  },
  iconGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  iconButton: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    borderWidth: 1,
    borderColor: 'tomato',
    margin: 4,
  },
  selectedIconButton: {
    backgroundColor: 'tomato',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  modalButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginLeft: 12,
  },
  cancelButton: {
    backgroundColor: '#e5e5e5',
  },
  cancelButtonText: {
    color: '#333',
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: 'tomato',
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default CategoryModal;