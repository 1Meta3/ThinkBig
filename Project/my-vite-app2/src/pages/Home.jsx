import React, { useState } from "react";
import Layout from "../components/Layout";
import FilterBox from "../components/FilterBox";
import MatchList from "../components/MatchList";

const Home = ({ matches, setMatches }) => {
  const [selectedSubCategories, setSelectedSubCategories] = useState([]);

  return (
    <Layout>
      <FilterBox
        selectedSubCategories={selectedSubCategories}
        setSelectedSubCategories={setSelectedSubCategories}
      />
      <MatchList
        selectedSubCategories={selectedSubCategories}
        matches={matches}
      />
    </Layout>
  );
};

export default Home;
