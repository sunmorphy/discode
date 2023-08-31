import React from "react";
import ThreadContent from "./ThreadContent";
import PropTypes from "prop-types";

function ThreadList({ threads, onVoteThread, onCategoryClick }) {
  return (
    <>
      {threads.map((thread) => (
        <ThreadContent
          key={thread.id}
          id={thread.id}
          date={thread.createdAt}
          name={thread.user.name}
          avatar={thread.user.avatar}
          categories={thread.category}
          title={thread.title}
          upVotesBy={thread.upVotesBy}
          downVotesBy={thread.downVotesBy}
          commentCount={thread.totalComments}
          authUserId={thread.authUserId}
          onVoteThread={onVoteThread}
          onCategoryClick={onCategoryClick}
        />
      ))}
    </>
  );
}

ThreadList.propTypes = {
  threads: PropTypes.array.isRequired,
  onVoteThread: PropTypes.func.isRequired,
  onCategoryClick: PropTypes.func.isRequired,
};

export default ThreadList;
