// import React from "react";
// import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
// import "../styles/Footer.css"

// function Footer() {
//     return (
//       <footer>
// <div className="footer-info">
//   <p>© 2023 My Blog. All rights reserved.</p>
//   <p>
//     Contact us: <a href="mailto:youngprofessor991@gmail.com">contact@myblog.com</a>
//   </p>
//   <p>Privacy Policy | Terms of Use</p>
// </div>
//         <div className="footer-social">
//           <p>Follow us:</p>
//           <ul>
//             <li>
//               <a href="https://www.facebook.com/myblog">
//                 <FaFacebook />
//               </a>
//             </li>
//             <li>
//               <a href="https://www.twitter.com/justoegitau">
//                 <FaTwitter />
//               </a>
//             </li>
//             <li>
//               <a href="https://www.instagram.com/myblog">
//                 <FaInstagram />
//               </a>
//             </li>
//           </ul>
//         </div>
//       </footer>
//     );
//   }

//   export default Footer;

import React from "react";
import "../styles/Footer.css";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import { RiWhatsappFill } from "react-icons/ri";

function Footer() {
  return (
    <footer>
      {/* <div className="footer-info">
        <p>© 2023 My Blog Name. All rights reserved.</p>
        <p>123 Main St. Anytown, USA 12345</p>
        <p>Phone: 555-555-5555</p>
        <p>Email: info@myblogname.com</p>
      </div> */}
      <div className="footer-info">
        <p>© 2023 My Blog. All rights reserved.</p>
        <p> Eldoret, Kenya 12345</p>
        <p>
          Email:{" "}
          <a href="https://mail.google.com/mail/?view=cm&to=youngprofessor991@gmail.com">
            contact@myblog.com
          </a>
        </p>
        <p>Phone: +254-729-144-533</p>
        <p>Privacy Policy | Terms of Use</p>
      </div>
      <div className="footer-contact">
        <form>
          <h3>Contact Us</h3>
          <div className="form-group">
            <label htmlFor="message">Message:</label>
            <textarea id="message" name="message" rows="3" required></textarea>
          </div>
          <div className="form-flex">
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input type="text" id="name" name="name" required />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input type="email" id="email" name="email" required />
            </div>
          </div>
          <button type="submit">Send</button>
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
