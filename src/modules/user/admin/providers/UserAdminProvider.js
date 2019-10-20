import graphqlClient from "../../../../apollo";
import gql from "graphql-tag";


class UserAdminProvider {


    users() {
        return graphqlClient.query({
            query: gql`query{
                users{
                    id
                    name
                    username
                    email
                    phone
                    active
                    avatarurl
                    role{
                        id
                        name
                    }
                }
            }`
        })
    }


    roles() {
        return graphqlClient.query({
            query: gql`
                query{
                    roles{
                        id
                        name
                    }
                }`
        })
    }


    createUser(username, password, name, email, phone, role, active) {
        return graphqlClient.mutate({
            mutation: gql`
                mutation ($username: String!,$password: String!, $name:String!,
                    $email: String!, $phone: String!, $role: Int!, $active: Boolean!)
                {
                    createUser(username:$username ,password:$password, name:$name,
                        email:$email, phone:$phone, role: $role, active: $active)
                    {
                        user
                        {
                            id
                            name
                            username
                            email
                            phone
                            avatarurl
                            active
                            role{
                                id
                                name
                            }
                        }
                    }
                }`,
            variables: {
                username: username,
                password: password,
                name: name,
                email: email,
                phone: phone,
                role: role,
                active: active
            }
        })
    }


    updateUser(id, name, username, email, phone, role, active) {
        return new Promise((resolve, reject) => {
                graphqlClient.mutate({
                    mutation: require('./gql/updateUser.graphql'),
                    variables: {
                        id,
                        name,
                        username,
                        email,
                        phone,
                        role,
                        active
                    }
                }).then( data => {
                    resolve(data)
                }).catch( error => {
                    if(error.networkError){
                        console.log("Provider NetworkError:"+error.networkError)
                    }
                    console.log("Provider Error:"+error)
                    reject(error)
                })
            }
        )
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

export default new UserAdminProvider()