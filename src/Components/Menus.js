import { Link, NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import "../styles/Header.css";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import supabase from "../supabase";

const showHideMenu = () => {
  const show = document.querySelectorAll(".navbar a");
  const menuSvg = document.querySelector(".w-6.h-6");
  const closeMenuSvg = document.querySelector(".closemenu");
  closeMenuSvg.style.display = "none";

  const mediaQuery = window.matchMedia("(max-width: 600px)");
  if (mediaQuery.matches) {
    show.forEach((link) => {
      if (link.style.display === "none") {
        link.style.display = "block";
        menuSvg.style.display = "none";
        closeMenuSvg.style.display = "block";
      } else {
        link.style.display = "none";
        menuSvg.style.display = "block";
        closeMenuSvg.style.display = "none";
      }
    });
  }
};

const MenuRoutes = [
  { href: "/Home", title: "Home" },
  { href: "/Enterpreneur skills", title: "Entepreneur Skills" },
  { href: "/Business ideas", title: "Business Ideas" },
  { href: "/Technologies", title: "Technologies" },
  { href: "/login", title: "Sign up/login" },
];

const Menu = () => {
  const [isLoggedin, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [userName, setuserName] = useState(null);

  useEffect(() => {
    
    const role = sessionStorage.getItem("token");
    setUserRole(role);
    const Name = sessionStorage.getItem("Name");
    setuserName(Name);
    supabase.auth.getUser().then((res)=>{
      const fullName = res.data.user.user_metadata.full_name;
      setuserName(fullName)
      if(fullName !== null){
        setIsLoggedIn(true);
      }
    })
    if (role !== null) {
      setIsLoggedIn(true);
    }
    
  }, [userRole]);
  console.log(userName);

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    setIsLoggedIn(false);
    sessionStorage.removeItem("Name");
  };
  return (
    <div className="Menus">
      <nav className="navbar">
        <h1>YoungProfessor.Blog</h1>
        <AiOutlineMenu
          onClick={showHideMenu}
          size={26}
          id="showmenu"
          className="w-6 h-6"
        />

        <AiOutlineClose
          onClick={showHideMenu}
          size={26}
          className="closemenu"
          style={{ display: "none" }}
        />
        <ul>
          {MenuRoutes.map(({ href, title }, index) =>
            title === "Sign up/login" ? (
              !isLoggedin ? (
                <NavLink
                  style={{
                    backgroundColor: "rgb(26, 168, 37)",
                    borderRadius: "10px",
                  }}
                  key={index}
                  to={href}
                  onClick={showHideMenu}
                >
                  {title}
                </NavLink>
              ) : (
                <div key={index}>
                  <h4 style={{ color: "gold" }}>
                    Welcome {userName.split(" ").slice(0, 1)}
                  </h4>
                  <button
                    style={{ backgroundColor: "green" }}
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              )
            ) : (
              <NavLink key={index} onClick={showHideMenu} to={href}>
                {title}
              </NavLink>
            )
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Menu;
