import React from "react";

const Hash = ({ blockId, prev, hash }) => {
  return (
    <>
      <div>Prev: {prev}</div>
      <div>Hash: {hash}</div>
    </>
  );
};

export default Hash;
