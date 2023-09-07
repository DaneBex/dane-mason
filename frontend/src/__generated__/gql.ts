/* eslint-disable */
import * as types from "./graphql";
import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
  "fragment ReviewData on Review {\n  id\n}": types.ReviewDataFragmentDoc,
  "fragment UserData on User {\n  id\n  username\n  email\n  createdAt\n  profileImg\n  age\n  sex\n  race\n  income\n  married\n  reviews {\n    id\n  }\n  achievements {\n    id\n  }\n  favoriteBusinesses {\n    id\n  }\n  echoes\n  createdAt\n  updatedAt\n}":
    types.UserDataFragmentDoc,
  "mutation LoginUser($email: String!, $password: String!) {\n  loginUser(email: $email, password: $password) {\n    user {\n      ...UserData\n    }\n    token\n    error\n  }\n}":
    types.LoginUserDocument,
  "mutation CreateUser($createUserInputs: CreateUserInputs!) {\n  createUser(createUserInputs: $createUserInputs) {\n    user {\n      ...UserData\n    }\n    token\n  }\n}":
    types.CreateUserDocument,
  "query GetUsers {\n  users {\n    username\n    email\n  }\n}":
    types.GetUsersDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "fragment ReviewData on Review {\n  id\n}",
): (typeof documents)["fragment ReviewData on Review {\n  id\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "fragment UserData on User {\n  id\n  username\n  email\n  createdAt\n  profileImg\n  age\n  sex\n  race\n  income\n  married\n  reviews {\n    id\n  }\n  achievements {\n    id\n  }\n  favoriteBusinesses {\n    id\n  }\n  echoes\n  createdAt\n  updatedAt\n}",
): (typeof documents)["fragment UserData on User {\n  id\n  username\n  email\n  createdAt\n  profileImg\n  age\n  sex\n  race\n  income\n  married\n  reviews {\n    id\n  }\n  achievements {\n    id\n  }\n  favoriteBusinesses {\n    id\n  }\n  echoes\n  createdAt\n  updatedAt\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "mutation LoginUser($email: String!, $password: String!) {\n  loginUser(email: $email, password: $password) {\n    user {\n      ...UserData\n    }\n    token\n    error\n  }\n}",
): (typeof documents)["mutation LoginUser($email: String!, $password: String!) {\n  loginUser(email: $email, password: $password) {\n    user {\n      ...UserData\n    }\n    token\n    error\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "mutation CreateUser($createUserInputs: CreateUserInputs!) {\n  createUser(createUserInputs: $createUserInputs) {\n    user {\n      ...UserData\n    }\n    token\n  }\n}",
): (typeof documents)["mutation CreateUser($createUserInputs: CreateUserInputs!) {\n  createUser(createUserInputs: $createUserInputs) {\n    user {\n      ...UserData\n    }\n    token\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "query GetUsers {\n  users {\n    username\n    email\n  }\n}",
): (typeof documents)["query GetUsers {\n  users {\n    username\n    email\n  }\n}"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never;
