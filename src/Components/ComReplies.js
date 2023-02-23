import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import usePostData from "./PostComments";
const Replies = () => {
  const { id } = useParams();
  const [CommmentSubmitted, setCommentSubmitted] = useState(false);
  const [formData, setformData] = useState({
    name: "",
    email: "",
    comments: "",
    id: id,
  });

  const handleInputChange = (event) => {
    setformData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  useEffect(() => {
    let timer;
    if (CommmentSubmitted) {
      timer = setTimeout(() => {
        setCommentSubmitted(false);
      }, 3000);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [CommmentSubmitted]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("https://blog-server-zeta.vercel.app/comments", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setCommentSubmitted(true);
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
      <form className="CommentForm" onSubmit={handleSubmit}>
        <h3>Leave a Reply</h3>
        <br />
        <textarea
          className="CommentInput"
          name="comments"
          id=""
          cols="30"
          rows="10"
          required
          onChange={handleInputChange}
          placeholder="Leave a comment here..."
        ></textarea>
        <br />
        <br />

        <h3>Name*</h3>
        <input
          className="CommentInput"
          htmlFor="name"
          type="text"
          name="name"
          id="name"
          required
          value={formData.name}
          onChange={handleInputChange}
        />
        <br />
        <br />

        <h3>Email*</h3>
        <input
          className="CommentInput"
          htmlFor="email"
          type="email"
          name="email"
          id="email"
          required
          value={formData.email}
          onChange={handleInputChange}
        />
        <br />
        <input
          style={{ backgroundColor: "gold", width: "30%" }}
          type="submit"
          value="Submit"
        />
      </form>
      {CommmentSubmitted && (
        <p style={{ color: "green" }}>Comment received successfully😄!</p>
      )}
    </div>
  );
};
export default Replies;
