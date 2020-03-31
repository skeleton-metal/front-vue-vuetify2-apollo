import customization from './modules/customization/customization-i18n-messages'

const baseMessages = {
    en: {
        message: {
            hello: 'hello world'
        }
    },
    es: {
        message: {
            hello: 'Hola Mundo'
        }
    },
    pt: {
        message: {
            hello: 'Olá mundo'
        }
    }

}

const messages = {...baseMessages, ...customization}


export default messages
