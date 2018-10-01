import React from 'react';

const colorStyle = {
  red4: '#cf1322',
  red1: '#ff7875',
  red2: '#ff4d4f',
  red3: '#f5222d',
  red: '#ff4d4f',
  green: '#95de64',
}

const PlatformRectBar = ({x, y, width, height, data, drilldown, graphClick}) => {
  const total = data.length;
  if (drilldown.detail === 'Basic') {
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
        { data.red !== 0 && <rect x={x} y={y} width={width} height={h_new.red} fill={colorStyle.red} style={{cursor: 'pointer'}} onClick={() => graphClick(['Critical', 'Important', 'Moderate', 'Low'])} />}
        { data.green !== 0 && <rect x={x} y={y+h_new.red} width={width} height={h_new.green} fill={colorStyle.green} style={{cursor: 'pointer'}} onClick={() => graphClick([])}/>}
      </svg>  
    )
  } else {
    const percent_erratas = {
      red4: data.filter(item => item.severity === 'Critical').length,
      red3: data.filter(item => item.severity === 'Important').length,
      red2: data.filter(item => item.severity === 'Moderate').length,
      red1: data.filter(item => item.severity === 'Low').length,
    }
    percent_erratas.green = total - percent_erratas.red1 - percent_erratas.red2 - percent_erratas.red3 - percent_erratas.red4;
    const h_new = {
      red4: percent_erratas.red4*height/total,
      red3: percent_erratas.red3*height/total,
      red2: percent_erratas.red2*height/total,
      red1: percent_erratas.red1*height/total,
      green: percent_erratas.green*height/total,
    };
    return (
      <svg>
        { data.red4 !== 0 && <rect x={x} y={y} width={width} height={h_new.red4} fill={colorStyle.red4} style={{cursor: 'pointer'}} onClick={() => graphClick(['Critical'])} />}
        { data.red3 !== 0 && <rect x={x} y={y+h_new.red4} width={width} height={h_new.red3} fill={colorStyle.red3} style={{cursor: 'pointer'}} onClick={() => graphClick(['Important'])} />}
        { data.red2 !== 0 && <rect x={x} y={y+h_new.red4+h_new.red3} width={width} height={h_new.red2} fill={colorStyle.red2} style={{cursor: 'pointer'}} onClick={() => graphClick(['Moderate'])} />}
        { data.red1 !== 0 && <rect x={x} y={y+h_new.red4+h_new.red3+h_new.red2} width={width} height={h_new.red1} fill={colorStyle.red1} style={{cursor: 'pointer'}} onClick={() => graphClick(['Low'])} />}
        { data.green !== 0 && <rect x={x} y={y+height-h_new.green} width={width} height={h_new.green} fill={colorStyle.green} style={{cursor: 'pointer'}} onClick={() => graphClick([])} />}
      </svg>  
    )
  }
}

export default PlatformRectBar;

