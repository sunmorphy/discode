import PropTypes from "prop-types";
import React from "react";

function Modal({ title, children }) {
  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 m-12 outline-none focus:outline-none">
        <div className="relative w-full my-6 mx-auto max-w-sm">
          <div className="border-0 rounded-md shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {title && (
              <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                <h3 className="text-2xl font-bold">{title}</h3>
              </div>
            )}
            {children}
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
}

Modal.propTypes = {
  title: PropTypes.string,
  children: PropTypes.element.isRequired,
};

export default Modal;
