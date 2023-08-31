import React from "react";
import PropTypes from "prop-types";

function CategoryItem({ category, onClick }) {
  return (
    <div className="bg-jungle-green rounded-md pb-1 px-2">
      <button onClick={() => onClick(category)}>
        <p className="text-sm hover:underline">{`# ${category.toLowerCase()}`}</p>
      </button>
    </div>
  );
}

CategoryItem.propTypes = {
  category: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default CategoryItem;
