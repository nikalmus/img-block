import React, { useState } from "react";
import NonceBox from "./NonceBox";
import Hash from "./Hash";

const ImageBlock = ({ img }) => {
  const [nonce, setNonce] = useState(0);
  return (
    <>
      <div className="frame">
        <NonceBox nonce={nonce} setNonce={setNonce} />
        <img src={img} className="photo" alt="" />
        <Hash img={img} nonce={nonce} />
      </div>
    </>
  );
};

export default ImageBlock;
