import graphqlClient from "../../../../apollo";

class GroupProvider {

    permissions() {
        return graphqlClient.query({query: require('./gql/permissions.graphql')})
    }

    roles() {
        return graphqlClient.query({query: require('./gql/roles.graphql')})
    }
    

    role(id) {
        return graphqlClient.query({
            query: require('./gql/role.graphql'),
            variables: {id:id}
        })
    }
    
    

    createRole(form) {
        return graphqlClient.mutate({
            mutation: require('./gql/roleCreate.graphql'),
            variables: form
        })
    }
    
    updateRole(form) {
        return graphqlClient.mutate({
            mutation: require('./gql/roleUpdate.graphql'),
            variables: form
        })
    }
    
     deleteRole(id) {
        return graphqlClient.mutate({
            mutation: require('./gql/roleDelete.graphql'),
            variables: {id}
        })
    }

}

export default new GroupProvider()


