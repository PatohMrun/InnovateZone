import { Link } from "react-router-dom";
import "../styles/categoryBlogs.css"
import useFetch from "../Components/Fetch";
import { FaEye } from "react-icons/fa6";
import Search from "./search";
import { useState } from "react";

const Content = ({ data, title, userEmail, blogTitless }) => {


  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState(data); // State to hold filtered data

  // Function to handle search term change
  const handleSearch = (term) => {
    setSearchTerm(term);
    if (term === '') {
      setFilteredData(data); // Reset filtered data when search term is empty
    } else {
      const filtered = data.filter((sortedData) =>
        sortedData.title?.toLowerCase().includes(term?.toLowerCase())
      );
      if (filtered.length === 0) {
        setSearchTerm('')
      } else {
        setFilteredData(filtered);
      }
    }
  };
  

  const sortedData = data.sort((a, b) => b.id - a.id);

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


  const { data:views, pending:pedView, Errors:viewErr } = useFetch("https://innovate-zone-server.vercel.app/getViews");

  const cumulativeViewed = {};

  // Iterate over the views data
  views?.forEach(view => {
    const { post_id, isviewed } = view;
    // If the post_id is not already in cumulativeViewed, initialize it with 0 views
    if (!cumulativeViewed[post_id]) {
      cumulativeViewed[post_id] = 0;
    }
    // Add the views to the cumulative count for the respective post_id
    cumulativeViewed[post_id] += parseInt(isviewed); // Convert isviewed to integer before adding
  });
  return (
    <div className="blogs">
      <Search blogTitless={blogTitless} onSearch={handleSearch}/>
      <h2>{title}</h2>
      {filteredData.filter(sortedData => sortedData.title?.toLowerCase().includes(searchTerm.toLowerCase())) // Filter data based on search term
      .map(sortedData => (
        <div className="Blogs" key={sortedData.id}>
          <div className="EachBlog">
            <Link to={`/blogs/${sortedData.id}`}>
              <h3>
                {sortedData.title?.toUpperCase()}
              </h3>
              <p style={{color:"blue", marginTop:"8px", fontSize: "medium"}}>{formatTimestamp(sortedData.date_created)}</p>
              <div id="ContentDisplay" dangerouslySetInnerHTML={{ __html: sortedData.content }} />
              <div className={userEmail ? "flex justify-between" : ""}>
                {userEmail && <div className="flex gap-2 items-center text-blue-500"><FaEye /> {cumulativeViewed[sortedData.id] || 0}</div>}
                <p style={{ color: "blue", float:"right",  fontSize: "medium" }}>
                Author: {sortedData.author}
                </p>
              </div>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Content;

