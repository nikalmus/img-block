import React, { useState } from "react";
import { useDrag } from "react-dnd";
import PictureModal from "./PictureModal";

const Image = ({ img, id, large }) => {
  const [loadBigImg, setLoadBigImg] = useState(false);
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "picture",
    item: { src: img, id: id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const handleClick = () => {
    setLoadBigImg(true);
  };
  return (
    <>
      <img
        src={img}
        ref={drag}
        alt=""
        className={isDragging ? "drag" : ""}
        onClick={handleClick}
      />
      {loadBigImg && (
        <PictureModal large={large} setLoadBigImg={setLoadBigImg} />
      )}
    </>
  );
};
export default Image;
