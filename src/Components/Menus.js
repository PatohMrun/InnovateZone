import { Link, NavLink, useHistory, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import "../styles/Header.css";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import supabase from "../supabase";
import jwtDecode from 'jwt-decode';
import Cookies from 'js-cookie';

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
  { href: "/category/enterpreneur-skills", title: "Entepreneurship" },
  { href: "/category/business-ideas", title: "Business Ideas" },
  { href: "/category/technologies", title: "Technologies" },
  { href: "/login", title: "Login" },
];

const Menu = () => {
  const [isLoggedin, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [userName, setuserName] = useState(null);
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    
    const token = Cookies.get("tokens");

    if(token == null){
      return;
    }
    const decodedToken = jwtDecode(token);
    const role = decodedToken.role;
    const name = decodedToken.name;
    setUserRole(role);
    setuserName(name);
    if (role !== null) {
      setIsLoggedIn(true);
    }
    
  }, [userName]);
  useEffect(() => {
    supabase.auth.getUser().then((res)=>{
      const user = res.data.user;
      if (user) {
        const fullName = user.user_metadata.full_name;
        console.log(fullName);
        setuserName(fullName)
        if(fullName !== null){
          setIsLoggedIn(true);
        }
      }
    }).catch((error)=>{
      console.log(error);
    });
  }, [setuserName, setIsLoggedIn]);
  const handleLogout = async () => {
    if (userName) {
      supabase.auth.signOut()
        .then(() => {
          Cookies.remove("tokens");
          setIsLoggedIn(false);
          history.push("/login");
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      Cookies.remove("tokens");
      setIsLoggedIn(false);
      history.push("/login");
    }
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
            title === "Login" ? (
              !isLoggedin ? (
                <NavLink
                  style={{
                    backgroundColor: "hsl(212, 81%, 33%)",
                    borderRadius: "10px",
                  }}
                  key={index}
                  to={href}
                  onClick={showHideMenu}
                >
                  {title}
                </NavLink>
              ) : (
                // <div key={index} style={{}}>
                //   <button
                //     style={{ backgroundColor: "hsl(212, 81%, 43%)", }}
                //     onClick={handleLogout}
                //   >
                //     Logout
                //   </button>
                //   <h5 style={{ color: "gold", whiteSpace: "nowrap"  }}>
                //     Welcome {userName.split(" ").slice(0, 1)}
                //   </h5>
                // </div>
                location.pathname !== "/admin/addblogs" && (
                  <div key={index}>
                    <button
                      style={{ backgroundColor: "hsl(212, 81%, 43%)", }}
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                    <h5 style={{ color: "gold", whiteSpace: "nowrap"  }}>
                      Welcome {userName.split(" ").slice(0, 1)}
                    </h5>
                  </div>
                )
              )
            ) : (
              <NavLink key={index} onClick={showHideMenu} to={href} style={{ whiteSpace: "nowrap" }}>
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
