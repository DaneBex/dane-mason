

export const reviewTypes = `#graphql

    type Review {
  id: ID!
  content: String!
  rating: Float!
  author: User!
  business: Business!
  photos: [String!]
  likes: Int!
  comments: [Comment!]
  reports: [String!]
  createdAt: String!
  updatedAt: String!
}
`