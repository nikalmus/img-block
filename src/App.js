import React, { useState, useMemo, useRef } from "react";
import Image from "./Image";
import ImageBlock from "./ImageBlock";
import HelpModal from "./HelpModal";
import { paintings } from "./img";

function App() {
  const images = useMemo(
    () => [
      {
        id: 0,
        src: paintings.astronomer,
        large: paintings.astronomerL,
      },
      {
        id: 1,
        src: paintings.girlWithPearl,
        large: paintings.girlWithPearlL,
      },
      {
        id: 2,
        src: paintings.milkmaid,
        large: paintings.milkmaidL,
      },

      {
        id: 3,
        src: paintings.girlReading,
        large: paintings.girlReadingL,
      },
      {
        id: 4,
        src: paintings.astronomerBart,
        large: paintings.astronomerBartL,
      },
    ],
    []
  );

  const nodesRef = useRef(null);
  const NUMBER_OF_BLOCKS = 4;


  const [hashes, setHashes] = useState([]);

  const firstNode = { name: "A", id: 65 };
  const [nodes, setNodes] = useState([firstNode]); //ascii for A
  const [badActor, setBadActor] = useState(false); 
  const [loadHelp, setLoadHelp] = useState(false);
  const [imageReplacedByBadActor, setImageReplacedByBadActor] = useState(false);

  const handleHelp = () => {
    setLoadHelp(true);
  };

  const handleImageReplacedByBadActor = (isReplaced) => {
    setImageReplacedByBadActor(isReplaced);
  };

  const zeroHash = "0".repeat(64);

  const getPrevHashById = (id) => {
    const found = hashes.filter((item) => id === item.id);
    if (found.length > 0) {
      return found[0].hash;
    }
    return "";
  };


  const repo = (
    <div className="repo">
      {images
        .slice(0, badActor ? images.length : 4) 
        .map((image, idx) => (
          <Image key={image.id} img={image.src} id={image.id} large={image.large} />
        ))}
    </div>
  );

  const handleBadActorToggle = () => {
    if (badActor && imageReplacedByBadActor) {
      window.location.reload(); 
    } else if (badActor) {
      setBadActor(false)
    } 
    else {
      setBadActor(true); 
    }
  };

  return (
    <>
      {repo}
      <div className="chain" ref={nodesRef}>
        {nodes.map((node) => (
          <div key={node.name}>
            {/* <span className="node-id">Node: {node.name}</span> */}
            <div className="node" id={`node${node.name}`}>
              {[...Array(NUMBER_OF_BLOCKS)].map((e, i) => (
                <ImageBlock
                  key={i}
                  node={node.name}
                  blockId={i}
                  prevHash={i === 0 ? zeroHash : getPrevHashById(i - 1)}
                  hashes={hashes}
                  setHashes={setHashes}
                  badActor={badActor}
                  onImageReplacedByBadActor={handleImageReplacedByBadActor}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
      <button
        className="btn-add-nodes"
        onClick={handleBadActorToggle}
        title={badActor && imageReplacedByBadActor ? "Block was modified" : badActor && ! imageReplacedByBadActor ? "Switch to Good Actor" : "Switch to Bad Actor" }
      >
        {badActor && imageReplacedByBadActor ? "Reload" : badActor && ! imageReplacedByBadActor ? "Good Actor" : "Bad Actor" }
      </button>
      <div>
      <button
        className="btn-add-nodes"
        onClick={handleHelp}
      > Help
      </button>
      {loadHelp && (
        <HelpModal setLoadHelp={setLoadHelp} />
      )}
      </div>
    </>
  );
}

export default App;
