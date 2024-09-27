import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, FlatList, Text, StyleSheet } from 'react-native';
import { db } from '../firebaseConfig'; // Asegúrate de que la ruta sea correcta
import { collection, addDoc, onSnapshot, deleteDoc, doc, updateDoc } from 'firebase/firestore';

const PaymentMethodsScreen = () => {
  const [method, setMethod] = useState('');
  const [methods, setMethods] = useState([]);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'paymentMethods'), (snapshot) => {
      const methodsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setMethods(methodsData);
    });

    return () => unsubscribe();
  }, []);

  const addMethod = async () => {
    if (method.trim()) {
      if (editingId) {
        await updateDoc(doc(db, 'paymentMethods', editingId), { name: method });
        setEditingId(null);
      } else {
        await addDoc(collection(db, 'paymentMethods'), { name: method });
      }
      setMethod('');
    }
  };

  const deleteMethod = async (id) => {
    await deleteDoc(doc(db, 'paymentMethods', id));
  };

  const editMethod = (id, name) => {
    setEditingId(id);
    setMethod(name);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Nuevo método de pago"
        value={method}
        onChangeText={setMethod}
      />
      <Button title={editingId ? "Actualizar" : "Agregar"} onPress={addMethod} />
      <FlatList
        data={methods}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item.name}</Text>
            <View style={styles.buttons}>
              <Button title="Editar" onPress={() => editMethod(item.id, item.name)} />
              <Button title="Eliminar" onPress={() => deleteMethod(item.id)} />
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    marginBottom: 10,
    padding: 8,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 5,
  },
  buttons: {
    flexDirection: 'row',
    gap: 10,
  },
});

export default PaymentMethodsScreen;
