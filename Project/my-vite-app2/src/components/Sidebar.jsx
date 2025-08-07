import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const SidebarContainer = styled.aside`
  width: 320px;
  background: ${(props) => props.theme.colors.surface};
  border-radius: ${(props) => props.theme.borderRadius.xl};
  padding: ${(props) => props.theme.spacing.xl};
  box-shadow: ${(props) => props.theme.shadows.lg};
  height: fit-content;
  position: sticky;
  top: 100px;
  border: 1px solid ${(props) => props.theme.colors.border};
  backdrop-filter: ${(props) => props.theme.backdropBlur};
`;

const UserSection = styled.div`
  margin-bottom: ${(props) => props.theme.spacing.xxl};
  padding-bottom: ${(props) => props.theme.spacing.xl};
  border-bottom: 1px solid ${(props) => props.theme.colors.border};
`;

const UserTitle = styled.h5`
  color: ${(props) => props.theme.colors.primary};
  font-weight: ${(props) => props.theme.typography.fontWeight.bold};
  margin-bottom: ${(props) => props.theme.spacing.lg};
  font-size: ${(props) => props.theme.typography.fontSize.lg};
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing.sm};

  &::before {
    content: "👤";
    font-size: 1.2em;
  }
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing.lg};
  margin-bottom: ${(props) => props.theme.spacing.lg};
  color: ${(props) => props.theme.colors.textLight};
  font-size: ${(props) => props.theme.typography.fontSize.sm};
`;

const UserAvatar = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: ${(props) => props.theme.colors.gradient1};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: ${(props) => props.theme.typography.fontWeight.bold};
  font-size: ${(props) => props.theme.typography.fontSize.xl};
  box-shadow: ${(props) => props.theme.shadows.md};
  border: 3px solid ${(props) => props.theme.colors.surface};
  position: relative;

  &::after {
    content: "";
    position: absolute;
    top: -3px;
    left: -3px;
    right: -3px;
    bottom: -3px;
    border-radius: 50%;
    background: ${(props) => props.theme.colors.gradient1};
    z-index: -1;
    opacity: 0.3;
  }
`;

const UserDetails = styled.div`
  flex: 1;
`;

const UserName = styled.div`
  font-weight: ${(props) => props.theme.typography.fontWeight.bold};
  color: ${(props) => props.theme.colors.text};
  font-size: ${(props) => props.theme.typography.fontSize.lg};
  margin-bottom: ${(props) => props.theme.spacing.xs};
`;

const UserLevel = styled.div`
  background: ${(props) => props.theme.colors.gradient4};
  color: white;
  padding: ${(props) => props.theme.spacing.xs}
    ${(props) => props.theme.spacing.md};
  border-radius: ${(props) => props.theme.borderRadius.full};
  font-size: ${(props) => props.theme.typography.fontSize.xs};
  font-weight: ${(props) => props.theme.typography.fontWeight.semibold};
  display: inline-block;
  box-shadow: ${(props) => props.theme.shadows.sm};
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${(props) => props.theme.spacing.md};
  margin-top: ${(props) => props.theme.spacing.lg};
`;

const StatCard = styled.div`
  background: ${(props) => props.theme.colors.background};
  padding: ${(props) => props.theme.spacing.md};
  border-radius: ${(props) => props.theme.borderRadius.lg};
  text-align: center;
  border: 1px solid ${(props) => props.theme.colors.border};
`;

const StatNumber = styled.div`
  font-size: ${(props) => props.theme.typography.fontSize.xl};
  font-weight: ${(props) => props.theme.typography.fontWeight.bold};
  color: ${(props) => props.theme.colors.primary};
  margin-bottom: ${(props) => props.theme.spacing.xs};
`;

const StatLabel = styled.div`
  font-size: ${(props) => props.theme.typography.fontSize.xs};
  color: ${(props) => props.theme.colors.textLight};
  font-weight: ${(props) => props.theme.typography.fontWeight.medium};
`;

const CreateButton = styled(Link)`
  display: block;
  width: 100%;
  background: ${(props) => props.theme.colors.gradient2};
  color: white;
  padding: ${(props) => props.theme.spacing.lg};
  border-radius: ${(props) => props.theme.borderRadius.xl};
  text-align: center;
  font-weight: ${(props) => props.theme.typography.fontWeight.bold};
  transition: all ${(props) => props.theme.transition.normal};
  box-shadow: ${(props) => props.theme.shadows.lg};
  position: relative;
  overflow: hidden;
  font-size: ${(props) => props.theme.typography.fontSize.lg};

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
      rgba(255, 255, 255, 0.3),
      transparent
    );
    transition: left 0.6s;
  }

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${(props) => props.theme.shadows.xl};
    color: white;

    &::before {
      left: 100%;
    }
  }
`;

const QuickActions = styled.div`
  margin-top: ${(props) => props.theme.spacing.xl};
`;

const QuickActionButton = styled.button`
  width: 100%;
  background: ${(props) => props.theme.colors.surface};
  color: ${(props) => props.theme.colors.text};
  padding: ${(props) => props.theme.spacing.md};
  border-radius: ${(props) => props.theme.borderRadius.lg};
  text-align: left;
  font-weight: ${(props) => props.theme.typography.fontWeight.medium};
  transition: all ${(props) => props.theme.transition.normal};
  border: 1px solid ${(props) => props.theme.colors.border};
  margin-bottom: ${(props) => props.theme.spacing.sm};
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing.sm};

  &:hover {
    background: ${(props) => props.theme.colors.primary};
    color: white;
    transform: translateX(4px);
    box-shadow: ${(props) => props.theme.shadows.md};
  }
`;

const Sidebar = () => {
  return (
    <SidebarContainer>
      <UserSection>
        <UserTitle>내 정보</UserTitle>
        <UserInfo>
          <UserAvatar>U</UserAvatar>
          <UserDetails>
            <UserName>사용자</UserName>
            <UserLevel>프로 등급</UserLevel>
          </UserDetails>
        </UserInfo>

        <StatsGrid>
          <StatCard>
            <StatNumber>12</StatNumber>
            <StatLabel>참가 경기</StatLabel>
          </StatCard>
          <StatCard>
            <StatNumber>4.8</StatNumber>
            <StatLabel>평점</StatLabel>
          </StatCard>
        </StatsGrid>
      </UserSection>

      <CreateButton to="/create">✨ 새 경기 만들기</CreateButton>

      <QuickActions>
        <QuickActionButton>🏆 내 경기 관리</QuickActionButton>
        <QuickActionButton>📅 일정 확인</QuickActionButton>
        <QuickActionButton>⭐ 즐겨찾기</QuickActionButton>
        <QuickActionButton>📊 통계 보기</QuickActionButton>
      </QuickActions>
    </SidebarContainer>
  );
};

export default Sidebar;
