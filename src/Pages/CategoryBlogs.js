import Blogs from '../Components/BlogsMapping';
import useFetch from "../Components/Fetch";
import React, { useState, useEffect } from 'react';
import "../styles/categoryBlogs.css"
import jwtDecode from 'jwt-decode';
import Cookies from 'js-cookie';

const CategoryBlogs = ({ category, title }) => {
  const [userRole, setUserRole] = useState(null);
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const token = Cookies.get("tokens");
    if(token == null){
      return;
    }
    const decodedToken = jwtDecode(token);
    const role = decodedToken.role;
    const email = decodedToken.email;
    setUserEmail(email);
    setUserRole(role);
  }, []);

  const { data, pending, Errors } = useFetch("https://blog-server-kohl.vercel.app/blogs?api_key=UD9VZKyRU5eIZzPq")
  let filteredData = null;
  let blogCountsByUser = {};
  let AllBlog = null;
  if (data !== null) {
    if (userRole === "admin") {
      if (userEmail === "jgathiru02@gmail.com") {
        filteredData = data.filter((data) => data.blogtype === category );
        // console.log(filteredData.length)
        AllBlog += filteredData.length;
      } else {
        filteredData = data.filter((blog) => blog.email === userEmail && blog.blogtype === category);
        filteredData.forEach((blog) => {
          blogCountsByUser[blog.email] =
            (blogCountsByUser[blog.email] || 0) + 1;
        });
      }
    } else {
      filteredData = data.filter((data) => data.blogtype === category);
    }
  }
  let blogTitless = [];
if (filteredData !== null) {
  blogTitless = filteredData.map(blog => {
    // Capitalize the first letter of each title
    const capitalizedTitle = blog.title.charAt(0).toUpperCase() + blog.title.slice(1).toLowerCase();
    return capitalizedTitle;
  });
}

  // console.log(blogCountsByUser);
  let blogCounted = null;
  Object.keys(blogCountsByUser).forEach((email) => {
    blogCounted = +blogCountsByUser[email];
  });
  const showStatistics = userRole !== null && userRole !== "user";

  return (
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

      <div className="GuestBlogger">
        {Errors ? (
          <div className="SpecificBlog">
            <h3 style={{ color: "#444444" }}>The server is currently unavailable ☹. Try again later!</h3>
          </div>
        ) : pending ? (
          <div className="SpecificBlog">
            <h2 style={{ color: "#444444" }}>Loading...</h2>
          </div>
          ) : filteredData !== null && filteredData.length > 0 ? (
              <Blogs data={filteredData} blogTitless={blogTitless} title={title} />
          ):(
          //show no items found
          <div className="SpecificBlog">
            <h3 style={{ color: "#444444" }}>No items found</h3>
          </div>
          )}
        {/* {Errors && <div className="SpecificBlog"> <h3 style={{color: "#444444"}}>The server is currently unavailable ☹. Try again later!</h3> </div>}
        {pending && <div className="SpecificBlog"> <h2 style={{color: "#444444"}}>Loading...</h2></div>}
        {data && <Blogs data={filteredData} title={title} />} */}
      </div>
    </div>
  );
}

const Technologies = () => <CategoryBlogs category="Technologies" title="Technology"/>;
const Entrepreneur = () => <CategoryBlogs category="Enterprenuer skills" title="Become expert in enterprenuer field"/>;
const BusinessIdeas = () => <CategoryBlogs category="Business Ideas" title="145 business ideas..."/>;

export { Technologies, Entrepreneur, BusinessIdeas };
