import graphqlClient from "../../../../apollo";
import gql from "graphql-tag";


class UserRegisterProvider {

    registerUser(username, password, name, email, phone) {
        return graphqlClient.mutate({
            mutation: gql`
                mutation ($username: String!,$password: String!, $name:String!,
                    $email: String!, $phone: String!)
                {
                    registerUser(username:$username ,password:$password, name:$name,email:$email, phone:$phone)
                    {
                        status
                        id
                        email
                    }
                }`,
            variables: {
                username: username,
                password: password,
                name: name,
                email: email,
                phone: phone,
            }
        })
    }


}

export default new UserRegisterProvider()