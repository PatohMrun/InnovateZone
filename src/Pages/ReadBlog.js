import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import useFetch from "../Components/Fetch";
import CommentMessages from "../Components/ComMessages";
import Replies from "../Components/ComReplies";
import jwtDecode from 'jwt-decode';
import Cookies from 'js-cookie';

import "../styles/ReadBog.css";

const ReadBlogs = () => {
  const { id } = useParams();
  const { data, pending, Error } = useFetch(
    "https://blog-server-zeta.vercel.app/blogs/" + id
  );
  // const [CommmentSubmitted, setCommentSubmitted] = useState(false);
  const history = useHistory();
  const Delete = async () => {
    await fetch("https://blog-server-zeta.vercel.app/blogs/" + id, {
      method: "DELETE",
    }).then(() => {
      console.log("Deleted");
      history.push("/");
    });
  };
  
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const token = Cookies.get("tokens");
    if(token == null){
      return;
    }
    const decodedToken = jwtDecode(token);
    const role = decodedToken.role;
    setUserRole(role);
  }, []);
 
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

      <CommentMessages />
      <Replies />
      <br />

      {data && userRole === "admin" && <button onClick={Delete}>Delete Post</button>}
    </div>
  );
};
export default ReadBlogs;
