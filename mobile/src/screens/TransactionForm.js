import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, ScrollView, TextInput } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { db } from '../firebaseConfig'; // Asegúrate de que la ruta es correcta
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { Timestamp } from 'firebase/firestore'; // Asegúrate de importar Timestamp

const TransactionForm = () => {
  const [categories, setCategories] = useState([]);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [description, setDescription] = useState('');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');

  // Fetch categories from Firestore
  const fetchCategories = async () => {
    try {
      const categoryCollection = collection(db, 'categories');
      const categorySnapshot = await getDocs(categoryCollection);
      const categoryList = categorySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setCategories(categoryList);
    } catch (error) {
      console.error("Error fetching categories: ", error);
    }
  };

  // Fetch payment methods from Firestore
  const fetchPaymentMethods = async () => {
    try {
      const paymentMethodCollection = collection(db, 'paymentMethods');
      const paymentMethodSnapshot = await getDocs(paymentMethodCollection);
      const paymentMethodList = paymentMethodSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setPaymentMethods(paymentMethodList);
    } catch (error) {
      console.error("Error fetching payment methods: ", error);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchPaymentMethods();
  }, []);

  const handleSubmit = async () => {
    const transactionData = {
      date: Timestamp.now(), // Guardar la fecha y hora actuales
      category: selectedCategory,
      description: description,
      paymentMethod: selectedPaymentMethod,
      amount: parseFloat(amount),
    };

    try {
      await addDoc(collection(db, 'transactions'), transactionData);
      setMessage(`CARGA EXITOSA: Fecha: ${transactionData.date.toDate().toLocaleString()}, Categoría: ${selectedCategory}, Descripción: ${description}, Monto: ${amount}`);
      setSelectedCategory('');
      setDescription('');
      setSelectedPaymentMethod('');
      setAmount('');
    } catch (error) {
      console.error("Error adding transaction: ", error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Cargar Transacción</Text>
      
      <Text>Categoría:</Text>
      <Picker
        selectedValue={selectedCategory}
        onValueChange={(itemValue) => setSelectedCategory(itemValue)}
        style={styles.input}
      >
        <Picker.Item label="Selecciona una categoría" value="" />
        {categories.map((category) => (
          <Picker.Item key={category.id} label={category.name} value={category.name} />
        ))}
      </Picker>
      
      <Text>Descripción:</Text>
      <TextInput
        style={styles.input}
        value={description}
        onChangeText={setDescription}
        placeholder="Descripción"
      />
      
      <Text>Medio de Pago:</Text>
      <Picker
        selectedValue={selectedPaymentMethod}
        onValueChange={(itemValue) => setSelectedPaymentMethod(itemValue)}
        style={styles.input}
      >
        <Picker.Item label="Selecciona un medio de pago" value="" />
        {paymentMethods.map((method) => (
          <Picker.Item key={method.id} label={method.name} value={method.name} />
        ))}
      </Picker>
      
      <Text>Monto:</Text>
      <TextInput
        style={styles.input}
        value={amount}
        onChangeText={setAmount}
        placeholder="Monto"
        keyboardType="numeric"
      />
      
      <Button title="Guardar" onPress={handleSubmit} />
      
      {message ? <Text style={styles.successMessage}>{message}</Text> : null}
    </ScrollView>
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
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
  },
  successMessage: {
    marginTop: 20,
    color: 'green',
    fontWeight: 'bold',
  },
});

export default TransactionForm;
