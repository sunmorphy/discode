import React from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";

const baseButtonPropTypes = {
  text: PropTypes.string,
  onClick: PropTypes.func,
  classes: PropTypes.string,
};

function BasicButton({ text, onClick, classes, isOutline }) {
  return (
    <motion.button
      className={`${classes} py-2 px-6 ${
        isOutline
          ? "border border-earie-black bg-baby-powder text-earie-black"
          : "border border-earie-black bg-earie-black text-baby-powder"
      } rounded-md text-sm font-bold`}
      onClick={onClick}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      {text}
    </motion.button>
  );
}

BasicButton.propTypes = {
  ...baseButtonPropTypes,
  isOutline: PropTypes.bool,
};

function IconButton({
  onClick,
  classes,
  isOutline,
  isPositive,
  isNegative,
  children,
}) {
  return (
    <motion.button
      className={`${classes} ${
        isOutline
          ? "bg-transparent"
          : `bg-earie-black ${
              isPositive
                ? "text-robin-egg-blue"
                : isNegative
                ? "text-red-400"
                : "text-baby-powder"
            }`
      } rounded-md text-2xl font-bold aspect-square`}
      onClick={onClick}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      {children}
    </motion.button>
  );
}

IconButton.propTypes = {
  ...baseButtonPropTypes,
  isOutline: PropTypes.bool,
  isPositive: PropTypes.bool,
  isNegative: PropTypes.bool,
};

function SubmitButton({ text, onClick, classes, isOutline }) {
  return (
    <motion.button
      className={`${classes} py-2 px-6 ${
        isOutline
          ? "border border-earie-black bg-transparent"
          : "border border-earie-black bg-earie-black text-baby-powder"
      } rounded-md text-sm font-bold`}
      onClick={onClick}
      type={"submit"}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      {text}
    </motion.button>
  );
}

SubmitButton.propTypes = {
  ...baseButtonPropTypes,
  isOutline: PropTypes.bool,
};

function CancelButton({ text, onClick, classes, isOutline }) {
  return (
    <motion.button
      className={`${classes} py-2 px-6 ${
        isOutline
          ? "border border-red-600 bg-transparent text-red-600"
          : "bg-red-600 text-baby-powder"
      } rounded-md text-sm font-bold`}
      onClick={onClick}
      type={"button"}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      {text}
    </motion.button>
  );
}

CancelButton.propTypes = {
  ...baseButtonPropTypes,
  isOutline: PropTypes.bool,
};

export { BasicButton, IconButton, CancelButton, SubmitButton };
