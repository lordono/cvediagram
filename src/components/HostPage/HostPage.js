import React from 'react';
import { Row, Col } from 'antd';

import HostErrataView from '../Common/HostErrataView';
import HostDetailView from '../Common/HostDetailView';
import HostStatsView from '../Common/HostStatsView';

const HostPage = ({ vm }) => (
  <Row type="flex" justify="center" gutter={16} style={{ marginLeft: "auto", marginRight: "auto", marginTop: "1rem", maxWidth: 1250}}>
    <Col xxl={4} xl={4} lg={4}>
      <HostStatsView name="Critical" color="#f5222d" number={vm.erratas.filter(item => item.severity === 'Critical').length} />
    </Col>
    <Col xxl={4} xl={4} lg={4}>
      <HostStatsView name="Important" color="#fa541c" number={vm.erratas.filter(item => item.severity === 'Important').length} />
    </Col>
    <Col xxl={4} xl={4} lg={4}>
      <HostStatsView name="Moderate" color="#faad14" number={vm.erratas.filter(item => item.severity === 'Moderate').length} />
    </Col>
    <Col xxl={4} xl={4} lg={4}>
      <HostStatsView name="Low" color="#fadb14" number={vm.erratas.filter(item => item.severity === 'Low').length} />
    </Col>
    <Col xxl={6} xl={6} lg={6}>
      <HostDetailView data={vm} />
    </Col>
    <Col xxl={22} xl={22} lg={22}>
      <HostErrataView data={vm.erratas} />
    </Col>
  </Row>
)


export default HostPage;
