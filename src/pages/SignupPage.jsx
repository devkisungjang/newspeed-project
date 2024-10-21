import React, { useState } from "react";
import "../styles/SignupPage.scss";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import supabase from "../supabase/index";

const SignupPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const onChangeUserName = (e) => {
    setUserName(e.target.value);
  };
  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const onChangeConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const newUser = {
      email: email,
      username: userName,
      password: password,
    };
    try {
      const validation = await supabase
        .from("user")
        .select("*")
        .eq("email", email);
      if (validation.data.length != 0) {
        alert("중복 된 이메일입니다.");
        console.log(validation.data);
        return;
      }

      if (!email) {
        alert("이메일을 입력해주세요");
        return;
      } else if (!userName) {
        alert("이름을 입력해주세요");
        return;
      } else if (!password) {
        alert("비밀번호를 입력해주세요");
        return;
      } else if (!confirmPassword) {
        alert("비밀번호를 한번 더 입력해주세요");
        return;
      } else if (confirmPassword != password) {
        alert("비밀번호가 일치 하지 않습니다.");
        return;
      }

      const response = await supabase.from("user").insert(newUser);
      console.log(response);
      if (response.status != 201) {
        alert("필수 항목을 입력해주세요");
      } else {
        alert("회원가입이 완료되었습니다!");
        navigate("/login");
      }
    } catch (error) {
      alert("에러가 발생했습니다");
    }
  };

  return (
    <form action="" onSubmit={onSubmitHandler}>
      <div className="signup-wrapper">
        <div className="signup-contents">
          <h1 className="signup-logo">Signup</h1>
          {/* 이메일, 비밀번호, 비밀번호 확인 입력창*/}
          <div className="signup-form-fields">
            <input
              type="email"
              placeholder="이메일"
              value={email}
              onChange={onChangeEmail}
            />
            <input
              type="userName"
              placeholder="이름"
              value={userName}
              onChange={onChangeUserName}
            />
            <input
              type="password"
              placeholder="비밀번호"
              value={password}
              onChange={onChangePassword}
            />
            <input
              type="password"
              placeholder="비밀번호 확인"
              value={confirmPassword}
              onChange={onChangeConfirmPassword}
            />
            <div>
              {confirmPassword !== password ? (
                <p style={{ color: "red", fontSize: "10px" }}>
                  입력하신 비밀번호와 맞지 않습니다.
                </p>
              ) : null}
            </div>
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
