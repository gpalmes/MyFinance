import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, FlatList, Text, StyleSheet } from 'react-native';
import { db } from '../firebaseConfig'; // Asegúrate de que la ruta sea correcta
import { collection, addDoc, onSnapshot, deleteDoc, doc, updateDoc } from 'firebase/firestore';

const CategoriesScreen = () => {
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'categories'), (snapshot) => {
      const categoriesData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setCategories(categoriesData);
    });

    return () => unsubscribe();
  }, []);

  const addCategory = async () => {
    if (category.trim()) {
      if (editingId) {
        await updateDoc(doc(db, 'categories', editingId), { name: category });
        setEditingId(null);
      } else {
        await addDoc(collection(db, 'categories'), { name: category });
      }
      setCategory('');
    }
  };

  const deleteCategory = async (id) => {
    await deleteDoc(doc(db, 'categories', id));
  };

  const editCategory = (id, name) => {
    setEditingId(id);
    setCategory(name);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Nueva categoría"
        value={category}
        onChangeText={setCategory}
      />
      <Button title={editingId ? "Actualizar" : "Agregar"} onPress={addCategory} />
      <FlatList
        data={categories}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item.name}</Text>
            <View style={styles.buttons}>
              <Button title="Editar" onPress={() => editCategory(item.id, item.name)} />
              <Button title="Eliminar" onPress={() => deleteCategory(item.id)} />
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

export default CategoriesScreen;
