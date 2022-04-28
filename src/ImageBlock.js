import React, { useState, useEffect, useCallback } from "react";
import NonceBox from "./NonceBox";
import Hash from "./Hash";
import Image from "./Image";
import exifr from "exifr";
import { useDrop } from "react-dnd";

async function digestMessage(message) {
  const msgUint8 = new TextEncoder().encode(message); // encode as (utf-8) Uint8Array
  const hashBuffer = await crypto.subtle.digest("SHA-256", msgUint8); // hash the message
  const hashArray = Array.from(new Uint8Array(hashBuffer)); // convert buffer to byte array
  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join(""); // convert bytes to hex string
  return hashHex;
}

const ImageBlock = () => {
  const [nonce, setNonce] = useState(0);
  const [exifrData, setExifrData] = useState("");
  const [isMining, setIsMining] = useState(false);
  const [hash, setHash] = useState("");

  const [blockImage, setBlockImage] = useState(null);
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "picture",
    drop: (item) => addImageToBlock(item),
  }));

  const addImageToBlock = (img) => {
    setBlockImage(img);
  };

  const getHash = useCallback(() => {
    if (isMining) {
      exifr
        .parse(blockImage.src)
        .then((data) => setExifrData(JSON.stringify(data)));
      digestMessage(exifrData.concat(nonce)).then((digestHex) => {
        if (!digestHex.startsWith("000")) {
          setNonce((prev) => prev + 1);
        } else {
          setIsMining((prev) => !prev);
          setHash(digestHex);
        }
      });
    }
  }, [blockImage?.src, nonce, exifrData, isMining]);

  const handleClick = () => {
    setIsMining((prev) => !prev);
  };

  useEffect(() => {
    getHash();
  }, [getHash]);

  return (
    <>
      <div className="frame" ref={drop}>
        <NonceBox nonce={nonce} setNonce={setNonce} />
        {blockImage && <Image img={blockImage?.src} id={blockImage?.id} />}
        <Hash hash={hash} />
        <button className="btn" onClick={handleClick}>
          Mine
        </button>
      </div>
    </>
  );
};

export default ImageBlock;
