import customization from './modules/customization/customization-i18n-messages'
import user from './modules/user/user-i18n-messages'

const baseMessages = {
    en: {
        common: {
            search: 'Search',
            loading: 'Loading',
            noData: 'No data',
            create: 'Create',
            update: 'Update',
            delete: 'Delete',
            close: 'Close',
            send: 'Send',
            areYouSureDeleteRecord: 'Are you sure you want to blur this record?'
        }
    },
    es: {
        common: {
            search: 'Buscar',
            loading: 'Cargando',
            noData: 'Sin datos',
            create: 'Crear',
            update: 'Actualizar',
            delete: 'Borrar',
            close: 'Cerrar',
            send: 'Enviar',
            areYouSureDeleteRecord: '¿Esta seguro que desea borrar este registro?'
        }
    },
    pt: {
        common: {
            search: 'procurar',
            loading: 'Carregando',
            noData: 'Não há dados',
            create: 'Criar',
            update: 'Atualizar',
            delete: 'Excluir',
            close: 'Fechar',
            send: 'Enviar',
            areYouSureDeleteRecord: 'Tem certeza de que deseja excluir este registro?'
        }
    }

}

const es = {...baseMessages.es, ...customization.es, ...user.es}
const en = {...baseMessages.en, ...customization.en, ...user.en}
const pt = {...baseMessages.pt, ...customization.pt, ...user.pt}

const messages = {es, en, pt}

export default messages
