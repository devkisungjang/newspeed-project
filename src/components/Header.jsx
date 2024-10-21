import React from "react";
import "../styles/Header.scss";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem("userData"));
  console.log(userData);
  const logoutHandler = () => {
    localStorage.removeItem("userData");
    navigate("login");
  };
  return (
    <div className="header">
      <Link to="/" className="logo">
        MangoGram
      </Link>
      <div className="button-group">
        {!userData?.id ? (
          <Link to="/login" className="login">
            로그인
          </Link>
        ) : (
          <div className="contents-wrapper" style={{ display: "flex" }}>
            <div className="hello-message">
              안녕하세요. {userData.username}님😊
            </div>
            <Link to="/mypage" className="mypage">
              마이페이지
            </Link>
            <div className="logout" onClick={logoutHandler}>
              logout
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
