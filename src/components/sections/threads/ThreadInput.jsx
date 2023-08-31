import React from "react";
import PropTypes from "prop-types";
import { BasicField, RichTextField } from "../../fields";
import { CancelButton, SubmitButton } from "../../buttons";

function ThreadInput({
  title,
  body,
  category,
  onTitleChange,
  onBodyChange,
  onCategoryChange,
  onCancel,
  onSubmit,
}) {
  const onCreate = (e) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form
      className="flex flex-col relative p-6 flex-auto gap-4"
      onSubmit={onCreate}
    >
      <BasicField
        placeholder="Insert title here..."
        label="Title"
        value={title}
        onValueChange={onTitleChange}
      />
      <BasicField
        placeholder="Insert category here..."
        label="Category"
        value={category}
        onValueChange={onCategoryChange}
      />
      <RichTextField
        placeholder="Insert description here..."
        label="Description"
        classes="mt-1"
        onValueChange={onBodyChange}
        value={body}
      />
      <div className="flex gap-4 items-center justify-end pt-6 mt-6 border-t border-solid border-slate-200 rounded-b">
        <CancelButton onClick={onCancel} text="Close" isOutline />
        <SubmitButton text="Create" />
      </div>
    </form>
  );
}

ThreadInput.propTypes = {
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  onTitleChange: PropTypes.func.isRequired,
  onBodyChange: PropTypes.func.isRequired,
  onCategoryChange: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default ThreadInput;
