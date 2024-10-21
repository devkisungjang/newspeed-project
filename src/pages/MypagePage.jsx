import "../styles/MypagePage.scss";
import { useEffect, useState } from "react";
import supabase from "../supabase/index";

const MypagePage = () => {
  // 데이터 가져오기
  const [items, setItems] = useState([]);
  const userData = JSON.parse(localStorage.getItem("userData"));
  useEffect(() => {
    const fetchItems = async () => {
      const response = await supabase
        .from("post")
        .select("*")
        .eq("user_id", userData.id);
      // const { data, error } = await supabase.from("post").select("*");
      // if (error) console.error("Error fetching items:", error);
      // else setItems(data);
      // console.log(data);
      setItems(response.data);
      console.log(items);
    };
    fetchItems();
  }, []);

  const onDeleteHandler = () => {};

  const onUpdateHandler = () => {};

  return (
    <div>
      {items
        // .filter((data) => data.user_id === userData.id)
        .map((value, index) => (
          <div key={index}>
            <p>{value.author}</p>
            <p>{value.title}</p>
            <p>{value.content}</p>
            <button onClick={onUpdateHandler}>수정</button>
            <button onClick={onDeleteHandler}>삭제</button>
          </div>
        ))}
    </div>
  );
};

export default MypagePage;
