// src/pages/Home.jsx
import React, { useState } from "react";
import Header from "../components/Header";
import FilterBox from "../components/FilterBox";
import MatchList from "../components/MatchList";

const Home = () => {
  const [selectedSubCategories, setSelectedSubCategories] = useState([]);

  return (
    <>
      <Header />
      <FilterBox
        selectedSubCategories={selectedSubCategories}
        setSelectedSubCategories={setSelectedSubCategories}
      />
      <MatchList selectedSubCategories={selectedSubCategories} />
    </>
  );
};

export default Home;
