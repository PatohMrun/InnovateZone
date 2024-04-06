import { useEffect, useState } from "react";
import useFetch from "./Fetch";

const Bloggers = () => {
  const [bloggers, setBloggers] = useState([]);
  const {
    data: admins,
    pending: pending1,
    error: error1,
  } = useFetch("https://innovate-zone-server.vercel.app/GuestBloggers?api_key=UD9VZKyRU5eIZzPq");

  useEffect(() => {
    if (admins) {
      setBloggers(admins);
    }
  }, [admins]);

  const remove = async (e, email) => {
    e.preventDefault();
    if (window.confirm("Are you sure you want to remove this user?")) {
      await fetch("https://innovate-zone-server.vercel.app/removeAdmin", {
        method: "post",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email }),
      })
        .then(() => {
          setBloggers((prevBloggers) =>
            prevBloggers.filter((blogger) => blogger.email !== email)
          );
          console.log("removed successfully");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const filteredBloggers = bloggers.filter((blogger) => !blogger.deleted);

  return (
    <div className="Approval">
      <h3>Guest Bloggers</h3>
      {filteredBloggers.length === 0 && <p>No bloggers found.</p>}
      {filteredBloggers.map((blogger) => (
        <div className="EachRequest" key={blogger.email}>
          <div className="EachHeader">
            <h4>{blogger.name}</h4>
            <h4>{blogger.email}</h4>
            <h4>{blogger.phone_number}</h4>
          </div>
          <div className="Descriptions">
            <p>{blogger.description}</p>
          </div>
          <div className="Buttons">
            <button
              onClick={(e) => remove(e, blogger.email)}
              disabled={bloggers[blogger.email]}
            >
              {bloggers[blogger.email] ? "Removed" : "Remove"}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Bloggers;
