import { PrismaClient } from "@prisma/client";
import { compare, hash } from "bcrypt";
import { DateTimeResolver, GraphQLJSON } from "graphql-scalars"
import jwt from "jsonwebtoken";

export const userTypes = `#graphql
  scalar Date
  scalar JSON

enum Income {
  ZERO
  TWENTY
  FIFTY
  EIGHTY
}

enum Race {
  WHITE
  BLACK
  HISPANIC
  AMERICAN_INDIAN
  ASIAN
}

enum Sex {
  MALE
  FEMALE
}

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
`

const prisma = new PrismaClient();

const { sign } = jwt;

const JWT_SECRET = process.env.JWT_SECRET;

export const userResolver = {
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
      } else {
        return {
          error: "Password not correct",
        };
      }
    },
  },
}