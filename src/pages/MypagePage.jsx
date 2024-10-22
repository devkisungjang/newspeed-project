import "../styles/MypagePage.scss";
import moment from "moment";
import { useEffect, useState } from "react";
import supabase from "../supabase/index";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-regular-svg-icons";
import { faCalendarDays } from "@fortawesome/free-regular-svg-icons";

const MypagePage = () => {
  // 데이터 가져오기
  const [items, setItems] = useState([]);
  // 수정중일때 보여줄 인풋창
  const [showInput, setShowInput] = useState(null);
  // 로컬스토리지에 있는 유저정보 파싱해서 가져옴
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const userData = JSON.parse(localStorage.getItem("userData"));

  // 수파베이스 post 테이블 정보 가져옴
  useEffect(() => {
    const fetchItems = async () => {
      const response = await supabase
        .from("post")
        .select("*")
        .eq("user_id", userData.id)
        .order("created_at", { ascending: false });
      setItems(response.data);
    };
    fetchItems();
  }, []);

  const onDeleteHandler = async (postId) => {
    const { error } = await supabase.from("post").delete().eq("id", postId);
    if (!error) {
      alert("게시물 삭제 완료");
      window.location.reload();
    } else {
      alert("게시물 삭제 실패");
    }
  };

  const onUpdateHandler = async (value) => {
    if (showInput !== value.id) {
      setShowInput(value.id);
    } else {
      const { error } = await supabase
        .from("post")
        .update({ ...value, title: newTitle, content: newContent })
        .eq("id", value?.id);
      if (!error) {
        alert("게시물 수정 완료");
        // 자동 새로고침
        window.location.reload();
      } else {
        alert("게시물 수정 실패");
      }
    }
  };

  const onChangeNewTitleHandler = (e) => {
    setNewTitle(e.target.value);
  };

  const onChangeNewContentHandler = (e) => {
    setNewContent(e.target.value);
  };

  return (
    <div className="mypage">
      <h1>내가 작성한 게시물 list 😄</h1>
      {items.map((value, index) => (
        <div className="content-container">
          <div className="content-wrapper" key={index}>
            <div className="author-group">
              <FontAwesomeIcon
                icon={faCircleUser}
                size="2x"
                style={{ color: "#5c7ecb" }}
              />
              <p>{value.author}</p>
            </div>
            <div className="date-group">
              <FontAwesomeIcon
                icon={faCalendarDays}
                size="2x"
                style={{ color: "#5c7ecb" }}
              />
              <div className="date-content">
                <p>
                  <span style={{ fontWeight: "600" }}>글 쓴 날짜</span> :{" "}
                  {moment(value.created_at).format("YYYY년 MM월 DD일 HH:mm:ss")}
                </p>
                <p>
                  {" "}
                  <span style={{ fontWeight: "600" }}>수정한 날짜</span> :{" "}
                  {moment(value.updated_at).format("YYYY년 MM월 DD일 HH:mm:ss")}
                </p>
              </div>
            </div>
            <p>기존 제목 : {value.title}</p>
            {showInput === value.id ? (
              <input
                value={newTitle}
                onChange={onChangeNewTitleHandler}
                className="newTitle-input"
                placeholder="바꿀 제목을 입력해주세요"
              />
            ) : null}
            <p>기존 본문 : {value.content}</p>
            {showInput === value.id ? (
              <textarea
                value={newContent}
                onChange={onChangeNewContentHandler}
                style={{ maxWidth: "1014px" }}
                className="newContent-input"
                placeholder="바꿀 내용을 입력해주세요"
              />
            ) : null}
            <div className="button-group">
              <button
                onClick={() => {
                  onUpdateHandler(value);
                }}
                className="update-button"
              >
                {showInput === value.id ? "확인" : "수정"}
              </button>
              <button
                type="submit"
                onClick={() => {
                  onDeleteHandler(value.id);
                }}
                className="delete-button"
              >
                삭제
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MypagePage;
