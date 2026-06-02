import { useNavigate, useLocation } from "react-router-dom";

import "./header.scss";

import Button from "../Button/Button";

const AUTH_ROUTES = ["/sign-in", "/sign-up"];

const Header = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const isAuthPage = AUTH_ROUTES.includes(pathname);

  return (
    <div className="headerContainer">
      <p onClick={() => navigate("/")}>Todo</p>

      {!isAuthPage && (
        <div className="utilityContainer">
          <p>Hi Sumit!</p>
          <Button>Logout</Button>
        </div>
      )}
    </div>
  );
};

export default Header;
