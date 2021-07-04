export default {
  documents: {
    'quick-start': () => import('./quick-start')
    // 'i18n': () => import('./i18n'),
    // 'custom-theme': () => import('./custom-theme')
  },
  components: {
    Basic: {
      layout: () => import('./layout'),
      container: () => import('./container'),
      color: () => import('./color'),
      typography: () => import('./typography'),
      border: () => import('./border'),
      icon: () => import('./icon'),
      button: () => import('./button'),
      link: () => import('./link'),
      scrollbar: () => import('./scrollbar'),
    },
    'Form': {
    //   'radio': () => import('./radio'),
      checkbox: () => import('./checkbox'),
    // //   'input': () => import('./input'),
    // //   'input-number': () => import('./input-number'),
    // //   'select': () => import('./select'),
    // //   'cascader': () => import('./cascader'),
    //   'switch': () => import('./switch'),
    // //   'slider': () => import('./slider'),
    // //   'time-picker': () => import('./time-picker'),
    // //   'date-picker': () => import('./date-picker'),
    // //   'datetime-picker': () => import('./datetime-picker'),
    // //   'upload': () => import('./upload'),
    // //   'rate': () => import('./rate'),
    // //   'color-picker': () => import('./color-picker'),
    // //   'transfer': () => import('./transfer'),
    // //   'form': () => import('./form')
    },
    'Data': {
    // //   'table': () => import('./table'),
      tag: () => import('./tag'),
      progress: () => import('./progress'),
    // //   'tree': () => import('./tree'),
    // //   'pagination': () => import('./pagination'),
      badge: () => import('./badge'),
      avatar: () => import('./avatar')
    },
    'Notice': {
      alert: () => import('./alert'),
    //   // 'loading': () => import('./loading'),
    //   'message': () => import('./message'),
    //   // 'message-box': () => import('./message-box'),
      notification: () => import('./notification')
    },
    'Navigation': {
      affix: () => import('./affix'),
      // 'menu': () => import('./menu'),
      // 'tabs': () => import('./tabs'),
      breadcrumb: () => import('./breadcrumb'),
      'page-header': () => import('./page-header'),
      // 'dropdown': () => import('./dropdown'),
      steps: () => import('./steps')
    },
    'Others': {
    //   // 'dialog': () => import('./dialog'),
    //   'tooltip': () => import('./tooltip'),
    // //   'popover': () => import('./popover'),
      card: () => import('./card'),
    // //   'carousel': () => import('./carousel'),
      collapse: () => import('./collapse'),
      timeline: () => import('./timeline'),
      divider: () => import('./divider'),
      backtop: () => import('./backtop')
    }
  }
};
