import React, { useEffect } from "react";
import ThreadContent from "../components/sections/threads/ThreadContent";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import NotFound from "../components/sections/NotFound";
import {
  asyncAddCommentThreadDetail,
  asyncReceiveThreadDetail,
  asyncToggleVoteCommentThreadDetail,
  asyncToggleVoteThreadDetail,
} from "../state/threadDetail/action";
import CommentItem from "../components/sections/comments/CommentItem";
import Empty from "../components/sections/Empty";
import useQuillInput from "../hooks/useQuillInput";
import PropTypes from "prop-types";
import CommentInput from "../components/sections/comments/CommentInput";
import toast from "react-hot-toast";

function DetailPage({ setLoginModal }) {
  const { id } = useParams();
  const [comment, onCommentChange, clearComment] = useQuillInput();
  const { authUser, detailThread } = useSelector((states) => states);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncReceiveThreadDetail(id)).catch((e) => toast.error(e));
  }, [id, dispatch]);

  if (!detailThread) {
    return <NotFound />;
  }

  const thread = {
    ...detailThread,
    authUserId: authUser?.id,
    commentCount: detailThread.comments.length,
  };

  const onVoteThread = ({ isUpVote }) => {
    authUser
      ? dispatch(asyncToggleVoteThreadDetail({ isUpVote })).catch((e) =>
          toast.error(e),
        )
      : setLoginModal(true);
  };

  const onVoteCommentThread = ({ commentId, isUpVote }) => {
    authUser
      ? dispatch(
          asyncToggleVoteCommentThreadDetail({ commentId, isUpVote }),
        ).catch((e) => toast.error(e))
      : setLoginModal(true);
  };

  const onSubmitComment = () => {
    authUser
      ? comment === undefined ||
        comment === null ||
        comment.trim() === "" ||
        comment.trim() === "<p><br></p>"
        ? toast.error("Comment cannot be empty")
        : dispatch(
            asyncAddCommentThreadDetail({ threadId: id, content: comment }),
          )
            .then(() => clearComment())
            .catch((e) => toast.error(e))
      : setLoginModal(true);
  };

  return (
    <div className="flex flex-col gap-12 pt-8 sm:pt-12 lg:pt-16">
      <ThreadContent
        id={thread.id}
        date={thread.createdAt}
        avatar={thread.owner.avatar}
        name={thread.owner.name}
        title={thread.title}
        body={thread.body}
        categories={thread.category}
        upVotesBy={thread.upVotesBy}
        downVotesBy={thread.downVotesBy}
        commentCount={thread.commentCount}
        authUserId={thread.authUserId}
        onVoteThread={(id, isUpVote) => onVoteThread({ isUpVote })}
        onCategoryClick={() => {}}
      />
      <div className="flex flex-col gap-6">
        <h4 className="text-xl font-medium">Comments</h4>
        <CommentInput
          onCommentChange={onCommentChange}
          comment={comment}
          onSubmitComment={onSubmitComment}
        />
        <div className="mt-12">
          {detailThread.comments.length === 0 ? (
            <Empty context="Comments" />
          ) : (
            detailThread.comments.map((comment) => (
              <CommentItem
                key={comment.id}
                id={comment.id}
                date={comment.createdAt}
                avatar={comment.owner.avatar}
                name={comment.owner.name}
                content={comment.content}
                upVotesBy={comment.upVotesBy}
                downVotesBy={comment.downVotesBy}
                authUserId={thread.authUserId}
                onVoteComment={(id, isUpVote) =>
                  onVoteCommentThread({ commentId: id, isUpVote })
                }
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

DetailPage.propTypes = {
  setLoginModal: PropTypes.func.isRequired,
};

export default DetailPage;
