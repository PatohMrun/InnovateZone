import useFetch from "./Fetch";
const Bloggers = () => {
    const {
        data: Admins,
        pending: ped1,
        Errors: err1,
      } = useFetch("https://blog-server-zeta.vercel.app/GuestBloggers?api_key=UD9VZKyRU5eIZzPq");

      const Remove=async (e, email)=>{
        e.preventDefault();
        if (window.confirm("Are you sure you want to remove this user?")) {
                await fetch("https://blog-server-zeta.vercel.app/removeAdmin" , {
                method: "post",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({email}),
                }).then(() => {
                console.log("removed successfully");
                });
        }
      }
    return ( 
        <div className="Approval">
            <h3>Guest Bloggers</h3>
            {Admins &&
        Admins.map((userdata) => (
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
                onClick={(e) => Remove(e, userdata.email)}
                disabled={Admins[userdata.email]}
              >
                {Admins[userdata.email] ? "Removed" : "Remove"}
              </button>
              {/* <ToastContainer /> */}
            </div>
          </div>
        ))}
        </div>
     );
}
 
export default Bloggers;