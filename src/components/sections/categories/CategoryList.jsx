import React from "react";
import PropTypes from "prop-types";
import CategoryItem from "./CategoryItem";
import { IconButton } from "../../buttons";
import { FaTrashCan } from "react-icons/fa6";

function CategoryList({
  isCategoryExist,
  categories,
  onCategoryClick,
  onClearClick,
}) {
  return (
    <div className="flex flex-col">
      <div className="flex flex-row justify-between items-center">
        <h4 className="text-xl font-medium">Popular Categories</h4>
        {isCategoryExist && (
          <IconButton isOutline onClick={onClearClick}>
            <FaTrashCan className="text-sm" />
          </IconButton>
        )}
      </div>
      <div className="flex flex-row flex-wrap gap-1.5 pt-6">
        {categories.map((category) => {
          return (
            <CategoryItem
              key={category}
              category={category}
              onClick={onCategoryClick}
            />
          );
        })}
      </div>
    </div>
  );
}

CategoryList.propTypes = {
  isCategoryExist: PropTypes.bool.isRequired,
  categories: PropTypes.array.isRequired,
  onCategoryClick: PropTypes.func.isRequired,
  onClearClick: PropTypes.func.isRequired,
};

export default CategoryList;
