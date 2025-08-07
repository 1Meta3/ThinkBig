import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="bg-light p-3 border-end" style={{ width: "250px", minHeight: "100vh" }}>
      <div className="mb-4">
        <h5 className="text-primary">내 정보</h5>
        <p>닉네임: 사용자</p>
        <p>등급: 일반</p>
      </div>
      <Link to="/create" className="btn btn-outline-primary w-100">
        + 경기 추가
      </Link>
    </aside>
  );
};

export default Sidebar;
