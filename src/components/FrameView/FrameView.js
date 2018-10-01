import React, { Component } from 'react';
import { Row, Col, Select, Radio } from 'antd';

import FilterDrawer from '../Common/FilterDrawer';
import OverviewPage from '../OverviewPage/OverviewPage';
import UnitPage from '../UnitPage/UnitPage';

import 'react-select/dist/react-select.css'
import 'react-virtualized-select/styles.css'

const Option = Select.Option;

const environments = ['AA-ENT', 'AA-IDC', 'AA-DDC', 'AA-DDC-DMZ', 'QQ-ENT', 'QQ-IDC', 'QQ-DDC', 'QQ-DDC-DMZ', 'WW-ENT', 'WW-IDC', 'WW-DDC', 'WW-DDC-DMZ', 'EE-ENT', 'EE-IDC', 'EE-DDC', 'EE-DDC-DMZ', 'RR-ENT', 'RR-IDC', 'RR-DDC', 'RR-DDC-DMZ', 'TT-ENT', 'TT-IDC', 'TT-DDC', 'TT-DDC-DMZ'];
const long_options = ['AA', 'QQ', 'WW', 'EE', 'RR', 'TT']
const depts = ['U1', 'U2', 'U3', 'U4', 'U5', 'U6', 'U7', 'U8'];

class FrameView extends Component {
  state = {
    windowWidth: '',
    windowHeight: '',
    viewState: 'Overview',
    vms: [],
    filtered_vms: [],
    filterOptions: {
      severity: 'All',
      erratas: [],
      cves: []
    },
    erratas: {},
    cves: {},
    rpms: {},
    cveOptions: [],
    errataOptions: [],
    appcodeOptions: [],
    drilldownOptions: {
      department: {
        name: 'U1'
      },
      appcode: {},
      overview: {
        name: 'AA',
        detail: 'Basic',
        severity: ['Critical', 'Important', 'Moderate', 'Low'],
        unit: 'U1',
        environment: 'AA-IDC'
      }
    },
    deptOptions: depts,
    weekOptions: ['Yesterday', 'This Week', 'This Month', 'This Year']
  }
  getRandomInt = (max) => {
    return Math.ceil(Math.random() * Math.floor(max-1));
  }
  getRandomIndex = (max) => {
    return Math.floor(Math.random() * Math.floor(max));
  }
  getRandomFromArray = (arr, n) => {
    var result = new Array(n),
        len = arr.length,
        taken = new Array(len);
    if (n > len)
        throw new RangeError("getRandom: more elements taken than available");
    while (n--) {
        var x = Math.floor(Math.random() * len);
        result[n] = arr[x in taken ? taken[x] : x];
        taken[x] = --len in taken ? taken[len] : len;
    }
    return result;
  }
  getFakeData = () => {
    const cves = [];
    for (let x=1; x < 2000; x++) {
      cves.push(`CVE${x}`);
    }
    const erratas = {};
    const errata_type = ['security', 'bugfix', 'enhancement'];
    const severity = {
      Critical: 1,
      Important: 2,
      Moderate: 3,
      Low: 4
    };
    const severity_fake = ['Critical', 'Important', 'Important', 'Important', 'Moderate', 'Moderate', 'Moderate', 'Moderate', 'Moderate', 'Low', 'Low', 'Low', 'Low', 'Low', 'Low', 'Low', 'Low', 'Low', 'Low'];
    const severity_fake_len = severity_fake.length;
    for (let x=1; x < 2000; x++) {
      const erratas_cves = this.getRandomFromArray(cves, this.getRandomInt(5));
      erratas[`Errata${x}`] = {
        id: `${x}`,
        uuid: `Errata${x}`,
        errata_id: `RH09-2018-${x}`,
        type: errata_type[this.getRandomIndex(3)],
        severity: severity_fake[this.getRandomIndex(severity_fake_len)],
        issued: `2018-09-${this.getRandomInt(25)}`,
        title: `Errata${x}`,
        cves: erratas_cves,
        restart: this.getRandomIndex(4) !== 0 ? false : true,
      }
    }
    const vms = [];
    const appcodes = [];
    for (let i = 1; i < 500; i++) {
      appcodes.push(`Appcode${i}`);
    }
    const category = [1, 2, 3, 4]
    for (let x=1; x < 6000; x++) {
      let vm_erratas = [];
      // vm_erratas = this.getRandomFromArray(Object.keys(erratas), this.getRandomIndex(40)).map(item => erratas[item]);
      if (this.getRandomIndex(3) !== 0) {
        vm_erratas = this.getRandomFromArray(Object.keys(erratas), this.getRandomIndex(40)).map(item => erratas[item]);
      }
      const vm_severity = vm_erratas.length > 0 ? Math.min(...vm_erratas.map(item => severity[item.severity])) : 5;
      // vm_erratas.forEach(erra => erratas[erra].cves.forEach(cve => !vm_cves.includes(cve) && vm_cves.push(cve)))
      // const restart = vm_erratas.filter(item => erratas[item].restart).length > 0;
      // const severity = vm_erratas.length > 0 ? Math.min(...vm_erratas.map(item => erratas[item].severity)) : 5;
      vms.push({
        id: `${x}`,
        name: `VM${x}`,
        erratas: vm_erratas,
        department: depts[this.getRandomIndex(8)],
        owner: `Owner${x}`,
        worker1: `Worker${x}-1`,
        worker2: `Worker${x}-2`,
        environment: environments[this.getRandomIndex(environments.length)],
        category: category[this.getRandomIndex(4)],
        appcode: appcodes[this.getRandomIndex(499)],
        severity: Object.keys(severity).find(key => severity[key] === vm_severity),
        critical: vm_erratas.filter(item => item.severity === 'Critical').length,
        important: vm_erratas.filter(item => item.severity === 'Important').length,
        moderate: vm_erratas.filter(item => item.severity === 'Moderate').length,
        low: vm_erratas.filter(item => item.severity === 'Low').length,
      })
    }
    return this.setState({ cves, vms, erratas, filtered_vms: vms });
  }
  filterUp = (filterOptions) => {
    const { vms } = this.state;
    let filtered_vms = vms.filter(item => {
      if (filterOptions.severity !== 'All' && parseInt(filterOptions.severity,10) !== item.severity) {
        return false;
      } else {
        return true;
      }      
    })
    filtered_vms = filtered_vms.map(item => {
      if (filterOptions.erratas.length > 0) {
        const new_item = {...item}
        new_item.erratas = filterOptions.erratas.filter(value => -1 !== item.erratas.indexOf(value))
        return new_item;
      } else if (filterOptions.cves.length > 0) {
        const new_item = {...item}
        new_item.cves = filterOptions.cves.filter(value => -1 !== item.cves.indexOf(value))
        return new_item;
      } else {
        return item;
      }
    })
    return filtered_vms;
  }
  filterOptionChange = (e, attr) => {
    const { filterOptions } = this.state;
    filterOptions[attr] = e;
    switch(attr) {
      case 'cves':
        filterOptions.erratas = [];
        break;
      case 'erratas':
      default:
        filterOptions.cves = [];
    }
    this.filterSetState(filterOptions);
  }
  filterSetState = (filterOptions) => {
    const filtered_vms = this.filterUp(filterOptions);
    this.setState({ filterOptions, filtered_vms });
  }
  updateWindowDimensions = () => {
    this.setState({ windowWidth: window.innerWidth, windowHeight: window.innerHeight });
  }
  drilldownOptionChange = (option, attr, value) => {
    const { drilldownOptions } = this.state;
    drilldownOptions[option][attr] = value;
    if (option === 'overview' && attr === 'name') {
      drilldownOptions.overview.environment = `${value}-IDC`;
    }
    return this.setState({ drilldownOptions }); 
  }
  graphClick = env => unit => severity => {
    const { drilldownOptions } = this.state;
    drilldownOptions.overview.environment = env;
    drilldownOptions.overview.unit = unit;
    drilldownOptions.overview.severity = severity;
    return this.setState({ drilldownOptions }); 
  }
  componentDidMount = () => {
    // get window sizes
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
    console.log('started')

    const errataOptions = [];
    const cveOptions = [];
    const appcodeOptions = [];
    for (let i = 1; i < 500; i++) {
      errataOptions.push({ label: `Errata${i}`, value: `Errata${i}`});
      // errataOptions.push(<Option key={`Errata${i}`}>Errata{i}</Option>);
      appcodeOptions.push(<Option key={`Appcode${i}`}>Appcode{i}</Option>);
    }
    for (let i = 1; i < 2000; i++) {
      cveOptions.push({ label: `CVE${i}`, value: `CVE${i}` })
    }
    this.setState({ errataOptions, appcodeOptions, cveOptions })
    this.getFakeData();
  }
  componentWillUnmount = () => {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }
  render() {
    const { viewState, filtered_vms, errataOptions, cveOptions, deptOptions, filterOptions, drilldownOptions, windowWidth } = this.state;
    return (
      <div style={{ backgroundColor: "#262626", width: "100wh", minHeight: "100vh" }}>
        <FilterDrawer 
          visible={this.state.filterDrawerVisible}
          drawerToggle={() => this.setState({ filterDrawerVisible: !this.state.filterDrawerVisible })}
          filterOptions={filterOptions}
          errataOptions={errataOptions}
          cveOptions={cveOptions}
          filterSetState={this.filterSetState}
          filterOptionChange={this.filterOptionChange}
        />
        <Row type="flex" justify="center" gutter={16} style={{ marginLeft: "auto", marginRight: "auto", maxWidth: 1250}}>
          <Col span={22}>
            <div style={{ color: "#fafafa", fontSize: "18px", marginTop: "1rem" }}>
              <Row display="flex" justify="center" style={{ }}>
                <Col span={22}>
                  <Radio.Group value={viewState} buttonStyle="solid" style={{ marginLeft: 20 }} onChange={(e) => this.setState({ viewState: e.target.value })}>
                    <Radio.Button value="Overview">Overview</Radio.Button>
                    <Radio.Button value="Unit">Unit</Radio.Button>
                  </Radio.Group>
                  <Radio.Group value={drilldownOptions.overview.name} buttonStyle="solid" style={{ marginLeft: 20 }} onChange={(e) => this.drilldownOptionChange('overview', 'name', e.target.value)}>
                    { long_options.map(item => <Radio.Button key={item} value={item}>{item}</Radio.Button>)}
                  </Radio.Group>
                  {
                    viewState === 'Overview' &&
                    <Radio.Group value={drilldownOptions.overview.detail} buttonStyle="solid" style={{ marginLeft: 20 }} onChange={(e) => this.drilldownOptionChange('overview', 'detail', e.target.value)}>
                      <Radio.Button value="Basic">Basic</Radio.Button>
                      <Radio.Button value="Detailed">Detailed</Radio.Button>
                    </Radio.Group>
                  }
                  {
                    viewState === 'Unit' &&
                    <Radio.Group value={drilldownOptions.department.name} buttonStyle="solid" style={{ marginLeft: 20 }} onChange={(e) => this.drilldownOptionChange('department', 'name', e.target.value)}>
                      {deptOptions.map(item => <Radio.Button key={item} value={item}>{item}</Radio.Button>)}
                    </Radio.Group>
                  }
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
        { viewState === 'Overview' && <OverviewPage vms={filtered_vms} depts={deptOptions} windowWidth={windowWidth} drilldown={drilldownOptions.overview} graphClick={this.graphClick} /> }
        { viewState === 'Unit' && <UnitPage vms={filtered_vms.filter(item => item.department === drilldownOptions.department.name)} view={drilldownOptions.overview.name} environments={environments.filter(item => item.startsWith(drilldownOptions.overview.name))} windowWidth={windowWidth} unit={drilldownOptions.department.name} drilldown={drilldownOptions.overview} /> }
        
      </div>
    );
  }
}


export default FrameView;
