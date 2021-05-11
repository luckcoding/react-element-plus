import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import 'core-js';

// import '../dist/styles/relement-default.css';
// import '../src/styles/index.scss';
import './styles/base.scss';
import './styles/prism.css';

import App from './page';

render(
  <AppContainer>
    <App />
  </AppContainer>,
  document.getElementById('app')
);

if ((module as any).hot) {
  (module as any).hot.accept('./page', () => {
    const App = require('./page').default;

    render(
      <AppContainer>
        <App />
      </AppContainer>,
      document.getElementById('app')
    );
  });
}
