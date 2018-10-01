import React from 'react';
import { Popover, Card } from 'antd';
import PlatformRect from './PlatformRect';

const renderPlatform = (data, depts, windowWidth, drilldown, graphClick) => {
  const deptDict = depts.reduce((obj, item) => {
    if (item !== 'None') {
      obj[item] = [];
      return obj;
    } else {
      return obj;
    }
  }, {});
  const vm2dept = data.reduce((obj, item) => {
    obj[item.department].push(item)
    return obj;
  }, deptDict);
  const adj_wid = windowWidth < 1250 ? 50 * windowWidth/1250 : 30;
  const start_x = windowWidth < 1250 ? adj_wid * 0.5 * windowWidth/1250 : adj_wid * 0.75;
  const textx = windowWidth < 1250 ? 25 * windowWidth/1250 : 15;
  const fontSize = windowWidth < 1250 ? `${12 * windowWidth/1250}px` : "12px";
  return (
    <React.Fragment>
      {
        Object.entries(vm2dept).map(([key, value], num) => {
          return (
            <Popover key={key} content={<div>Testing to input details - Click to see more</div>} title="Breakdown Details" placement="top">
              <PlatformRect x={start_x+num*adj_wid*2} y={10} width={adj_wid} height={100} data={value} text={key} textx={textx} fontSize={fontSize} drilldown={drilldown} windowWidth={windowWidth} graphClick={graphClick(key)} />
            </Popover>
          );
        })
      }
    </React.Fragment>
  );
}

const EnvironmentView = ({name, alias, vms, depts, windowWidth, drilldown, graphClick }) => (
  <Card 
    bordered={false} 
    title={<span style={{ color: "#fafafa" }}>{name}</span>} 
    headStyle={{ borderBottom: "5px solid #262626" }}
    style={{ width: "100%", marginBottom: "2rem", backgroundColor: "#404040" }}
    bodyStyle={{height: 230}}
  >
    <svg style={{minHeight: "100%", minWidth: 825, display: 'block', margin: 'auto'}}>
      { vms.length && renderPlatform(vms.filter(item => item.environment === alias), depts, windowWidth, drilldown, graphClick) }
    </svg>
  </Card>
)


export default EnvironmentView;
