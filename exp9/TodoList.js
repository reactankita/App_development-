// TodoList.js
import React, { useEffect, useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, FlatList,
  StyleSheet, Alert, Keyboard, ActivityIndicator
} from 'react-native';
import { getAllTodos, addTodo, deleteTodo, toggleTodo } from './db';

export default function TodoList() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  async function load() {
    try {
      setLoading(true);
      const rows = await getAllTodos();
      setTodos(rows);
    } catch (e) {
      console.warn('Load todos failed:', e);
      Alert.alert('Error', 'Could not load todos.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  async function handleAdd() {
    if (!text.trim()) return;
    try {
      setSaving(true);
      await addTodo(text.trim());
      setText('');
      Keyboard.dismiss();
      await load();
    } catch (e) {
      console.warn('Add todo error:', e);
      Alert.alert('Error', 'Could not add todo.');
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id) {
    try {
      await deleteTodo(id);
      await load();
    } catch (e) {
      console.warn('Delete error:', e);
      Alert.alert('Error', 'Could not delete todo.');
    }
  }

  async function handleToggle(item) {
    try {
      await toggleTodo(item.id, item.done ? 0 : 1);
      await load();
    } catch (e) {
      console.warn('Toggle error:', e);
      Alert.alert('Error', 'Could not update todo.');
    }
  }

  function renderItem({ item }) {
    return (
      <View style={styles.itemRow}>
        <TouchableOpacity onPress={() => handleToggle(item)} style={styles.checkbox}>
          <Text style={styles.checkboxText}>{item.done ? '✔' : ''}</Text>
        </TouchableOpacity>
        <Text style={[styles.title, item.done ? styles.doneText : null]}>{item.title}</Text>
        <TouchableOpacity onPress={() => handleDelete(item.id)} style={styles.deleteBtn}>
          <Text style={styles.deleteText}>Delete</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.wrap}>
      <View style={styles.addRow}>
        <TextInput
          style={styles.input}
          placeholder="Add todo"
          value={text}
          onChangeText={setText}
          onSubmitEditing={handleAdd}
          editable={!saving}
        />
        <TouchableOpacity onPress={handleAdd} style={styles.addBtn} disabled={saving}>
          {saving ? <ActivityIndicator /> : <Text style={styles.addBtnText}>Add</Text>}
        </TouchableOpacity>
      </View>

      {loading ? (
        <View style={styles.loading}><ActivityIndicator size="large" /></View>
      ) : (
        <FlatList
          data={todos}
          keyExtractor={(item) => item.id?.toString() ?? Math.random().toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
          ItemSeparatorComponent={() => <View style={styles.sep} />}
          ListEmptyComponent={() => <Text style={styles.empty}>No todos yet.</Text>}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { flex: 1, padding: 16 },
  addRow: { flexDirection: 'row', marginBottom: 12 },
  input: {
    flex: 1, borderWidth: 1, borderColor: '#ddd', padding: 10, borderRadius: 6
  },
  addBtn: {
    marginLeft: 8, backgroundColor: '#007AFF', paddingHorizontal: 14,
    justifyContent: 'center', borderRadius: 6
  },
  addBtnText: { color: '#fff', fontWeight: '600' },
  list: { paddingBottom: 24 },
  itemRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 10 },
  checkbox: {
    width: 32, height: 32, borderWidth: 1, borderColor: '#aaa', marginRight: 12,
    alignItems: 'center', justifyContent: 'center', borderRadius: 4
  },
  checkboxText: { fontSize: 18 },
  title: { flex: 1, fontSize: 16 },
  doneText: { textDecorationLine: 'line-through', color: '#888' },
  deleteBtn: { paddingHorizontal: 10 },
  deleteText: { color: '#d00' },
  sep: { height: 1, backgroundColor: '#f0f0f0' },
  empty: { textAlign: 'center', marginTop: 20, color: '#666' },
  loading: { flex: 1, justifyContent: 'center', alignItems: 'center' }
});
