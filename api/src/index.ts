import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { PrismaClient } from "@prisma/client";
import winston from "winston";
import { hash, compare } from "bcrypt";
import { DateTimeResolver, GraphQLJSON } from "graphql-scalars";
import { sign } from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET

const prisma = new PrismaClient();
// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
export const typeDefs = `#graphql
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "User" type defines the queryable fields for every book in our data source.

  scalar Date
  scalar JSON

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

  type User {
    id: ID!

    username: String!
    password: String!
    email: String!

    profileImg: String

    age: Int
    sex: Sex
    race: Race
    income: Income
    married: Boolean

    reviews: [Review!]
    achievments: [Achievment!]
    favoriteBusinesses: [Business!]
    echoes: Int!

    createdAt: Date!
    updatedAt: Date!
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
    gallery: [String]
    hoursOfOperation: HoursOfOperation
    reviews: [Review!]
    rating: Float
    specialOffers: [JSON!]
    achievments: [Achievment!]
    favoritedAmount: Int!

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

    createdAt: Date!
    updatedAt: Date!
  }

  type Review {
    id: ID!

    content: String!  
    rating: Float!     
    author: User!         
    business: Business!   
    photos: [String!]
    likes: Int
    comments: [Comment]
    reports: [String!]

    createdAt: Date!    
    updatedAt: Date!
}

type Comment {
    id: ID!

    content: String!
    createdAt: String!
    updatedAt: String?
    author: User!
    review: Review!
    likes: Int!

    createdAt: Date!
    updatedAt: Date!
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

  enum Achievment_Tier {
    BRONZE
    SILVER
    GOLD
    PLATINUM
  }

  enum Achievment_Type {
    SHOPPING
    EVENTS
    PROMOTIONS
    HOLIDAY
  }

  type Achievment {
    id: ID!

    name: String!
    description: String!
    criteria: JSON!
    icon: String!
    echoes: Int!
    tier: Achievment_Tier!
    unlockMessage: String!
    isActive: Boolean!
    exipreDate: Date
    business: Business
    usersUnlocked: Int!
    relatedAchievments: [Achievment]
    type: Achievment_Type

    createdAt: Date!
    updatedAt: Date!
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
  JSON : GraphQLJSON,
  Query: {
    users: async () => {
      return await prisma.user.findMany({
        select: {
          id: true,
          username: true,
          email: true,
          posts: true,
          createdAt: true,
          updatedAt: true,
        },
      });
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
        select: {
          id: true,
          username: true,
          email: true,
          posts: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      const token = sign({ userId: user.id }, JWT_SECRET, {
        expiresIn: "1d"
     });

     return {
        user,
        token
     };
    },
    loginUser: async (_parent, args, _contextValue, _info) => {
      const emailUser = await prisma.user.findFirst({
        where: {
          email: args.email,
        },
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
          select: {
            id: true,
            username: true,
            email: true,
            posts: true,
            createdAt: true,
            updatedAt: true,
            password: false,
          },
        });

        const token = sign({ userId: user.id }, JWT_SECRET, {
          expiresIn: "1d"
      });

        return { 
          user,
          token,
        };
      } else {
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
