import React from 'react';
import { Loading } from '@crude/ui';

const Item = ({ type }) => (
  <div style={{ marginBottom: 20 }}>
    <span style={{
      fontSize: '12px',
      background:'rgba(206, 180, 180, 0.5)',
      borderRadius: 5,
      padding: 5,
      marginRight: 10,
    }}>{type || '默认'}</span>
    <Loading type={type} />
  </div>
)

const Example = () => {
  return (
    <React.Fragment>
      <Item />
      <Item type="bubble" />
      <Item type="ball" />
      <Item type="bar" />
      <Item type="square" />
      <Item type="inlace" />
    </React.Fragment>
  )
}
export default Example
