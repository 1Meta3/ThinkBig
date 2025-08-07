import React from "react";
import { useParams } from "react-router-dom";
import matches from "../data/matches.json";
import Layout from "../components/Layout";

const MatchDetail = () => {
  const { id } = useParams();
  const match = matches.find((m) => m.id === Number(id));

    if (!match) return <Layout><div className="container mt-5">시합 정보를 찾을 수 없습니다.</div></Layout>;

  return (
    <Layout>
      <div className="container mt-5">
        <h2>{match.title}</h2>
        <img src={match.thumbnail} alt={match.title} className="img-fluid mb-3" />
        <p><strong>종목:</strong> {match.subCategory}</p>
        <p><strong>지역:</strong> {match.region}</p>
        <p><strong>설명:</strong> (추가 예정)</p>
        <button className="btn btn-success">참가 신청</button> {/* 여기 참가신청 버튼 */}
      </div>
    </Layout>
  );
};

export default MatchDetail;
