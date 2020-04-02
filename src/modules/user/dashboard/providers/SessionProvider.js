import graphqlClient from "../../../../apollo";

class SessionProvider {


    sessionsByUser() {
        return graphqlClient.query({query: require('./gql/sessionsByUser.graphql')})
    }
    


}

export default new SessionProvider()


