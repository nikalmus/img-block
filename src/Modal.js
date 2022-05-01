import React from "react";
import { createPortal } from "react-dom";

const Modal = (props) => {
  const modalRoot = document.getElementById("modal");
  return createPortal(<div className="modal">{props.children}</div>, modalRoot);
};

export default Modal;
