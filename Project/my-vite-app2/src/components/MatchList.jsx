// src/components/MatchList.jsx
import React from "react";
import styled from "styled-components";
import MatchCard from "./MatchCard";

const Container = styled.div`
  width: 100%;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: ${(props) => props.theme.spacing.xxl};

  @media (max-width: ${(props) => props.theme.breakpoints.xl}) {
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: ${(props) => props.theme.spacing.xl};
  }

  @media (max-width: ${(props) => props.theme.breakpoints.lg}) {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: ${(props) => props.theme.spacing.lg};
  }

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
    gap: ${(props) => props.theme.spacing.md};
  }

  @media (max-width: ${(props) => props.theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
    gap: ${(props) => props.theme.spacing.lg};
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: ${(props) => props.theme.spacing["3xl"]};
  color: ${(props) => props.theme.colors.textLight};
  background: ${(props) => props.theme.colors.surface};
  border-radius: ${(props) => props.theme.borderRadius.xl};
  border: 2px dashed ${(props) => props.theme.colors.border};
  margin: ${(props) => props.theme.spacing.xxl} 0;
`;

const EmptyIcon = styled.div`
  font-size: 6rem;
  margin-bottom: ${(props) => props.theme.spacing.xl};
  opacity: 0.6;
  animation: float 3s ease-in-out infinite;

  @keyframes float {
    0%,
    100% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-10px);
    }
  }
`;

const EmptyTitle = styled.h3`
  margin-bottom: ${(props) => props.theme.spacing.lg};
  color: ${(props) => props.theme.colors.text};
  font-weight: ${(props) => props.theme.typography.fontWeight.bold};
  font-size: ${(props) => props.theme.typography.fontSize["2xl"]};
`;

const EmptyText = styled.p`
  font-size: ${(props) => props.theme.typography.fontSize.lg};
  line-height: ${(props) => props.theme.typography.lineHeight.relaxed};
  max-width: 500px;
  margin: 0 auto;
  color: ${(props) => props.theme.colors.textLight};
`;

const EmptyAction = styled.button`
  background: ${(props) => props.theme.colors.gradient1};
  color: white;
  padding: ${(props) => props.theme.spacing.md}
    ${(props) => props.theme.spacing.xl};
  border-radius: ${(props) => props.theme.borderRadius.full};
  font-weight: ${(props) => props.theme.typography.fontWeight.semibold};
  margin-top: ${(props) => props.theme.spacing.lg};
  transition: all ${(props) => props.theme.transition.normal};
  box-shadow: ${(props) => props.theme.shadows.md};

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${(props) => props.theme.shadows.lg};
  }
`;

const ResultsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${(props) => props.theme.spacing.xl};
  padding-bottom: ${(props) => props.theme.spacing.lg};
  border-bottom: 1px solid ${(props) => props.theme.colors.border};
`;

const ResultsTitle = styled.h2`
  color: ${(props) => props.theme.colors.text};
  font-weight: ${(props) => props.theme.typography.fontWeight.bold};
  font-size: ${(props) => props.theme.typography.fontSize["3xl"]};
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing.sm};

  &::before {
    content: "🏟️";
    font-size: 0.8em;
  }
`;

const ResultsCount = styled.span`
  color: ${(props) => props.theme.colors.textLight};
  font-size: ${(props) => props.theme.typography.fontSize.lg};
  font-weight: ${(props) => props.theme.typography.fontWeight.medium};
`;

const SortButton = styled.button`
  background: ${(props) => props.theme.colors.surface};
  color: ${(props) => props.theme.colors.text};
  padding: ${(props) => props.theme.spacing.sm}
    ${(props) => props.theme.spacing.lg};
  border-radius: ${(props) => props.theme.borderRadius.full};
  font-weight: ${(props) => props.theme.typography.fontWeight.medium};
  border: 1px solid ${(props) => props.theme.colors.border};
  transition: all ${(props) => props.theme.transition.normal};

  &:hover {
    background: ${(props) => props.theme.colors.primary};
    color: white;
    border-color: ${(props) => props.theme.colors.primary};
  }
`;

const MatchList = ({ selectedSubCategories, matches }) => {
  const filteredMatches =
    selectedSubCategories.length === 0
      ? matches
      : matches.filter((match) =>
          selectedSubCategories.includes(match.subCategory)
        );

  if (filteredMatches.length === 0) {
    return (
      <Container>
        <EmptyState>
          <EmptyIcon>🏟️</EmptyIcon>
          <EmptyTitle>경기를 찾을 수 없습니다</EmptyTitle>
          <EmptyText>
            {selectedSubCategories.length > 0
              ? "선택한 필터에 맞는 경기가 없습니다. 다른 조건으로 검색해보세요."
              : "아직 등록된 경기가 없습니다. 첫 번째 경기를 만들어보세요!"}
          </EmptyText>
          <EmptyAction>경기 만들기</EmptyAction>
        </EmptyState>
      </Container>
    );
  }

  return (
    <Container>
      <ResultsHeader>
        <ResultsTitle>
          경기 목록
          <ResultsCount>({filteredMatches.length}개)</ResultsCount>
        </ResultsTitle>
        <SortButton>최신순</SortButton>
      </ResultsHeader>

      <Grid>
        {filteredMatches.map((match) => (
          <MatchCard key={match.id} match={match} />
        ))}
      </Grid>
    </Container>
  );
};

export default MatchList;
