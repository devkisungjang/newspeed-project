import React, { useState, useEffect } from "react";
import "../styles/LoginPage.scss";
import { Link } from "react-router-dom";

const LoginPage = () => {
  return (
    <form action="">
      <div className="login-wrapper">
        <div className="login-contents">
          <h1 className="login-logo">Login</h1>
          {/* 로그인, 비밀번호 입력창 */}
          <div className="login-form-fields">
            <input type="email" placeholder="이메일" />
            <input type="password" placeholder="비밀번호" />
          </div>
          {/* 로그인, 소셜로그인 */}
          <div className="login-btn-group">
            <div className="login-btn">로그인</div>
            <div className="social-login-btn">깃허브</div>
          </div>
          {/* 회원가입 */}
          <Link to="/signup">회원가입</Link>
        </div>
      </div>
    </form>
  );
};

export default LoginPage;
