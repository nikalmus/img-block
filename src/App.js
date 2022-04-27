import React, { useMemo } from "react";
import ImageBlock from "./ImageBlock";
import paintings from "./img";

function App() {
  const images = useMemo(
    () => [
      paintings.lasMeninasVelazquez,
      paintings.daughtersOfSargent,
      paintings.lasMeninasPicasso,
    ],
    []
  );

  return (
    <div className="App">
      {images.map((image, idx) => (
        <ImageBlock key={idx} img={image} />
      ))}
    </div>
  );
}

export default App;
