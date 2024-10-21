import { useState } from "react";
import "../styles/LoginPage.scss";
import { Link, useNavigate } from "react-router-dom";
import supabase from "../supabase/index";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const onLoginHandler = async (e) => {
    e.preventDefault();

    const validation = await supabase
      .from("user")
      .select("*")
      .eq("email", email);
    console.log(validation);
    if (!email) {
      alert("이메일을 입력해주세요");
      return;
    } else if (!password) {
      alert("비밀번호를 입력해주세요");
      return;
    }
    if (validation.data.length == 0) {
      alert("사용자 이메일이 일치하지 않습니다");
    } else if (validation.data[0].password !== password) {
      alert("비밀번호가 틀렸습니다");
    } else {
      alert("로그인에 성공했습니다");
      localStorage.setItem("userData", JSON.stringify(validation.data[0]));
      navigate("/");
    }
  };

  return (
    <form action="" onSubmit={onLoginHandler}>
      <div className="login-wrapper">
        <div className="login-contents">
          <h1 className="login-logo">Login</h1>
          {/* 로그인, 비밀번호 입력창 */}
          <div className="login-form-fields">
            <input
              type="email"
              placeholder="이메일"
              onChange={onChangeEmail}
              value={email}
            />
            <input
              type="password"
              placeholder="비밀번호"
              onChange={onChangePassword}
              value={password}
            />
          </div>
          {/* 로그인, 소셜로그인 */}
          <div className="login-btn-group">
            <button className="login-btn" type="submit">
              로그인
            </button>
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
