import useFetch from "../Components/Fetch";
import { useState, useEffect } from "react";

const Approval = () => {
  const { data, pending, error } = useFetch("https://blog-server-zeta.vercel.app/Approval");

  const handleApprove = (e, email) => {
    e.preventDefault();
    fetch("https://blog-server-zeta.vercel.app/Approved", {
      method: "post",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ email })
    }).then((res)=>{
        if(res.ok){
            console.log(res.message);
        }
        else{
            throw error
        }
    }).catch((error)=>{
        console.log(error.message);
    });
  };

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
              <button onClick={(e) => handleApprove(e, userdata.email)}>Approve</button>
              <button>Reject</button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Approval;
