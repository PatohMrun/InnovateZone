import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import "../styles/Credentials.css";
import supabase from "../supabase";
import Cookies from "js-cookie";

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

  async function googleLogin() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });
  }

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
    setIsLoading(true);
    fetch("https://blog-server-zeta.vercel.app/login", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((res) => {
        if (res.status !== 200) {
          throw new Error("Login failed");
        }
        //https://blog-server-zeta.vercel.app/
        // https://blog-server-zeta.vercel.app/
        // https://blog-server-zeta.vercel.app/
        // htt://localhost:8000/
        // console.log("Login form submitted: ", formData);
        return res.json();
      })
      .then((data) => {
        const token = data.token;
        var expire = new Date();
        expire.setTime(expire.getTime() + 24 * 60 * 1000);
        Cookies.set("tokens", token, { expires: expire, session: true }); // save the token in a cookie
        history.push("/");
        window.location.reload();
        setIsLoading(false);
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
          <input
            style={{ width: "20px", marginTop: "3px" }}
            type="checkbox"
            id="showPassword"
            checked={showPassword}
            onChange={() => setShowPassword(!showPassword)}
          />
          <b>Show password</b>
        </div>
        <button type="submit">{isLoading ? "Loading..." : "Login"}</button>
      </form>

      <h4 style={{ textAlign: "center", marginTop: "1px" }}>
        Don't have an account?{" "}
        {
          <a
            style={{ color: "blue", textDecoration: "underline" }}
            href="/sign up"
          >
            Sign up
          </a>
        }
        <div className="line-container">
          <div className="line"></div>
          <div className="or">or</div>
          <div className="line"></div>
        </div>
      </h4>
      <button className="google-btn" onClick={googleLogin}>
        <FcGoogle size={20} style={{ marginRight: "50px" }} /> Continue With
        Google
      </button>
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
