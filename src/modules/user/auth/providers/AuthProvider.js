import graphqlClient from "../../../../apollo";
import gql from "graphql-tag";


class AuthProvider {

    auth(username,password){
        return graphqlClient.mutate({
            mutation: gql`mutation ( $username: String!, $password: String!){
                auth(username: $username, password: $password){
                    token
                    user{
                        id
                        username
                        name
                        email
                        phone
                        avatarurl
                    }
                    }
                }`,
            variables: {
                username: username,
                password: password,

            }
        })
    }


    avatar(id,avatar) {
        return graphqlClient.mutate(
            {
                mutation: gql`
                    mutation ($id: Int!,$avatar: Upload!) {
                        avatar(id: $id, avatar: $avatar) {
                            ok
                            id
                            image
                        }
                    }`, variables: {
                    id: id,
                    avatar: avatar
                }
            }
        )
    }


    me(){
       return graphqlClient.query({
            query: gql`
                query{
                me{
                    id
                    firstName
                    username
                    lastName
                    email
                    groups{
                        id
                        name
                    }
                    avatar{
                        image
                    }  
                
                }
                }`
        })
    }


}

export default new AuthProvider()