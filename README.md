# Personal Finance Tracker 💰

A React Native mobile application for tracking personal expenses with data persistence using AsyncStorage.

## Features

### ✅ Core Requirements
- **Add Expenses**: Amount, category dropdown, optional notes
- **Expense List**: Grouped by date with Today/Week/Month totals
- **Categories**: Predefined + user-added categories with persistence
- **Filtering & Sorting**: By category and amount/date
- **Search**: Find expenses by notes
- **Settings**: Manage categories and clear all data

### 📱 Screens
1. **Home/Overview**: Expense list with summaries
2. **Add Expense**: Form for new expenses
3. **Settings**: Category management and data controls

## Installation & Setup

### Prerequisites
- Node.js and npm
- Expo CLI (`npm install -g expo-cli`)
- Expo Go app on your mobile device

### Installation
```bash
# Clone the repository
git clone <your-repo-url>
cd PersonalFinanceTracker

# Install dependencies
npm install

# Start the development server
npm start


Dependencies
json
{
  "@react-navigation/native": "^7.x",
  "@react-navigation/bottom-tabs": "^7.x",
  "@react-native-async-storage/async-storage": "^2.x",
  "react-native-vector-icons": "^10.x",
  "react-native-modal": "^14.x"
}


Usage
Adding Expenses: Tap "Add Expense", enter amount, select category, add optional note

Viewing Expenses: Home screen shows expenses grouped by date

Filtering: Use category filters and sort options

Search: Use search bar to find expenses by notes

Managing Categories: Add new categories in Settings

Demo Video Contents 📹
The demo video shows:

✅ Adding multiple expenses with different categories

✅ Viewing the grouped expense list

✅ Using category filters and sorting

✅ Searching expenses by notes

✅ Viewing automatic totals (Today, This Week, This Month)

✅ Adding new custom categories

✅ Clearing all data with confirmation

Technical Implementation
Data Persistence
Uses AsyncStorage for local data persistence

Stores expenses and categories separately

Automatic data loading on app start

Navigation
React Navigation with Bottom Tabs

Three main screens with proper routing

State Management
React Context for cross-component refresh triggers

Local state management for UI interactions

Bonus Features (Optional)
Charts for spending visualization

Budget setting and tracking

Data export functionality

Recurring expenses

Multiple currency support

Contributing
Fork the repository

Create a feature branch

Commit your changes

Push to the branch

Create a Pull Request

License
MIT License - feel free to use this project for learning purposes!

text

## 🎥 Demo Video Checklist

Record a screen recording showing:

### 1. **Adding Expenses** (30 seconds)
- Tap "Add Expense" tab
- Enter amount: "25.50"
- Select category: "Food"
- Add note: "Lunch at cafe"
- Tap "Add Expense"
- Show success message

### 2. **Viewing Grouped List** (20 seconds)
- Go to Home tab
- Show expense grouped by date
- Point out Today/Week/Month totals

### 3. **Filters & Search** (30 seconds)
- Filter by "Food" category
- Change sort to "Amount (High to Low)"
- Search for "lunch" in notes
- Show filtered results

### 4. **Category Management** (20 seconds)
- Go to Settings
- Show existing categories
- Add a new category: "Entertainment" with fun icon

### 5. **Data Management** (15 seconds)
- Show "Clear All Data" option
- Demonstrate confirmation dialog
- Show empty state after clearing

## 📦 Final Steps Before Submission

1. **Test Everything**
   ```bash
   npm start
