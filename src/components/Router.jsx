import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./Header";
import MainPage from "../pages/MainPage";
import EditorPage from "../pages/EditorPage";
import LoginPage from "../pages/LoginPage";
import MypagePage from "../pages/MypagePage";
import SignupPage from "../pages/SignupPage";

const Router = () => {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/editor" element={<EditorPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/mypage" element={<MypagePage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default Router;
