import React from 'react';

const Blogs = ({ data, title }) => {
  return (
    <div className="Blogs">
      <h2>{title}</h2>
      {data.map(blog => (
        <div className="blog-item" key={blog.id}>
          <h3>{blog.title}</h3>
          <div dangerouslySetInnerHTML={{ __html: blog.content }} />
        </div>
      ))}
    </div>
  );
};

export default Blogs;
