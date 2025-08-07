import React from "react";
import styled from "styled-components";
import { useParams, Link } from "react-router-dom";
import Layout from "../components/Layout";

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const BackButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing.sm};
  color: ${(props) => props.theme.colors.primary};
  font-weight: ${(props) => props.theme.typography.fontWeight.medium};
  margin-bottom: ${(props) => props.theme.spacing.lg};
  transition: all 0.2s ease;

  &:hover {
    color: ${(props) => props.theme.colors.accent};
    transform: translateX(-4px);
  }
`;

const Title = styled.h1`
  color: ${(props) => props.theme.colors.text};
  font-weight: ${(props) => props.theme.typography.fontWeight.bold};
  font-size: ${(props) => props.theme.typography.fontSize["4xl"]};
  margin-bottom: ${(props) => props.theme.spacing.lg};
  line-height: 1.2;
`;

const ImageContainer = styled.div`
  position: relative;
  border-radius: ${(props) => props.theme.borderRadius.xl};
  overflow: hidden;
  margin-bottom: ${(props) => props.theme.spacing.xl};
  box-shadow: ${(props) => props.theme.shadows.lg};
`;

const MatchImage = styled.img`
  width: 100%;
  height: 400px;
  object-fit: cover;
  display: block;
`;

const ContentCard = styled.div`
  background: ${(props) => props.theme.colors.surface};
  padding: ${(props) => props.theme.spacing.xl};
  border-radius: ${(props) => props.theme.borderRadius.xl};
  box-shadow: ${(props) => props.theme.shadows.md};
  margin-bottom: ${(props) => props.theme.spacing.xl};
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${(props) => props.theme.spacing.lg};
  margin-bottom: ${(props) => props.theme.spacing.xl};
`;

const InfoItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing.sm};
`;

const InfoLabel = styled.span`
  color: ${(props) => props.theme.colors.textLight};
  font-size: ${(props) => props.theme.typography.fontSize.sm};
  font-weight: ${(props) => props.theme.typography.fontWeight.medium};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const InfoValue = styled.span`
  color: ${(props) => props.theme.colors.text};
  font-size: ${(props) => props.theme.typography.fontSize.lg};
  font-weight: ${(props) => props.theme.typography.fontWeight.semibold};
`;

const CategoryBadge = styled.span`
  display: inline-block;
  background: ${(props) => props.theme.colors.primary};
  color: white;
  padding: ${(props) => props.theme.spacing.sm}
    ${(props) => props.theme.spacing.md};
  border-radius: ${(props) => props.theme.borderRadius.lg};
  font-size: ${(props) => props.theme.typography.fontSize.sm};
  font-weight: ${(props) => props.theme.typography.fontWeight.medium};
`;

const Description = styled.p`
  color: ${(props) => props.theme.colors.textLight};
  font-size: ${(props) => props.theme.typography.fontSize.lg};
  line-height: 1.7;
  margin-bottom: ${(props) => props.theme.spacing.xl};
`;

const ActionButtons = styled.div`
  display: flex;
  gap: ${(props) => props.theme.spacing.md};
  flex-wrap: wrap;
`;

const PrimaryButton = styled.button`
  background: linear-gradient(
    135deg,
    ${(props) => props.theme.colors.primary},
    ${(props) => props.theme.colors.accent}
  );
  color: white;
  padding: ${(props) => props.theme.spacing.md}
    ${(props) => props.theme.spacing.xl};
  border: none;
  border-radius: ${(props) => props.theme.borderRadius.lg};
  font-size: ${(props) => props.theme.typography.fontSize.lg};
  font-weight: ${(props) => props.theme.typography.fontWeight.semibold};
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: ${(props) => props.theme.shadows.md};

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${(props) => props.theme.shadows.lg};
  }
`;

const SecondaryButton = styled.button`
  background: ${(props) => props.theme.colors.surface};
  color: ${(props) => props.theme.colors.primary};
  padding: ${(props) => props.theme.spacing.md}
    ${(props) => props.theme.spacing.xl};
  border: 2px solid ${(props) => props.theme.colors.primary};
  border-radius: ${(props) => props.theme.borderRadius.lg};
  font-size: ${(props) => props.theme.typography.fontSize.lg};
  font-weight: ${(props) => props.theme.typography.fontWeight.semibold};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${(props) => props.theme.colors.primary};
    color: white;
    transform: translateY(-2px);
  }
`;

const NotFound = styled.div`
  text-align: center;
  padding: ${(props) => props.theme.spacing.xxl};
  color: ${(props) => props.theme.colors.textLight};
`;

const NotFoundIcon = styled.div`
  font-size: 4rem;
  margin-bottom: ${(props) => props.theme.spacing.lg};
  opacity: 0.5;
`;

const NotFoundTitle = styled.h2`
  margin-bottom: ${(props) => props.theme.spacing.md};
  color: ${(props) => props.theme.colors.text};
`;

const MatchDetail = ({ matches }) => {
  const { id } = useParams();
  const match = matches.find((m) => m.id === Number(id));

  if (!match) {
    return (
      <Layout>
        <Container>
          <NotFound>
            <NotFoundIcon>🏟️</NotFoundIcon>
            <NotFoundTitle>경기를 찾을 수 없습니다</NotFoundTitle>
            <p>요청하신 경기 정보가 존재하지 않습니다.</p>
            <BackButton to="/">← 홈으로 돌아가기</BackButton>
          </NotFound>
        </Container>
      </Layout>
    );
  }

  return (
    <Layout>
      <Container>
        <BackButton to="/">← 목록으로 돌아가기</BackButton>

        <Title>{match.title}</Title>

        <ImageContainer>
          <MatchImage src={match.thumbnail} alt={match.title} />
        </ImageContainer>

        <ContentCard>
          <InfoGrid>
            <InfoItem>
              <InfoLabel>종목</InfoLabel>
              <CategoryBadge>{match.subCategory}</CategoryBadge>
            </InfoItem>
            <InfoItem>
              <InfoLabel>지역</InfoLabel>
              <InfoValue>{match.region}</InfoValue>
            </InfoItem>
            <InfoItem>
              <InfoLabel>상태</InfoLabel>
              <InfoValue style={{ color: "#10b981" }}>모집 중</InfoValue>
            </InfoItem>
            <InfoItem>
              <InfoLabel>참가자</InfoLabel>
              <InfoValue>0/20명</InfoValue>
            </InfoItem>
          </InfoGrid>

          <Description>
            이 경기는 {match.region} 지역에서 진행되는 {match.subCategory}{" "}
            경기입니다. 다양한 실력의 참가자들이 함께 즐길 수 있는 친목 위주의
            경기로, 초보자부터 고수까지 모두 환영합니다. 함께 즐거운 시간을
            보내며 새로운 친구들을 만나보세요!
          </Description>

          <ActionButtons>
            <PrimaryButton>참가 신청하기</PrimaryButton>
            <SecondaryButton>문의하기</SecondaryButton>
          </ActionButtons>
        </ContentCard>
      </Container>
    </Layout>
  );
};

export default MatchDetail;
