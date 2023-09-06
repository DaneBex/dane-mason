import { gql } from "@apollo/client";

export const SIGNIN_USER = gql`
  mutation LoginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      user {
        id
        username
        email
        createdAt
      }
      error
    }
  }
`;
