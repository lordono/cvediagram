import React from 'react';
import { Table } from 'antd';

const BreakdownShort = ({data}) => {
  const columnData = [
    { label: '>30 Erratas', value: data.red6*data.total/100 },
    { label: '20-30 Erratas', value: data.red5*data.total/100 },
    { label: '10-20 Erratas', value: data.red4*data.total/100 },
    { label: '6-10 Erratas', value: data.red3*data.total/100 },
    { label: '3-5 Erratas', value: data.red2*data.total/100 },
    { label: '1-2 Erratas', value: data.red1*data.total/100 },
    { label: 'No Erratas', value: data.green*data.total/100 }
  ]
  const columns = [{
    title: 'Label',
    dataIndex: 'label',
  }, {
    title: 'Value',
    dataIndex: 'value',
  }];
  return <Table columns={columns} dataSource={columnData} size="small" pagination={false} />;
}

export default BreakdownShort;

