// src/components/MatchCard.jsx
import React from "react";
import { Link } from "react-router-dom";
import "./MatchCard.css";

const MatchCard = ({ match }) => {
  return (
    <div className="col">
      <Link to={`/matches/${match.id}`} className="text-decoration-none">
        <div className="match-card">
          <img src={match.thumbnail} alt={match.title} className="match-img" />
          <div className="match-info">
            <h5 className="match-title">{match.title}</h5>
            <p className="match-sub">
              {match.subCategory} · {match.region}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default MatchCard;
