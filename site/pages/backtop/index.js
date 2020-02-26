import Markdown from '../../libs/markdown';

export default class Backtop extends Markdown {
  document(locale) {
    return require(`../../docs/${locale}/backtop.md`);
  }
}
