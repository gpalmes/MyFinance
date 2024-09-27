import React from 'react';
import { View, Text, StyleSheet, FlatList, Button } from 'react-native';

const TransactionItems = ({ transactions, onDeleteTransaction }) => {
  const renderItem = ({ item }) => (
    <View style={styles.transactionItem}>
      <Text style={styles.transactionText}>Descripción: {item.description}</Text>
      <Text style={styles.transactionText}>Categoría: {item.category}</Text>
      <Text style={styles.transactionText}>Monto: ${item.amount}</Text>
      <Button title="Eliminar" onPress={() => onDeleteTransaction(item.id)} />
    </View>
  );

  return (
    <View>
      {transactions.length === 0 ? (
        <Text>No hay transacciones disponibles.</Text>
      ) : (
        <FlatList
          data={transactions}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  transactionItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  transactionText: {
    fontSize: 16,
  },
});

export default TransactionItems;
