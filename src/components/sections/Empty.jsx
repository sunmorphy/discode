import React from "react";
import PropTypes from "prop-types";

function Empty({ context }) {
  return (
    <div className="flex flex-row justify-center items-center gap-4 p-24">
      <h3 className="font-bold">{`${context} is empty.`}</h3>
    </div>
  );
}

Empty.propTypes = {
  context: PropTypes.string.isRequired,
};

export default Empty;
