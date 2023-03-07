import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "../styles/AddBlog.css";
import jwtDecode from 'jwt-decode';
import Cookies from 'js-cookie';


const AddBlog = () => {
  const [userRole, setUserRole] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
    const token = Cookies.get("tokens");
    if(token == null){
      setIsLoaded(true);
      return;
    }
    const decodedToken = jwtDecode(token);
    const role = decodedToken.role;
    const email = decodedToken.email;
    setEmail(email);
    setUserRole(role);
    setIsLoaded(true);
  }, []);
  

  const [Title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [Author, setAuthor] = useState("");
  const [BlogType, setBlogType] = useState("Technologies");
  const history = useHistory();
  const toolbar = [  ['bold', 'italic', 'underline', 'strike'],       
  [{ 'header': [1, 2, 3, false] }],
  [{ 'list': 'ordered'}, { 'list': 'bullet' }],
  // ['link', 'image'], 
  [{ 'color': [] }, { 'background': [] }],
  [{ 'font': [] }],
  [{ 'align': [] }],
  ['clean']
];


  const handleSubmit = (e) => {
    e.preventDefault();
    const blog = { Title, content, Author, BlogType,email };
    fetch("https://blog-server-zeta.vercel.app/blogs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(blog),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        console.log("Added");
        return response.json();
      })
      .then(() => {
        history.push("/");
      })
      .catch((error) => {
        setError(true)
        console.error("There was a problem with the fetch operation:", error);
      });
  };
  if (!isLoaded) {
    return <div>Loading...</div>;
  }
  if (userRole !== "admin") {
    history.push("/");
    console.log("Unauthorized Access");
    return null;
  }
   else{
    return (
      <div className="BlogInput">
        <form onSubmit={handleSubmit}>
          <h2>Add a new blog here</h2>
          <br />
          <label>Title</label>
          <input
            type="text"
            id="texts"
            value={Title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <br />

          <label>Blog Body</label>

          {/* <textarea name="" id="" cols="30" rows="10"></textarea> */}
          <ReactQuill
          modules={{
            toolbar: toolbar
          }}
            className="TextArea"
            value={content}
            onChange={(value) => setContent(value)}
            placeholder="Add your blog here..."
          />

          <br />

          <label>Blog Type </label>
          <select
            required
            value={BlogType}
            onChange={(e) => setBlogType(e.target.value)}
          >
            <option>Business Ideas</option>
            <option>Enterprenuer skills</option>
            <option>Technologies</option>
          </select>
          <br />
          <label>Blog Author</label>
          <input
            type="text"
            id="texts"
            required
            value={Author}
            onChange={(e) => setAuthor(e.target.value)}
          />
          <br />
          <input className="Button" type="submit" value="Submit" />
          
          {error && <div>An error occured when inserting a blog</div>}
        </form>
        <br />
        <br />
        {/* <h2>Coming soon...</h2> */}
      </div>
    );
  }
};
export default AddBlog;
