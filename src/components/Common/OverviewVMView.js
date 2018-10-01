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

const OverviewVMView = ({ data, onClick, drilldown }) => (
  <Card 
    bordered={false} 
    title={<span style={{ color: "#fafafa" }}>VM Details</span>} 
    headStyle={{ borderBottom: "5px solid #262626" }}
    style={{ width: "100%", marginBottom: "1rem", backgroundColor: "#404040" }}
  >
    <Table dataSource={data} pagination={{pageSize: 10}} rowClassName="row-style" rowKey="id" onRow={(record) => { return { onClick: () => onClick(record)}}}>
      <Column
        title="Name"
        dataIndex="name"
        key="name"
      />
      <Column
        title="Category"
        dataIndex="category"
        key="category"
      />
      <Column
        title="Appcode"
        dataIndex="appcode"
        key="appcode"
      />
      <Column
        title="Critical"
        dataIndex="critical"
        key="critical"
        render={critical => <span><Tag color={critical === 0 ? "#73d13d" : "#ff4d4f" }>{critical} Erratas</Tag></span>}
      />
      <Column
        title="Important"
        dataIndex="important"
        key="important"
        render={important => <span><Tag color={important === 0 ? "#73d13d" : "#ff4d4f" }>{important} Erratas</Tag></span>}
      />
      <Column
        title="Moderate"
        dataIndex="moderate"
        key="moderate"
        render={moderate => <span><Tag color={moderate === 0 ? "#73d13d" : "#ff4d4f" }>{moderate} Erratas</Tag></span>}
      />
      <Column
        title="Low"
        dataIndex="low"
        key="low"
        render={low => <span><Tag color={low === 0 ? "#73d13d" : "#ff4d4f" }>{low} Erratas</Tag></span>}
      />
    </Table>
  </Card>
)


export default OverviewVMView;
