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

const renderForm = () => {
  app.innerHTML = `
    <h1 class="text-2xl font-bold mb-4">Add a Prediction</h1>
    <form id="predictionForm" class="space-y-4">
      <input type="text" name="event" placeholder="Event" class="block w-full" />
      <input type="text" name="prediction" placeholder="Prediction" class="block w-full" />
      <input type="number" name="stake" placeholder="Stake" class="block w-full" />
      <input type="number" name="odds" placeholder="Odds" class="block w-full" />
      <input type="text" name="bookmaker" placeholder="Bookmaker" class="block w-full" />
      <button type="submit" class="bg-blue-500 text-white py-2 px-4">Save</button>
    </form>
  `;

  document.getElementById('predictionForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const prediction = Object.fromEntries(formData);

    prediction.date = new Date().toISOString().split('T')[0];
    prediction.profit = 0;
    prediction.result = 'pending';

    await window.db.insertPrediction(prediction);
    renderStatistics();
  });
};

renderForm();

