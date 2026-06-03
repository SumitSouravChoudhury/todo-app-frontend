import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useGet } from "@/hooks/useGet";
import { useScreenWidth } from "@/hooks/useScreenWidth";
import { ENDPOINTS } from "@/services/endpoints";

import "./header.scss";

import Button from "../Button/Button";

import todoFavicon from "/src/assets/logo/todoFavicon.png";

const AUTH_ROUTES = ["/sign-in", "/sign-up"];

const Header = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { isAuthenticated, userId, logout } = useAuth();
  const width = useScreenWidth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const isAuthPage = AUTH_ROUTES.includes(pathname);
  const isMobile = width <= 767;

  const { data } = useGet(["user", userId], ENDPOINTS.USER.GET(userId), {
    enabled: !!userId,
  });

  const fullName = data?.user?.fullName;

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    setDropdownOpen(false);
    navigate("/sign-in");
  };

  return (
    <div className="headerContainer">
      <div className="logoWrapper" onClick={() => navigate("/")}>
        <img src={todoFavicon} alt="logo" />
        <span>Todofy</span>
      </div>

      {!isAuthPage && isAuthenticated && (
        <div className="utilityContainer">
          {isMobile ? (
            <div className="dropdown" ref={dropdownRef}>
              <div className="dropdown__trigger" onClick={() => setDropdownOpen((prev) => !prev)}>
                {fullName && <span>{fullName}</span>}
                <svg
                  className={`dropdown__arrow ${dropdownOpen ? "dropdown__arrow--open" : ""}`}
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#ffffff"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </div>
              {dropdownOpen && (
                <div className="dropdown__menu">
                  <Button width="100%" onClick={handleLogout}>
                    Logout
                  </Button>
                </div>
              )}
            </div>
          ) : (
            <>
              {fullName && <p>Hi {fullName}!</p>}
              <Button onClick={handleLogout}>Logout</Button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Header;
