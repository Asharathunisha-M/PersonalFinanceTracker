import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Alert, Modal } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { clearAllData, saveCategories } from '../utils/storage';
import CategoryModal from '../components/CategoryModal';

const SettingsScreen = ({ categories, setCategories }) => {
  const [isCategoryModalVisible, setCategoryModalVisible] = useState(false);
  const [isConfirmModalVisible, setConfirmModalVisible] = useState(false);

  const handleClearData = async () => {
    try {
      await clearAllData();
      // Reset to default categories
      const defaultCategories = [
        { id: '1', name: 'Food', icon: 'fast-food' },
        { id: '2', name: 'Transport', icon: 'car' },
        { id: '3', name: 'Shopping', icon: 'cart' },
        { id: '4', name: 'Bills', icon: 'document-text' },
        { id: '5', name: 'Other', icon: 'ellipsis-horizontal' }
      ];
      setCategories(defaultCategories);
      await saveCategories(defaultCategories);
      setConfirmModalVisible(false);
      Alert.alert('Success', 'All data has been cleared');
    } catch (error) {
      console.error('Error clearing data:', error);
      Alert.alert('Error', 'Failed to clear data');
    }
  };

  const showConfirmDialog = () => {
    setConfirmModalVisible(true);
  };

  const renderCategoryItem = ({ item }) => (
    <View style={styles.categoryItem}>
      <Ionicons 
        name={item.icon || 'help-circle-outline'} 
        size={24} 
        color="tomato" 
      />
      <Text style={styles.categoryName}>{item.name}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Categories</Text>
        <FlatList
          data={categories}
          renderItem={renderCategoryItem}
          keyExtractor={item => item.id}
          style={styles.categoryList}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No categories found</Text>
            </View>
          }
        />
        <TouchableOpacity 
          style={styles.addCategoryButton}
          onPress={() => setCategoryModalVisible(true)}
        >
          <Ionicons name="add" size={20} color="white" />
          <Text style={styles.addCategoryText}>Add New Category</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Danger Zone</Text>
        <TouchableOpacity 
          style={styles.clearButton}
          onPress={showConfirmDialog}
        >
          <Ionicons name="trash" size={20} color="white" />
          <Text style={styles.clearButtonText}>Clear All Data</Text>
        </TouchableOpacity>
      </View>
      
      <CategoryModal
        isVisible={isCategoryModalVisible}
        onClose={() => setCategoryModalVisible(false)}
        categories={categories}
        setCategories={setCategories}
      />
      
      <Modal
        visible={isConfirmModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setConfirmModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Confirm Clear Data</Text>
            <Text style={styles.modalMessage}>
              Are you sure you want to clear all data? This action cannot be undone.
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity 
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setConfirmModalVisible(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.modalButton, styles.confirmButton]}
                onPress={handleClearData}
              >
                <Text style={styles.confirmButtonText}>Clear All</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  section: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
  },
  categoryList: {
    maxHeight: 200,
    marginBottom: 12,
  },
  categoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  categoryName: {
    marginLeft: 12,
    fontSize: 16,
    color: '#333',
  },
  emptyContainer: {
    padding: 20,
    alignItems: 'center',
  },
  emptyText: {
    color: '#666',
    fontStyle: 'italic',
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
    fontSize: 14,
  },
  clearButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ff3b30',
    padding: 12,
    borderRadius: 8,
  },
  clearButtonText: {
    color: 'white',
    fontWeight: 'bold',
    marginLeft: 8,
    fontSize: 14,
  },
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
    width: '80%',
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
    textAlign: 'center',
  },
  modalMessage: {
    fontSize: 16,
    marginBottom: 20,
    lineHeight: 22,
    color: '#666',
    textAlign: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: '#e5e5e5',
  },
  cancelButtonText: {
    color: '#333',
    fontWeight: 'bold',
  },
  confirmButton: {
    backgroundColor: '#ff3b30',
  },
  confirmButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default SettingsScreen;