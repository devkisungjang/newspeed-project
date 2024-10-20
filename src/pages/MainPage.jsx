import "../styles/MainPage.scss";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const MainPage = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // 서버 URL을 환경 변수에서 불러옴
        const response = await axios.get(
          `${process.env.REACT_APP_LOCAL_SERVER}/posts`
        );
        setPosts(response.data);
      } catch (error) {
        alert("게시물 로드 중 오류 발생");
      }
    };

    fetchPosts();
  }, []);
  return (
    <div className="mainPage-container">
      <div className="mainPage">
        <div className="aside">
          <Link to="/editor" className="editor-btn">
            글쓰기
          </Link>
        </div>
        <div className="contents">
          {posts.map((value, index) => (
            <div key={index}>
              <p>{value.index}</p>
              <h2>{value.title}</h2>
              <p>{value.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainPage;
