const app = document.getElementById('app');

// Функция отображения статистики
const renderStatistics = async () => {
  const { stats, recentPredictions } = await window.db.getStatistics();

  app.innerHTML = `
    <h1 class="text-2xl font-bold mb-4">UFC Predictions Dashboard</h1>
    <div class="mb-6">
      <h2 class="text-xl">Summary</h2>
      <ul>
        <li>Total Bets: ${stats.totalBets}</li>
        <li>Total Profit: ${stats.totalProfit.toFixed(2)}</li>
        <li>Average Stake: ${stats.avgStake.toFixed(2)}</li>
        <li>Max Drawdown: ${stats.maxDrawdown.toFixed(2)}</li>
      </ul>
    </div>
    <div>
      <h2 class="text-xl">Recent Predictions</h2>
      <table class="table-auto w-full">
        <thead>
          <tr>
            <th>Date</th>
            <th>Event</th>
            <th>Prediction</th>
            <th>Stake</th>
            <th>Odds</th>
            <th>Profit</th>
            <th>Result</th>
          </tr>
        </thead>
        <tbody>
          ${recentPredictions
            .map(
              (p) => `
            <tr>
              <td>${p.date}</td>
              <td>${p.event}</td>
              <td>${p.prediction}</td>
              <td>${p.stake}</td>
              <td>${p.odds}</td>
              <td>${p.profit}</td>
              <td>${p.result}</td>
            </tr>
          `
            )
            .join('')}
        </tbody>
      </table>
    </div>
  `;
};

// Запуск приложения
renderStatistics();
