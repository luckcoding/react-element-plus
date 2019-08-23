import Markdown from '../../libs/markdown';

export default class extends Markdown {
  document(locale) {
    return require(`../../docs/${locale}/button.md`);
  }
}
