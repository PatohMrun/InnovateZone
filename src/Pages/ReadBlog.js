import { useState, useEffect } from "react";
import { useHistory, useParams, Link } from "react-router-dom";
import {AiFillDelete, AiFillEdit} from 'react-icons/ai'
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
 
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    let hours = date.getHours();
    let minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    const month = date.toLocaleString('default', { month: 'short' });
    const day = date.getDate();
    const year = date.getFullYear();
    const formattedDate = `${month} ${day}, ${year}`;
    const formattedTime = hours + ':' + minutes + ' ' + ampm;
    return `${formattedDate} at ${formattedTime}`;
  };

// console.log(data.Date_created);
  return (
    <div className="myBlogs">
      {data && <h2 dangerouslySetInnerHTML={{ __html: data[0]["Title"] }} />}
      {data && <p style={{color:"blue", marginTop:"8px"}}>{formatTimestamp(data[0].Date_created)}</p>}
      {data && <div style={{marginTop:"10px"}} dangerouslySetInnerHTML={{ __html: data[0]["Content"] }} />}
      <br />
      {data && (
        <p style={{ float: "right", color: "blue" }}>
          Written by:{" "}
          <span dangerouslySetInnerHTML={{ __html: data[0]["Author"] }} />
        </p>
      )}
      {data && userRole === "admin" && <AiFillDelete size={30} onClick={Delete}/>}
      {data && userRole === "admin" &&  <Link to={'/Update/'+ id}><AiFillEdit size={30}/></Link>}
      {pending && <div>Loading...</div>}
      {Error && <div>An error occured...</div>}

   {!pending && !Error && <CommentMessages />}
     {!pending && !Error && <Replies />}
      <br />
    </div>
  );
};
export default ReadBlogs;
