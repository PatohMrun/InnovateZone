import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import useFetch from "../Components/Fetch";
import { useHistory } from "react-router-dom";
import ReactQuill from "react-quill";
import jwtDecode from "jwt-decode";
import Cookies from "js-cookie";

const Update = () => {
  const { id } = useParams();
  const [userRole, setUserRole] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");
  const [Title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [Author, setAuthor] = useState("Sir Timothy");
  const [BlogType, setBlogType] = useState("Technologies");
  const history = useHistory();
  const { data, pending, Error } = useFetch(
    "http://blog-server-zeta.vercel.app/blogs/" + id
  );

  useEffect(() =>{
    {data && setTitle(data[0].Title)}
    {data && setContent(data[0].Content)}
    {data && setAuthor(data[0].Author)}
  }
  ,[id, data])

  useEffect(() => {
    const token = Cookies.get("tokens");
    if (token == null) {
      return;
    }
    const decodedToken = jwtDecode(token);
    const role = decodedToken.role;
    const email = decodedToken.email;
    setEmail(email);
    setUserRole(role);
    setIsLoaded(true);
  }, []);

  const toolbar = [
    ["bold", "italic", "underline", "strike"],
    [{ header: [1, 2, 3, false] }],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link", "image"],
    [{ color: [] }, { background: [] }],
    [{ font: [] }],
    [{ align: [] }],
    ["clean"],
  ];
  const handleSubmit = (e) => {
    e.preventDefault();
    const blog = { Title, content, Author, BlogType, email, id };
    fetch("http://blog-server-zeta.vercel.app/blogUpdate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(blog),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then(() => {
        history.push("/Blogs/"+id);
      })
      .catch((error) => {
        setError(true)
        console.error("There was a problem with the fetch operation:", error);
      });
  };

  return (
    <div className="update">
      <div className="BlogInput">
        <form onSubmit={handleSubmit}>
          <h2>Update Your blog here</h2>
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
              toolbar: toolbar,
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
          <input type="submit" value="Update" />
          {error && <div>An error occured when inserting a blog</div>}

        </form>
        <br />
        <br />
      </div>
    </div>
  );
};

export default Update;
