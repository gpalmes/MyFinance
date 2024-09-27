import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { db } from '../firebaseConfig';
import { collection, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { Picker } from '@react-native-picker/picker';

const TransactionHistoryScreen = () => {
  const [transactions, setTransactions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [updatedCategory, setUpdatedCategory] = useState('');
  const [updatedDescription, setUpdatedDescription] = useState('');
  const [updatedPaymentMethod, setUpdatedPaymentMethod] = useState('');
  const [updatedAmount, setUpdatedAmount] = useState('');

  useEffect(() => {
    fetchTransactions();
    fetchCategories();
    fetchPaymentMethods();
  }, []);

  const fetchTransactions = async () => {
    const transactionCollection = collection(db, 'transactions');
    const transactionSnapshot = await getDocs(transactionCollection);
    const transactionList = transactionSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setTransactions(transactionList);
  };

  const fetchCategories = async () => {
    const categoryCollection = collection(db, 'categories');
    const categorySnapshot = await getDocs(categoryCollection);
    const categoryList = categorySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setCategories(categoryList);
  };

  const fetchPaymentMethods = async () => {
    const paymentMethodCollection = collection(db, 'paymentMethods');
    const paymentMethodSnapshot = await getDocs(paymentMethodCollection);
    const paymentMethodList = paymentMethodSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setPaymentMethods(paymentMethodList);
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, 'transactions', id));
    fetchTransactions(); // Refresh the transaction list
  };

  const handleEdit = (transaction) => {
    setEditingTransaction(transaction.id);
    setUpdatedCategory(transaction.category);
    setUpdatedDescription(transaction.description);
    setUpdatedPaymentMethod(transaction.paymentMethod);
    setUpdatedAmount(transaction.amount.toString());
  };

  const handleSaveEdit = async (id) => {
    const transactionRef = doc(db, 'transactions', id);
    await updateDoc(transactionRef, {
      category: updatedCategory,
      description: updatedDescription,
      paymentMethod: updatedPaymentMethod,
      amount: parseFloat(updatedAmount),
      // Agregar también la fecha si deseas mantenerla
    });
    setEditingTransaction(null);
    fetchTransactions(); // Refresh the transaction list
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Historial de Transacciones</Text>
      <View style={styles.tableHeader}>
        <Text style={styles.headerText}>FECHA</Text>
        <Text style={styles.headerText}>CATEGORÍA</Text>
        <Text style={styles.headerText}>DESCRIPCIÓN</Text>
        <Text style={styles.headerText}>MÉTODO DE PAGO</Text>
        <Text style={styles.headerText}>MONTO</Text>
        <Text style={styles.headerText}>ACCIONES</Text>
      </View>
      {transactions.length === 0 ? (
        <Text>No hay transacciones disponibles</Text>
      ) : (
        <FlatList
          data={transactions}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.row}>
              <Text>{item.date.toDate().toLocaleString()}</Text>
              {editingTransaction === item.id ? (
                <>
                  <Picker
                    selectedValue={updatedCategory}
                    onValueChange={setUpdatedCategory}
                    style={styles.input}
                  >
                    {categories.map((category) => (
                      <Picker.Item key={category.id} label={category.name} value={category.name} />
                    ))}
                  </Picker>
                  <TextInput
                    value={updatedDescription}
                    onChangeText={setUpdatedDescription}
                    style={styles.input}
                  />
                  <Picker
                    selectedValue={updatedPaymentMethod}
                    onValueChange={setUpdatedPaymentMethod}
                    style={styles.input}
                  >
                    {paymentMethods.map((method) => (
                      <Picker.Item key={method.id} label={method.name} value={method.name} />
                    ))}
                  </Picker>
                  <TextInput
                    value={updatedAmount.toString()}
                    onChangeText={setUpdatedAmount}
                    style={styles.input}
                    keyboardType="numeric"
                  />
                  <Button title="Guardar" onPress={() => handleSaveEdit(item.id)} />
                </>
              ) : (
                <>
                  <Text>{item.category}</Text>
                  <Text>{item.description}</Text>
                  <Text>{item.paymentMethod}</Text>
                  <Text>{item.amount}</Text>
                  <TouchableOpacity onPress={() => handleEdit(item)}>
                    <Text style={styles.editButton}>Editar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => handleDelete(item.id)}>
                    <Text style={styles.deleteButton}>Eliminar</Text>
                  </TouchableOpacity>
                </>
              )}
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f2f2f2',
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderBottomWidth: 2,
    borderBottomColor: '#ccc',
  },
  headerText: {
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  input: {
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 5,
    padding: 5,
    flex: 1,
    marginHorizontal: 5,
  },
  editButton: {
    color: 'blue',
    marginLeft: 10,
  },
  deleteButton: {
    color: 'red',
    marginLeft: 10,
  },
});

export default TransactionHistoryScreen;
