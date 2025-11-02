// db.js
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('todos.db');

function runSql(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        sql,
        params,
        (_, result) => resolve(result),
        (_, err) => { reject(err); return false; }
      );
    }, (txErr) => reject(txErr));
  });
}

export async function initDB() {
  // create table if not exists
  await runSql(
    `CREATE TABLE IF NOT EXISTS todos (
      id INTEGER PRIMARY KEY NOT NULL,
      title TEXT NOT NULL,
      done INTEGER NOT NULL DEFAULT 0,
      created_at DATETIME DEFAULT (datetime('now','localtime'))
    );`
  );
}

export async function getAllTodos() {
  const res = await runSql('SELECT * FROM todos ORDER BY created_at DESC;');
  const rows = [];
  for (let i = 0; i < res.rows.length; i++) {
    rows.push(res.rows.item(i));
  }
  return rows;
}

export async function addTodo(title) {
  const res = await runSql('INSERT INTO todos (title, done) VALUES (?, 0);', [title]);
  // sqlite returns insertId in res.insertId on some platforms; safe return is to fetch last row
  const id = res.insertId ?? null;
  return id;
}

export async function deleteTodo(id) {
  await runSql('DELETE FROM todos WHERE id = ?;', [id]);
}

export async function toggleTodo(id, done) {
  await runSql('UPDATE todos SET done = ? WHERE id = ?;', [done ? 1 : 0, id]);
}

export async function updateTodoTitle(id, title) {
  await runSql('UPDATE todos SET title = ? WHERE id = ?;', [title, id]);
}
