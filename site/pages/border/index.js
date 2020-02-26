import Markdown from '../../libs/markdown';
import './index.scss';

export default class Border extends Markdown {
  document(locale) {
    return require(`../../docs/${locale}/border.md`);
  }
}
