import React from "react";
import "../styles/SignupPage.scss";
import axios from "axios";

const SignupPage = () => {
  return (
    <form action="">
      <div className="signup-wrapper">
        <div className="signup-contents">
          <h1 className="signup-logo">Signup</h1>
          {/* 이메일, 비밀번호, 비밀번호 확인 입력창*/}
          <div className="signup-form-fields">
            <input type="email" placeholder="이메일" />
            <input type="password" placeholder="비밀번호" />
            <input type="password" placeholder="비밀번호 확인" />
          </div>
          {/* 로그인, 소셜로그인 */}
          <div className="signup-btn-group">
            <button type="submit" className="signup-btn">
              회원가입
            </button>
          </div>
          {/* 회원가입 */}
        </div>
      </div>
    </form>
  );
};

export default SignupPage;
