import React, { useState } from "react";

const Hash = ({ node, blockId, prev, hash, setHash, setPrev, badActor }) => {
  const [visibleDiv, setVisibleDiv] = useState(true);
  const [inputValue, setInputValue] = useState(prev);
  const [visibleInput, setVisibleInput] = useState(false);

  const handleDivClick = () => {
    setVisibleDiv(false);
    setVisibleInput(true);
  };

  const handleDoneClick = () => {
    setVisibleDiv(true);
    setVisibleInput(false);
    setPrev(inputValue);
    setHash("");
  };

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const inputBox = (
    <>
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        className="hack"
        size="40"
      />
      <button onClick={handleDoneClick}>Done</button>
    </>
  );
  return (
    <>
      {visibleDiv && (
        <div
          className="hash"
          id={`node${node}-block${blockId}-prev`}
          onClick={badActor ? handleDivClick : null}
          title={badActor ? "2. Click to paste previous hash from clipboard" : undefined}
          style={{ cursor: badActor ? 'pointer' : 'default' }}
        >
          Prev: {inputValue ? inputValue : prev}
        </div>
      )}
      {visibleInput && inputBox}
      <div className="hash" id={`node${node}-block${blockId}-hash`}>
        Hash: {hash}
      </div>
    </>
  );
};

export default Hash;
