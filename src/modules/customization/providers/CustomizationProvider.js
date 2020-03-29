import graphqlClient from "../../../apollo";

class CustomizationProvider {



    customization(id) {
        return graphqlClient.query({
            query: require('./gql/customization.graphql'),
            variables: {id:id}
        })
    }
    
    

    updateCustomization(form) {
        return graphqlClient.mutate({
            mutation: require('./gql/customizationUpdate.graphql'),
            variables: form
        })
    }
    

}

export default new CustomizationProvider()


