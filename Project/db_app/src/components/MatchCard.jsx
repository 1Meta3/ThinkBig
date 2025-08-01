// src/components/MatchCard.jsx
import React from "react";
import "./MatchCard.css"; // 스타일 별도 분리

const MatchCard = ({ match }) => {
  return (
    <div className="col">
      <div className="match-card">
        <img src={match.thumbnail} alt={match.title} className="match-img" />
        <div className="match-info">
          <h5 className="match-title">{match.title}</h5>
          <p className="match-sub">{match.subCategory} · {match.region}</p>
        </div>
      </div>
    </div>
  );
};

export default MatchCard;
