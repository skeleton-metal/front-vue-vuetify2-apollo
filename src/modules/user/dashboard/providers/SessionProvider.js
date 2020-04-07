import graphqlClient from "../../../../apollo";

class SessionProvider {


    sessionsByUser() {
        return graphqlClient.query({query: require('./gql/sessionsByUser.graphql'), fetchPolicy:"network-only"})
    }

    sessionsBy() {
        return graphqlClient.query({query: require('./gql/sessionsBy.graphql'), fetchPolicy:"network-only"})
    }
    


}

export default new SessionProvider()


