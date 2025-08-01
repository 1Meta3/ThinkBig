// src/components/MatchList.jsx
import React from "react";
import MatchCard from "./MatchCard";

const dummyMatches = [
  {
    id: 1,
    title: "보드게임 토너먼트",
    subCategory: "보드게임",
    region: "서울",
    thumbnail: "https://source.unsplash.com/random/400x400?boardgame",
  },
  {
    id: 2,
    title: "주말 축구 리그",
    subCategory: "축구",
    region: "경기",
    thumbnail: "https://source.unsplash.com/random/400x400?soccer",
  },
  {
    id: 3,
    title: "테니스 동호회 대회",
    subCategory: "테니스",
    region: "서울",
    thumbnail: "https://source.unsplash.com/random/400x400?tennis",
  },
];

const MatchList = ({ selectedSubCategories }) => {
  const filteredMatches =
    selectedSubCategories.length === 0
      ? dummyMatches
      : dummyMatches.filter((match) =>
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
