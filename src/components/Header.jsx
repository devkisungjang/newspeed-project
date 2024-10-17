import React from "react";
import "../styles/Header.scss";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="header">
      <Link to="/" className="logo">
        MangoGram
      </Link>

      <div className="button-group">
        <Link to="/login" className="login">
          로그인
        </Link>
        <Link to="/mypage" className="mypage">
          마이페이지
        </Link>
      </div>
    </div>
  );
};

export default Header;
