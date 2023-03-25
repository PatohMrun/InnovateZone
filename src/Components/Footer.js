import React, { useState } from "react";
import "../styles/Footer.css";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import { RiWhatsappFill } from "react-icons/ri";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Footer() {
  const [messageReceived, setMessageReceived]=useState(false);
  const [isloading, setisLoading]=useState(false);
  const [formMessages, setFormMessages] = useState({
    name: "",
    email: "",
    message: "",
    source:"Message from InnovateZone website",
  });
  const handleInputChange = (event) => {
    setFormMessages({
      ...formMessages,
      [event.target.name]: event.target.value,
    });
  };
  const handleMessageSubmit = (event) => {
    event.preventDefault();
    setisLoading(true)
    fetch("https://nodemailer-server-rouge.vercel.app/mails", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(formMessages),
    }).then((res) => {
      if (res.ok) {
        console.log('submited successfully');
        setMessageReceived(true);
        setFormMessages({
          name: "",
          email: "",
          message: "",
        });
        toast.success("Message Sent Successfully!", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
        });
      }
      else{
        console.log("Not successfull");
      }
    });

  fetch("https://blog-server-zeta.vercel.app/mails", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(formMessages),
  }).then((res) => {
    if (res.ok) {
      setisLoading(false)
      console.log('submited successfully to second API');
    }
    else{
      console.log("Not successfull for second API");
    }
  });

  };
  return (
    <footer>
      <div className="footer-info">
        <p>© 2023 My Blog. All rights reserved.</p>
        <p> Eldoret, Kenya 12345</p>
        <p>
          Email:{" "}
          <a href="https://mail.google.com/mail/?view=cm&to=youngprofessor991@gmail.com">
            info@myblog.com
          </a>
        </p>
        <p>Phone: +254-729-144-533</p>
        <p>Privacy Policy | Terms of Use</p>
      </div>
      <div className="footer-contact">
        <form onSubmit={handleMessageSubmit}>
          <h3>Contact Us</h3>
          <div className="form-group">
            <label htmlFor="message">Message:</label>
            <textarea
              id="message"
              name="message"
              rows="3"
              required
              value={formMessages.message}
              onChange={handleInputChange}
            ></textarea>
          </div>
          <div className="form-flex">
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formMessages.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formMessages.email}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <button type="submit" disabled={isloading}>{isloading ? 'Loading...' : 'Send'}</button>
          {/* {messageReceived && <div><br /><h4 style={{color:'green', textAlign:'center'}}>Message received Successfully!</h4></div> } */}
          <ToastContainer />
        </form>
      </div>
      <div className="footer-social">
        <p>Follow us on social media:</p>
        <ul>
          <li>
            <a href="https://www.facebook.com/@justoegitau">
              <FaFacebook />
            </a>
          </li>
          <li>
            <a
              style={{ color: "black" }}
              href="https://www.twitter.com/@justoegitau"
              onMouseOver={(e) => (e.currentTarget.style.color = "blue")}
              onMouseOut={(e) => (e.currentTarget.style.color = "black")}
            >
              <FaTwitter />
            </a>
          </li>
          <li>
            <a
              style={{ color: "black" }}
              href="https://wa.me/25429144533"
              onMouseOver={(e) => (e.currentTarget.style.color = "#53CC60")}
              onMouseOut={(e) => (e.currentTarget.style.color = "black")}
            >
              <RiWhatsappFill />
            </a>
          </li>
          <li>
            <a href="https://www.instagram.com/justoegitau">
              <FaInstagram />
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
