import React from 'react';
import { Card, Table, Tag } from 'antd';


const { Column } = Table;

// id: `${x}`,
// name: `VM${x}`,
// erratas: vm_erratas,
// department: depts[this.getRandomIndex(8)],
// owner: `Owner${x}`,
// worker1: `Worker${x}-1`,
// worker2: `Worker${x}-2`,
// environment: environments[this.getRandomIndex(4)],
// category: category[this.getRandomIndex(4)],
// appcode: appcodes[this.getRandomIndex(499)],
// severity: Object.keys(severity).find(key => severity[key] === vm_severity)

const UnitAppcodeView = ({ data }) => (
  <Card 
    bordered={false} 
    title={<span style={{ color: "#fafafa" }}>Appcode Details</span>} 
    headStyle={{ borderBottom: "5px solid #262626" }}
    style={{ width: "100%", marginBottom: "1rem", backgroundColor: "#404040" }}
  >
    <Table dataSource={data} pagination={{pageSize: 10}} rowClassName="row-style" rowKey="name">
      <Column
        title="Appcode"
        dataIndex="name"
        key="name"
      />
      <Column
        title="Critical"
        dataIndex="Critical"
        key="Critical"
        render={critical => <span><Tag color={critical === 0 ? "#73d13d" : "#ff4d4f" }>{critical} VMs</Tag></span>}
      />
      <Column
        title="Important"
        dataIndex="Important"
        key="Important"
        render={important => <span><Tag color={important === 0 ? "#73d13d" : "#ff4d4f" }>{important} VMs</Tag></span>}
      />
      <Column
        title="Moderate"
        dataIndex="Moderate"
        key="Moderate"
        render={moderate => <span><Tag color={moderate === 0 ? "#73d13d" : "#ff4d4f" }>{moderate} VMs</Tag></span>}
      />
      <Column
        title="Low"
        dataIndex="Low"
        key="Low"
        render={low => <span><Tag color={low === 0 ? "#73d13d" : "#ff4d4f" }>{low} VMs</Tag></span>}
      />
    </Table>
  </Card>
)


export default UnitAppcodeView;
