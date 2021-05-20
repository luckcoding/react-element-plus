import React from 'react';
import classnames from 'classnames';

import locales, { Locale } from './locales';
import pages from './pages';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentWillMount() {
    window.addEventListener(
      'hashchange',
      () => {
        window.scrollTo(0, 0);

        this.setPage();
      },
      false
    );
  }

  componentDidMount() {
    this.setPage(() => {
      if (!this.state.locale) {
        this.setLocale(localStorage.getItem('ELEMENT_LANGUAGE') || 'zh-CN');
      }
    });
  }

  getLocale(key) {
    const map = locales[this.state.locale] || {};

    return key.split('.').reduce((a, b) => {
      const parent = map[a];

      if (b) {
        return (parent || {})[b];
      }

      return parent;
    });
  }

  setLocale(locale) {
    window.location.hash = `/${locale}/${this.state.page}`;
  }

  getPage() {
    const routes = location.hash.match(/(?:\/(.+))?\/(.+)/);

    if (routes) {
      if (locales.hasOwnProperty(routes[1])) {
        this.setState({ locale: routes[1] }, () => {
          localStorage.setItem('ELEMENT_LANGUAGE', this.state.locale);
        });
      }

      return routes[2];
    }

    return 'quick-start';
  }

  setPage(fn) {
    this.setState({ page: this.getPage() }, fn);
  }

  getComponent(page) {
    this.components =
      this.components ||
      Object.assign(
        Object.values(pages.components).reduce((a, b) => Object.assign(a, b), {}),
        pages.documents
      );

    const result = this.components[page];

    if (result) {
      return React.createElement(result.default, {
        locale: {
          show: this.getLocale('markdown.show'),
          hide: this.getLocale('markdown.hide')
        }
      });
    }
  }

  render() {
    return (
      <div className="app">
        <header className="header">
          <h1>Crude UI</h1>
          <ul className="nav">
            <li className="nav-item">
              <span
                className={classnames('nav-lang', { active: this.state.locale === 'zh-CN' })}
                onClick={this.setLocale.bind(this, 'zh-CN')}
              >
                中文
              </span>
              <span> / </span>
              <span
                className={classnames('nav-lang', { active: this.state.locale === 'en-US' })}
                onClick={this.setLocale.bind(this, 'en-US')}
              >
                En
              </span>
            </li>
          </ul>
        </header>
        <div className="main">
          <nav className="side-nav">
            <ul>
              <li className="nav-item">
                <a>{this.getLocale('misc.development')}</a>
                <ul className="pure-menu-list sub-nav">
                  {Object.keys(pages.documents).map(page => (
                    <li className="nav-item" key={page}>
                      <a
                        href={`#/${this.state.locale}/${page}`}
                        className={page === this.state.page ? 'active' : ''}
                      >
                        {this.getLocale(`page.${page}`)}
                      </a>
                    </li>
                  ))}
                </ul>
              </li>
              <li className="nav-item">
                <a>{this.getLocale('misc.components')}</a>
                {Object.keys(pages.components).map(group => (
                  <div className="nav-group" key={group}>
                    <div className="nav-group__title">{group}</div>
                    <ul className="pure-menu-list">
                      {Object.keys(pages.components[group]).map(page => (
                        <li key={page} className="nav-item">
                          <a
                            href={`#/${this.state.locale}/${page}`}
                            className={page === this.state.page ? 'active' : ''}
                          >
                            {this.getLocale(`page.${page}`)}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </li>
            </ul>
          </nav>
          <div className="content">
            {this.getComponent(this.state.page)}
          </div>
        </div>
        {/* <footer className="footer">
          <div className="container">
            <div className="footer-main">
              <p className="footer-main-title">react-element-plus</p>
            </div>
            <div className="footer-social">
              <a href="//github.com/eleme/element-react" target="_blank" rel="noopener noreferrer">
                <img src={require('./assets/github.png')} />
              </a>
            </div>
          </div>
        </footer> */}
      </div>
    );
  }
}

// const App: React.FC<{}> = () => {

//   const [locale, setLocale] = useState<Locale>('zh-CN')

//   const getPage = useCallback(() => {
//     const routes = location.hash.match(/(?:\/(.+))?\/(.+)/);

//     if (routes) {
//       if (locales.hasOwnProperty(routes[1])) {
//         const nextLocale = routes[1] as Locale
//         setLocale(nextLocale)
//         localStorage.setItem('ELEMENT_LANGUAGE', nextLocale);
//       }

//       return routes[2];
//     }

//     return 'quick-start';
//   }, [])

//   useEffect(() => {
//     window.addEventListener('hashchange', () => {
//       window.scrollTo(0, 0);
//       getPage();
//     }, false);
//   }, [])

//   // const getLocale = (key) => {
//   //   const map = locales[this.state.locale] || {};

//   //   return key.split('.').reduce((a, b) => {
//   //     const parent = map[a];

//   //     if (b) {
//   //       return (parent || {})[b];
//   //     }

//   //     return parent;
//   //   });
//   // }
// }