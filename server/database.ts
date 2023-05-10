import mysql from "mysql2";
import dotenv from "dotenv";
dotenv.config();

const pool = mysql
  .createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB,
  })
  .promise();

export async function getTodosByID(id: any) {
  const [rows] = await pool.query(
    `
    SELECT todos.*, shared_todos.shared_with_id
    FROM todos
    LEFT JOIN shared_todos ON todos.id = shared_todos.todo_id
    WHERE todos.user_id = ? OR shared_todos.shared_with_id = ?
  `,
    [id, id]
  );
  return rows;
}

export async function getTodo(id: any) {
  const [rows] = await pool.query(`SELECT * FROM todos WHERE id = ?`, [id]);
  return rows[0];
}

export async function getSharedTodoByID(id: string) {
  const [rows] = await pool.query(
    `SELECT * FROM shared_todos WHERE todo_id = ?`,
    [id]
  );
  return rows[0];
}

export async function getUserByID(id: string) {
  const [rows] = await pool.query(`SELECT * FROM users WHERE id = ?`, [id]);
  return rows[0];
}

export async function getUserByEmail(email: any) {
  const [rows] = await pool.query(`SELECT * FROM users WHERE email = ?`, [
    email,
  ]);
  // console.log(rows[0]);
  return rows[0];
}

export async function createTodo(user_id: any, title: any) {
  const [result] = await pool.query(
    `
    INSERT INTO todos (user_id, title)
    VALUES (?, ?)
  `,
    [user_id, title]
  );
  const todoID = result.insertId;
  return getTodo(todoID);
}

export async function deleteTodo(id: string) {
  const [result] = await pool.query(
    `
    DELETE FROM todos WHERE id = ?;
    `,
    [id]
  );
  return result;
}

export async function toggleCompleted(id: string, value: boolean) {
  const newValue = value === true ? "TRUE" : "FALSE";
  const [result] = await pool.query(
    `
    UPDATE todos
    SET completed = ${newValue}
    WHERE id = ?;
    `,
    [id]
  );
  return result;
}

export async function shareTodo(todo_id: any, user_id: any, shared_with_id: any) {
  const [result] = await pool.query(
    `
    INSERT INTO shared_todos (todo_id, user_id, shared_with_id)
    VALUES (?, ?, ?);
    `,
    [todo_id, user_id, shared_with_id]
  );
  return result.insertId;
}
/**
 * Tests for development
 */
// console.log(await createTodo("test", "test"));

// const todos = await getTodos();
// console.log(todos);

// const todoByID = await getTodo(2);
// console.log(todoByID);

// await deleteTodo(2);

// await shareTodo(13, 2, 1);
