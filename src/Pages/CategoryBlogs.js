import Blogs from '../Components/BlogsMapping';
import useFetch from "../Components/Fetch";
import React, { useState, useEffect } from 'react';
import "../styles/categoryBlogs.css"
import jwtDecode from 'jwt-decode';
import Cookies from 'js-cookie';

const CategoryBlogs = ({ category, title }) => {
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

  const { data, pending, Errors } = useFetch("http://blog-server-zeta.vercel.app/Blogs")

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
