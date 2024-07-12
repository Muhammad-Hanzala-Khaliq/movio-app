import React, { useEffect, useState } from "react";
import logo from "../assets/logo.png";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import userIcon from "../assets/user.png";
import { navigation } from "../containts/navigation";
import { IoSearchOutline } from "react-icons/io5";
import { auth } from "../firebase";
import { signOut, onAuthStateChanged } from "firebase/auth";

const Header = () => {
  const location = useLocation();
  const removespace = location?.search?.slice(3)?.split("%20")?.join(" ");
  const [searchInput, setSearchInput] = useState(removespace);
  const [user, setUser] = useState(null);
  const [showWelcome, setShowWelcome] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        const username = localStorage.getItem("username");
        setUser({ ...currentUser, username });
        setShowWelcome(true);
        setTimeout(() => {
          setShowWelcome(false);
        }, 3000); // Hide welcome message after 3 seconds
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (searchInput) {
      navigate(`/search?q=${searchInput}`);
    }
  }, [searchInput, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("username");
      navigate("/");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <header className="fixed top-0 w-full h-16 bg-black bg-opacity-50 z-40">
      <div className="container mx-auto px-3 flex items-center h-full">
        <Link to={"/"}>
          <img src={logo} alt="Logo" width={120} />
        </Link>

        <nav className="hidden lg:flex items-center gap-1 ml-5">
          {navigation.map((nav, index) => {
            return (
              <div key={index}>
                <NavLink
                  key={nav.label}
                  to={nav.href}
                  className={({ isActive }) =>
                    `px-2 hover:text-neutral-100 ${
                      isActive && "text-neutral-200"
                    }`
                  }
                >
                  {nav.label}
                </NavLink>
              </div>
            );
          })}
        </nav>

        <div className="ml-auto flex items-center gap-5">
          <form className="flex items-center gap-2" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Search Here..."
              className="bg-transparent px-4 py-1 outline-none border-none hidden lg:block"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <button className="text-2xl text-white">
              <IoSearchOutline />
            </button>
          </form>
          {user ? (
            <>
              {showWelcome && (
                <span style={{ color: "white", textAlign: "center" }}>
                  Welcome, {user.username}!
                </span>
              )}
              <button
                style={{
                  color: "white",
                  fontSize: "12px",
                  cursor: "pointer",
                  background: "white",
                  color: "black",
                  paddingTop: "5px",
                  paddingBottom: "5px",
                  paddingLeft: "10px",
                  paddingRight: "10px",
                  fontWeight: "bold",
                  borderRadius: "4px",
                  marginRight: "10px",
                }}
                className="button-nav"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          ) : (
            <div className="w-8 h-8 rounded-full overflow-hidden cursor-pointer active:scale-50 transition-all">
              <Link to={"signin"}>
                <img src={userIcon} className="w-full h-full" alt="" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
