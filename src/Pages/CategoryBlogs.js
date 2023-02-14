import Blogs from '../Components/BlogsMapping';
import useFetch from "../Components/Fetch";
import React, { useState, useEffect } from 'react';
import "../styles/categoryBlogs.css"

const CategoryBlogs = ({ category, title }) => {
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const role = sessionStorage.getItem("token");
    setUserRole(role);
  }, []);

  const { data, pending, Errors } = useFetch("http://localhost:8000/Blogs")

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
            
      <div className="blogs">
        {Errors && <div className="SpecificBlog">The server is unavailable currently ☹. Try again later</div>}
        {pending && <div className="SpecificBlog"> <h3>loading...</h3></div>}
        {data && <Blogs data={data.filter((data) => data.BlogType === category)} title={title} />}
      </div>
    </div>
  );
}

const Technologies = () => <CategoryBlogs category="Technologies" title="Technology"/>;
const Entrepreneur = () => <CategoryBlogs category="Enterprenuer skills" title="Become expert in enterprenuer field"/>;
const BusinessIdeas = () => <CategoryBlogs category="Business Ideas" title="145 business ideas..."/>;

export { Technologies, Entrepreneur, BusinessIdeas };
