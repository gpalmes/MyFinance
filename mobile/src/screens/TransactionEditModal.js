import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, TextInput, Modal } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { db } from '../firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

const TransactionEditModal = ({ visible, onClose, transaction, onUpdate }) => {
  const [categories, setCategories] = useState([]);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [description, setDescription] = useState('');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const [amount, setAmount] = useState('');

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

  useEffect(() => {
    if (transaction) {
      setSelectedCategory(transaction.category);
      setDescription(transaction.description);
      setSelectedPaymentMethod(transaction.paymentMethod);
      setAmount(transaction.amount.toString());
    }
  }, [transaction]);

  const handleUpdate = () => {
    const updatedTransaction = {
      id: transaction.id,
      date: transaction.date, // Mantén la fecha original
      category: selectedCategory,
      description,
      paymentMethod: selectedPaymentMethod,
      amount: parseFloat(amount),
    };
    onUpdate(updatedTransaction);
  };

  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.modalContainer}>
        <Text style={styles.title}>Editar Transacción</Text>
        
        <Text>Categoría:</Text>
        <Picker
          selectedValue={selectedCategory}
          onValueChange={(itemValue) => setSelectedCategory(itemValue)}
          style={styles.input}
        >
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
        
        <Button title="Actualizar" onPress={handleUpdate} />
        <Button title="Cancelar" onPress={onClose} color="red" />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
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
});

export default TransactionEditModal;
