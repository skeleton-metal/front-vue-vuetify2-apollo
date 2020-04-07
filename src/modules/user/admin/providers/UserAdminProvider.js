import graphqlClient from "../../../../apollo";

import {ClientError} from 'front-module-commons';




class UserAdminProvider {


    paginateUsers(limit, pageNumber, search = null, orderBy= null, orderDesc = false) {
        return graphqlClient.query({
            query: require('./gql/paginateUsers.graphql'),
            variables: {limit, pageNumber, search, orderBy, orderDesc}
        })
    }

    users() {
        return graphqlClient.query({query: require('./gql/users.graphql')})
    }

    roles() {
        return graphqlClient.query({query: require('./gql/roles.graphql')})
    }

    groups() {
        return graphqlClient.query({query: require('./gql/groups.graphql')})
    }

    createUser(username, password, name, email, phone, role, groups, active) {
        return new Promise((resolve, reject) => {
                graphqlClient.mutate({
                    mutation: require('./gql/createUser.graphql'),
                    variables: {username, password, name, email, phone, role, groups, active}
                }).then(data => {
                    resolve(data)
                }).catch((apolloError) => {
                    let clientError = new ClientError(apolloError)
                    reject(clientError)
                })
            }
        )

    }


    updateUser(id, name, username, email, phone, role, groups, active) {
        return new Promise((resolve, reject) => {
                graphqlClient.mutate({
                    mutation: require('./gql/updateUser.graphql'),
                    variables: {id, name, username, email, phone, role, groups, active}
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
