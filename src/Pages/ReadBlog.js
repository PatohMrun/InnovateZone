import { useState , useEffect} from "react";
import { useHistory, useParams } from "react-router-dom";
import useFetch from "../Components/Fetch";

const ReadBlogs = () => {
  const { id } = useParams();
  const { data, pending, Error } = useFetch(
    "http://localhost:8000/blogs/" + id
  );
const [CommmentSubmitted, setCommentSubmitted]=useState(false)
  const history = useHistory();
  const Delete = async () => {
    await fetch("http://localhost:8000/blogs/" + id, {
      method: "DELETE",
    }).then(() => {
      console.log("Deleted");
      history.push("/");
    });
  };

  const {
    data: comments,
    pending: pending2,
    Errors: errors2,
  } = useFetch("http://localhost:8000/getComments/" + id);

  const [formData, setformData] = useState({
    name: "",
    email: "",
    comments: "",
    id: id,
  });

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

  const handleInputChange = (event) => {
    setformData({
      ...formData,
      [event.target.name]: event.target.value,
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
          setCommentSubmitted(true)
          setformData({
            name: "",
            email: "",
            comments: "",
          })
    window.location.reload();
      }
      else if (!response.ok) {
        throw new Error("Error posting comment");
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="myBlogs">
      {data && (
         <h2 dangerouslySetInnerHTML={{__html: data[0]["Title"]}} />
      )}
      {data && (
         <div dangerouslySetInnerHTML={{__html: data[0]["Content"]}} />
      )}
      <br />
      {data && (
        <p style={{ float: "right" , color:"blue"}}>
        Written by: <span dangerouslySetInnerHTML={{__html: data[0]["Author"]}} />
      </p>
      )}
      {pending && <div>Loading...</div>}
      {Error && <div>An error occured...</div>}
      <br />
      <br />
      <br />

      <h3 style={{textAlign:"center", fontSize:"1.4rem", textDecoration:"underline", margin:"10px"}}>Comments</h3>
      {comments &&
      comments.filter((comment) => comment.id == id).length > 0 ? null : (
        <div>
          <p style={{textAlign:"center", margin:"40px"}}>Be the first one to comment!</p>
        </div>
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
            </div>
          ))}

      <form className="CommentForm"
        style={{ width: "80%", backgroundColor: "#F5F5DC" }}
        onSubmit={handleSubmit}
      >
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
      {CommmentSubmitted && <p style={{color:"green"}}>Comment received successfully😄!</p>}
      <br />
      {data &&<button onClick={Delete}>Delete Post</button>}
    </div>
  );
};
export default ReadBlogs;
