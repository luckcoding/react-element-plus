import React from 'react';

import locales, { Locale } from './locales';
import pages from './pages';

interface IState {
  locale?: Locale;
  page?: string;
}
export default class App extends React.Component<{}, IState> {
  state: IState = {};
  components: Map<string, React.ReactElement> = new Map()

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
        this.setState({ locale: routes[1] as Locale }, () => {
          localStorage.setItem('ELEMENT_LANGUAGE', this.state.locale);
        });
      }

      return routes[2];
    }

    return 'quick-start';
  }

  async setPage(fn?: () => void) {
    const page = this.getPage()
    await this.loadComponent(page)
    this.setState({ page }, fn);
  }

  async loadComponent(page: string) {
    const components = Object.assign(
      Object.values(pages.components).reduce((a, b) => Object.assign(a, b), {}),
      pages.documents
    )

    const loader = components[page]

    if (!loader) {
      return
    }

    const component = (await loader()).default

    if (component) {
      this.components.set(page, React.createElement(component, {
        locale: {
          show: this.getLocale('markdown.show'),
          hide: this.getLocale('markdown.hide')
        }
      }))
      // this.forceUpdate()
    } else {
      return null
    }
  }

  render() {
    return (
      <>
        <header className="header">
          <h1>ElementPlus</h1>
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
            {this.components.get(this.state.page) || null}
          </div>
        </div>
      </>
    );
  }
}
