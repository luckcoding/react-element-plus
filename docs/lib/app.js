import React from 'react';
import ReactDOM from 'react-dom';
import Helmet from 'react-helmet';
import { BrowserRouter, Switch, Route, NavLink, Link } from 'react-router-dom';
import routes, { navs } from './routes';
import './app.scss'

function App() {
  return (
    <BrowserRouter>
      <Helmet
        titleTemplate="Pure - %s"
        title="Pure"
        defaultTitle="Pure"
        meta={[
          {
            'name': 'description',
            'content': 'pure components'
          },
        ]}
      />
      <nav className="nav">
        <Link to="/" className="logo">Pureui</Link>
        {navs.sort((a, b) => a.name.localeCompare(b.name)).map(({ path, name }, k) => (
          <NavLink key={k} to={path} activeClassName="active">{name}</NavLink>
        ))}
      </nav>
      <div className="body">
        <Switch>
          {routes.map((props, k) => <Route key={k} {...props} />)}
        </Switch>
      </div>
    </BrowserRouter>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);