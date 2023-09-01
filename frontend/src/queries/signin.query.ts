import { gql } from "@apollo/client" 

export const SIGNIN_USER = gql`
query LoginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
        user  {
            email
            password
        }
        error
}
`
