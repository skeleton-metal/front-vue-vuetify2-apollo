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
        return graphqlClient.mutate({
            mutation: gql`
                mutation ( $id: ID!, $name:String!,$username: String!, $email: String!, $phone: String!, $role: Int!, $active: Boolean!){
                    updateUser(id: $id, name:$name, username: $username, email:$email, phone:$phone, role: $role, active: $active)
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
                }`, variables: {
                id: id,
                name: name,
                username:username,
                email: email,
                phone: phone,
                role: role,
                active: active
            }
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

export default new UserAdminProvider()