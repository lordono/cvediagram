import React from 'react';
import { Popover, Card } from 'antd';
import UnitGraphRect from './UnitGraphRect';

const renderPlatform = (data, windowWidth, drilldown) => {
  const catDict = [...new Set(data.map(item => item.category))].reduce((obj, item) => {obj[item] = [];return obj;}, {});
  const vm2cat = data.reduce((obj, item) => {
    obj[item.category].push(item)
    return obj;
  }, catDict);
  const adj_wid = windowWidth < 1250 ? 50 * windowWidth/1250 : 30;
  const start_x = windowWidth < 1250 ? adj_wid * 0.25 * windowWidth/1250 : adj_wid * 0.5;
  const textx = windowWidth < 1250 ? 25 * windowWidth/1250 : 15;
  const fontSize = windowWidth < 1250 ? `${12 * windowWidth/1250}px` : "12px";
  return (
    <React.Fragment>
      {
        Object.entries(vm2cat).map(([key, value], num) => {
          return (
            <Popover key={key} content={<div>Testing to input details - Click to see more</div>} title="Breakdown Details" placement="top">
              <UnitGraphRect x={start_x+num*adj_wid*2} y={10} width={adj_wid} height={100} data={value} text={`CAT ${key}`} textx={textx} fontSize={fontSize} drilldown={drilldown} windowWidth={windowWidth} />
            </Popover>
          );
        })
      }
    </React.Fragment>
  );
}

const UnitGraphView = ({name, vms, windowWidth, drilldown }) => (
  <Card 
    bordered={false} 
    title={<span style={{ color: "#fafafa" }}>{name}</span>} 
    headStyle={{ borderBottom: "5px solid #262626" }}
    style={{ width: "100%", marginBottom: "1rem", backgroundColor: "#404040" }}
    bodyStyle={{height: 230}}
  >
    <svg style={{minHeight: "100%", minWidth: 825, display: 'block', margin: 'auto'}}>
      { vms.length && renderPlatform(vms, windowWidth, drilldown) }
    </svg>
  </Card>
)


export default UnitGraphView;
