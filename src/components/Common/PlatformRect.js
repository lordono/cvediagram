import React from 'react';
import RectLabel from './RectLabel';
import RectBar from './PlatformRectBar';

const PlatformRect = ({x, y, width, height, data, text, textx, fontSize, drilldown, graphClick, onMouseEnter, onMouseLeave, onFocus, onClick}) => {
  const redtext = data.filter(item => ['Critical', 'Important', 'Moderate', 'Low'].indexOf(item.severity) >= 0).length;
  const greentext = data.length - redtext
  return (
    <svg onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} onFocus={onFocus} onClick={onClick}>
      <RectLabel x={x+textx} y={y} text={redtext} fontSize={fontSize} color={"#ff4d4f"} weight={700} />
      <RectLabel x={x+textx} y={y+16} text={greentext} fontSize={fontSize} color={"#95de64"} weight={700} />
      <RectBar x={x} y={y+25} width={width} height={height} data={data} drilldown={drilldown} graphClick={graphClick} />
      <RectLabel x={x+textx} y={y+height+52} text={text} fontSize={fontSize} />
    </svg>
  )
}

export default PlatformRect;

