// src/App.jsx
import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import MatchDetail from "./pages/MatchDetail";
import CreateMatchForm from "./pages/CreateMatchForm";
import matchesData from "./data/matches.json";

const App = () => {
  const [matches, setMatches] = useState(matchesData);

  const addMatch = (newMatch) => {
    setMatches([...matches, newMatch]);
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Home
            matches={matches}
            setMatches={setMatches}
          />
        }
      />
      <Route path="/matches/:id" element={<MatchDetail matches={matches} />} />
      <Route path="/create" element={<CreateMatchForm addMatch={addMatch} />} />
    </Routes>
  );
};

export default App;
