const locales = {
  'zh-CN': require('./zh-CN'),
};

export type Locale = keyof typeof locales;

export default locales;
