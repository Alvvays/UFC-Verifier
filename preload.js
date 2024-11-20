const { contextBridge } = require('electron');
const Database = require('better-sqlite3');

const db = new Database('predictions.db', { verbose: console.log });

// Создаем таблицы при первом запуске
db.exec(`
  CREATE TABLE IF NOT EXISTS predictions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    date TEXT,
    sport TEXT DEFAULT 'UFC',
    event TEXT,
    prediction TEXT,
    stake REAL,
    odds REAL,
    bookmaker TEXT,
    profit REAL,
    result TEXT
  );
`);

contextBridge.exposeInMainWorld('db', {
  insertPrediction: (prediction) => {
    const stmt = db.prepare(`
      INSERT INTO predictions (date, event, prediction, stake, odds, bookmaker, profit, result)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);
    stmt.run(
      prediction.date,
      prediction.event,
      prediction.prediction,
      prediction.stake,
      prediction.odds,
      prediction.bookmaker,
      prediction.profit,
      prediction.result
    );
  },
  getPredictions: () => {
    return db.prepare('SELECT * FROM predictions ORDER BY date DESC').all();
  },
  getStatistics: () => {
    const stats = db.prepare(`
      SELECT 
        COUNT(*) AS totalBets,
        SUM(profit) AS totalProfit,
        AVG(stake) AS avgStake,
        MIN(profit) AS maxDrawdown
      FROM predictions
    `).get();

    const recentPredictions = db
      .prepare('SELECT * FROM predictions ORDER BY date DESC LIMIT 15')
      .all();

    return { stats, recentPredictions };
  },
});
