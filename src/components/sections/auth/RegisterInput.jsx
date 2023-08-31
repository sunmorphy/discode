import React from "react";
import { BasicField, EmailField, PasswordField } from "../../fields";
import { CancelButton, SubmitButton } from "../../buttons";
import useInput from "../../../hooks/useInput";
import PropTypes from "prop-types";

function RegisterInput({ onCancel, onRegister }) {
  const [name, onNameChange] = useInput();
  const [email, onEmailChange] = useInput();
  const [password, onPasswordChange] = useInput();

  const onSubmit = (e) => {
    e.preventDefault();
    onRegister({ name, email, password });
  };

  return (
    <form
      className="flex flex-col relative p-6 flex-auto gap-4"
      onSubmit={onSubmit}
    >
      <BasicField onValueChange={onNameChange} label="Name" value={name} />
      <EmailField
        onValueChange={(value) => onEmailChange(value)}
        value={email}
      />
      <PasswordField onValueChange={onPasswordChange} value={password} />
      <div className="flex gap-4 items-center justify-end pt-6 mt-6 border-t border-solid border-slate-200 rounded-b">
        <CancelButton onClick={onCancel} text="Close" isOutline />
        <SubmitButton text="Register" />
      </div>
    </form>
  );
}

RegisterInput.propTypes = {
  onCancel: PropTypes.func.isRequired,
  onRegister: PropTypes.func.isRequired,
};

export default RegisterInput;
