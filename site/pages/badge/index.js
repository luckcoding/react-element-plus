import Markdown from '../../libs/markdown';
import './index.scss';

export default class Badge extends Markdown {
  document(locale) {
    return require(`../../docs/${locale}/badge.md`);
  }
}
