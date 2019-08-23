import Markdown from '../../libs/markdown';
import './index.scss';

export default class extends Markdown {
  document(locale) {
    return require(`../../docs/${locale}/layout.md`);
  }
}
