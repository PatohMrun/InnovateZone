import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "../styles/Credentials.css"


const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [signUpSuccess, setSignUpSuccess] = useState(false);
  const [invalidLogin, setinvalidLogin] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({});

  const history = useHistory();

  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };
  //the invalid login to expire in two second
  useEffect(() => {
    let timer;
    if (invalidLogin) {
      timer = setTimeout(() => {
        setinvalidLogin(false);
      }, 3000);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [invalidLogin]);

  const handleSubmit = (event) => {
    event.preventDefault();
setIsLoading(true)
fetch("http://localhost:8000/login", {
  method: "POST",
  headers: { "content-type": "application/json" },
  body: JSON.stringify(formData),
})
.then((res) => {
  if (res.status !== 200) {
    throw new Error("Login failed");
  }
  // console.log("Login form submitted: ", formData);
  return res.json();
})
.then((data) => {
  // console.log(data.results[0]["name"]);
  const token = data.role; // extract the token from the response
  const Name=data.results[0]["name"]
  sessionStorage.setItem("Name", Name); 
  sessionStorage.setItem("token", token); // save the token in local storage
  console.log("Name: "+Name);
  setData(data);
  setSignUpSuccess(true);
  setTimeout(() => {
    history.push("/");
    window.location.reload();
  }, 3000);
})
.catch((err) => {
  setinvalidLogin(true);
  setFormData({
    email: "",
    password: "",
  });
  console.error(err.message);
});
// setIsLoading(false)
};

  return (
    <div className="signup-form">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <h2>Login</h2>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            id="email"
            required
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            id="password"
            value={formData.password}
            onChange={handleInputChange}
          />
          <input style={{width:"20px"}}
            type="checkbox"
            id="showPassword"
            checked={showPassword}
            onChange={() => setShowPassword(!showPassword)}
          /><b>Show password</b>
        </div>
        <button type="submit">{isLoading?'Loading...':'Login'}</button>
      </form>

      <h4>
        Don't have an account?{" "}
        {
          <a
            style={{ color: "blue", textDecoration: "underline" }}
            href="/sign up"
          >
            Sign up
          </a>
        }
      </h4>
      {signUpSuccess && (
        <div style={{ color: "green" }} className="signup-success-popup">
          <p>Login successful {data.message}! Welcome</p>
        </div>
      )}

      {invalidLogin && (
        <div style={{ color: "red" }} className="signup-success-popup">
          <p>Invalid login cridentials!. Try again</p>
        </div>
      )}
    </div>
  );
};

export default LoginForm;
