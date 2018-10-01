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

const HostDetailView = ({ data }) => (
  <Card 
    bordered={false} 
    title={<span style={{ color: "#fafafa" }}>VM Details</span>} 
    headStyle={{ borderBottom: "5px solid #262626" }}
    style={{ height: "276px", width: "100%", marginBottom: "1rem", backgroundColor: "#404040", color: "#fafafa" }}
  >
    <div><b>VM ID: </b> {data.id}</div>
    <div><b>VM Name: </b> {data.name}</div>
    <div><b>VM Unit: </b> {data.department}</div>
    <div><b>VM Owner: </b> {data.owner}</div>
    <div><b>VM SME1: </b> {data.worker1}</div>
    <div><b>VM SME2: </b> {data.worker2}</div>
    <div><b>VM Environment: </b> {data.environment}</div>
    <div><b>VM Category: </b> {data.category}</div>
  </Card>
)


export default HostDetailView;
