import customization from './modules/customization/customization-i18n-messages'
import user from './modules/user/user-i18n-messages'
import baseMessages from './i18n-common-messages'


const es = {...baseMessages.es, ...customization.es, ...user.es}
const en = {...baseMessages.en, ...customization.en, ...user.en}
const pt = {...baseMessages.pt, ...customization.pt, ...user.pt}

const messages = {es, en, pt}

export default messages
