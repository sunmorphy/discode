import Modal from "../components/Modal";
import React from "react";
import useInput from "../hooks/useInput";
import ThreadInput from "../components/sections/threads/ThreadInput";
import PropTypes from "prop-types";
import useQuillInput from "../hooks/useQuillInput";
import { useDispatch } from "react-redux";
import { asyncAddThread } from "../state/threads/action";
import toast from "react-hot-toast";

function AddPage({ onCancel, onSubmit }) {
  const [title, onTitleChange] = useInput();
  const [body, onBodyChange] = useQuillInput();
  const [category, onCategoryChange] = useInput();
  const dispatch = useDispatch();

  const onCreateThread = () => {
    body === undefined ||
    body === null ||
    body.trim() === "" ||
    body.trim() === "<p><br></p>"
      ? toast.error("Description cannot be empty")
      : dispatch(
          asyncAddThread({
            title,
            body,
            category,
          }),
        )
          .then(() => onSubmit())
          .catch((e) => toast.error(e));
  };

  return (
    <Modal title="Create Thread">
      <ThreadInput
        title={title}
        body={body}
        category={category}
        onTitleChange={onTitleChange}
        onBodyChange={onBodyChange}
        onCategoryChange={onCategoryChange}
        onCancel={onCancel}
        onSubmit={onCreateThread}
      />
    </Modal>
  );
}

AddPage.propTypes = {
  onCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default AddPage;
