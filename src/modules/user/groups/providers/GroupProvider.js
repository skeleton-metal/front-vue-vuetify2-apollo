import graphqlClient from "../../../../apollo";

class GroupProvider {


    groups() {
        return graphqlClient.query({query: require('./gql/groups.graphql')})
    }
    
    paginateGroups(limit, pageNumber, search = null) {
        return graphqlClient.query({
            query: require('./gql/groupsPaginate.graphql'),
            variables: {limit, pageNumber, search},
            fetchPolicy: "network-only"
        })
    }

    group(id) {
        return graphqlClient.query({
            query: require('./gql/group.graphql'),
            variables: {id:id}
        })
    }
    
    

    createGroup(form) {
        return graphqlClient.mutate({
            mutation: require('./gql/groupCreate.graphql'),
            variables: form
        })
    }
    
    updateGroup(form) {
        return graphqlClient.mutate({
            mutation: require('./gql/groupUpdate.graphql'),
            variables: form
        })
    }
    
     deleteGroup(id) {
        return graphqlClient.mutate({
            mutation: require('./gql/groupDelete.graphql'),
            variables: {id}
        })
    }

}

export default new GroupProvider()


