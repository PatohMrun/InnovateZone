import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "../styles/Header.css";

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
  { href: "/", title: "Home" },
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

    if (role !== null) {
      setIsLoggedIn(true);
    }
  }, [userRole]);
  // console.log(document.getElementById('root'))?

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    setIsLoggedIn(false);
    sessionStorage.removeItem("Name");
  };
  return (
    <div className="Menus">
      <nav className="navbar">
        <h1>YoungProfessor.Blog</h1>
        <svg
          id="showmenu"
          width={"40px"}
          onClick={showHideMenu}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>

        <svg
          className="closemenu"
          width={"40px"}
          style={{ display: "none" }}
          onClick={showHideMenu}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>

        <ul>
          {MenuRoutes.map(({ href, title }, index) =>
            title === "Sign up/login" ? (
              !isLoggedin ? (
                <Link
                  style={{
                    backgroundColor: "rgb(26, 168, 37)",
                    borderRadius: "10px",
                  }}
                  key={index}
                  to={href}
                  onClick={showHideMenu}
                >
                  {title}
                </Link>
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
              <Link key={index} onClick={showHideMenu} to={href}>
                {title}
              </Link>
            )
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Menu;
