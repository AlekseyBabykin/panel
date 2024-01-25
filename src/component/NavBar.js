import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import iconOrg from "../icons/organization.svg";
import profileImg from "../icons/default-avatar.svg";

export default function NavBar() {
  return (
    <div className="nav-container">
      <p className="logo">BitTest</p>

      <div className="menu flex">
        <img src={iconOrg} />
        <p>Моя организация</p>
      </div>

      <div className="profileInfo flex">
        <img src={profileImg} style={{ width: "35px" }} />

        <div>
          <p className="isAuth">Вы авторизованы</p>
          <p className="role">Администратор </p>
        </div>
      </div>
    </div>
  );
}
