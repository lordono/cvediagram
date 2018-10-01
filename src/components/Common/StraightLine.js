import React from 'react';
import styled, { keyframes } from 'styled-components';

const colorStyle = {
  red: '#f5222d',
  orange: '#fa8c16',
  green: '#52c41a'
}

const statusStyle = {
  good: 'green',
  warning: 'orange',
  danger: 'red'
}

const speedStat = {
  fast: '60',
  medium: '40',
  slow: '20'
}

const speeddash = speed => keyframes`
  to {
    stroke-dashoffset: ${speed};
  }
`;

const StraightLine = ({x1, y1, x2, y2, status, speed}) => {
  const Dash = styled.line`
    animation: ${speeddash(speedStat[speed])} 2s linear infinite;
  `;
  return (
    <svg>
      <Dash x1={x1} y1={y1} x2={x2} y2={y2} stroke={colorStyle[statusStyle[status]]} strokeDasharray="5" strokeWidth="3" />
    </svg>  
  )
}

export default StraightLine

