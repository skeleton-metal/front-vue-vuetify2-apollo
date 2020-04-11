import graphqlClient from "../../../../apollo";

class SessionProvider {


    sessionsByUser() {
        return graphqlClient.query({query: require('./gql/sessionsByUser.graphql'), fetchPolicy:"network-only"})
    }

    dashboardData() {
        return graphqlClient.query({query: require('./gql/dashboardData.graphql'), fetchPolicy:"network-only"})
    }
    


}

export default new SessionProvider()


