import "../styles/MainPage.scss";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import supabase from "../supabase/index";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-regular-svg-icons";
import { faCircleUp } from "@fortawesome/free-regular-svg-icons";

const MainPage = () => {
  // 데이터 담을 배열
  const [posts, setPosts] = useState([]);
  // 로컬스토리지에있는 userData 가져옴
  const userData = JSON.parse(localStorage.getItem("userData"));

  // 수파베이스 전송
  useEffect(() => {
    const fetchItems = async () => {
      const response = await supabase
        .from("post")
        .select("*")
        // ascending -> 내림차순
        .order("created_at", { ascending: false });
      setPosts(response.data);
    };
    fetchItems();
  }, []);

  // 탑 스크롤 기능
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="mainPage-container">
      <div className="mainPage">
        <div className="aside">
          {userData === null ? null : (
            <Link to="/editor" className="editor-btn">
              글쓰기
            </Link>
          )}
        </div>
        <div className="contents">
          <FontAwesomeIcon
            icon={faCircleUp}
            size="2x"
            style={{ color: "#5c7ecb" }}
            className="topScroll-btn"
            onClick={scrollToTop}
          />
          {posts.map((post, index) => (
            <div className="content-wrapper" key={index}>
              <div className="content-user">
                <FontAwesomeIcon
                  icon={faCircleUser}
                  size="2x"
                  style={{ color: "#5c7ecb" }}
                />
                <h1 className="content-author">{post.author}</h1>
              </div>
              <div className="content-box">
                <h2 className="content-title">{post.title}</h2>
                <p className="content-main">{post.content}</p>
                {post.image ? (
                  <img
                    src={post.image}
                    alt={post.title}
                    className="content-image"
                  />
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainPage;
