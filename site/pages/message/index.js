import Markdown from '../../libs/markdown';

export default class Message extends Markdown {
  document(locale) {
    return require(`../../docs/${locale}/message.md`);
  }
}
