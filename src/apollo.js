import {ApolloClient} from 'apollo-client'
import {createUploadLink} from 'apollo-upload-client'
import {InMemoryCache} from 'apollo-cache-inmemory'
import {ApolloLink, concat} from 'apollo-link'
import store from './store'

const uploadLink = createUploadLink({
    // You should use an absolute URL here
    uri: process.env.VUE_APP_APIHOST + '/graphql/',
})

//Middleware for Authorization
const authMiddleware = new ApolloLink((operation, forward) => {
    if(store.getters.getToken) {
        operation.setContext({
            headers: {
                Authorization: 'bearer ' + store.getters.getToken
            }
        });
    }
    return forward(operation);
})

// Cache implementation
const cache = new InMemoryCache()

// Create the apollo client
const apolloClient = new ApolloClient({
    link: concat(authMiddleware, uploadLink),
    cache,
})

export default apolloClient