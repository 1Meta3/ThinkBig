import React, { useState } from "react";

const categories = {
  스포츠: ["축구", "야구", "테니스", "탁구"],
  전략게임: ["체스", "장기", "바둑", "보드게임"],
  e스포츠: ["롤", "오버워치", "배그"],
};

const FilterBox = ({ selectedSubCategories, setSelectedSubCategories }) => {
  // 1️⃣ 초기 선택값은 "전체"
  const [selectedCategory, setSelectedCategory] = useState("전체");

  // 2️⃣ 대분류 목록에 "전체" 추가
  const allCategories = ["전체", ...Object.keys(categories)];

  // 3️⃣ 전체일 경우 모든 소분류를 합쳐서 보여줌
  const getSubCategories = () => {
    if (selectedCategory === "전체") {
      return Object.values(categories).flat();
    } else {
      return categories[selectedCategory];
    }
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setSelectedSubCategories([]); // 선택된 대분류가 바뀌면 필터 초기화
  };

  const handleSubCategoryToggle = (sub) => {
    if (selectedSubCategories.includes(sub)) {
      setSelectedSubCategories(selectedSubCategories.filter((s) => s !== sub));
    } else {
      setSelectedSubCategories([...selectedSubCategories, sub]);
    }
  };

  return (
    <div className="container my-4">
      <h5 className="mb-3">종목별 보기</h5>
      <div className="d-flex gap-2 flex-wrap mb-3">
        {allCategories.map((cat) => (
          <button
            key={cat}
            className={`btn ${cat === selectedCategory ? "btn-primary" : "btn-outline-primary"}`}
            onClick={() => handleCategoryClick(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="d-flex gap-3 flex-wrap">
        {getSubCategories().map((sub) => (
          <div key={sub} className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id={`check-${sub}`}
              checked={selectedSubCategories.includes(sub)}
              onChange={() => handleSubCategoryToggle(sub)}
            />
            <label className="form-check-label" htmlFor={`check-${sub}`}>
              {sub}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilterBox;
