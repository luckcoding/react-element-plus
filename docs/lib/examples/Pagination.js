import React from 'react';
import qs from 'qs';
import { Pagination } from '@crude/ui';

export default class extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      page: qs.parse(location.search).page || 1,
      total: 100,
      search: { type: 1 },
    }
  }
  render() {
    const { search, total, page } = this.state

    const Item = ({
      page: current,
      active,
    }) => {
      return (
        <a
          className={`_item ${active ? '_active' : ''}`}
          href="javascript:;"
          onClick={() => this.setState({ page: current })}
        >
          {current}
        </a>
      )
    }

    function render(type, props) {
      return type === 'Item'
        ? <Item {...props} />
        : null
    }

    return (
      <div>
        <Pagination
          search={search}
          total={total}
          page={page}
        />
        <br />
        <Pagination
          search={search}
          total={total}
          page={page}
          showSize={10}
          pageSize={5}
        />
        <p>Change by State:</p>
        <Pagination
          search={search}
          total={total}
          page={page}
          render={render}
        />
      </div>
    );
  }
}
