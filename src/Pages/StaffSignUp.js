import React, { useState, useEffect } from "react";
// import bcrypt from "bcryptjs";
import { useHistory } from "react-router-dom";
import "../styles/Credentials.css";
// import supabase from "../supabase";
import toast, { Toaster } from 'react-hot-toast';




const StaffSignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone_number: "",
    description: ""
  });
  const [signUpSuccess, setSignUpSuccess] = useState(false);
  const [signUpError, setsignUpError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const history= useHistory();
  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

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

  
  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    // usijaribu kuuncomment hii code otherwise utalia
    // const salt = bcrypt.genSaltSync(10);
    // const hashedPassword = bcrypt.hashSync(formData.password, salt);

    const data = {
      name: formData.name,
      email: formData.email,
      phone_number: formData.phone_number,
      description: formData.description,
      password: formData.password
    };
  
    fetch("https://blog-server-kohl.vercel.app/signUpAdmins",{
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
      else if (res.status ===200) {
        return res.json();
      }else{
        throw new Error("Error occured trying to create your account");
      }
      
    }).then(async (data)=>{
      // send a post api to a certain server that will send verification token to the email address
      // const response = await fetch('http://localhost:8080/api/blog/verify',{
      const response = await fetch('https://mailing-server-six.vercel.app/api/blog/verify',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
        ,
        body: JSON.stringify({
          email: data.email,
          name: data.name,
          // token: data.token
        })
      })
      if (response.ok) {
        toast.success("Verification link sent to your email",{
          position: "top-center",
          duration: 2000,
        });
        setSignUpSuccess(true);
        setFormData({
          ...formData,
          email: "",
        });
      }
    }).catch((err)=>{
        if (err.message=="Using same email") {
          toast.error("Error! This email already exists",{
            position: "top-center",
            duration: 3000,
          });
        }
        else{
          toast.error("Error occured trying to create your account",{
            position: "top-center",
            duration: 2000,
          });
        }
    }).finally(()=>{
      setIsLoading(false)
    })
  };

  return (
    <div className="signup-form">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
            <h2 className="font-bold text-lg text-gray-600">Sign up as Guest Blogger</h2>
          <label htmlFor="name">Name:</label>
          <input style={{padding:"10px"}}
            type="text"
            name="name"
            id="name"
            placeholder="Your name"
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
            placeholder="Your valid email address"
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone_number">Phone Number:</label>
          <input 
            type="text"
            name="phone_number"
            id="phone_number"
            placeholder="Your phone number"
            required
            value={formData.phone_number}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            id="password"
            placeholder="Your password"
            required
            value={formData.password}
            onChange={handleInputChange}
          />
          <input style={{width:"20px"}}
            type="checkbox"
            id="showPassword"
            checked={showPassword}
            onChange={() => setShowPassword(!showPassword)}
          /><span className="text-sm text-gray-500">Show password</span>
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label><span className="text-gray-500 text-sm">Tell us more about yourself and blog category you want to contribute</span>
          <input
            type="text"
            name="description"
            id="description"
            required
            placeholder="Your description"
            value={formData.description}
            onChange={handleInputChange}
          />
        </div>
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
        {/* <button type="submit">Sign Up</button> */}
        <button type="submit" disabled={isLoading} style={{ cursor: isLoading ? 'not-allowed' : 'pointer' }} >{isLoading ? "Loading..." : "Become a blogger"}</button>
      </form>
      <Toaster/>
    </div>
  );
};

export default StaffSignUp;
