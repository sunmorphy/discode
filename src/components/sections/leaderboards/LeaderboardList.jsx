import React from "react";
import LeaderboardItem from "./LeaderboardItem";
import PropTypes from "prop-types";

function LeaderboardList({ leaderboards }) {
  return (
    <div className="hidden md:flex flex-col">
      <h4 className="text-xl font-medium">Top Leaderboards</h4>
      <div className="pt-3">
        {leaderboards.map((leaderboard, index) => {
          return (
            index < 5 && (
              <LeaderboardItem
                key={leaderboard.user.id}
                score={leaderboard.score}
                name={leaderboard.user.name}
                avatar={leaderboard.user.avatar}
                email={leaderboard.user.email}
              />
            )
          );
        })}
      </div>
    </div>
  );
}

LeaderboardList.propTypes = {
  leaderboards: PropTypes.array.isRequired,
};

export default LeaderboardList;
