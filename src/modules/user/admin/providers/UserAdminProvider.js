import graphqlClient from "../../../../apollo";
import gql from "graphql-tag";
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

    password(id, password, password_verify) {
        return new Promise((resolve, reject) => {

            graphqlClient.mutate({
                mutation: gql`
                    mutation($id: Int!, $password:String!, $password2:String!){
                        changePassword(id:$id, password:$password, password2:$password2){
                            status{
                                status
                                message
                            }
                        }
                    }`,
                variables: {
                    id: id,
                    password: password,
                    password2: password_verify
                }
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