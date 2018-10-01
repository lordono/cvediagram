import React from 'react';
import { Drawer, Radio, Button } from 'antd';
import VirtualizedSelect from 'react-virtualized-select'

const FilterDrawer = ({visible, drawerToggle, filterOptions, errataOptions, cveOptions, filterSetState, filterOptionChange}) => (
  <Drawer
    title={
      <div>
        Filter Options
        <Button 
          onClick={() => filterSetState({ severity: 'All', erratas: [], cves: [] })}
          style={{ float: 'right', opacity: '0.95', borderRadius: '20px', marginRight: "2rem"}}
        >
          Reset Filters
        </Button>
      </div>
    }
    width={550}
    placement="right"
    onClose={drawerToggle}
    visible={visible}
    style={{
      height: 'calc(100% - 55px)',
      overflow: 'auto',
      paddingBottom: 53,
    }}
  >
    <div style={{ margin: 15, marginBottom: 30 }}>
      <div>View Options</div>
      <Radio.Group defaultValue="Department" buttonStyle="solid" style={{ marginRight: 20 }}>
        <Radio.Button value="Department">Department</Radio.Button>
        <Radio.Button value="Appcode">Appcode</Radio.Button>
      </Radio.Group>
    </div>
    <div style={{ margin: 15, marginBottom: 30 }}>
      <div>Severity Level</div>
      <Radio.Group value={filterOptions.severity} buttonStyle="solid" style={{ marginRight: 20 }} onChange={(e) => filterOptionChange(e.target.value, 'severity')}>
        <Radio.Button value="All">All</Radio.Button>
        <Radio.Button value="1">Critical</Radio.Button>
        <Radio.Button value="2">Important</Radio.Button>
        <Radio.Button value="3">Moderate</Radio.Button>
        <Radio.Button value="4">Low</Radio.Button>
      </Radio.Group>
    </div>
    <div style={{ margin: 15, marginBottom: 30 }}>
      <div>Specific Errata</div>
      <VirtualizedSelect 
        options={errataOptions} 
        searchable={true} 
        multi={true} 
        value={filterOptions.erratas} 
        onChange={(e) => filterOptionChange(e.map(item => item.value), 'erratas')}
      />
    </div>
    <div style={{ margin: 15, marginBottom: 30 }}>
      <div>Specific CVE</div>
      <VirtualizedSelect 
        options={cveOptions} 
        searchable={true} 
        multi={true} 
        value={filterOptions.cves} 
        onChange={(e) => filterOptionChange(e.map(item => item.value), 'cves')}
      />
    </div>
  </Drawer>
)


export default FilterDrawer;
