import Markdown from '../../libs/markdown';
import './index.scss';

export default class Tooltip extends Markdown {
  document(locale) {
    return require(`../../docs/${locale}/tooltip.md`);
  }
}
