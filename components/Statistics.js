import React, { useState, useEffect } from "react";
import database from "../utils/database";

const Statistics = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      const result = await database.all(
        `
        SELECT 
          COUNT(*) as totalPredictions, 
          SUM(CASE WHEN profit > 0 THEN 1 ELSE 0 END) as won,
          SUM(CASE WHEN profit < 0 THEN 1 ELSE 0 END) as lost,
          SUM(stake) as totalStake,
          SUM(profit) as totalProfit
        FROM predictions
        `
      );
      setStats(result[0]);
    };
    fetchStats();
  }, []);

  if (!stats) return <div>Загрузка статистики...</div>;

  return (
    <div className="statistics">
      <h2>Статистика</h2>
      <ul>
        <li>Всего прогнозов: {stats.totalPredictions}</li>
        <li>Выиграно: {stats.won}</li>
        <li>Проиграно: {stats.lost}</li>
        <li>Чистая прибыль: {stats.totalProfit} ед.</li>
        <li>Общий оборот: {stats.totalStake} ед.</li>
      </ul>
    </div>
  );
};

export default Statistics;
