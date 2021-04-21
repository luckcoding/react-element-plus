import Markdown from '../../libs/markdown';
import './index.scss';

export default class Container extends Markdown {
  document(locale) {
    return require(`../../docs/${locale}/container.md`);
  }
}
