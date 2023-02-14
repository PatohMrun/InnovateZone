import { Link } from "react-router-dom";
import "../styles/categoryBlogs.css"

const Content = ({ data, title }) => {
  const sortedData = data.sort((a, b) => b.id - a.id);
  return (
    <div className="blogs">
      <h1>{title}</h1>
      {data.map(sortedData => (
        <div className="Blogs" key={sortedData.id}>
          <div className="EachBlog">
            <Link to={`/blogs/${sortedData.id}`}>
              <h3>
                {sortedData.Title}
                <br />
                <br />
              </h3>
              <div id="ContentDisplay" dangerouslySetInnerHTML={{ __html: sortedData.Content }} />
              <p style={{ color: "blue", float: "right" }}>
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

