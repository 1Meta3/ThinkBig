// src/components/Header.jsx
import React, { useState } from "react";
import styled from "styled-components";

const HeaderContainer = styled.header`
  background: ${(props) => props.theme.colors.gradient1};
  backdrop-filter: ${(props) => props.theme.backdropBlur};
  box-shadow: ${(props) => props.theme.shadows.glass};
  position: sticky;
  top: 0;
  z-index: 100;
  border-bottom: 1px solid ${(props) => props.theme.colors.glassBorder};
`;

const Nav = styled.nav`
  max-width: 1400px;
  margin: 0 auto;
  padding: ${(props) => props.theme.spacing.md}
    ${(props) => props.theme.spacing.xl};
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Brand = styled.a`
  font-size: ${(props) => props.theme.typography.fontSize["2xl"]};
  font-weight: ${(props) => props.theme.typography.fontWeight.extrabold};
  color: white;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing.sm};
  background: ${(props) => props.theme.colors.glass};
  padding: ${(props) => props.theme.spacing.sm}
    ${(props) => props.theme.spacing.lg};
  border-radius: ${(props) => props.theme.borderRadius.full};
  border: 1px solid ${(props) => props.theme.colors.glassBorder};
  backdrop-filter: ${(props) => props.theme.backdropBlur};

  &:hover {
    transform: scale(1.05);
    box-shadow: ${(props) => props.theme.shadows.glass};
  }
`;

const NavList = styled.ul`
  display: flex;
  gap: ${(props) => props.theme.spacing.md};
  align-items: center;
`;

const NavItem = styled.li`
  position: relative;
`;

const NavLink = styled.a`
  color: white;
  padding: ${(props) => props.theme.spacing.sm}
    ${(props) => props.theme.spacing.md};
  border-radius: ${(props) => props.theme.borderRadius.lg};
  font-weight: ${(props) => props.theme.typography.fontWeight.medium};
  transition: all ${(props) => props.theme.transition.normal};
  position: relative;
  background: ${(props) => props.theme.colors.glass};
  border: 1px solid transparent;

  &:hover {
    background: ${(props) => props.theme.colors.glassBorder};
    border-color: ${(props) => props.theme.colors.glassBorder};
    transform: translateY(-2px);
    box-shadow: ${(props) => props.theme.shadows.glass};
  }
`;

const CreateButton = styled.button`
  background: ${(props) => props.theme.colors.gradient2};
  color: white;
  padding: ${(props) => props.theme.spacing.sm}
    ${(props) => props.theme.spacing.xl};
  border-radius: ${(props) => props.theme.borderRadius.full};
  font-weight: ${(props) => props.theme.typography.fontWeight.semibold};
  transition: all ${(props) => props.theme.transition.normal};
  box-shadow: ${(props) => props.theme.shadows.md};
  border: 1px solid ${(props) => props.theme.colors.glassBorder};
  position: relative;
  overflow: hidden;

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

  &:hover {
    transform: translateY(-3px);
    box-shadow: ${(props) => props.theme.shadows.xl};

    &::before {
      left: 100%;
    }
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  flex-direction: column;
  gap: 4px;
  background: none;
  border: none;
  cursor: pointer;
  padding: ${(props) => props.theme.spacing.sm};

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    display: flex;
  }
`;

const MobileMenuBar = styled.span`
  width: 25px;
  height: 3px;
  background: white;
  border-radius: ${(props) => props.theme.borderRadius.full};
  transition: all ${(props) => props.theme.transition.normal};

  ${(props) =>
    props.open &&
    `
    &:nth-child(1) {
      transform: rotate(45deg) translate(6px, 6px);
    }
    &:nth-child(2) {
      opacity: 0;
    }
    &:nth-child(3) {
      transform: rotate(-45deg) translate(6px, -6px);
    }
  `}
`;

const MobileNav = styled.div`
  display: none;

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    display: ${(props) => (props.open ? "flex" : "none")};
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: ${(props) => props.theme.colors.gradient1};
    backdrop-filter: ${(props) => props.theme.backdropBlur};
    flex-direction: column;
    padding: ${(props) => props.theme.spacing.lg};
    gap: ${(props) => props.theme.spacing.md};
    border-top: 1px solid ${(props) => props.theme.colors.glassBorder};
    box-shadow: ${(props) => props.theme.shadows.glass};
  }
`;

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <HeaderContainer>
      <Nav>
        <Brand href="/">🏟️ SportMatch</Brand>

        <NavList>
          <NavItem>
            <NavLink href="#">서울</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="#">경기</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="#">부산</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="#">전체</NavLink>
          </NavItem>
          <NavItem>
            <CreateButton>경기 만들기</CreateButton>
          </NavItem>
        </NavList>

        <MobileMenuButton onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          <MobileMenuBar open={mobileMenuOpen} />
          <MobileMenuBar open={mobileMenuOpen} />
          <MobileMenuBar open={mobileMenuOpen} />
        </MobileMenuButton>
      </Nav>

      <MobileNav open={mobileMenuOpen}>
        <NavLink href="#">서울</NavLink>
        <NavLink href="#">경기</NavLink>
        <NavLink href="#">부산</NavLink>
        <NavLink href="#">전체</NavLink>
        <CreateButton>경기 만들기</CreateButton>
      </MobileNav>
    </HeaderContainer>
  );
};

export default Header;
