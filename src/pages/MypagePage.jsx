import "../styles/MypagePage.scss";
import moment from "moment";
import { useEffect, useState } from "react";
import supabase from "../supabase/index";

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
      console.log(items);
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
    <div className="mapage">
      {items.map((value, index) => (
        <div key={index}>
          <p>{value.author}</p>
          {/* <p>{value.image}</p> */}
          <p>
            글 쓴 날짜 :{" "}
            {moment(value.created_at).format("YYYY년 MM월 DD일 HH:mm:ss")}
          </p>
          <p>
            수정한 날짜 :{" "}
            {moment(value.updated_at).format("YYYY년 MM월 DD일 HH:mm:ss")}
          </p>
          <p>기존 제목 : {value.title}</p>
          {showInput === value.id ? (
            <input value={newTitle} onChange={onChangeNewTitleHandler} />
          ) : null}
          <p>기존 본문 : {value.content}</p>
          {showInput === value.id ? (
            <input value={newContent} onChange={onChangeNewContentHandler} />
          ) : null}

          <button
            onClick={() => {
              onUpdateHandler(value);
            }}
          >
            {showInput === value.id ? "확인" : "수정"}
          </button>
          <button
            type="submit"
            onClick={() => {
              onDeleteHandler(value.id);
            }}
          >
            삭제
          </button>
        </div>
      ))}
    </div>
  );
};

export default MypagePage;
