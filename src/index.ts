import { getUserFromToken } from "./utils/getUserFromToken";
import { ApolloServer, gql } from "apollo-server";
import { typeDefs } from "./schema";
import { Query } from "./resolvers";
import { Prisma, PrismaClient } from "@prisma/client";
import { Mutation } from "./resolvers/Mutation/Mutation";
import { Profile } from "./resolvers/Profile";
import { Post } from "./resolvers/Post";
import { User } from "./resolvers/User";

export const prisma = new PrismaClient();

export interface IContext {
  prisma: PrismaClient<
    Prisma.PrismaClientOptions,
    never,
    Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined
  >;
  userInfo: {
    userId: number;
  } | null;
}

const server = new ApolloServer({
  typeDefs,
  resolvers: {
    Query,
    Mutation,
    Profile,
    Post,
    User,
  },
  context: async ({ req }) => {
    // console.log(req.headers.authorization);
    const userInfo = await getUserFromToken(
      req.headers.authorization as string
    );
    return {
      prisma,
      userInfo,
    };
  },
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
