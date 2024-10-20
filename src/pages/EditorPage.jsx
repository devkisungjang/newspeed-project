import React, { useState } from "react";
import "../styles/EditorPage.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const EditorPage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  // 사용자 입력값 받아오기
  const onChangeTitle = (e) => {
    setTitle(e.target.value);
  };

  const onChangeContent = (e) => {
    setContent(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newContent = { title, content };

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_LOCAL_SERVER}/posts`,
        newContent
      );
      console.log(response);
      if (response.status === 201 || response.status === 200) {
        alert("게시물이 성공적으로 등록되었습니다!");
        // 빈 문자열로 인풋창 비워줌
        setTitle("");
        setContent("");
        // 게시물 서버 업로드 성공하면 메인으로 보냄
        navigate("/");
      }
    } catch (error) {
      alert("게시물 업로드 실패");
    }
  };

  return (
    <div className="editor-wrapper">
      <div className="editor-contents">
        <h1>글을 작성해주세요</h1>
        <form action="" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="제목을 입력해주세요"
            className="title"
            value={title}
            onChange={onChangeTitle}
          />
          <textarea
            placeholder="글을 입력해주세요"
            value={content}
            onChange={onChangeContent}
          ></textarea>
          <button type="submit">게시하기</button>
        </form>
      </div>
    </div>
  );
};
export default EditorPage;
