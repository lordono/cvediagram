import React from 'react';

const RectLabel = ({x, y, text, fontSize="14px", color="#fafafa", weight=400}) => {
  return (
    <svg>
      <text x={x} y={y} textAnchor="middle" fill={color} style={{fontSize: fontSize, fontWeight: weight}}>{text}</text>
    </svg>
  )
}

export default RectLabel;

