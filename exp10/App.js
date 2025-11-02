import React, { useEffect, useState } from "react";
import { View, Text, Button, FlatList, TextInput, Alert, StyleSheet } from "react-native";
import { db } from "./firebaseConfig";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc
} from "firebase/firestore";

export default function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");

  const usersCollection = collection(db, "users");

  // CREATE
  const addUser = async () => {
    if (!name || !email || !age) {
      Alert.alert("Fill all fields");
      return;
    }
    try {
      await addDoc(usersCollection, {
        name,
        email,
        age: Number(age)
      });
      setName(""); setEmail(""); setAge("");
      fetchUsers();
    } catch (e) {
      console.error("Add error:", e);
    }
  };

  // READ
  const fetchUsers = async () => {
    try {
      const querySnapshot = await getDocs(usersCollection);
      const list = querySnapshot.docs.map(d => ({ id: d.id, ...d.data() }));
      setUsers(list);
    } catch (e) {
      console.error("Fetch error:", e);
    }
  };

  // UPDATE - increases age by 1 for demo
  const updateUser = async (id, currentAge) => {
    try {
      const userRef = doc(db, "users", id);
      await updateDoc(userRef, { age: Number(currentAge) + 1 });
      fetchUsers();
    } catch (e) {
      console.error("Update error:", e);
    }
  };

  // DELETE
  const deleteUser = async (id) => {
    try {
      await deleteDoc(doc(db, "users", id));
      fetchUsers();
    } catch (e) {
      console.error("Delete error:", e);
    }
  };

  useEffect(() => { fetchUsers(); }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Firestore CRUD</Text>

      <TextInput placeholder="Name" value={name} onChangeText={setName} style={styles.input} />
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={styles.input} keyboardType="email-address" />
      <TextInput placeholder="Age" value={age} onChangeText={setAge} style={styles.input} keyboardType="numeric" />

      <Button title="Add User" onPress={addUser} />

      <FlatList
        data={users}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardText}>{item.name} — {item.email} — Age: {item.age}</Text>
            <View style={styles.row}>
              <Button title="Inc Age" onPress={() => updateUser(item.id, item.age)} />
              <View style={{ width: 10 }} />
              <Button title="Delete" color="red" onPress={() => deleteUser(item.id)} />
            </View>
          </View>
        )}
        contentContainerStyle={{ paddingBottom: 200 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, paddingTop: 40, flex: 1 },
  title: { fontSize: 22, marginBottom: 12 },
  input: { borderWidth: 1, padding: 8, marginBottom: 8, borderRadius: 4 },
  card: { padding: 12, borderWidth: 1, borderRadius: 6, marginTop: 12 },
  cardText: { marginBottom: 8 },
  row: { flexDirection: "row" }
});
