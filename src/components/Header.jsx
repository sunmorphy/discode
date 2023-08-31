import React from "react";
import { BasicButton, IconButton } from "./buttons";
import PropTypes from "prop-types";
import { FaArrowRightFromBracket } from "react-icons/fa6";
import { Link } from "react-router-dom";

function Header({ authUser, onLogin, onRegister, onLogout }) {
  return (
    <header className="flex flex-row justify-between items-center bg-baby-powder text-earie-black py-6 px-10 rounded-md">
      <Link to="/">
        <img src="/icons/discode.svg" className="h-16 w-16" alt="discode" />
      </Link>
      {authUser ? (
        <div className="flex flex-row items-center gap-4">
          <h3 className="text-lg font-bold">Hello, {authUser.name}!</h3>
          <IconButton isOutline onClick={onLogout}>
            <FaArrowRightFromBracket />
          </IconButton>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <BasicButton
            text="Register"
            onClick={onRegister}
            classes="hidden sm:block"
            isOutline
          />
          <BasicButton text="Login" onClick={onLogin} />
        </div>
      )}
    </header>
  );
}

Header.propTypes = {
  authUser: PropTypes.object,
  onLogin: PropTypes.func.isRequired,
  onRegister: PropTypes.func.isRequired,
  onLogout: PropTypes.func.isRequired,
};

export default Header;
