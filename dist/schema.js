"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeDefs = void 0;
var apollo_server_1 = require("apollo-server");
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.typeDefs = (0, apollo_server_1.gql)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  type Query {\n    health: String\n    posts: [Post]\n    me: UserPayload!\n    profile(userId: ID!): ProfilePayload\n  }\n\n  type Mutation {\n    postCreate(post: PostInput): PostPayload!\n    postUpdate(postId: ID!, post: PostInput): PostPayload!\n    postDelete(postId: ID!): PostPayload!\n    postPublish(postId: ID!, publish: Boolean!): PostPayload!\n    signup(\n      credentials: credentialsInput!\n      name: String!\n      bio: String!\n    ): AuthPayload!\n    signIn(credentials: credentialsInput!): AuthPayload!\n  }\n\n  type Post {\n    id: ID!\n    title: String!\n    content: String!\n    createdAt: String!\n    published: Boolean!\n    user: User\n  }\n\n  input credentialsInput {\n    email: String!\n    password: String!\n  }\n\n  type User {\n    id: ID!\n    name: String!\n    email: String!\n    profile: Profile!\n    posts: [Post!]!\n  }\n\n  type Profile {\n    id: ID!\n    user: User!\n    bio: String!\n  }\n\n  type PostPayload {\n    userErrors: [UserError!]!\n    post: Post\n  }\n\n  type ProfilePayload {\n    profileErrors: [ProfileError!]!\n    profile: Profile\n  }\n\n  type UserError {\n    message: String!\n  }\n\n  type ProfileError {\n    message: String\n  }\n\n  type AuthPayload {\n    userErrors: [UserError!]!\n    token: String\n  }\n\n  type UserPayload {\n    userErrors: [UserError!]!\n    user: User!\n  }\n\n  input SignInPayload {\n    # userErrors: [UserError!]!\n    token: String!\n    # user: User!\n  }\n\n  input PostInput {\n    title: String\n    content: String\n  }\n"], ["\n  type Query {\n    health: String\n    posts: [Post]\n    me: UserPayload!\n    profile(userId: ID!): ProfilePayload\n  }\n\n  type Mutation {\n    postCreate(post: PostInput): PostPayload!\n    postUpdate(postId: ID!, post: PostInput): PostPayload!\n    postDelete(postId: ID!): PostPayload!\n    postPublish(postId: ID!, publish: Boolean!): PostPayload!\n    signup(\n      credentials: credentialsInput!\n      name: String!\n      bio: String!\n    ): AuthPayload!\n    signIn(credentials: credentialsInput!): AuthPayload!\n  }\n\n  type Post {\n    id: ID!\n    title: String!\n    content: String!\n    createdAt: String!\n    published: Boolean!\n    user: User\n  }\n\n  input credentialsInput {\n    email: String!\n    password: String!\n  }\n\n  type User {\n    id: ID!\n    name: String!\n    email: String!\n    profile: Profile!\n    posts: [Post!]!\n  }\n\n  type Profile {\n    id: ID!\n    user: User!\n    bio: String!\n  }\n\n  type PostPayload {\n    userErrors: [UserError!]!\n    post: Post\n  }\n\n  type ProfilePayload {\n    profileErrors: [ProfileError!]!\n    profile: Profile\n  }\n\n  type UserError {\n    message: String!\n  }\n\n  type ProfileError {\n    message: String\n  }\n\n  type AuthPayload {\n    userErrors: [UserError!]!\n    token: String\n  }\n\n  type UserPayload {\n    userErrors: [UserError!]!\n    user: User!\n  }\n\n  input SignInPayload {\n    # userErrors: [UserError!]!\n    token: String!\n    # user: User!\n  }\n\n  input PostInput {\n    title: String\n    content: String\n  }\n"])));
var templateObject_1;
