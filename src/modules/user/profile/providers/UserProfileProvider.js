import graphqlClient from "../../../../apollo";
import gql from "graphql-tag";


class UserProfileProvider {

    avatarUpload(file) {
        return graphqlClient.mutate({
            mutation: gql`mutation ( $file: Upload!){
                avatarUpload(file: $file){
                    filename
                    mimetype
                    encoding
                    url
                }
            }`,
            variables: {
                file: file
            },
        })
    }

    changePassword( password, passwordVerify) {
        return graphqlClient.mutate({
            mutation: gql`mutation ($password: String!, $passwordVerify: String!){
                changePassword( password: $password, passwordVerify: $passwordVerify){
                    status
                    message
                }
            }`,
            variables: {
                password: password,
                passwordVerify: passwordVerify
            },
        })
    }


}

export default new UserProfileProvider()