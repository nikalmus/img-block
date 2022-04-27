import React, { useState, useEffect } from "react";
import exifr from "exifr";

async function digestMessage(message) {
  const msgUint8 = new TextEncoder().encode(message); // encode as (utf-8) Uint8Array
  const hashBuffer = await crypto.subtle.digest("SHA-256", msgUint8); // hash the message
  const hashArray = Array.from(new Uint8Array(hashBuffer)); // convert buffer to byte array
  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join(""); // convert bytes to hex string
  return hashHex;
}

const Hash = ({ img }) => {
  const [exifrData, setExifrData] = useState("");
  const [hash, setHash] = useState(null);
  useEffect(() => {
    exifr.parse(img).then((data) => setExifrData(JSON.stringify(data)));
    digestMessage(exifrData).then((digestHex) => setHash(digestHex));
  }, [exifrData, img]);
  return <div>{hash}</div>;
};

export default Hash;
