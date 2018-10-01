import React from 'react';

const colorStyle = {
  red4: '#cf1322',
  red1: '#ff7875',
  red2: '#ff4d4f',
  red3: '#f5222d',
  red: '#ff4d4f',
  green: '#95de64',
}

const PlatformRectBar = ({x, y, width, height, data }) => {
  const total = data.length;
  const percent_erratas = {
    red: data.filter(item => ['Critical', 'Important', 'Moderate', 'Low'].indexOf(item.severity) >= 0).length
  }
  percent_erratas.green = total - percent_erratas.red;
  const h_new = {
    red: percent_erratas.red*height/total,
    green: percent_erratas.green*height/total,
  };
  return (
    <svg>
      { data.red !== 0 && <rect x={x} y={y} width={width} height={h_new.red} fill={colorStyle.red} />}
      { data.green !== 0 && <rect x={x} y={y+h_new.red} width={width} height={h_new.green} fill={colorStyle.green} />}
    </svg>  
  )
}

export default PlatformRectBar;

