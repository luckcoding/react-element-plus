import Markdown from '../../libs/markdown';

export default class Link extends Markdown {
  document(locale) {
    return require(`../../docs/${locale}/link.md`);
  }
}
