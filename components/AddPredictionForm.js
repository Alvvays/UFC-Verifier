import React, { useState } from "react";
import database from "../utils/database";

const AddPredictionForm = () => {
  const [formData, setFormData] = useState({
    event: "",
    prediction: "",
    stake: "",
    odds: "",
    bookmaker: "",
    eventDate: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { event, prediction, stake, odds, bookmaker, eventDate } = formData;

    // Добавление данных в SQLite
    await database.run(
      `
      INSERT INTO predictions (event, prediction, stake, odds, bookmaker, event_date)
      VALUES (?, ?, ?, ?, ?, ?)`,
      [event, prediction, stake, odds, bookmaker, eventDate]
    );

    alert("Прогноз добавлен!");
    setFormData({
      event: "",
      prediction: "",
      stake: "",
      odds: "",
      bookmaker: "",
      eventDate: "",
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Добавить прогноз</h2>
      <div>
        <label htmlFor="event">Событие:</label>
        <input
          type="text"
          id="event"
          name="event"
          value={formData.event}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="prediction">Прогноз:</label>
        <input
          type="text"
          id="prediction"
          name="prediction"
          value={formData.prediction}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="stake">Ставка (ед.):</label>
        <input
          type="number"
          id="stake"
          name="stake"
          value={formData.stake}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="odds">Коэффициент:</label>
        <input
          type="number"
          id="odds"
          name="odds"
          value={formData.odds}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="bookmaker">Букмекерская контора:</label>
        <input
          type="text"
          id="bookmaker"
          name="bookmaker"
          value={formData.bookmaker}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="eventDate">Дата события:</label>
        <input
          type="date"
          id="eventDate"
          name="eventDate"
          value={formData.eventDate}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Добавить прогноз</button>
    </form>
  );
};

export default AddPredictionForm;
