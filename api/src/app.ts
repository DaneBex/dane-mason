import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import winston from "winston";
import { resolvers, typeDefs } from "./type-resolver";

export class App {
  logger: winston.Logger;

  constructor() {
    this.logger = winston.createLogger({
      level: "info",
      format: winston.format.json(),
      defaultMeta: { service: "user-service" },
      transports: [new winston.transports.Console()],
    });
  }

  async run() {
    const server = new ApolloServer({
      typeDefs,
      resolvers,
    });

    const { url } = await startStandaloneServer(server, {
      listen: { port: 4000 },
    });

    this.logger.info(`🚀  Server ready at: ${url}`);
  }
}
