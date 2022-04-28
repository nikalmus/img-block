import React, { useState, useMemo } from "react";
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

  const NUMBER_OF_BLOCKS = 3;

  return (
    <div className="main">
      <div className="repo">
        {images.map((image) => (
          <Image key={image.id} img={image.src} id={image.id} />
        ))}
      </div>
      <div className="blocks">
        {[...Array(NUMBER_OF_BLOCKS)].map((e, i) => (
          <ImageBlock key={i} blockId={i} />
        ))}
      </div>
    </div>
  );
}

export default App;
