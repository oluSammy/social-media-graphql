import { gql } from "apollo-server";
import dotenv from "dotenv";

dotenv.config();

export const typeDefs = gql`
  type Query {
    health: String
    posts: [Post]
    me: UserPayload!
    profile(userId: ID!): ProfilePayload
  }

  type Mutation {
    postCreate(post: PostInput): PostPayload!
    postUpdate(postId: ID!, post: PostInput): PostPayload!
    postDelete(postId: ID!): PostPayload!
    postPublish(postId: ID!, publish: Boolean!): PostPayload!
    signup(
      credentials: credentialsInput!
      name: String!
      bio: String!
    ): AuthPayload!
    signIn(credentials: credentialsInput!): AuthPayload!
  }

  type Post {
    id: ID!
    title: String!
    content: String!
    createdAt: String!
    published: Boolean!
    user: User
  }

  input credentialsInput {
    email: String!
    password: String!
  }

  type User {
    id: ID!
    name: String!
    email: String!
    profile: Profile!
    posts: [Post!]!
  }

  type Profile {
    id: ID!
    user: User!
    bio: String!
  }

  type PostPayload {
    userErrors: [UserError!]!
    post: Post
  }

  type ProfilePayload {
    profileErrors: [ProfileError!]!
    profile: Profile
  }

  type UserError {
    message: String!
  }

  type ProfileError {
    message: String
  }

  type AuthPayload {
    userErrors: [UserError!]!
    token: String
  }

  type UserPayload {
    userErrors: [UserError!]!
    user: User!
  }

  input SignInPayload {
    # userErrors: [UserError!]!
    token: String!
    # user: User!
  }

  input PostInput {
    title: String
    content: String
  }
`;
