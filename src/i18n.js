import Vue from "vue";
import VueI18n from "vue-i18n";
import messages from "./i18n-messages";

const local = JSON.parse(localStorage.getItem(process.env.VUE_APP_KEY))
let lang = null
if(local && local.customization && local.customization.language){
    lang = local.customization.language;
}else{
    lang = 'es'
}

Vue.use(VueI18n)

const i18n = new VueI18n({
    locale: lang, // set locale
    messages, // set locale messages
})

export default i18n
