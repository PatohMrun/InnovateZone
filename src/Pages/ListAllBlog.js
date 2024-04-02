import Blogs from "../Components/BlogsMapping";
import useFetch from "../Components/Fetch";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { BsFillChatDotsFill } from "react-icons/bs";
import { FcApprove } from "react-icons/fc";
import React, { useState, useEffect } from "react";
import "../styles/categoryBlogs.css";
import jwtDecode from "jwt-decode";
import Cookies from "js-cookie";
import Messages from "./Messages";
import Approval from "../Config/Approval";
import Bloggers from "../Components/bloggers";
import Modal from 'react-modal';

// To know the role of user and grant them permission to add blog
const ListedBlogs = () => {
  const [userRole, setUserRole] = useState(null);
  const [userEmail, setUserEmail] = useState("");
  const [bloggers, setbloggers] = useState(0);

  useEffect(() => {
    const token = Cookies.get("tokens");
    if (token == null) {
      return;
    }
    const decodedToken = jwtDecode(token);
    const role = decodedToken.role;
    const email = decodedToken.email;
    setUserEmail(email);
    setUserRole(role);
  }, []);

  const { data, pending, Errors } = useFetch(`https://blog-server-zeta.vercel.app/blogs?api_key=UD9VZKyRU5eIZzPq`);
  // {data && console.log(data);}
  const { data:views, pending:pedView, Errors:viewErr } = useFetch("https://blog-server-zeta.vercel.app/getViews");
  // {views && console.log(views)}

  const cumulativeViewed = views && views.reduce((acc, view) => {
    return acc + parseInt(view.isViewed);
  }, 0);

  
  const {
    data: Admins,
    pending: ped1,
    Errors: err1,
  } = useFetch("https://blog-server-zeta.vercel.app/GuestBloggers?api_key=UD9VZKyRU5eIZzPq");
  let GuestBloggers=null;
  if (Admins) {
    GuestBloggers=Admins.length
  }
  let filteredData = null;
  let blogCountsByUser = {};
  let AllBlog = null;
  if (data !== null) {
    if (userRole === "admin") {
      if (userEmail === "jgathiru02@gmail.com") {
        filteredData = data;
        // console.log(filteredData.length)
        AllBlog += filteredData.length;
      } else {
        filteredData = data.filter((blog) => blog.email === userEmail);
        filteredData.forEach((blog) => {
          blogCountsByUser[blog.email] =
            (blogCountsByUser[blog.email] || 0) + 1;
        });
      }
    } else {
      filteredData = data;
    }
  }
  // console.log(blogCountsByUser);
  let blogCounted = null;
  Object.keys(blogCountsByUser).forEach((email) => {
    blogCounted = +blogCountsByUser[email];
  });
  const showStatistics = userRole !== null && userRole !== "user";
  const handleClickMessages = () => {
    const width = 900;
    const height = 600;
    const left = window.screen.width / 2 - width / 2;
    const top = window.screen.height / 2 - height / 2;

    const messagesWindow = window.open(
      "/messages",
      "Messages",
      `width=${width},height=${height},left=${left},top=${top},menubar=no,toolbar=no`
    );

    messagesWindow.onload = () => {
      messagesWindow.document.body.innerHTML = "<div id='root'></div>";
      ReactDOM.render(
        <BrowserRouter>
          <Messages />
        </BrowserRouter>,
        messagesWindow.document.getElementById("root")
      );
    };
  };
  const handleClickApproval = () => {
    const width = 900;
    const height = 600;
    const left = window.screen.width / 2 - width / 2;
    const top = window.screen.height / 2 - height / 2;

    const approvalWindow = window.open(
      "/Approval",
      "Messages",
      `width=${width},height=${height},left=${left},top=${top},menubar=no,toolbar=no`
    );

    approvalWindow.onload = () => {
      approvalWindow.document.body.innerHTML = "<div id='root'></div>";
      ReactDOM.render(
        <BrowserRouter>
          <Approval />
        </BrowserRouter>,
        approvalWindow.document.getElementById("root")
      );
    };
  };

  // const modalStyles = {
  //   content: {
      // width: '900px',
      // height: '600px',
  //     top: '50%',
  //     left: '50%',
  //     transform: 'translate(-50%, -50%)'
  //   }
  // };
  
  const [modalIsOpen, setModalIsOpen] = useState(false);

  //look for the whether there is pending apprvas
  const { data:Approvals, pending:peed, error } = useFetch("https://blog-server-zeta.vercel.app/Approval");

  return (
    <div>
      {userEmail === "jgathiru02@gmail.com" && (
       <div className="Message_Approval">
        <div className="message-Icon" onClick={handleClickMessages}>
          <BsFillChatDotsFill size={26} />
          <h5>Messages</h5>
        </div>
        <div className="PendingApproval" onClick={handleClickApproval} >
          <FcApprove size={26}/>
          <h5>Pending <br /> Approvals</h5>
          {Approvals && <div className="NoOfMessages">
              <p>{Approvals.length}</p>
          </div>}
        </div>
       </div>
        
      )}
      {/* //open a pop up to show the guestBloggers  */}
      <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)} className="modal"><Bloggers /></Modal>
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
        {Errors && (
          <div className="SpecificBlog">
            <h3>
              {" "}
              <b style={{ color: "white", marginTop: "-20px" }}>
                The server is unavailable currently ☹. Try again later
              </b>
            </h3>
          </div>
        )}
        {pending && (
          <div className="SpecificBlog">
            {" "}
            <h2>Loading...</h2>
          </div>
        )}

        {filteredData !== null && filteredData.length > 0 && !Errors ? (
          <section className="GuestBlogger">
            {showStatistics && (
              <div id="All-stats">
                <h2 id="stat-title">Statistics</h2>
                <br />
                <div className="statistics">
                  <div id="views">
                    <h4>Views</h4>
                    {cumulativeViewed ? (<h2>{cumulativeViewed}</h2>):(<h2>1</h2>)}
                  </div>
                  <br />
                  <div id="views">
                    <h4>Blogs</h4>
                    {blogCounted && <h2>{blogCounted}</h2>}
                    {AllBlog && <h2>{AllBlog}</h2>}
                  </div>
                  <br />
                  <div id="views">
                    <h4>Contribution</h4>
                    {blogCounted && <h2>{blogCounted}</h2>}
                    {AllBlog && <h2>{AllBlog}</h2>}
                  </div>
                  <br />
                  {GuestBloggers && userEmail==='jgathiru02@gmail.com' &&
                  <div id="views" onClick={()=>{setModalIsOpen(true)}} style={{cursor:"pointer"}}>
                    <h4>GuestBlogger</h4>
                    <h2>{GuestBloggers}</h2>
                  </div>
                    }
                </div>
              </div>
            )}
            <br />
            <hr id="divide-line" />
            <div id="list-all-blogs">
              <Blogs
                data={filteredData}
                title="Get insighted by powerful blogs"
              />
            </div>
          </section>
        ) : userRole==='admin' && !Errors && !pending ? (
          <div className="GuestBlogger">
            {showStatistics && (
              <div id="All-stats">
                <h2 id="stat-title">Statistics</h2>
                <br />
                <div className="statistics">
                  <div id="views">
                    <h4>Views</h4>
                    <h2>0</h2>
                  </div>
                  <br />
                  <div id="views">
                    <h4>Blogs</h4>
                    <h2>0</h2>
                  </div>
                  <br />
                  <div id="views">
                    <h4>Contribution</h4>
                    <h2>0</h2>
                  </div>
                </div>
              </div>
            )}

            <br />
            <div className="welcoming-admin">
              <h3>Welcome to your portal</h3>
              <h4>This is where your blog will be displayed once you add!</h4>
              <p>Happy blogging.</p>
            </div>
          </div>
        ) : (
          <div></div>
        )}
        <br />
      </div>

    </div>
  );
};

export default ListedBlogs;
