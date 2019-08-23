import Markdown from '../../libs/markdown';
import './index.scss';

export default class Avatar extends Markdown {
  document(locale) {
    return require(`../../docs/${locale}/avatar.md`);
  }
}
