import { useHistory, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import useFetch from "./Fetch";

const CommentMessages = () => {
  const { id } = useParams();
  const { data: comments, pending: pending2, error2 } = useFetch("http://localhost:8000/getComments/" + id);
  const [replyForm, setreplyForm] = useState(false);
  const [CommentId, setCommentId] = useState(null);
  const [formData, setformData] = useState({
    name: "",
    email: "",
    comments: "",
    id: '',
  });
  
  const handleInputChange = (event) => {
    console.log(CommentId);
    setformData({
      ...formData,
      [event.target.name]: event.target.value,
      id:CommentId
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

  return (
    <div>
      {comments && comments.filter((comment) => comment.id == id).length > 0 ? null : (
        <p style={{ textAlign: "center", margin: "40px" }}>
          Be the first one to comment!
        </p>
      )}
      {comments &&
        comments
          .filter((comment) => comment.id == id)
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
              {comment.comment}
              <p
                style={{ fontSize: "12px", float: "right", cursor: "pointer" }}
                onClick={() => {
                  setreplyForm(!replyForm);
                  setCommentId(comment.CID);
                  console.log(comment);
                }}
              >
                Reply
              </p>
              {replyForm && CommentId === comment.CID && (
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
                  <textarea name="comments" id="" cols="5" rows="8"
                    onChange={handleInputChange}
                  ></textarea>
                  <br />
                  <h4>Name:</h4>
                  <input type="text" name="name" style={{ height: "30px" }} 
                  value={formData.name}
                  onChange={handleInputChange}
                  />
                  <br />
                  <h4>Email:</h4>
                  <input type="text" name="email" style={{ height: "30px" }} 
                  value={formData.email}
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
