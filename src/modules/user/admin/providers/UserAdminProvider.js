import graphqlClient from "../../../../apollo";
import ClientError from "../../errors/ClientError";


class UserAdminProvider {


    users() {
        return graphqlClient.query({query: require('./gql/getUsers.graphql')})
    }

    roles() {
        return graphqlClient.query({query: require('./gql/getRoles.graphql')})
    }

    createUser(username, password, name, email, phone, role, active) {
        return new Promise((resolve, reject) => {
                graphqlClient.mutate({
                    mutation: require('./gql/createUser.graphql'),
                    variables: {username, password, name, email, phone, role, active}
                }).then(data => {
                    resolve(data)
                }).catch((apolloError) => {
                    let clientError = new ClientError(apolloError)
                    reject(clientError)
                })
            }
        )

    }


    updateUser(id, name, username, email, phone, role, active) {
        return new Promise((resolve, reject) => {
                graphqlClient.mutate({
                    mutation: require('./gql/updateUser.graphql'),
                    variables: {id, name, username, email, phone, role, active}
                }).then(data => {
                    resolve(data)
                }).catch((apolloError) => {
                    let clientError = new ClientError(apolloError)
                    reject(clientError)
                })
            }
        )
    }

    deleteUser(id) {
        return new Promise((resolve, reject) => {
                graphqlClient.mutate({
                    mutation: require('./gql/deleteUser.graphql'),
                    variables: {id}
                }).then(data => {
                    resolve(data)
                }).catch((apolloError) => {
                    let clientError = new ClientError(apolloError)
                    reject(clientError)
                })
            }
        )
    }

    adminChangePassword(id, password, passwordVerify) {
        return new Promise((resolve, reject) => {

            graphqlClient.mutate({
                mutation: require('./gql/adminChangePassword.graphql'),
                variables: {id: id, password: password, passwordVerify: passwordVerify}
            }).then(data => {
                resolve(data)
            }).catch((apolloError) => {
                let clientError = new ClientError(apolloError)
                reject(clientError)
            })
        })
    }
}

export default new UserAdminProvider()
