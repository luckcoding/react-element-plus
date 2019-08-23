import Markdown from '../../libs/markdown';
import './index.scss';

export default class Color extends Markdown {
  document(locale) {
    return require(`../../docs/${locale}/color.md`);
  }
}
