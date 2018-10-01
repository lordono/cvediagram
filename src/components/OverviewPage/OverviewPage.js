import React, { Component } from 'react';
import { Row, Col, Modal } from 'antd';

import EnvironmentView from '../Common/OverviewEnvView';
import OverviewVMView from '../Common/OverviewVMView';
import HostPage from '../HostPage/HostPage';

class OverviewPage extends Component {
  state = {
    vm: {},
    vmModalVisible: false
  }
  vmClick = vm => {
    this.setState({ vm: vm, vmModalVisible: true });
  }
  vmCancel = () => {
    this.setState({ vmModalVisible: false });
    setTimeout(() => { this.setState({ vm: {} })}, 300);
  }
  vmFilterFunc = (vms, drilldown) => {
    return vms.filter(item => {
      if (drilldown.severity.length > 0) {
        return item.department === drilldown.unit && item.environment === drilldown.environment && drilldown.severity.indexOf(item.severity) >= 0;
      } else {
        return item.department === drilldown.unit && item.environment === drilldown.environment && ['Critical', 'Important', 'Moderate', 'Low'].indexOf(item.severity) < 0;
      }
    })
  }
  render() {
    const { vms, depts, windowWidth, drilldown, graphClick } = this.props;
    return (
      <Row type="flex" justify="center" gutter={16} style={{ marginLeft: 'auto', marginRight: 'auto', maxWidth: 1250}}>
        { 
          drilldown.name === 'AA' &&
          <Col xxl={11} xl={11} lg={22}>
            <div style={{ marginTop: "1rem" }}>
              <EnvironmentView name="AA Inner Forge" alias="AA-IDC" vms={vms} depts={depts} windowWidth={windowWidth} drilldown={drilldown} graphClick={graphClick('AA-IDC')} />
              <EnvironmentView name="AA DDC Inner Forge" alias="AA-DDC" vms={vms} depts={depts} windowWidth={windowWidth} drilldown={drilldown} graphClick={graphClick('AA-DDC')}/>
            </div>
          </Col>
        }
        {
          drilldown.name === 'AA' &&
          <Col xxl={11} xl={11} lg={22}>
            <div style={{ marginTop: "1rem" }}>
              <EnvironmentView name="AA Non-Inner Forge" alias="AA-ENT" vms={vms} depts={depts} windowWidth={windowWidth} drilldown={drilldown} graphClick={graphClick('AA-ENT')}/>
              <EnvironmentView name="AA DDC Non-Inner Forge" alias="AA-DDC-DMZ" vms={vms} depts={depts} windowWidth={windowWidth} drilldown={drilldown} graphClick={graphClick('AA-DDC-DMZ')} />
            </div>
          </Col>
        }
        { 
          drilldown.name !== 'AA' &&
          <Col xxl={11} xl={11} lg={22}>
            <div style={{ marginTop: "1rem" }}>
              <EnvironmentView name={`${drilldown.name} Inner Forge`} alias={`${drilldown.name}-IDC`} vms={vms} depts={depts} windowWidth={windowWidth} drilldown={drilldown} graphClick={graphClick(`${drilldown.name}-IDC`)} />
            </div>
          </Col>
        }
        {
          drilldown.name !== 'AA' &&
          <Col xxl={11} xl={11} lg={22}>
            <div style={{ marginTop: "1rem" }}>
              <EnvironmentView name={`${drilldown.name} Non-Inner Forge`} alias={`${drilldown.name}-ENT`} vms={vms} depts={depts} windowWidth={windowWidth} drilldown={drilldown} graphClick={graphClick(`${drilldown.name}-ENT`)} />
            </div>
          </Col>
        }
        <Col xxl={22} xl={22} lg={22}>
          { vms.length > 1 && <OverviewVMView data={this.vmFilterFunc(vms, drilldown)} onClick={this.vmClick} drilldown={drilldown} /> }
        </Col>
        {
          Object.keys(this.state.vm).length > 0 &&
          <Modal
            title={this.state.vm.name}
            style={{ top: 20 }}
            visible={this.state.vmModalVisible}
            width={1200}
            bodyStyle={{ background: "#262626"}}
            onOk={this.vmCancel}
            onCancel={this.vmCancel}
            footer={null}
          >
            <HostPage vm={this.state.vm} />
          </Modal>
        }
      </Row>
    )
  }
}

export default OverviewPage;
