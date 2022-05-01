import React from "react";
import Backdrop from "./Backdrop";
import Modal from "./Modal";
import "./PictureModal.css";

const PictureModal = ({ large, setLoadBigImg }) => {
  return (
    <>
      <Backdrop />
      <Modal>
        <div className="large-img">
          <img src={large} alt="" />
          <button className="btn" onClick={() => setLoadBigImg(false)}>
            X
          </button>
        </div>
      </Modal>
    </>
  );
};

export default PictureModal;
