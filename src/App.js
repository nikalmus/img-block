import React, { useState, useMemo, useRef } from "react";
import Image from "./Image";
import ImageBlock from "./ImageBlock";
import paintings from "./img";

function App() {
  const images = useMemo(
    () => [
      {
        id: 0,
        src: paintings.cave,
      },
      {
        id: 1,
        src: paintings.velazquez,
      },
      {
        id: 2,
        src: paintings.sargent,
      },
      {
        id: 3,
        src: paintings.picasso,
      },
      {
        id: 4,
        src: paintings.bigbrother,
      },
      {
        id: 5,
        src: paintings.bobross,
      },
    ],
    []
  );

  const nodesRef = useRef(null);
  const NUMBER_OF_BLOCKS = 5;
  const MAX_NUMBER_OF_NODES = 3;

  const [hashes, setHashes] = useState([]);
  const [showMore, setShowMore] = useState(false);

  const firstNode = { name: "A", id: 65 };
  const [nodes, setNodes] = useState([firstNode]); //ascii for A

  const zeroHash = "0".repeat(64);

  const getPrevHashById = (id) => {
    const found = hashes.filter((item) => id === item.id);
    if (found.length === 1) {
      return found[0].hash;
    }
    return "";
  };

  const addNode = () => {
    setNodes([
      ...nodes,
      {
        id: nodes[nodes.length - 1].id + 1,
        name: String.fromCharCode(nodes[nodes.length - 1].id + 1),
      },
    ]);
  };

  const repo = (
    <div className="repo">
      {images.map((image, idx) =>
        !showMore && idx <= 3 ? (
          <Image key={image.id} img={image.src} id={image.id} />
        ) : showMore ? (
          <Image key={image.id} img={image.src} id={image.id} />
        ) : (
          ""
        )
      )}
      <button className="btn-right" onClick={() => setShowMore((cur) => !cur)}>
        {!showMore ? "show more" : "show less"}
      </button>
    </div>
  );

  return (
    <>
      {repo}
      <div className="chain" ref={nodesRef}>
        {nodes.map((node) => (
          <div key={node.name}>
            <span className="node-id">Node: {node.name}</span>
            <div className="node" id={`node${node.name}`}>
              {[...Array(NUMBER_OF_BLOCKS)].map((e, i) => (
                <ImageBlock
                  key={i}
                  node={node.name}
                  blockId={i}
                  prevHash={i === 0 ? zeroHash : getPrevHashById(i - 1)}
                  hashes={hashes}
                  setHashes={setHashes}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
      <button
        className="btn-add-nodes"
        onClick={addNode}
        disabled={nodes.length === MAX_NUMBER_OF_NODES}
      >
        add node
      </button>
    </>
  );
}

export default App;
