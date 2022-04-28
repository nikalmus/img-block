import React, { useState, useMemo } from "react";
import { useDrop } from "react-dnd";
import Image from "./Image";
import ImageBlock from "./ImageBlock";
import paintings from "./img";

function App() {
  const images = useMemo(
    () => [
      {
        id: 1,
        src: paintings.cavePainting,
      },
      {
        id: 2,
        src: paintings.lasMeninasVelazquez,
      },
      {
        id: 3,
        src: paintings.daughtersOfSargent,
      },
      {
        id: 4,
        src: paintings.lasMeninasPicasso,
      },
    ],
    []
  );
  const [blockImagesList, setBlockImagesList] = useState([]);
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "picture",
    drop: (item) => addImageToBlock(item.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const addImageToBlock = (id) => {
    console.log("id:", id);
    const blockImage = images.filter((img) => id === img.id)[0];
    setBlockImagesList((blockImagesList) => [...blockImagesList, blockImage]);
  };

  return (
    <div className="main">
      <div className="repo">
        {images.map((image) => (
          <Image key={image.id} img={image.src} id={image.id} />
        ))}
      </div>
      <div ref={drop} className="drop">
        {blockImagesList.map((image) => (
          <ImageBlock key={image.id} img={image.src} />
        ))}
      </div>
    </div>
  );
}

export default App;
