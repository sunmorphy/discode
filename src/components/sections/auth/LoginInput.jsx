import React from "react";
import { EmailField, PasswordField } from "../../fields";
import { CancelButton, SubmitButton } from "../../buttons";
import useInput from "../../../hooks/useInput";
import PropTypes from "prop-types";

function LoginInput({ onCancel, onLogin }) {
  const [email, onEmailChange] = useInput();
  const [password, onPasswordChange] = useInput();

  const onSubmit = (e) => {
    e.preventDefault();
    onLogin({ email, password });
  };

  return (
    <form
      className="flex flex-col relative p-6 flex-auto gap-4"
      onSubmit={onSubmit}
    >
      <EmailField
        onValueChange={(value) => onEmailChange(value)}
        value={email}
      />
      <PasswordField onValueChange={onPasswordChange} value={password} />
      <div className="flex gap-4 items-center justify-end pt-6 mt-6 border-t border-solid border-slate-200 rounded-b">
        <CancelButton onClick={onCancel} text="Close" isOutline />
        <SubmitButton text="Login" />
      </div>
    </form>
  );
}

LoginInput.propTypes = {
  onCancel: PropTypes.func.isRequired,
  onLogin: PropTypes.func.isRequired,
};

export default LoginInput;
