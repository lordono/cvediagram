import React from 'react';
import { Card, Table, Tag } from 'antd';


const { Column } = Table;

// id: `${x}`,
// uuid: `Errata${x}`,
// errata_id: `RH09-2018-${x}`,
// type: errata_type[this.getRandomIndex(3)],
// severity: Object.keys(severity)[this.getRandomIndex(6)],
// issued: `2018-09-${this.getRandomInt(25)}`,
// title: `Errata${x}`,
// cves: erratas_cves,
// restart: this.getRandomIndex(4) !== 0 ? false : true,

const HostErrataView = ({ data }) => (
  <Card 
    bordered={false} 
    title={<span style={{ color: "#fafafa" }}>Erratas</span>} 
    headStyle={{ borderBottom: "5px solid #262626" }}
    style={{ height: "100%", width: "100%", marginBottom: "2rem", backgroundColor: "#404040" }}
  >
    <Table dataSource={data} pagination={{pageSize: 5}} rowClassName="row-style" rowKey="errata_id">
      <Column
        title="ID"
        dataIndex="errata_id"
        key="errata_id"
      />
      <Column
        title="Title"
        dataIndex="title"
        key="title"
      />
      <Column
        title="Type"
        dataIndex="type"
        key="type"
      />
      <Column
        title="Severity"
        dataIndex="severity"
        key="severity"
      />
      <Column
        title="CVE"
        dataIndex="cves"
        key="cves"
        width={250}
        render={cves => (
          <span>
            {cves.map(tag => <Tag color="#40a9ff" key={tag} style={{marginBottom: "0.2rem"}} onClick={() => window.open('https://access.redhat.com/security/cve/cve-2018-14648')}>{tag}</Tag>)}
          </span>
        )}
      />
      <Column
        title="Restart"
        dataIndex="restart"
        key="restart"
        render={restart => (
          <span>
            {restart ? <Tag color="#ff4d4f">Required</Tag>: <Tag color="#73d13d">Not Required</Tag> }
          </span>
        )}
      />
      <Column
        title="Issued Date"
        dataIndex="issued"
        key="issued"
      />
    </Table>
  </Card>
)


export default HostErrataView;
