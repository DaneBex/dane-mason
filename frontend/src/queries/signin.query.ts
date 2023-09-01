import { gql } from "@apollo/client" 

export const SIGNIN_USER = gql`
    query SignInUser {
       user{
        username
        password
       }
    }
`
