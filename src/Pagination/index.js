import React from 'react';
import PropTypes from 'prop-types';
import { toNumber } from '@crude/extras';
import { Pages, pickMidIndex } from './helpers';
import { Arrow, Item, Ellipsis as BaseEllipsis } from './components';
import './pagination.scss';

const defaultProps = {
  search: {},
  page: 0,
  pageSize: 0,
  total: 0,
  showSize: 5,
  render() {},
};

const propTypes = {
  search: PropTypes.object,
  page: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  pageSize: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  total: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  showSize: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  render: PropTypes.func,
};

/**
 * 分页
 * @param  {Object} options.search   location.search
 * @param  {Number} options.page     当前页
 * @param  {Object} options.pageSize 分页数
 * @param  {Number} options.total    总页数
 * @param  {Number} options.showSize 显示按钮个数
 * @param  {Number} options.render   包装节点
 */
const Pagination = ({
  search, page, pageSize, total, showSize,
  render,
}) => {
  page = toNumber(page, 0);
  pageSize = toNumber(pageSize, 10);
  total = toNumber(total, 0);

  const pages = new Pages({
    search,
    currentPage: page,
    pageSize,
    totalSize: total,
  });

  const currentPage = pages.current();
  const firstPage = pages.first();
  const lastPage = pages.last();
  const prevPage = pages.prev();
  const nextPage = pages.next();
  const { totalPage } = pages;

  const midPages = pickMidIndex(page, totalPage, showSize);

  const disabledPrev = currentPage === prevPage;
  const disabledNext = currentPage === nextPage;

  const firstProps = { href: firstPage, disabled: disabledPrev };
  const First = render('First', firstProps) || <Arrow {...firstProps}>{'<<'}</Arrow>;

  const prevProps = { href: prevPage, disabled: disabledPrev };
  const Prev = render('Prev', prevProps) || <Arrow {...prevProps}>{'<'}</Arrow>;

  const Ellipsis = render('Ellipsis') || <BaseEllipsis />;

  const nextProps = { href: nextPage, disabled: disabledNext };
  const Next = render('Next', nextProps) || <Arrow {...nextProps}>{'>'}</Arrow>;

  const lastProps = { href: lastPage, disabled: disabledNext };
  const Last = render('Last', lastProps) || <Arrow {...lastProps}>{'>>'}</Arrow>;
  return (
    <div className="pure-pagination">
      {/* <<|< */}
      {First}
      {Prev}

      {/* ... */}
      {Ellipsis}

      {/* pages */}
      {midPages.map((p) => {
        const pageProps = {
          href: pages.gen(p),
          active: p === page,
          page: p,
          key: p,
        };
        return render('Item', pageProps) || <Item {...pageProps} />;
      })}

      {/* ... */}
      {(midPages[midPages.length - 1] < totalPage) ? Ellipsis : null}

      {/* >|>> */}
      {Next}
      {Last}
    </div>
  );
};

Pagination.displayName = 'Pagination';
Pagination.propTypes = propTypes;
Pagination.defaultProps = defaultProps;

export default Pagination;
