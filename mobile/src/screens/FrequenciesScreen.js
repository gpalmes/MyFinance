import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, FlatList, Text, StyleSheet } from 'react-native';
import { db } from '../firebaseConfig'; // Asegúrate de que la ruta sea correcta
import { collection, addDoc, onSnapshot, deleteDoc, doc, updateDoc } from 'firebase/firestore';

const FrequenciesScreen = () => {
  const [frequency, setFrequency] = useState('');
  const [frequencies, setFrequencies] = useState([]);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'frequencies'), (snapshot) => {
      const frequenciesData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setFrequencies(frequenciesData);
    });

    return () => unsubscribe();
  }, []);

  const addFrequency = async () => {
    if (frequency.trim()) {
      if (editingId) {
        await updateDoc(doc(db, 'frequencies', editingId), { name: frequency });
        setEditingId(null);
      } else {
        await addDoc(collection(db, 'frequencies'), { name: frequency });
      }
      setFrequency('');
    }
  };

  const deleteFrequency = async (id) => {
    await deleteDoc(doc(db, 'frequencies', id));
  };

  const editFrequency = (id, name) => {
    setEditingId(id);
    setFrequency(name);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Nueva frecuencia"
        value={frequency}
        onChangeText={setFrequency}
      />
      <Button title={editingId ? "Actualizar" : "Agregar"} onPress={addFrequency} />
      <FlatList
        data={frequencies}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item.name}</Text>
            <View style={styles.buttons}>
              <Button title="Editar" onPress={() => editFrequency(item.id, item.name)} />
              <Button title="Eliminar" onPress={() => deleteFrequency(item.id)} />
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

export default FrequenciesScreen;
