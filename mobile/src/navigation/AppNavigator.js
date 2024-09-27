// src/navigation/AppNavigator.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import TransactionForm from '../screens/TransactionForm';
import TransactionHistoryScreen from '../screens/TransactionHistoryScreen';
import CategoriesScreen from '../screens/CategoriesScreen';
import AccountsScreen from '../screens/AccountsScreen';
import PaymentMethodsScreen from '../screens/PaymentMethodsScreen';
import FrequenciesScreen from '../screens/FrequenciesScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{ title: 'HOLA' }} 
      />
      <Stack.Screen 
        name="TransactionForm" 
        component={TransactionForm} 
        options={{ title: 'Cargar Transacción' }} 
      />
      <Stack.Screen 
        name="TransactionHistory" 
        component={TransactionHistoryScreen} 
        options={{ title: 'Historial de Transacciones' }} 
      />
      <Stack.Screen 
        name="Categories" 
        component={CategoriesScreen} 
        options={{ title: 'Categorías' }} 
      />
      <Stack.Screen 
        name="Accounts" 
        component={AccountsScreen} 
        options={{ title: 'Cuentas' }} 
      />
      <Stack.Screen 
        name="PaymentMethods" 
        component={PaymentMethodsScreen} 
        options={{ title: 'Modos de Pago' }} 
      />
      <Stack.Screen 
        name="Frequencies" 
        component={FrequenciesScreen} 
        options={{ title: 'Frecuencias' }} 
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
