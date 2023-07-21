import React, { useState, useEffect, useCallback, useRef } from "react";
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

const copyToClipBoard = async (txt) => {
  try {
    await navigator.clipboard.writeText(txt);
  } catch (err) {}
};

const ImageBlock = ({ node, blockId, prevHash, hashes, setHashes, badActor, onImageReplacedByBadActor }) => {
  const [nonce, setNonce] = useState(0);
  const [exifrData, setExifrData] = useState("");
  const [isMining, setIsMining] = useState(false);
  const [hash, setHash] = useState("");
  const [prev, setPrev] = useState(prevHash);

  const [blockImage, setBlockImage] = useState(null);
  const imagePresentRef = useRef(false);
  const badActorRef = useRef(badActor);

  useEffect(() => {
    badActorRef.current = badActor;
  }, [badActor]);

  const [, drop] = useDrop(
    () => ({
      accept: "picture",
      drop: (item, monitor) => {
        if (!imagePresentRef.current || badActorRef.current) {
          addImageToBlock(item);
        }
      },
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    })
  );


  const addImageToBlock = (image) => {
    if (!imagePresentRef.current || badActorRef.current) {
      imagePresentRef.current = true;
      setBlockImage((prevImage) => image);
      setHash("");
      setNonce(0);
      if (badActorRef.current){
        onImageReplacedByBadActor(true)
      }
    }
  };

  const getHash = useCallback(() => {
    if (isMining && blockImage) {
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
      <div className="block" id={`node${node}-${blockId}-block`}>
        <div className="frame" id={`node${node}-${blockId}-frame`} ref={drop}>
          <div className="block-id">block {blockId}</div>
          <div className="block-header">
            <NonceBox nonce={nonce} setNonce={setNonce} />
            <button
              className="btn"
              onClick={handleClick}
              disabled={!blockImage}
            >
              Mine
            </button>
            {
              badActor && 
              <button onClick={() => copyToClipBoard(hash)}
              className="icon btn-right"
              title="1. Click to copy the hash to clipboard"
              >
              {"\u2398"}
            </button>
            }
          </div>
          <Hash
            node={node}
            blockId={blockId}
            hash={hash}
            prev={prevHash}
            setHash={setHash}
            setPrev={setPrev}
            badActor={badActor}
          />
          <div className="picture-frame" id={`node${node}-block${blockId}-pic`}>
            {blockImage && <Image img={blockImage?.src} id={blockImage?.id} />}
          </div>
        </div>
      </div>
    </>
  );
};

export default ImageBlock;
