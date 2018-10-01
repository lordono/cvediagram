import React, { Component } from 'react';
import { Row, Col, Modal } from 'antd';

import HostPage from '../HostPage/HostPage';
import UnitVMView from '../Common/UnitVMView';
import UnitAppcodeView from '../Common/UnitAppcodeView';
import UnitGraphView from '../Common/UnitGraphView';

const envDict = {
  AA: 'AA',
  QQ: 'QQ',
  WW: 'WW',
  EE: 'EE',
  RR: 'RR',
  TT: 'TT',
  DDC: 'DDC',
  ENT: 'Non Inner Forge',
  IDC: 'Inner Forge',
  DMZ: 'Inner Forge',
}

const appcodeArrange = (vms) => {
  const vms_appcodes = {};
  vms.forEach(item => {
    if (!Object.keys(vms_appcodes).includes(item.appcode)) {
      vms_appcodes[item.appcode] = { name: item.appcode, Critical: 0, Important: 0, Moderate: 0, Low: 0};
    }
    vms_appcodes[item.appcode][item.severity] = vms_appcodes[item.appcode][item.severity] + 1; 
  })
  return Object.values(vms_appcodes);
}  

class UnitPage extends Component {
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
  render() {
    const { vms, unit, environments, drilldown, windowWidth } = this.props;
    return (
      <Row type="flex" justify="center" gutter={16} style={{ marginLeft: "auto", marginRight: "auto", marginTop: "1rem", maxWidth: 1250}}>
        {
          environments.map(env => (
            <Col xxl={6} xl={6} lg={11} key={env}>
              { vms.length > 10 && <UnitGraphView name={`${unit} (${env.split('-').map(item => envDict[item]).join(' ')})`} vms={vms.filter(item => item.environment === env)} windowWidth={windowWidth} drilldown={drilldown} /> }
            </Col>
          ))
        }
        <Col xxl={22} xl={22} lg={22}>
        }
          { vms.length > 1 && <UnitAppcodeView data={appcodeArrange(vms)} /> }
        </Col>
        <Col xxl={22} xl={22} lg={22}>
          { vms.length > 1 && <UnitVMView data={vms} onClick={this.vmClick} /> }
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


export default UnitPage;
