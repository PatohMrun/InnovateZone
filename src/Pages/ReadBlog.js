import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import useFetch from "../Components/Fetch";
import CommentMessages from "../Components/ComMessages";
import Replies from "../Components/ComReplies";

import "../styles/ReadBog.css";

const ReadBlogs = () => {
  const { id } = useParams();
  const { data, pending, Error } = useFetch(
    "http://localhost:8000/blogs/" + id
  );
  // const [CommmentSubmitted, setCommentSubmitted] = useState(false);
  const history = useHistory();
  const Delete = async () => {
    await fetch("http://localhost:8000/blogs/" + id, {
      method: "DELETE",
    }).then(() => {
      console.log("Deleted");
      history.push("/");
    });
  };
  
 
  return (
    <div className="myBlogs">
      {data && <h2 dangerouslySetInnerHTML={{ __html: data[0]["Title"] }} />}
      {data && <div dangerouslySetInnerHTML={{ __html: data[0]["Content"] }} />}
      <br />
      {data && (
        <p style={{ float: "right", color: "blue" }}>
          Written by:{" "}
          <span dangerouslySetInnerHTML={{ __html: data[0]["Author"] }} />
        </p>
      )}
      {pending && <div>Loading...</div>}
      {Error && <div>An error occured...</div>}

      {/* <h3
        style={{
          textAlign: "center",
          fontSize: "1.4rem",
          textDecoration: "underline",
          margin: "10px",
        }}
      >
        Comments
      </h3> */}
      <CommentMessages />
      <Replies />
      <br />
      {data && <button onClick={Delete}>Delete Post</button>}
    </div>
  );
};
export default ReadBlogs;
