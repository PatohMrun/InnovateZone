import { Link } from "react-router-dom";
import "../styles/categoryBlogs.css"

const Content = ({ data, title }) => {
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
  return (
    <div className="blogs">
      <h2>{title}</h2>
      {data.map(sortedData => (
        <div className="Blogs" key={sortedData.id}>
          <div className="EachBlog">
            <Link to={`/blogs/${sortedData.id}`}>
              <h3>
                {sortedData.Title}
              </h3>
              <p style={{color:"blue", marginTop:"8px", fontSize: "medium"}}>{formatTimestamp(sortedData.Date_created)}</p>
              <div id="ContentDisplay" dangerouslySetInnerHTML={{ __html: sortedData.Content }} />
              <p style={{ color: "blue", float: "right", fontSize: "medium" }}>
                Written by: {sortedData.Author}
              </p>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Content;

