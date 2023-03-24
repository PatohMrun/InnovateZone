import useFetch from "../Components/Fetch";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";

const Approval = () => {
  const [userRole, setUserRole] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [approvals, setApprovals] = useState({});
  
  const history = useHistory();

  useEffect(() => {
    const token = Cookies.get("tokens");
    if (token == null) {
      setIsLoaded(true);
      return;
    }
    const decodedToken = jwtDecode(token);
    const role = decodedToken.role;
    const adminEmail = decodedToken.email;
    setUserRole(role);
    setUserEmail(adminEmail);
    setIsLoaded(true);
  }, []);

  const { data, pending, error } = useFetch("https://blog-server-zeta.vercel.app/Approval");

  const handleApprove = (e, email) => {
    e.preventDefault();
    setApprovals({ ...approvals, [email]: true });
    fetch("https://blog-server-zeta.vercel.app/email", {
      method: "post",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ email }),
    })
      .then((res) => {
        if (res.ok) {
          console.log(res.message);
        } else {
          throw error;
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  //   fetch("https://blog-server-zeta.vercel.app/sendmail", {
  //     method: "post",
  //     headers: { "content-type": "application/json" },
  //     body: JSON.stringify({ email }),
  //   })
  //     .then((res) => {
  //       if (res.ok) {
  //         console.log(res.message);
  //       } else {
  //         throw error;
  //       }
  //     })
  //     .catch((error) => {
  //       console.log(error.message);
  //     });
  };

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  if (userEmail !== "jgathiru02@gmail.com") {
    history.push("/");
    console.log("Unauthorized Access");
    return null;
  }

  return (
    <div className="Approval">
      <h3>Approval Request</h3>
      {data &&
        data.map((userdata) => (
          <div className="EachRequest" key={userdata.email}>
            <div className="EachHeader">
              <h4>{userdata.name}</h4>
              <h4>{userdata.email}</h4>
              <h4>{userdata.phone_number}</h4>
            </div>
            <div className="Descriptions">
              <p>{userdata.description}</p>
            </div>
            <div className="Buttons">
              <button
                onClick={(e) => handleApprove(e, userdata.email)}
                disabled={approvals[userdata.email]}
              >
                {approvals[userdata.email] ? "Approved" : "Approve"}
              </button>
              <button>Reject</button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Approval;
