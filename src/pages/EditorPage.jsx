import { useState } from "react";
import "../styles/EditorPage.scss";
import { useNavigate } from "react-router-dom";
import supabase from "../supabase/index";

const EditorPage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();
  // 이미지
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  // 이미지 체인지 핸들러
  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };
  // 이미지 업로드 핸들러
  const handleUpload = async () => {
    const bucket = "images"; // 버킷 이름으로 변경
    const fileName = `${Date.now()}_${imageFile.name.replace(
      /[^a-zA-Z0-9.]/g,
      "_"
    )}`;

    const { error } = await supabase.storage
      .from(bucket)
      .upload(fileName, imageFile);
    if (error) {
      console.error("이미지 업로드 중 에러 발생", error);
      return;
    }
    const publicUrl = supabase.storage.from(bucket).getPublicUrl(fileName);

    console.log(publicUrl);

    setImageUrl(publicUrl.data.publicUrl);
  };

  // 사용자 입력값 받아오기
  const onChangeTitle = (e) => {
    setTitle(e.target.value);
  };

  const onChangeContent = (e) => {
    setContent(e.target.value);
  };

  const userData = JSON.parse(localStorage.getItem("userData"));

  //데이터 전송 - 제목, 콘텐츠
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newData = {
      user_id: userData.id,
      author: userData.username,
      title: title,
      content: content,
      image: imageUrl,
    };
    try {
      const response = await supabase.from("post").insert(newData);
      if (!title) {
        alert("제목을 입력해주세요");
        return;
      } else if (!content) {
        alert("본문을 입력해주세요");
        return;
      }
      console.log(response);
      alert("게시물 전송 완료");
      navigate("/");
    } catch (error) {
      alert("게시물 전송 중 오류 발생");
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
          <div className="image-wrapper">
            <div className="image-content">
              <input type="file" onChange={handleImageChange} />
              {imageUrl && (
                <img src={imageUrl} alt="Uploaded" style={{ width: "100px" }} />
              )}
            </div>
          </div>
          <div className="btn-group">
            <button type="submit">게시하기</button>
            <div className="upload-btn" onClick={handleUpload}>
              사진 업로드
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
export default EditorPage;
