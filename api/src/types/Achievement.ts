

export const achievementTypes = `#graphql
enum AchievementTier {
  BRONZE
  SILVER
  GOLD
  PLATINUM
}

enum AchievementType {
  SHOPPING
  EVENTS
  PROMOTIONS
  HOLIDAY
}

type Achievement {
  id: ID!
  name: String!
  description: String!
  criteria: JSON!
  icon: String!
  echoes: Int!
  tier: AchievementTier!
  unlockMessage: String!
  isActive: Boolean!
  expireDate: String
  business: Business
  usersUnlocked: [User!]
  relatedFrom: [Achievement!]
  relatedTo: [Achievement!]
  type: AchievementType
  createdAt: String!
  updatedAt: String!
}
`