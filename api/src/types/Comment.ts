

export const commentTypes = `#graphql
type Comment {
  id: ID!
  content: String!
  review: Review!
  author: User!
  likes: Int!
  createdAt: String!
  updatedAt: String!
}
`