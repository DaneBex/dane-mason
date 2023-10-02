

export const businessTypes = `#graphql
enum BusinessTags {
  ORGANIC
  FAMILY_OWNED
  PET_FRIENDLY
  LIVE_MUSIC
}

enum PaymentOptions {
  CREDIT_CARD
  CASH
  MOBILE_PAYMENT
  ONLINE_TRANSFER
}

type Business {
    id: ID!
    name: String!
    street: String!
    city: String!
    state: String!
    postalCode: String!
    description: String!
    logo: String
    gallery: [String!]
    hoursOfOperation: [HoursOfOperation!]
    reviews: [Review!]
    rating: Float
    specialOffers: [JSON!]
    achievements: [Achievement!]
    favoritedBy: [User!]
    facebook: String
    instagram: String
    x: String
    owners: [User!]
    tags: [BusinessTags!]
    events: [String!]
    paymentOptions: [PaymentOptions!]
    phone: Int!
    email: String!
    website: String
    createdAt: String!
    updatedAt: String!
  }
`