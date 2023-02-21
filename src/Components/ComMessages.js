import { useHistory, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { AiTwotoneLike } from "react-icons/ai";
import { FaComment, FaFacebook, FaShareAlt } from 'react-icons/fa';
import { RiWhatsappFill } from 'react-icons/ri';
import { GrTwitter } from 'react-icons/gr';
import { MdEmail } from 'react-icons/md';

import useFetch from "./Fetch";

const CommentMessages = () => {
  const { id } = useParams();
  const {
    data: comments,
    pending: pending2,
    error2,
  } = useFetch("http://localhost:8000/getComments/" + id);
  const {
    data: likes,
    pending: ped,
    error3,
  } = useFetch("http://localhost:8000/getlikes/" + id);
if(likes){
  console.log(likes);
  // <h3>Loading....</h3>
}

  const [replyForm, setreplyForm] = useState(false);
  const [CommentId, setCommentId] = useState(null);
  const [No_of_Likes, setLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [formData, setformData] = useState({
    name: "",
    email: "",
    comments: "",
    id: id,
    parent_comment_id: "",
  });
  const handleInputChange = (event) => {
    setformData({
      ...formData,
      [event.target.name]: event.target.value,
      parent_comment_id: CommentId,
    });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/comments", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setformData({
          name: "",
          email: "",
          comments: "",
        });
        window.location.reload();
      } else if (!response.ok) {
        throw new Error("Error posting comment");
      }
    } catch (error) {
      console.error(error);
    }
  };

  // console.log(Likes_data);
  const handleLikeClick = async() => {
    // setIsLiked(!isLiked);
    setIsLiked(true);
    localStorage.setItem(`iconStyle_${id}`, true)
    const Likes_data={
      post_id:id,
      isLiked:1,
    }
    setLikes(parseInt(No_of_Likes) + 1);
    const response= await fetch("http://localhost:8000/like", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify( Likes_data ),   
    })
  
  }
  

  const check = localStorage.getItem(`iconStyle_${id}`);
  const iconStyle = {
    color: check ? "red" : "black",
    margin:"5px",
    pointerEvents: check ? 'none' : 'auto'
  };
  useEffect(() => {
    if (likes) {
      if(likes.length){
      setLikes(likes[0].isLiked);
      }
    }
  }, [likes]);


  const currentUrl = window.location.href; // get the current page URL

  // share URLs for social media platforms
  const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`;
  const twitterShareUrl = `https://twitter.com/intent/tweet?url=${currentUrl}`;
  const whatsappShareUrl = `https://wa.me/?text=${currentUrl}`;
  const emailShareUrl = `https://mail.google.com/mail/?view=cm&to=youngprofessor991@gmail.com?body=${encodeURIComponent(currentUrl)}`;

    // state to control the popup window
    const [popupWindow, setPopupWindow] = useState(null);

    // function to open the popup window
    const openPopupWindow = (url, windowName) => {
      const left = (window.screen.width / 2) - (600 / 2);
       const top = (window.screen.height / 2) - (600 / 2);
       const windowOptions = `toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=600,height=600,left=${left},top=${top}`;
      const newWindow = window.open(url, windowName, windowOptions);
      setPopupWindow(newWindow);
    };
  
    // function to close the popup window
    const closePopupWindow = () => {
      if (popupWindow) {
        popupWindow.close();
        setPopupWindow(null);
      }
    };
  return (
    <div>
      <div style={{ marginLeft: "10px", margin: "10px", marginTop: "70px" }}>
        <div className="Social-icons">
         <AiTwotoneLike
            size={26}
            style={iconStyle}
            onClick={handleLikeClick}
          />
          <FaComment
            style={{color:"#D36000", margin:"5px"}}
            size={26}
          />
           <div style={{ float: "right" }}>
      <FaShareAlt style={{ color: "#17ACCD", margin: "5px" }} size={26} onClick={() => openPopupWindow(currentUrl, "Share")} />
      <FaFacebook style={{ color: "#1773EA", margin: "5px" }} size={26} onClick={() => openPopupWindow(facebookShareUrl, "Facebook")} />
      <GrTwitter style={{ color: "#1C96E8", margin: "5px" }} size={26} onClick={() => openPopupWindow(twitterShareUrl, "Twitter")} />
      <RiWhatsappFill style={{ color: "#53CC60", margin: "5px" }} size={26} onClick={() => openPopupWindow(whatsappShareUrl, "WhatsApp")} />
      <MdEmail style={{ color: "#D64135", margin: "5px" }} size={26} onClick={() => openPopupWindow(emailShareUrl, "Email")} />
      <h4
        style={{
          borderRadius: "50%",
          width: "30px",
          height: "30px",
          backgroundColor: "lightblue",
          textAlign: "center",
          lineHeight: "30px",
        }}
        onClick={closePopupWindow}
      >
        12
      </h4>
    </div>
          <h4
            style={{
              borderRadius: "50%",
              width: "30px",
              height: "30px",
              backgroundColor: "lightblue",
              textAlign: "center",
              lineHeight: "30px",
            }}
          >
            {No_of_Likes}
          </h4>
        </div>
      </div>
      <h3 style={{textAlign:"center", textDecoration:'underline', margin:"10px"}}>Comments</h3>
      {comments &&
      comments.filter((comment) => comment.post_id == id).length > 0 ? null : (
        <p style={{ textAlign: "center", margin: "40px" }}>
          Be the first one to comment!
        </p>
      )}
      {comments &&
        comments
          .filter(
            (comment) => comment.post_id == id && !comment.parent_comment_id
          )
          .map((comment, index) => (
            <div
              style={{
                backgroundColor: "white",
                marginBottom: "20px",
                padding: "20px",
              }}
              key={index}
            >
              <h3>{comment.name}</h3>
              {comment.content}
              <br />

              {comments &&
                comments
                  .filter(
                    (reply) => reply.parent_comment_id == comment.comment_id
                  )
                  .map((reply, index) => (
                    <div
                      style={{
                        backgroundColor: "#F0FFF0",
                        marginBottom: "10px",
                        padding: "10px",
                        marginLeft: "20px",
                      }}
                      key={index}
                    >
                      <h5>{reply.name}</h5>
                      <p style={{ fontSize: "15px" }}>{reply.content}</p>
                    </div>
                  ))}
              <p
                style={{ fontSize: "12px", float: "right", cursor: "pointer" }}
                onClick={() => {
                  setreplyForm(!replyForm);
                  setCommentId(comment.comment_id);
                }}
              >
                Reply
              </p>
              {replyForm && CommentId === comment.comment_id && (
                <form
                  onSubmit={handleSubmit}
                  style={{
                    width: "40%",
                    marginLeft: "0",
                    backgroundColor: "white",
                  }}
                  action=""
                >
                  <h4>Reply</h4>
                  <textarea
                    style={{ padding: "5px" }}
                    name="comments"
                    id=""
                    cols="5"
                    rows="8"
                    onChange={handleInputChange}
                    required
                  ></textarea>
                  <br />
                  <h4>Name:</h4>
                  <input
                    type="text"
                    name="name"
                    style={{ height: "30px" }}
                    value={formData.name}
                    required
                    onChange={handleInputChange}
                  />
                  <br />
                  <h4>Email:</h4>
                  <input
                    type="text"
                    name="email"
                    style={{ height: "30px" }}
                    value={formData.email}
                    required
                    onChange={handleInputChange}
                  />
                  <button type="submit">Submit</button>
                </form>
              )}
            </div>
          ))}
    </div>
  );
};
export default CommentMessages;