import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";

const CreateMatchForm = ({ addMatch }) => {
  const [form, setForm] = useState({
    title: "",
    region: "",
    subCategory: "",
    thumbnail: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newMatch = {
      ...form,
      id: Date.now(), // 간단한 ID
    };

    addMatch(newMatch);
    navigate("/");
  };

  return (
    <Layout>
      <div className="container">
        <h2>시합 등록</h2>
        <form onSubmit={handleSubmit} className="mt-4">
          <div className="mb-3">
            <label className="form-label">제목</label>
            <input
              type="text"
              className="form-control"
              name="title"
              value={form.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">지역</label>
            <input
              type="text"
              className="form-control"
              name="region"
              value={form.region}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">종목</label>
            <input
              type="text"
              className="form-control"
              name="subCategory"
              value={form.subCategory}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">썸네일 이미지 URL</label>
            <input
              type="text"
              className="form-control"
              name="thumbnail"
              value={form.thumbnail}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="btn btn-primary">
            등록하기
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default CreateMatchForm;
