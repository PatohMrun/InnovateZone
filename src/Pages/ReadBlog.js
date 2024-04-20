import { useState, useEffect } from "react";
import { useHistory, useParams, Link } from "react-router-dom";
import {AiFillDelete, AiFillEdit} from 'react-icons/ai'
import useFetch from "../Components/Fetch";
import CommentMessages from "../Components/ComMessages";
import Replies from "../Components/ComReplies";
import jwtDecode from 'jwt-decode';
import Cookies from 'js-cookie';
import toast, { Toaster } from 'react-hot-toast';

import "../styles/ReadBog.css";

const ReadBlogs = () => {
  const { id:paramId } = useParams();
  const id=paramId?.split("-")[0]
  const { data, pending, Error } = useFetch(
    "https://innovate-zone-server.vercel.app/blogs/" + id +"?api_key=UD9VZKyRU5eIZzPq"
  );
  // const [CommmentSubmitted, setCommentSubmitted] = useState(false);
  const history = useHistory();
  const Delete = async () => {
    await fetch("https://innovate-zone-server.vercel.app/blogs/" + id, {
      method: "DELETE",
    }).then((res) => {
      if (res.ok) {
        toast.success("Blog Deleted Successfully",{
          duration:2000,
          position:"top-center",
        });
        history.push("/");
      }
      else{
        toast.error("Error Deleting Blog",{
          duration:2000,
          position:"top-center",
        })
      }
      
    }).catch((error)=>{
      toast.error("Error Deleting Blog",{
        duration:2000,
        position:"top-center",
      })
      console.log(error);
    });
  };
//shared among the childrens to store the state of comments 
  const [comments, setComments] = useState([]);
  
  const [userRole, setUserRole] = useState(null);
  const [relatedBlogs, setRelatedBlogs] = useState([]);
  // console.log(relatedBlogs);

  useEffect(() => {
    const token = Cookies.get("tokens");
    if(token == null){
      return;
    }
    const decodedToken = jwtDecode(token);
    const role = decodedToken.role;
    setUserRole(role);
  }, []);

  useEffect(() => {
    // Fetch related blogs here
    const fetchRelatedBlogs = async () => {
      try {
        const response = await fetch("https://innovate-zone-server.vercel.app/blogs?api_key=UD9VZKyRU5eIZzPq");
        if (!response.ok) {
          throw new Error("Failed to fetch related blogs");
        }
        const data = await response.json();
        // Shuffle the blogs randomly
        const shuffledBlogs = await shuffleArray(data);
        // Take the first five blogs
        const selectedBlogs = shuffledBlogs.slice(0, 5);
        setRelatedBlogs(selectedBlogs);
      } catch (error) {
        console.error(error);
      }
    };

    fetchRelatedBlogs();
  }, []);

  const shuffleArray = (array) => {
    // Function to shuffle an array (Fisher-Yates shuffle algorithm)
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };
 
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
      {data && <h2 dangerouslySetInnerHTML={{ __html: data[0]["title"] }} />}
      {data && <p style={{color:"blue", marginTop:"8px", fontSize: "small"}}>{formatTimestamp(data[0].date_created)}</p>}
      {data && <div className="blog-content" style={{marginTop:"10px" }} dangerouslySetInnerHTML={{ __html: data[0]["content"] }} />}
      {data && <div className="my-2">
          <h3 className="font-bold text-xl">Also Read</h3>
          <blockquote className="font-bold text-gray-800">
          {relatedBlogs.map((blog) => (
                <h3 key={blog.id} className="my-2">
                  <a href={`/blogs/${blog.id}`} className="text-blue-500 hover:underline  border-b">
                  {blog.title.toLowerCase().charAt(0).toUpperCase() + blog.title.toLowerCase().slice(1)}.
                  </a>
                </h3>
              ))}
          </blockquote>

        </div>}
      <br />
      {data && (
        <p style={{ float: "right", fontSize:"medium", color: "blue" }}>
          Author:{" "}
          <span dangerouslySetInnerHTML={{ __html: data[0]["author"] }} />
        </p>
      )}
      {data && userRole === "admin" && 
      <div className="flex gap-3">
            <AiFillDelete size={30} onClick={()=>{
            if (window.confirm("Are you sure you want to delete this post?")) {
          Delete();
        }
          }}/>
          <Link to={'/Update/'+ id}><AiFillEdit size={30}/></Link>
      </div>
      }
      {pending && <div>Loading...</div>}
      {Error && <div>An error occured...</div>}

    {/* {!pending && !Error && <CommentMessages />}
    {!pending && !Error && <Replies />} */}
    {!pending && !Error && <CommentMessages comments={comments} setComments={setComments} />}
      {!pending && !Error && <Replies setComments={setComments} />}
      <br />
      <Toaster />
    </div>
  );
};
export default ReadBlogs;
