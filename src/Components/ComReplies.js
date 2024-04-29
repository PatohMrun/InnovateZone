import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import usePostData from "./PostComments";
import toast, { Toaster } from "react-hot-toast";
const Replies = ({ setComments }) => {
  const { id:paramId } = useParams();
  const id=paramId?.split("-")[0]
  
  const [CommmentSubmitted, setCommentSubmitted] = useState(false);
  const [formData, setformData] = useState({
    name: "",
    email: "jgathiru02@gmail.com",
    comments: "",
    id: id,
  });
  const [loading, setLoading] = useState(false);
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
      setLoading(true);
      const response = await fetch(
        "https://blog-server-kohl.vercel.app/comments",
        {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(formData),
        }
      );
      if (response.ok) {
        const newComment = await response.json();
        console.log(newComment.addedComment);
        setCommentSubmitted(true);
        setformData({
          name: "",
          email: "",
          comments: "",
        });
  
        setComments(prevComments => [...prevComments, newComment.addedComment]);
        setLoading(false);
        toast.success("Comment posted successfully", {
          duration: 3000,
          position: "top-center",
        });
        // window.location.reload();
      } else if (!response.ok) {
        throw new Error("Error posting comment");
      }
    } catch (error) {
      // console.error(error);
      setLoading(false);
      toast.error("Error posting comment. try again", {
        duration: 3000,
        position: "top-center",
      });
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
          rows="5"
          required
          value={formData.comments}
          onChange={handleInputChange}
          placeholder="Leave a comment here..."
        ></textarea>
        <br />

        <h3>Name*</h3>
        <input
          className="CommentInput"
          htmlFor="name"
          type="text"
          name="name"
          id="name"
          placeholder="your cool username"
          required
          value={formData.name}
          onChange={handleInputChange}
        />
        <br />
        <br />

        {/* <h3>Email*</h3>
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
        <br /> */}
        <button
          type="submit"
          onSubmit={handleSubmit}
          disabled={loading}
          style={{
            backgroundColor: "#1E83F7",
            transition: "background-color 0.3s", 
            ":hover": {
              backgroundColor: "#CCE1FA" 
            }
          }}
          
          className="hover:bg-blue-200"
        >
          {loading ? (
            <div className="loader cursor-not-allowed">submiting...</div>
          ) : (
            <p>Submit</p>
          )}
        </button>
      </form>
      {CommmentSubmitted && (
        <p style={{ color: "green" }}>Comment received successfully😄!</p>
      )}
      <Toaster />
    </div>
  );
};
export default Replies;

