import React, { useState } from "react";
import database from "../database";

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

        await database.run(
            `
            INSERT INTO predictions (event, prediction, stake, odds, bookmaker, event_date)
            VALUES (?, ?, ?, ?, ?, ?)`,
            [event, prediction, stake, odds, bookmaker, eventDate]
        );

        alert("Prediction added!");
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
            <h2>Add prediction</h2>
            <div>
                <label htmlFor="event">Event:</label>
                <input
                    type="text"
            </div>
        </form>
    )
}
