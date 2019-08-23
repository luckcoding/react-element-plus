import React from 'react';
import { render } from 'react-dom';

import '../src/root';
import './styles/base.scss';
import './styles/prism.css';

import App from './page';

render(<App />, document.getElementById('app'));
