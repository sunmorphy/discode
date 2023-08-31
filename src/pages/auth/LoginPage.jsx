import React from "react";
import PropTypes from "prop-types";
import LoginInput from "../../components/sections/auth/LoginInput";
import Modal from "../../components/Modal";
import { useDispatch } from "react-redux";
import { asyncSetAuthUser } from "../../state/auth/action";
import toast from "react-hot-toast";

function LoginPage({ onCancel, onSubmit }) {
  const dispatch = useDispatch();

  const onLogin = ({ email, password }) => {
    dispatch(asyncSetAuthUser({ email, password }))
      .then(() => onSubmit())
      .catch((e) => toast.error(e));
  };

  return (
    <Modal title="Login">
      <LoginInput onCancel={onCancel} onLogin={onLogin} />
    </Modal>
  );
}

LoginPage.propTypes = {
  onCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default LoginPage;
