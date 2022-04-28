import React from "react";
import { useDrag } from "react-dnd";

const Image = ({ img, id }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "picture",
    item: { src: img, id: id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));
  return (
    <img src={img} ref={drag} alt="" className={isDragging ? "drag" : ""} />
  );
};
export default Image;
