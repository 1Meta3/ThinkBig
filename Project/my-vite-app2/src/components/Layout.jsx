import React from "react";
import styled from "styled-components";
import Header from "./Header";
import Sidebar from "./Sidebar";

const LayoutContainer = styled.div`
  min-height: 100vh;
  background: ${(props) => props.theme.colors.background};
`;

const MainContent = styled.div`
  display: flex;
  max-width: 1600px;
  margin: 0 auto;
  gap: ${(props) => props.theme.spacing.xxl};
  padding: ${(props) => props.theme.spacing.xxl};

  @media (max-width: ${(props) => props.theme.breakpoints.lg}) {
    flex-direction: column;
    gap: ${(props) => props.theme.spacing.xl};
    padding: ${(props) => props.theme.spacing.xl};
  }

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    padding: ${(props) => props.theme.spacing.lg};
  }
`;

const Main = styled.main`
  flex: 1;
  background: ${(props) => props.theme.colors.surface};
  border-radius: ${(props) => props.theme.borderRadius.xl};
  padding: ${(props) => props.theme.spacing.xxl};
  box-shadow: ${(props) => props.theme.shadows.lg};
  min-height: calc(100vh - 120px);
  border: 1px solid ${(props) => props.theme.colors.border};
  backdrop-filter: ${(props) => props.theme.backdropBlur};

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    padding: ${(props) => props.theme.spacing.xl};
    min-height: auto;
  }
`;

const Layout = ({ children }) => {
  return (
    <LayoutContainer>
      <Header />
      <MainContent>
        <Sidebar />
        <Main>{children}</Main>
      </MainContent>
    </LayoutContainer>
  );
};

export default Layout;
