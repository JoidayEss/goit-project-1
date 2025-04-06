import React from "react";

const Sprite = ({ name, width = 24, height = 24, color = "currentColor" }) => {
  return (
    <svg width={width} height={height} fill={color} aria-hidden="true">
      <use xlinkHref={`/public/sprite/symbol-defs.svg#${name}`} />
    </svg>
  );
};

export default Sprite;
