import React from "react";
import "../styles/MainPage.scss";
import { Link } from "react-router-dom";

const MainPage = () => {
  return (
    <div className="mainPage-container">
      <div className="mainPage">
        <div className="aside">
          <Link to="/editor" className="editor-btn">
            글쓰기
          </Link>
          <div className="aside-menu-wrapper">
            <div className="menu">👉 메뉴01</div>
            <div className="menu">👉 메뉴02</div>
          </div>
        </div>
        <div className="contents"></div>
      </div>
    </div>
  );
};

export default MainPage;
