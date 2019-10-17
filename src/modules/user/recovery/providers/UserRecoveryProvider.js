import graphqlClient from "../../../../apollo";
import gql from "graphql-tag";


class UserProvider {

    recoveryPassword(email) {
        return graphqlClient.mutate({
            mutation: gql`
                mutation ( $email: String!){
                recoveryPassword(email: $email){
                    status
                    message
                }
            }`,
            variables: {
                email: email
            },
        })
    }

    password(id, password, password_verify) {
        return graphqlClient.mutate({
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
        })
    }





}

export default new UserProvider()