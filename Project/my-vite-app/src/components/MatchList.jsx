// src/components/MatchList.jsx
import React from "react";
import MatchCard from "./MatchCard";
import matches from "../data/matches.json";

const MatchList = ({ selectedSubCategories, matches }) => {
  const filteredMatches =
    selectedSubCategories.length === 0
      ? matches
      : matches.filter((match) =>
          selectedSubCategories.includes(match.subCategory)
        );

  return (
    <div className="container">
      <div className="row row-cols-1 row-cols-sm-2 g-3">
        {filteredMatches.map((match) => (
          <MatchCard key={match.id} match={match} />
        ))}
      </div>
    </div>
  );
};



export default MatchList;
