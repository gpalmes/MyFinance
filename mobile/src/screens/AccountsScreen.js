import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, FlatList, Text, StyleSheet } from 'react-native';
import { db } from '../firebaseConfig'; // Asegúrate de que la ruta sea correcta
import { collection, addDoc, onSnapshot, deleteDoc, doc, updateDoc } from 'firebase/firestore';

const AccountsScreen = () => {
  const [account, setAccount] = useState('');
  const [accounts, setAccounts] = useState([]);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'accounts'), (snapshot) => {
      const accountsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setAccounts(accountsData);
    });

    return () => unsubscribe();
  }, []);

  const addAccount = async () => {
    if (account.trim()) {
      if (editingId) {
        await updateDoc(doc(db, 'accounts', editingId), { name: account });
        setEditingId(null);
      } else {
        await addDoc(collection(db, 'accounts'), { name: account });
      }
      setAccount('');
    }
  };

  const deleteAccount = async (id) => {
    await deleteDoc(doc(db, 'accounts', id));
  };

  const editAccount = (id, name) => {
    setEditingId(id);
    setAccount(name);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Nueva cuenta"
        value={account}
        onChangeText={setAccount}
      />
      <Button title={editingId ? "Actualizar" : "Agregar"} onPress={addAccount} />
      <FlatList
        data={accounts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item.name}</Text>
            <View style={styles.buttons}>
              <Button title="Editar" onPress={() => editAccount(item.id, item.name)} />
              <Button title="Eliminar" onPress={() => deleteAccount(item.id)} />
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

export default AccountsScreen;
