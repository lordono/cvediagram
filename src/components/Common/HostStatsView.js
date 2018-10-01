import React from 'react';
import { Card } from 'antd';


// id: `${x}`,
// name: `VM${x}`,
// erratas: vm_erratas,
// department: depts[this.getRandomIndex(8)],
// owner: `Owner${x}`,
// worker1: `Worker${x}-1`,
// worker2: `Worker${x}-2`,
// environment: environments[this.getRandomIndex(4)],
// category: category[this.getRandomIndex(4)],
// severity: Object.keys(severity).find(key => severity[key] === vm_severity)

const HostStatsView = ({ name, number, color }) => (
  <Card 
    bordered={false} 
    title={<span style={{ color: "#fafafa" }}>{name}</span>} 
    headStyle={{ borderBottom: "5px solid #262626" }}
    style={{ height: "276px", width: "100%", marginBottom: "1rem", backgroundColor: "#404040", color: "#fafafa", textAlign: "center" }}
  >
    <div style={{ fontSize: "5rem", fontWeight: 800, color: number === 0 ? "#52c41a" : color }}>{number}</div>
    <div> Erratas in VM</div>
  </Card>
)


export default HostStatsView;
