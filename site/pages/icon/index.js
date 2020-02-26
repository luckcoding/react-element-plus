import Markdown from '../../libs/markdown';

export default class Dialog extends Markdown {
  document(locale) {
    return require(`../../docs/${locale}/icon.md`);
  }
}
