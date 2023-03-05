import React, { useState,useEffect } from "react";
import bcrypt from "bcryptjs";
import { useHistory } from "react-router-dom";
import "../styles/Credentials.css"


const SignUpForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [signUpSuccess, setSignUpSuccess] = useState(false);
  const [signUpError, setsignUpError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);


  const history= useHistory();

  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };


//the invalid login to expire in two second
useEffect(() => {
  let timer;
  if (passwordError) {
    timer = setTimeout(() => {
      setPasswordError(false);
    }, 2000);
  }

  if (signUpError) {
    timer = setTimeout(() => {
      setsignUpError(false);
    }, 2000);
  }
  return () => {
    clearTimeout(timer);
  };
}, [passwordError, signUpError]);


  const handleSubmit = (event) => {
    event.preventDefault();
    
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(formData.password, salt);

    
    // if (!validator.isStrongPassword(formData.password)) {
      //     setPasswordError(true);
      //   return;
      // }
      // if (!/[A-Z]/.test(formData.password) || !/[a-z]/.test(formData.password) || !/\d/.test(formData.password)) {
      //   setPasswordError(true);
      //   return;
      // }
      const data = {
        name: formData.name,
        email: formData.email,
        password: hashedPassword
      };


    fetch("http://blog-server-zeta.vercel.app/signUps",{
        method: "POST",
        headers: {'content-type':'application/json'},
        body: JSON.stringify(data)       
    }).then((res)=>{
      if (res.status === 500) {
        setsignUpError(true);
        setFormData({
          ...formData,
          email: "",
        });
        throw new Error("Using same email");
      }
        console.log("Sign up form submitted: ", data);
        setSignUpSuccess(true);
        setTimeout(()=>{
            history.push('/login')
        },[2000])
    }).catch((err)=>{
        console.log(err);
    })
  };

  return (
    <div className="signup-form">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
            <h2>Sign up</h2>
          <label htmlFor="name">Name:</label>
          <input style={{padding:"10px"}}
            type="text"
            name="name"
            id="name"
            required
            value={formData.name}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
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
        <button type="submit">Sign Up</button>
      </form>
      <h4>Sign up as a Guest Blogger {<a style={{color:"blue" ,textDecoration:"underline"}} href="/Blogger">Here</a>}</h4>
      {signUpSuccess && (
        <div className="signup-success-popup">
          <p>Sign up successful!</p>
        </div>
      )}
        {signUpError && (
        <div className="signup-success-popup">
          <p style={{color:"red"}}>Error! This email already exists</p>
        </div>
      )}
      {passwordError && (
          <div className="password-error">
            <p style={{color:"red"}}>Use a stronger password. Include characters and numbers</p>
          </div>
        )}

    </div>
  );
};

export default SignUpForm;
