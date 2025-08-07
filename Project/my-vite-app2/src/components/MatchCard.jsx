// src/components/MatchCard.jsx
import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const CardContainer = styled.div`
  height: 100%;
`;

const CardLink = styled(Link)`
  display: block;
  height: 100%;
  text-decoration: none;
  color: inherit;
`;

const Card = styled.div`
  position: relative;
  aspect-ratio: 1 / 1;
  overflow: hidden;
  border-radius: ${(props) => props.theme.borderRadius.xl};
  background: ${(props) => props.theme.colors.surface};
  box-shadow: ${(props) => props.theme.shadows.md};
  transition: all ${(props) => props.theme.transition.normal};
  cursor: pointer;
  border: 1px solid ${(props) => props.theme.colors.border};

  &:hover {
    transform: translateY(-12px) scale(1.02);
    box-shadow: ${(props) => props.theme.shadows.xl};
    border-color: ${(props) => props.theme.colors.primary};
  }
`;

const CardImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform ${(props) => props.theme.transition.slow};

  ${Card}:hover & {
    transform: scale(1.15);
  }
`;

const CardOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.9) 0%,
    rgba(0, 0, 0, 0.6) 40%,
    transparent 100%
  );
  color: white;
  padding: ${(props) => props.theme.spacing.xl};
  transform: translateY(0);
  transition: transform ${(props) => props.theme.transition.normal};
  backdrop-filter: ${(props) => props.theme.backdropBlur};
`;

const CardTitle = styled.h5`
  margin: 0 0 ${(props) => props.theme.spacing.sm} 0;
  font-size: ${(props) => props.theme.typography.fontSize.lg};
  font-weight: ${(props) => props.theme.typography.fontWeight.bold};
  line-height: ${(props) => props.theme.typography.lineHeight.tight};
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
`;

const CardSubtitle = styled.p`
  margin: 0;
  font-size: ${(props) => props.theme.typography.fontSize.sm};
  opacity: 0.95;
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing.sm};
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
`;

const CategoryBadge = styled.span`
  background: ${(props) => props.theme.colors.gradient3};
  color: white;
  padding: ${(props) => props.theme.spacing.xs}
    ${(props) => props.theme.spacing.md};
  border-radius: ${(props) => props.theme.borderRadius.full};
  font-size: ${(props) => props.theme.typography.fontSize.xs};
  font-weight: ${(props) => props.theme.typography.fontWeight.semibold};
  box-shadow: ${(props) => props.theme.shadows.sm};
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

const StatusBadge = styled.div`
  position: absolute;
  top: ${(props) => props.theme.spacing.md};
  right: ${(props) => props.theme.spacing.md};
  background: ${(props) => props.theme.colors.gradient4};
  color: white;
  padding: ${(props) => props.theme.spacing.xs}
    ${(props) => props.theme.spacing.sm};
  border-radius: ${(props) => props.theme.borderRadius.full};
  font-size: ${(props) => props.theme.typography.fontSize.xs};
  font-weight: ${(props) => props.theme.typography.fontWeight.semibold};
  box-shadow: ${(props) => props.theme.shadows.md};
  border: 1px solid rgba(255, 255, 255, 0.3);
  backdrop-filter: ${(props) => props.theme.backdropBlur};
`;

const CardStats = styled.div`
  position: absolute;
  top: ${(props) => props.theme.spacing.md};
  left: ${(props) => props.theme.spacing.md};
  display: flex;
  gap: ${(props) => props.theme.spacing.sm};
`;

const StatItem = styled.div`
  background: ${(props) => props.theme.colors.glass};
  color: white;
  padding: ${(props) => props.theme.spacing.xs}
    ${(props) => props.theme.spacing.sm};
  border-radius: ${(props) => props.theme.borderRadius.md};
  font-size: ${(props) => props.theme.typography.fontSize.xs};
  font-weight: ${(props) => props.theme.typography.fontWeight.medium};
  backdrop-filter: ${(props) => props.theme.backdropBlur};
  border: 1px solid ${(props) => props.theme.colors.glassBorder};
`;

const MatchCard = ({ match }) => {
  return (
    <CardContainer>
      <CardLink to={`/matches/${match.id}`}>
        <Card>
          <CardImage src={match.thumbnail} alt={match.title} />

          <StatusBadge>모집중</StatusBadge>

          <CardStats>
            <StatItem>🔥 인기</StatItem>
            <StatItem>⭐ 4.8</StatItem>
          </CardStats>

          <CardOverlay>
            <CardTitle>{match.title}</CardTitle>
            <CardSubtitle>
              <CategoryBadge>{match.subCategory}</CategoryBadge>
              <span>•</span>
              <span>{match.region}</span>
            </CardSubtitle>
          </CardOverlay>
        </Card>
      </CardLink>
    </CardContainer>
  );
};

export default MatchCard;
