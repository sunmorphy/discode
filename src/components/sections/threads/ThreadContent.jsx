import React from "react";
import PropTypes from "prop-types";
import { IconButton } from "../../buttons";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";
import CategoryItem from "../categories/CategoryItem";
import { showFormattedDate } from "../../../utils";
import { Link } from "react-router-dom";
import parser from "html-react-parser";

function ThreadContent({
  id,
  date,
  avatar,
  name,
  title,
  body,
  categories,
  upVotesBy,
  downVotesBy,
  commentCount,
  authUserId,
  onVoteThread,
  onCategoryClick,
}) {
  const isAlreadyUpVote = upVotesBy.includes(authUserId) ? null : true;
  const isAlreadyDownVote = downVotesBy.includes(authUserId) ? null : false;
  const onToggleVote = (e, isUpVote) => {
    onVoteThread(id, isUpVote);
  };

  return (
    <div className="w-full flex flex-col gap-3 mb-20 break-words">
      <div className="flex flex-row items-start gap-4">
        <div className="flex flex-col gap-2 items-center">
          <IconButton
            onClick={(e) => onToggleVote(e, isAlreadyUpVote)}
            isPositive={isAlreadyUpVote === null}
          >
            <FaCaretUp />
          </IconButton>
          <h3>{upVotesBy.length - downVotesBy.length}</h3>
          <IconButton
            onClick={(e) => onToggleVote(e, isAlreadyDownVote)}
            isNegative={isAlreadyDownVote === null}
          >
            <FaCaretDown />
          </IconButton>
        </div>
        <div className="w-full flex flex-col gap-5">
          <Link to={`/threads/${id}`}>
            <h3
              className={`text-xl font-semibold ${
                title.includes(" ") ? "break-words" : "break-all"
              } hover:underline`}
            >
              {title}
            </h3>
          </Link>
          {body && (
            <div
              className={`text-lg ${
                body.includes(" ") ? "break-words" : "break-all"
              }`}
            >
              {parser(body)}
            </div>
          )}
          <div className="flex flex-row justify-between items-center gap-12">
            <div className="flex flex-row flex-wrap gap-2">
              {categories.split(",").map((category) => (
                <CategoryItem
                  key={category.trimEnd()}
                  category={category.trimEnd()}
                  onClick={onCategoryClick}
                />
              ))}
            </div>
            <p className="text-sm text-end font-light">
              {`${commentCount} comments`} - {showFormattedDate(date)}
            </p>
          </div>
        </div>
      </div>
      <div className="w-32 flex flex-col gap-2 bg-baby-powder text-earie-black rounded-md p-2.5 mt-2 self-end">
        <img
          src={avatar}
          alt={name}
          className="w-6 h-6 aspect-square rounded-md"
        />
        <h4 className="text-sm font-semibold grow text-ellipsis overflow-hidden">
          {name}
        </h4>
      </div>
    </div>
  );
}

ThreadContent.propTypes = {
  id: PropTypes.string.isRequired,
  date: PropTypes.string,
  avatar: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string,
  categories: PropTypes.string.isRequired,
  upVotesBy: PropTypes.array.isRequired,
  downVotesBy: PropTypes.array.isRequired,
  commentCount: PropTypes.number.isRequired,
  authUserId: PropTypes.string,
  onVoteThread: PropTypes.func.isRequired,
  onCategoryClick: PropTypes.func.isRequired,
};

export default ThreadContent;
