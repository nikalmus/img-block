import React, { useState } from "react";
import Hash from "./Hash";

const ImageBlock = ({ img }) => {
  return (
    <div className="frame">
      <img src={img} className="photo" alt="" />
      <Hash img={img} />
    </div>
  );
};

export default ImageBlock;
