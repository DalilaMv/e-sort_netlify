import React from "react";
import styled from "styled-components";
import { NavLink as Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import authService from "../../services/auth.service";

const Nav = styled.nav`
  background: #36ace2;
  height: 80px;
  display: flex;
  justify-content: space-between;
  padding: 0.5rem calc((100vw - 1000px) / 2);
  z-index: 10;
`;

const NavLink = styled(Link)`
  color: lightgray;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0 1rem;
  height: 100%;
  cursor: pointer;
  &.active {
    color: white;
  }
`;

const TitleLink = styled(Link)`
  color: white;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0 1rem;
  height: 100%;
  cursor: pointer;
  &.active {
    color: white;
  }
  h1 {
    color: white;
  }
`;

const Bars = styled(FaBars)`
  display: none;
  color: white;
  @media screen and (max-width: 768px) {
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(-100%, 75%);
    font-size: 1.8rem;
    cursor: pointer;
  }
`;

const NavMenu = styled.div`
  display: flex;
  align-items: center;
  margin-right: -24px;
  @media screen and (max-width: 768px) {
    display: none;
  }
  a {
    font-size: 16px;
  }
`;

const NavBtn = styled.nav`
  display: flex;
  align-items: center;
  margin-right: 24px;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const NavBtnLink = styled(Link)`
  border-radius: 4px;
  background: white;
  padding: 10px 22px;
  color: #36ace2;
  outline: none;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
`;

function NavBar() {
  const user = authService.getLoggedUser();

  const onLogOut = () => {
    authService.removeLoggedUser();
    window.location.assign("/singin");
  };

  return (
    <>
      <Nav style={{ boxShadow: "0 0 5px 5px rgb(0 0 0 / 8%)" }}>
        <TitleLink to="/">
          <h1>E - S O R T</h1>
        </TitleLink>
        <Bars />
        <NavMenu>
          <NavLink to="/room">Salas</NavLink>
          <NavLink to="/event">Eventos</NavLink>
          {user !== null && <NavLink to="/home">Espaço do usuário</NavLink>}
        </NavMenu>
        {user === null ? (
          <NavBtn>
            <NavBtnLink to="/singin">Sign in</NavBtnLink>
          </NavBtn>
        ) : (
          <NavBtn>
            <NavBtnLink onClick={onLogOut}>Sign out</NavBtnLink>
          </NavBtn>
        )}
      </Nav>
    </>
  );
}

export default NavBar;
