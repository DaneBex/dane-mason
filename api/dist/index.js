import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { PrismaClient } from "@prisma/client";
import winston from "winston";
import { hash, compare } from "bcrypt";
import { DateTimeResolver, GraphQLJSON } from "graphql-scalars";
import jwt from "jsonwebtoken";
const { sign } = jwt;
const JWT_SECRET = process.env.JWT_SECRET;
const prisma = new PrismaClient();
export const typeDefs = `#graphql

  scalar Date
  scalar JSON

  type User {
  id: ID!

  username: String!
  email: String!
  profileImg: String
  age: Int
  sex: Sex
  race: Race
  income: Income
  married: Boolean
  reviews: [Review!]
  comments: [Comment!]
  achievements: [Achievement!]
  favoriteBusinesses: [Business!]
  ownedBusinesses: [Business!]
  echoes: Int!

  createdAt: String!
  updatedAt: String!
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

type Comment {
  id: ID!
  content: String!
  review: Review!
  author: User!
  likes: Int!
  createdAt: String!
  updatedAt: String!
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

enum Sex {
  MALE
  FEMALE
}

enum Race {
  WHITE
  BLACK
  HISPANIC
  AMERICAN_INDIAN
  ASIAN
}

enum Income {
  ZERO
  TWENTY
  FIFTY
  EIGHTY
}

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

type HoursOfOperation {
    monday: String!
    tuesday: String!
    wednesday: String!
    thursday: String!
    friday: String!
    saturday: String!
    sunday: String!
  }

  type Query {
    users: [User]
  }

  input CreateUserInputs {
    username: String!
    password: String!
    email: String!
  }

  type AuthPayload {
   user: User!
   token: String!
}

type SignInPayload {
    user: User
    token: String
    error: String
}
  
  type Mutation {
    createUser(createUserInputs: CreateUserInputs!): AuthPayload
    loginUser(email: String!, password: String!): SignInPayload
  }
`;
export const resolvers = {
    Date: DateTimeResolver,
    JSON: GraphQLJSON,
    Query: {
        users: async () => {
            return await prisma.user.findMany();
        },
    },
    Mutation: {
        createUser: async (_parent, args, _contextValue, _info) => {
            const { username, password, email } = args.createUserInputs;
            const hashedPass = await hash(password, 10);
            const user = await prisma.user.create({
                data: {
                    username: username,
                    password: hashedPass,
                    email: email,
                },
            });
            const token = sign({ userId: user.id }, JWT_SECRET, {
                expiresIn: "1d",
            });
            return {
                user,
                token,
            };
        },
        loginUser: async (_parent, args, _contextValue, _info) => {
            const emailUser = await prisma.user.findFirst({
                where: { email: args.email },
                select: { id: true, email: true, password: true },
            });
            if (!emailUser) {
                return {
                    error: "Email not found",
                };
            }
            const correctPassword = await compare(args.password, emailUser.password);
            if (correctPassword) {
                const user = await prisma.user.findFirst({
                    where: {
                        email: args.email,
                    },
                });
                const token = sign({ userId: user.id }, JWT_SECRET, {
                    expiresIn: "1d",
                });
                return {
                    user,
                    token,
                };
            }
            else {
                return {
                    error: "Password not correct",
                };
            }
        },
    },
};
const logger = winston.createLogger({
    level: "info",
    format: winston.format.json(),
    defaultMeta: { service: "user-service" },
    transports: [new winston.transports.Console()],
});
// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
    typeDefs,
    resolvers,
});
// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests
const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
});
logger.info(`🚀  Server ready at: ${url}`);
