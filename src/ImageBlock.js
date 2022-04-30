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

const ImageBlock = ({ prevHash, hashes, setHashes }) => {
  const [nonce, setNonce] = useState(0);
  const [exifrData, setExifrData] = useState("");
  const [isMining, setIsMining] = useState(false);
  const [hash, setHash] = useState("");
  const [prev, setPrev] = useState(prevHash);

  const [blockImage, setBlockImage] = useState(null);
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "picture",
    drop: (item) => addImageToBlock(item),
  }));

  const addImageToBlock = (image) => {
    setBlockImage((prevImage) => image);
    setHash("");
    setNonce(0);
  };

  const getHash = useCallback(() => {
    if (isMining) {
      exifr
        .parse(blockImage.src)
        .then((data) => setExifrData(JSON.stringify(data)));
      digestMessage(exifrData.concat(nonce).concat(prev)).then((digestHex) => {
        if (!digestHex.startsWith("00")) {
          setNonce((prev) => prev + 1);
        } else {
          setIsMining(false);
          setHash(digestHex);
          setHashes([
            ...hashes,
            { id: blockImage.id, prev: prevHash, hash: digestHex },
          ]);
        }
      });
    }
  }, [
    blockImage,
    nonce,
    exifrData,
    isMining,
    hashes,
    setHashes,
    prevHash,
    prev,
  ]);

  const handleClick = () => {
    setNonce(0);
    setIsMining(true);
  };

  useEffect(() => {
    getHash();
  }, [getHash]);

  return (
    <>
      <div className="foo">
        <div className="frame" ref={drop}>
          <div className="block">
            <NonceBox nonce={nonce} setNonce={setNonce} />
            <button className="btn" onClick={handleClick}>
              Mine
            </button>
          </div>
          <Hash
            hash={hash}
            prev={prevHash}
            setHash={setHash}
            setPrev={setPrev}
          />
          <div className="picture-frame">
            {blockImage && <Image img={blockImage?.src} id={blockImage?.id} />}
          </div>
        </div>
      </div>
    </>
  );
};

export default ImageBlock;
