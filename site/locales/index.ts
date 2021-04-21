const locales = {
  'zh-CN': require('./zh-CN')
  // 'en-US': require('./en-US')
};

export type Locale = keyof typeof locales;

export default locales;
