import React from "react";
import { IconButton } from "./buttons";
import PropTypes from "prop-types";
import { FaArrowUp } from "react-icons/fa";

function Footer({ onBackToTop }) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center bg-onyx rounded-tl-xl rounded-tr-xl mt-12 px-12 py-6">
      <img src="/icons/discode.svg" alt="discode" className="w-32 h-32" />
      <IconButton onClick={onBackToTop} isOutline>
        <FaArrowUp />
      </IconButton>
    </div>
  );
}

Footer.propTypes = {
  onBackToTop: PropTypes.func.isRequired,
};

export default Footer;
