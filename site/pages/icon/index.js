import Markdown from '../../libs/markdown';

export default class Icon extends Markdown {
  document(locale) {
    return require(`../../docs/${locale}/icon.md`);
  }
}
