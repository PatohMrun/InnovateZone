import Blogs from '../Components/BlogsMapping';
import useFetch from "../Components/Fetch";
import React, { useState, useEffect } from 'react';
import "../styles/categoryBlogs.css"
import jwtDecode from 'jwt-decode';
import Cookies from 'js-cookie';

// To know the role of user and grant them permission to add blog
const ListedBlogs= ()=>{
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
  
  const { data, pending, Errors}=useFetch("https://blog-server-zeta.vercel.app/blogs")
    return(
        <div>
      {userRole === "admin" ? (
        <div id="UpdateBlog">
          <a id="AddBlog" href="/Add blogs">
            Add Blog
          </a>
        </div>
      ) : (
        
        <div></div>
      )}
        <div className="blogs">
            {Errors && <div className="SpecificBlog">The server is unavailable currently ☹. Try again later</div>}
            {pending && <div className="SpecificBlog"> <h3>loading...</h3></div>}
            {data && <Blogs data={data} title="Get insighted by powerful blogs"/>
            }
            <br />
        </div>
        </div>
    );
}
export default ListedBlogs;
