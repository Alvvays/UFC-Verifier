import React from "react";
import AddPredictionForm from "./components/AddPredictionForm";
import Statistics from "./components/Statistics";

const App = () => {
  return (
    <div className="app">
      <header>
        <h1>UFC Прогноз</h1>
      </header>
      <main>
        <AddPredictionForm />
        <Statistics />
      </main>
    </div>
  );
};

export default App;
