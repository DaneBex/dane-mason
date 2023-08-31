import { gql } from "@apollo/client"

export const CREATE_USER = gql`
    mutation CreateUser($createUserInputs: CreateUserInputs!) {
        createUser(createUserInputs: $createUserInputs) {
            id
            username
            email
        }
    }
`
