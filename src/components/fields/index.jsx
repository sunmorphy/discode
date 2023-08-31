import React, { forwardRef } from "react";
import PropTypes from "prop-types";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const baseFieldPropTypes = {
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  onValueChange: PropTypes.func.isRequired,
  classes: PropTypes.string,
};

const BasicField = forwardRef(function BasicField(
  { label, placeholder, value, onValueChange, classes },
  ref,
) {
  return (
    <div className={`flex flex-col max-w-sm ${classes}`}>
      {label && (
        <label htmlFor={label.toLowerCase()} className="font-semibold">
          {label}
        </label>
      )}
      <input
        id={label ? label.toLowerCase() : ""}
        type="text"
        placeholder={placeholder}
        className="outline-0 rounded-md border border-gray-200 focus:border-jungle-green shadow-sm text-sm md:text-base py-2 px-3 mt-1"
        required
        value={value}
        onChange={onValueChange}
        ref={ref}
      />
    </div>
  );
});

BasicField.propTypes = {
  label: PropTypes.string,
  ...baseFieldPropTypes,
};

function RichTextField({ label, placeholder, value, onValueChange, classes }) {
  return (
    <div className="flex flex-col">
      {label && (
        <label htmlFor={label.toLowerCase()} className="font-semibold">
          {label}
        </label>
      )}
      <ReactQuill
        theme="snow"
        placeholder={placeholder}
        value={value}
        onChange={onValueChange}
        className={`outline-0 rounded-md border border-gray-200 bg-baby-powder focus:border-jungle-green shadow-sm text-earie-black text-sm md:text-base ${classes}`}
      />
    </div>
  );
}

RichTextField.propTypes = {
  ...baseFieldPropTypes,
};

const ClickableField = forwardRef(function ClickableField(
  { label, placeholder, classes, onClick },
  ref,
) {
  return (
    <div className={`flex flex-col max-w-sm ${classes}`}>
      {label && (
        <label htmlFor={label.toLowerCase()} className="font-semibold">
          {label}
        </label>
      )}
      <input
        id={label ? label.toLowerCase() : ""}
        type="text"
        placeholder={placeholder}
        className="outline-0 rounded-md border border-gray-200 focus:border-jungle-green shadow-sm text-sm md:text-base py-2 px-3"
        onClick={onClick}
        ref={ref}
      />
    </div>
  );
});

ClickableField.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  classes: PropTypes.string,
  onClick: PropTypes.func.isRequired,
};

const EmailField = forwardRef(function EmailField(
  { placeholder, value, onValueChange, classes },
  ref,
) {
  return (
    <div className={`flex flex-col max-w-sm ${classes}`}>
      <label htmlFor="email" className="font-semibold">
        Email
      </label>
      <input
        id="email"
        type="email"
        placeholder={placeholder}
        className="outline-0 rounded-md border border-gray-200 focus:border-jungle-green shadow-sm text-sm md:text-base py-2 px-3 mt-1"
        required
        autoComplete={"username"}
        value={value}
        onChange={onValueChange}
        ref={ref}
      />
    </div>
  );
});

EmailField.propTypes = {
  ...baseFieldPropTypes,
};

const PasswordField = forwardRef(function EmailField(
  { label, placeholder, value, onValueChange, classes },
  ref,
) {
  return (
    <div className={`flex flex-col max-w-sm ${classes}`}>
      <label htmlFor="password" className="font-semibold">
        {label ? label : "Password"}
      </label>
      <input
        id="password"
        type="password"
        placeholder={placeholder}
        className="outline-0 rounded-md border border-gray-200 focus:border-jungle-green shadow-sm text-sm md:text-base py-2 px-3 mt-1"
        required
        minLength={6}
        autoComplete={"current-password"}
        value={value}
        onChange={onValueChange}
        ref={ref}
      />
    </div>
  );
});

PasswordField.propTypes = {
  label: PropTypes.string,
  ...baseFieldPropTypes,
};

export { BasicField, RichTextField, ClickableField, EmailField, PasswordField };
