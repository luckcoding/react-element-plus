import Markdown from '../../libs/markdown';
import './index.scss';

export default class Typography extends Markdown {
  document(locale) {
    return require(`../../docs/${locale}/typography.md`);
  }
}
