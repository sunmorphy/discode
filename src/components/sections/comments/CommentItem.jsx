import { IconButton } from "../../buttons";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";
import React from "react";
import PropTypes from "prop-types";
import { showFormattedDate } from "../../../utils";
import parser from "html-react-parser";

function CommentItem({
  id,
  date,
  avatar,
  name,
  content,
  upVotesBy,
  downVotesBy,
  authUserId,
  onVoteComment,
}) {
  const isAlreadyUpVote = upVotesBy.includes(authUserId) ? null : true;
  const isAlreadyDownVote = downVotesBy.includes(authUserId) ? null : false;

  const onToggleVote = (e, isUpVote) => {
    onVoteComment(id, isUpVote);
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
          <h3 className="text-xl font-semibold">{parser(content)}</h3>
          <div className="flex flex-row justify-end items-center gap-12">
            <p className="text-sm text-end font-light">
              {showFormattedDate(date)}
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

CommentItem.propTypes = {
  id: PropTypes.string.isRequired,
  date: PropTypes.string,
  avatar: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  upVotesBy: PropTypes.array.isRequired,
  downVotesBy: PropTypes.array.isRequired,
  authUserId: PropTypes.string,
  onVoteComment: PropTypes.func.isRequired,
};

export default CommentItem;
