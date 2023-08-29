import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { PrismaClient } from '@prisma/client';
import { hash } from 'argon2';
import winston from 'winston'

const prisma = new PrismaClient()
// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
export const typeDefs = `#graphql
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "User" type defines the queryable fields for every book in our data source.
  type User {
    id: String!
    username: String!
    password: String!
    email: String!
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    users: [User]
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
    Query: {
      users: async () => await prisma.user.findMany(),
    },
    Mutation: {
      createUser: async (_parent, args, _contextValue, _info) => {
        console.log('ARGS: ', args)
        const { username, password, email } = args.createUserInputs
        const hashedPass = await hash(password)
        return await prisma.user.create({
        data: {
            username: username,
            password: hashedPass,
            email: email,
        }
      })
    }
    }
  };

  const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'user-service' },
    transports: [
      new winston.transports.Console()
    ],
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