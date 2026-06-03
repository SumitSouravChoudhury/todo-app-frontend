import { useNavigate, useLocation } from "react-router-dom";

import "./header.scss";

import Button from "../Button/Button";
import { useAuth } from "@/hooks/useAuth";

const AUTH_ROUTES = ["/sign-in", "/sign-up"];

const Header = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { isAuthenticated, logout } = useAuth();

  const isAuthPage = AUTH_ROUTES.includes(pathname);

  const handleLogout = () => {
    logout();
    navigate("/sign-in");
  };

  return (
    <div className="headerContainer">
      <p onClick={() => navigate("/")}>Todo</p>

      {!isAuthPage && isAuthenticated && (
        <div className="utilityContainer">
          <Button onClick={handleLogout}>Logout</Button>
        </div>
      )}
    </div>
  );
};

export default Header;
