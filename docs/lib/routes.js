import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Alert from './pages/Alert';
import Avatar from './pages/Avatar';
import Backtop from './pages/Backtop';
import Button from './pages/Button';
import Checkbox from './pages/Checkbox';
import Container from './pages/Container';
import Icon from './pages/Icon';
import Input from './pages/Input';
import HolyzGrail from './pages/HolyzGrail';
import Layout from './pages/Layout';
import CountDown from './pages/CountDown';
import Loading from './pages/Loading';
import Modal from './pages/Modal';
import Pagination from './pages/Pagination';
import Progress from './pages/Progress';
import Radio from './pages/Radio';
import Rate from './pages/Rate';
import Select from './pages/Select';
import SplitLine from './pages/SplitLine';
import Table from './pages/Table';
import Textarea from './pages/Textarea';
import Toast from './pages/Toast';
import Toggle from './pages/Toggle';
import Tooltip from './pages/Tooltip';

const navs = [
  {
    path: '/alert',
    name: 'Alert',
    component: Alert,
  },
  {
    path: '/avatar',
    name: 'Avatar',
    component: Avatar,
  },
  {
    path: '/backtop',
    name: 'Backtop',
    component: Backtop,
  },
  {
    path: '/button',
    name: 'Button',
    component: Button,
  },
  {
    path: '/checkbox',
    name: 'Checkbox',
    component: Checkbox,
  },
  {
    path: '/container',
    name: 'Container',
    component: Container,
  },
  {
    path: '/icon',
    name: 'Icon',
    component: Icon,
  },
  {
    path: '/input',
    name: 'Input',
    component: Input,
  },
  {
    path: '/layout',
    name: 'Layout',
    component: Layout,
  },
  {
    path: '/holyzgrail',
    name: 'HolyzGrail',
    component: HolyzGrail,
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
    path: '/radio',
    name: 'Radio',
    component: Radio,
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
    path: '/splitline',
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
  },
  {
    path: '/tooltip',
    name: 'Tooltip',
    component: Tooltip,
  },
];

export { navs };

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
];
