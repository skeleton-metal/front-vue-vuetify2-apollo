import graphqlClient from "../../../apollo";

class CustomizationProvider {



    customization() {
        return graphqlClient.query({
            query: require('./gql/customization.graphql')
        })
    }
    
    

    updateCustomization(form) {
        return graphqlClient.mutate({
            mutation: require('./gql/customizationUpdate.graphql'),
            variables: form
        })
    }

    updateColors(form) {
        return graphqlClient.mutate({
            mutation: require('./gql/colorsUpdate.graphql'),
            variables: form
        })
    }

}

export default new CustomizationProvider()


