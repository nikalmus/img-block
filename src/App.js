import React, { useMemo } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Image from "./Image";
import ImageBlock from "./ImageBlock";
import paintings from "./img";

function App() {
  const images = useMemo(() => [
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
  ]);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="main">
        <div className="repo">
          {images.map((image) => (
            <Image key={image.id} img={image.src} id={image.id} />
          ))}
        </div>
        <div>
          {images.map((image) => (
            <ImageBlock key={image.id} img={image.src} />
          ))}
        </div>
      </div>
    </DndProvider>
  );
}

export default App;
