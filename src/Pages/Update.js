import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import useFetch from "../Components/Fetch";
import { useHistory } from "react-router-dom";
import ReactQuill from "react-quill";
import jwtDecode from "jwt-decode";
import Cookies from "js-cookie";
import { FaEdit } from "react-icons/fa";
import { BsCheck2 } from "react-icons/bs";
import { AiFillDelete } from "react-icons/ai";
import EditorToolbar, { modules, formats } from "../Components/toolbar";
import toast, { Toaster } from 'react-hot-toast';

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
  const [loading, setLoading]=useState(false)
  const { data, pending, Error } = useFetch(
    "https://blog-server-zeta.vercel.app/blogs/" + id +"?api_key=UD9VZKyRU5eIZzPq"
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


  const handleSubmit = (e) => {
    e.preventDefault();
    const blog = { Title, content, Author, BlogType, email, id };
    // check whether all inputs are there
    if (Title === "" || content === "" || Author === "") {
      toast.error('Please fill all the fields',{
        position: 'top-center',
        duration: 5000,
      })
      setError(true);
      return;
    }
    setLoading(true)

    fetch("https://blog-server-zeta.vercel.app/blogUpdate", {
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
        setLoading(false)
        setTitle("");
        setContent("");
        setAuthor("");
        setBlogType("Technologies");
        setError(false);
        toast.success('Blog updated successfully')
        setTimeout(() => {
          history.push("/");
        }, 2000);
      })
      .catch((error) => {
        setLoading(false)
        toast.error('Error updating blog. try again',{
          position: 'top-center',
          duration: 7000,
        })
        setError(true)
        console.error("There was a problem with the fetch operation:", error);
      })
  };

  const currentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
  });
  const currentTime = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });


  return (

    <div className="min-h-screen mx-2 md:mx-20 lg:mx-60 mt-8 mb-2 relative bg-[#c0dbfc] rounded-md p-2 shadow-md shadow-gray-500">
        <form style={{ backgroundColor: "#c0dbfc", margin: 0 , padding: 0}} >
          <div className="border-b border-[#57a3ff] flex justify-between items-center">
            {/* Date and Time */}
            <div className="text-2xl font-semibold text-blue-600">
              <span className="block">{currentDate}</span>
              <h5 className="text-base font-normal text-gray-700">
                {currentTime}
              </h5>
            </div>
            {/* Edit and Delete icons (Hidden for input) */}
            <div className="flex gap-6 opacity-0 pointer-events-none">
              <FaEdit className="text-blue-500" size={26} />
              <AiFillDelete className="text-red-500" size={26} />
              <p></p>
            </div>
          </div>
          <input
            type="text"
            name="Author"
            placeholder="Enter author..."
            value={Author}
            required
            onChange={(e) => setAuthor(e.target.value)}
            className="text-2xl font-semibold text-gray-700 mt-4 bg-transparent outline-none  w-full"
          />

          <select
            name="category"
            value={BlogType}
            onChange={(e) => setBlogType(e.target.value)}
            className="bg-[#95c5ff] border-b border-[#82baff] text-gray-700 mt-6 outline-none w-full"
          >
            <option value="">Select a category...</option>
            <option value="Business Ideas">Business Ideas</option>
            <option value="Entrepreneur Skills">Entrepreneur Skills</option>
            <option value="Technologies">Technologies</option>
          </select>

          {/* Input fields for Title and Content */}
          <input
            type="text"
            name="title"
            placeholder="Enter title..."
            value={Title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="text-2xl font-semibold text-gray-700 mt-4 bg-transparent outline-none  w-full"
          />
          <div className=" ">
            <ReactQuill
              modules={modules}
              formats={formats}
              value={content}
              onChange={(value) => setContent(value)}
              placeholder="Add your blog here..."
              className="TextArea"
            />
          </div>
          <div className=" absolute bottom-0 bg-[#98aec9] w-full overflow-x-auto whitespace-nowrap">
            <EditorToolbar />
          </div>
         
        </form>
        <div className="fixed bottom-24  right-[12%]">
          <button
            style={{
              backgroundColor: "#549CED",
              display: "flex",
              justifyContent: "center",
              width: "52px",
              height: "52px",
              borderRadius: "100%",
            }}
            className={`flex items-center justify-center w-12 h-12 rounded-full bg-blue-500 text-white shadow-lg hover:bg-blue-600 focus:outline-none ${loading ? 'cursor-not-allowed' : ''}`}
            type="submit"
            disabled={loading}
            onClick={handleSubmit}
          >
            {loading ? <div className="loader cursor-not-allowed">loading...</div> : (
              <BsCheck2
              style={{
                color: "white",
                fontWeight: "bold",
                textAlign: "center",
                verticalAlign: "middle",
                display: "inline-block",
                overflow: "visible",
                color: "#F2F2F2",
              }}
              size={40}
            />
            )}
          </button>

        </div>
          {/* {error && <div>An error occured when inserting a blog</div>} */}
          <Toaster/>
      </div>
  );
};

export default Update;
