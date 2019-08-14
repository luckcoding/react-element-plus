import React from 'react';
import { Table } from '@crude/ui';

const columns = [
  {
    title: '序号',
    key: 'id',
    width: 100,
    fixed: 'left',
  },
  {
    title: '邮箱',
    key: 'email',
  }, {
    title: '手机号',
    key: 'phone',
  }, {
    title: '用户名',
    key: 'name',
  }, {
    title: '创建时间',
    width: 500,
    key: 'create',
    render: record => Date(Date.now()),
  }, {
    title: '操作',
    key: 'operation',
    width: 150,
    render() {
      return <button>button</button>;
    },
  },
];

const dataSource = Array.apply(null, Array(10)).map((i, k) => ({
  id: k,
  name: `name_${k}`,
  email: `${k}@qq.com`,
  phone: `13000000${k}`,
  create: Date.now(),
}));

const Example = () => (
  <div>
    <Table
      columns={columns}
      dataSource={dataSource}
      onRow={(record) => {
        console.log(record);
      }}
    />
  </div>
);
export default Example;
