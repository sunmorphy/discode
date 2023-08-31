import React from "react";
import { RichTextField } from "../../fields";
import { BasicButton } from "../../buttons";
import PropTypes from "prop-types";

function CommentInput({ comment, onCommentChange, onSubmitComment }) {
  return (
    <>
      <RichTextField
        placeholder="Comment..."
        onValueChange={onCommentChange}
        value={comment}
      />
      <div className="flex justify-end">
        <BasicButton text="Submit" onClick={onSubmitComment} isOutline />
      </div>
    </>
  );
}

CommentInput.propTypes = {
  comment: PropTypes.string.isRequired,
  onCommentChange: PropTypes.func.isRequired,
  onSubmitComment: PropTypes.func.isRequired,
};

export default CommentInput;
