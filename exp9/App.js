// App.js
import React, { useEffect } from 'react';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import TodoList from './TodoList';
import { initDB } from './db';

export default function App() {
  useEffect(() => {
    (async () => {
      try {
        await initDB();
      } catch (e) {
        console.warn('DB init error:', e);
      }
    })();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <TodoList />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
