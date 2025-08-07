import React, { useState } from "react";
import styled from "styled-components";

const categories = {
  스포츠: ["축구", "야구", "테니스", "탁구"],
  전략게임: ["체스", "장기", "바둑", "보드게임"],
  e스포츠: ["롤", "오버워치", "배그"],
};

const Container = styled.div`
  margin-bottom: ${(props) => props.theme.spacing.xxl};
  background: ${(props) => props.theme.colors.surface};
  padding: ${(props) => props.theme.spacing.xl};
  border-radius: ${(props) => props.theme.borderRadius.xl};
  box-shadow: ${(props) => props.theme.shadows.lg};
  border: 1px solid ${(props) => props.theme.colors.border};
`;

const Title = styled.h4`
  color: ${(props) => props.theme.colors.text};
  font-weight: ${(props) => props.theme.typography.fontWeight.bold};
  margin-bottom: ${(props) => props.theme.spacing.lg};
  font-size: ${(props) => props.theme.typography.fontSize.xl};
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing.sm};

  &::before {
    content: "🎯";
    font-size: 1.5em;
  }
`;

const CategorySection = styled.div`
  margin-bottom: ${(props) => props.theme.spacing.xl};
`;

const CategoryButtons = styled.div`
  display: flex;
  gap: ${(props) => props.theme.spacing.md};
  flex-wrap: wrap;
  margin-bottom: ${(props) => props.theme.spacing.lg};
`;

const CategoryButton = styled.button`
  padding: ${(props) => props.theme.spacing.md}
    ${(props) => props.theme.spacing.xl};
  border-radius: ${(props) => props.theme.borderRadius.full};
  font-weight: ${(props) => props.theme.typography.fontWeight.semibold};
  transition: all ${(props) => props.theme.transition.normal};
  border: 2px solid transparent;
  position: relative;
  overflow: hidden;

  ${(props) =>
    props.active
      ? `
    background: ${props.theme.colors.gradient1};
    color: white;
    box-shadow: ${props.theme.shadows.lg};
    transform: translateY(-2px);
  `
      : `
    background: ${props.theme.colors.surface};
    color: ${props.theme.colors.text};
    border-color: ${props.theme.colors.border};
    
    &:hover {
      background: ${props.theme.colors.gradient1};
      color: white;
      border-color: transparent;
      transform: translateY(-2px);
      box-shadow: ${props.theme.shadows.md};
    }
  `}

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.2),
      transparent
    );
    transition: left 0.5s;
  }

  &:hover::before {
    left: 100%;
  }
`;

const SubCategorySection = styled.div`
  display: flex;
  gap: ${(props) => props.theme.spacing.md};
  flex-wrap: wrap;
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing.sm};
  padding: ${(props) => props.theme.spacing.md}
    ${(props) => props.theme.spacing.lg};
  background: ${(props) => props.theme.colors.surface};
  border-radius: ${(props) => props.theme.borderRadius.lg};
  border: 2px solid ${(props) => props.theme.colors.border};
  transition: all ${(props) => props.theme.transition.normal};
  cursor: pointer;
  position: relative;
  overflow: hidden;

  &:hover {
    border-color: ${(props) => props.theme.colors.primary};
    box-shadow: ${(props) => props.theme.shadows.md};
    transform: translateY(-1px);
  }

  ${(props) =>
    props.checked &&
    `
    background: ${props.theme.colors.gradient3};
    border-color: transparent;
    color: white;
    box-shadow: ${props.theme.shadows.md};
  `}
`;

const Checkbox = styled.input`
  width: 18px;
  height: 18px;
  accent-color: ${(props) => props.theme.colors.primary};
  cursor: pointer;
  transform: scale(1.2);
`;

const CheckboxLabel = styled.label`
  font-size: ${(props) => props.theme.typography.fontSize.base};
  font-weight: ${(props) => props.theme.typography.fontWeight.semibold};
  color: inherit;
  cursor: pointer;
  user-select: none;
`;

const FilterStats = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: ${(props) => props.theme.spacing.lg};
  padding-top: ${(props) => props.theme.spacing.lg};
  border-top: 1px solid ${(props) => props.theme.colors.border};
`;

const StatsText = styled.span`
  color: ${(props) => props.theme.colors.textLight};
  font-size: ${(props) => props.theme.typography.fontSize.sm};
  font-weight: ${(props) => props.theme.typography.fontWeight.medium};
`;

const ClearButton = styled.button`
  background: ${(props) => props.theme.colors.gradient2};
  color: white;
  padding: ${(props) => props.theme.spacing.sm}
    ${(props) => props.theme.spacing.lg};
  border-radius: ${(props) => props.theme.borderRadius.full};
  font-size: ${(props) => props.theme.typography.fontSize.sm};
  font-weight: ${(props) => props.theme.typography.fontWeight.semibold};
  transition: all ${(props) => props.theme.transition.normal};
  box-shadow: ${(props) => props.theme.shadows.sm};

  &:hover {
    transform: translateY(-1px);
    box-shadow: ${(props) => props.theme.shadows.md};
  }
`;

const FilterBox = ({ selectedSubCategories, setSelectedSubCategories }) => {
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const allCategories = ["전체", ...Object.keys(categories)];

  const getSubCategories = () => {
    if (selectedCategory === "전체") {
      return Object.values(categories).flat();
    } else {
      return categories[selectedCategory];
    }
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setSelectedSubCategories([]);
  };

  const handleSubCategoryToggle = (sub) => {
    if (selectedSubCategories.includes(sub)) {
      setSelectedSubCategories(selectedSubCategories.filter((s) => s !== sub));
    } else {
      setSelectedSubCategories([...selectedSubCategories, sub]);
    }
  };

  const clearAllFilters = () => {
    setSelectedSubCategories([]);
    setSelectedCategory("전체");
  };

  return (
    <Container>
      <Title>종목별 보기</Title>
      <CategorySection>
        <CategoryButtons>
          {allCategories.map((cat) => (
            <CategoryButton
              key={cat}
              active={cat === selectedCategory}
              onClick={() => handleCategoryClick(cat)}
            >
              {cat}
            </CategoryButton>
          ))}
        </CategoryButtons>

        <SubCategorySection>
          {getSubCategories().map((sub) => (
            <CheckboxContainer
              key={sub}
              checked={selectedSubCategories.includes(sub)}
              onClick={() => handleSubCategoryToggle(sub)}
            >
              <Checkbox
                type="checkbox"
                id={`check-${sub}`}
                checked={selectedSubCategories.includes(sub)}
                onChange={() => handleSubCategoryToggle(sub)}
              />
              <CheckboxLabel htmlFor={`check-${sub}`}>{sub}</CheckboxLabel>
            </CheckboxContainer>
          ))}
        </SubCategorySection>
      </CategorySection>

      <FilterStats>
        <StatsText>
          {selectedSubCategories.length > 0
            ? `${selectedSubCategories.length}개 종목 선택됨`
            : "모든 종목 표시 중"}
        </StatsText>
        {selectedSubCategories.length > 0 && (
          <ClearButton onClick={clearAllFilters}>필터 초기화</ClearButton>
        )}
      </FilterStats>
    </Container>
  );
};

export default FilterBox;
