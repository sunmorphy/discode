import React from "react";
import PropTypes from "prop-types";
import RegisterInput from "../../components/sections/auth/RegisterInput";
import Modal from "../../components/Modal";
import { useDispatch } from "react-redux";
import { asyncRegisterUser } from "../../state/users/action";
import toast from "react-hot-toast";

function RegisterPage({ onCancel, onSubmit }) {
  const dispatch = useDispatch();

  const onRegister = ({ name, email, password }) => {
    dispatch(asyncRegisterUser({ name, email, password }))
      .then(() => onSubmit())
      .catch((e) => toast.error(e));
  };

  return (
    <Modal title="Register">
      <RegisterInput onCancel={onCancel} onRegister={onRegister} />
    </Modal>
  );
}

RegisterPage.propTypes = {
  onCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default RegisterPage;
