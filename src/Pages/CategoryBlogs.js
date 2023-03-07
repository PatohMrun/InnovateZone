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

  const { data, pending, Errors } = useFetch("https://blog-server-zeta.vercel.app/Blogs")
console.log(data);
console.log(userEmail);
  let filteredData = null;
  let blogCountsByUser = {};
  let AllBlog = null;
  if (data !== null) {
    if (userRole === "admin") {
      if (userEmail === "jgathiru02@gmail.com") {
        filteredData = data.filter((data) => data.BlogType === category );
        // console.log(filteredData.length)
        AllBlog += filteredData.length;
      } else {
        filteredData = data.filter((blog) => blog.email === userEmail && blog.BlogType === category);
        filteredData.forEach((blog) => {
          blogCountsByUser[blog.email] =
            (blogCountsByUser[blog.email] || 0) + 1;
        });
      }
    } else {
      filteredData = data.filter((data) => data.BlogType === category);
    }
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
        {Errors && <div className="SpecificBlog">The server is unavailable currently ☹. Try again later</div>}
        {pending && <div className="SpecificBlog"> <h3>loading...</h3></div>}

        {data && <Blogs data={filteredData} title={title} />}
        {/* {data && <Blogs data={data.filter((data) => data.BlogType === category )} title={title} />} */}
      </div>
    </div>
  );
}

const Technologies = () => <CategoryBlogs category="Technologies" title="Technology"/>;
const Entrepreneur = () => <CategoryBlogs category="Enterprenuer skills" title="Become expert in enterprenuer field"/>;
const BusinessIdeas = () => <CategoryBlogs category="Business Ideas" title="145 business ideas..."/>;

export { Technologies, Entrepreneur, BusinessIdeas };
