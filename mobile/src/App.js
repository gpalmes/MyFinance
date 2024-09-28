import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen'; // Ruta correcta
import TransactionHistoryScreen from './screens/TransactionHistoryScreen'; // Ruta correcta
import CategoriesScreen from './screens/CategoriesScreen'; // Ruta correcta
import TransactionForm from './screens/TransactionForm'; // Ruta correcta
import AccountsScreen from './screens/AccountsScreen'; // Asegúrate de que esta ruta sea correcta
import PaymentMethodsScreen from './screens/PaymentMethodsScreen'; // Asegúrate de que esta ruta sea correcta
import FrequenciesScreen from './screens/FrequenciesScreen'; // Asegúrate de que esta ruta sea correcta

const Stack = createStackNavigator();

const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="TransactionHistory" component={TransactionHistoryScreen} />
                <Stack.Screen name="Categories" component={CategoriesScreen} />
                <Stack.Screen name="TransactionForm" component={TransactionForm} />
				<Stack.Screen name="Accounts" component={AccountsScreen} />
				<Stack.Screen name="PaymentMethods" component={PaymentMethodsScreen} />
				<Stack.Screen name="Frequencies" component={FrequenciesScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;
