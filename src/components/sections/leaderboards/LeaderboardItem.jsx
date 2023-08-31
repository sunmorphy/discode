import React from "react";
import PropTypes from "prop-types";

function LeaderboardItem({ avatar, name, email, score }) {
  return (
    <div className="flex flex-row gap-2 items-center bg-baby-powder text-earie-black rounded-md p-1 my-4">
      <img src={avatar} alt={name} className="w-10 h-10 aspect-square rounded-md" />
      <div className="grow text-ellipsis overflow-hidden">
        <h4 className="text-sm font-semibold line-clamp-1">{name}</h4>
        <p className="text-xs font-light line-clamp-1">{email}</p>
      </div>
      <div className="min-w-[48px] flex justify-center items-center bg-jungle-green text-baby-powder aspect-square rounded-md">
        <h4 className="text-sm font-semibold">{score}</h4>
      </div>
    </div>
  );
}

LeaderboardItem.propTypes = {
  avatar: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

export default LeaderboardItem;
