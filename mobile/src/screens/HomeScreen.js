// src/screens/HomeScreen.js
import React from 'react';
import { View, Button, StyleSheet } from 'react-native';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Button
        title="Cargar Transacción"
        onPress={() => navigation.navigate('TransactionForm')}
      />
      <Button
        title="Ver Historial"
        onPress={() => navigation.navigate('TransactionHistory')}
      />
      <Button
        title="Categorías"
        onPress={() => navigation.navigate('Categories')}
      />
      <Button
        title="Cuentas"
        onPress={() => navigation.navigate('Accounts')}
      />
      <Button
        title="Modos de Pago"
        onPress={() => navigation.navigate('PaymentMethods')}
      />
      <Button
        title="Frecuencias"
        onPress={() => navigation.navigate('Frequencies')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
});

export default HomeScreen;
