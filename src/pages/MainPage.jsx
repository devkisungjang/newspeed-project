import "../styles/MainPage.scss";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import supabase from "../supabase/index";

const MainPage = () => {
  const [posts, setPosts] = useState([]);
  const userData = JSON.parse(localStorage.getItem("userData"));

  useEffect(() => {
    const fetchItems = async () => {
      const response = await supabase.from("post").select("*");
      setPosts(response.data);
    };
    fetchItems();
  }, []);

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
          {posts.map((post, index) => (
            <div className="content-wrapper" key={index}>
              <h1>{post.author}</h1>
              <div className="content-box">
                <h2>{post.title}</h2>
                <p>{post.content}</p>
                {post.image ? <img src={post.image} alt={post.title} /> : null}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainPage;
