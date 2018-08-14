import Vue from 'vue'
import VueI18n from 'vue-i18n'
Vue.use(VueI18n);

let lang = navigator.language || navigator.userLanguage;
lang = lang.substr(0, 2) == 'zh' ? 'zh-CN' : 'en-US';

const i18n = new VueI18n({
  locale: lang,
  messages: {
    'zh-CN': require('./zh'),   // 中文语言包
    'en-US': require('./en')    // 英文语言包
  }
})

export default i18n;
