import React from 'react'
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Button from './pages/Button';
import Input from './pages/Input';
import ToolTip from './pages/ToolTip';
import Layout from './pages/Layout';
import CountDown from './pages/CountDown';
import Loading from './pages/Loading';
import Modal from './pages/Modal';
import Pagination from './pages/Pagination';
import Progress from './pages/Progress';
import Rate from './pages/Rate';
import Select from './pages/Select';
import SplitLine from './pages/SplitLine';
import Table from './pages/Table';
import Textarea from './pages/Textarea';
import Toast from './pages/Toast';
import Toggle from './pages/Toggle';

const navs = [
  {
    path: '/button',
    name: 'Button',
    component: Button,
  },
  {
    path: '/input',
    name: 'Input',
    component: Input,
  },
  {
    path: '/toolTip',
    name: 'ToolTip',
    component: ToolTip,
  },
  {
    path: '/layout',
    name: 'Layout',
    component: Layout,
  },
  {
    path: '/countDown',
    name: 'CountDown',
    component: CountDown,
  },
  {
    path: '/loading',
    name: 'Loading',
    component: Loading,
  },
  {
    path: '/modal',
    name: 'Modal',
    component: Modal,
  },
  {
    path: '/pagination',
    name: 'Pagination',
    component: Pagination,
  },
  {
    path: '/progress',
    name: 'Progress',
    component: Progress,
  },
  {
    path: '/rate',
    name: 'Rate',
    component: Rate,
  },
  {
    path: '/select',
    name: 'Select',
    component: Select,
  },
   {
    path: '/splitLine',
    name: 'SplitLine',
    component: SplitLine,
   },
   {
    path: '/table',
    name: 'Table',
    component: Table,
   },
  {
    path: '/textarea',
    name: 'Textarea',
    component: Textarea,
  },
  {
    path: '/toast',
    name: 'Toast',
    component: Toast,
  },
  {
    path: '/toggle',
    name: 'Toggle',
    component: Toggle,
  }
]

export { navs }

export default [
  {
    path: '/',
    exact: true,
    name: 'Home',
    component: Home,
  },
  ...navs,
  {
    name: '404',
    component: NotFound,
  },
]