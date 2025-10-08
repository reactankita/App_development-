import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

export default function App() {
  const [text, setText] = useState('');
  const [todos, setTodos] = useState([]);

  const addTodo = () => {
    if (!text.trim()) return;
    setTodos(prev => [{ id: Date.now().toString(), text: text.trim(), done: false }, ...prev]);
    setText('');
  };

  const toggleTodo = (id) => {
    setTodos(prev => prev.map(t => (t.id === id ? { ...t, done: !t.done } : t)));
  };

  const removeTodo = (id) => {
    setTodos(prev => prev.filter(t => t.id !== id));
  };

  const renderItem = ({ item }) => (
    <View style={styles.todoRow}>
      <TouchableOpacity onPress={() => toggleTodo(item.id)} style={{ flex: 1 }}>
        <Text style={[styles.todoText, item.done && styles.todoDone]}>{item.text}</Text>
      </TouchableOpacity>
      <Button title="X" onPress={() => removeTodo(item.id)} />
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My To‑Do List</Text>
      <View style={styles.inputRow}>
        <TextInput
          value={text}
          onChangeText={setText}
          placeholder="Type a task"
          style={styles.input}
        />
        <Button title="Add" onPress={addTodo} />
      </View>

      <FlatList
        data={todos}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListEmptyComponent={<Text style={styles.empty}>No tasks yet — add one!</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, paddingTop: 60, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 12 },
  inputRow: { flexDirection: 'row', marginBottom: 12, alignItems: 'center' },
  input: { flex: 1, borderColor: '#ccc', borderWidth: 1, padding: 8, marginRight: 8, borderRadius: 6 },
  todoRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 8, borderBottomColor: '#eee', borderBottomWidth: 1 },
  todoText: { fontSize: 16 },
  todoDone: { textDecorationLine: 'line-through', color: '#999' },
  empty: { color: '#666', marginTop: 20 }
});
