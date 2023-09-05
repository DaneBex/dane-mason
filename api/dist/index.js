import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { PrismaClient } from "@prisma/client";
import winston from "winston";
import { hash, compare } from "bcrypt";
import { DateTimeResolver } from "graphql-scalars";
const prisma = new PrismaClient();
// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
export const typeDefs = `#graphql
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "User" type defines the queryable fields for every book in our data source.

  scalar DateTime

  type User {
    id: String!
    username: String!
    password: String!
    email: String!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).

  type LoginResponse {
    user: User
    error: String
  }

  type Query {
    users: [User]
    loginUser(email: String!, password: String!): LoginResponse
  }

  input CreateUserInputs {
    username: String!
    password: String!
    email: String!
  }
  
  type Mutation {
    createUser(createUserInputs: CreateUserInputs!): User
  }
`;
// Resolvers define how to fetch the types defined in your schema.
// This resolver retrieves books from the "books" array above.
export const resolvers = {
    DateTime: DateTimeResolver,
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
        loginUser: async (_parent, args, _contextValue, _info) => {
            console.log(args);
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
            console.log("Correct Pass: ", correctPassword);
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
                console.log("User: ", user);
                return { user };
            }
            else {
                return {
                    error: "Password not correct",
                };
            }
        },
    },
    Mutation: {
        createUser: async (_parent, args, _contextValue, _info) => {
            const { username, password, email } = args.createUserInputs;
            const hashedPass = await hash(password, 10);
            return await prisma.user.create({
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
