import sqlite3 from "sqlite3";
import { open } from "sqlite";

const initDatabase = async () => {
  const db = await open({
    filename: "./predictions.db",
    driver: sqlite3.Database,
  });

  // Создание таблицы, если её ещё нет
  await db.exec(`
    CREATE TABLE IF NOT EXISTS predictions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      event TEXT,
      prediction TEXT,
      stake REAL,
      odds REAL,
      bookmaker TEXT,
      event_date TEXT,
      profit REAL DEFAULT 0
    )
  `);

  return db;
};

export default initDatabase();
