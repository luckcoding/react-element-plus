import React from 'react';

export default docs => class extends React.PureComponent {
  render() {
    const { title } = this.props;
    return (
      <div style={{ margin: '10px 0' }}>
        {title && <h3>{title}</h3>}
        <table>
          <thead>
            <tr>
              <th>参数</th>
              <th>说明</th>
              <th>类型</th>
              <th>可选值</th>
              <th>默认值</th>
            </tr>
          </thead>
          <tbody>
            {docs.map((tr, k) => (
              <tr key={k}>{tr.map((td, i) => <td key={i}>{td}</td>)}</tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
};
