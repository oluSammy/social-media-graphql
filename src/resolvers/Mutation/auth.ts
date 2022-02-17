import { Post, prisma } from "@prisma/client";
import { IContext } from "../..";
import validator from "validator";
import bycrypt from "bcryptjs";
import jwt from "jsonwebtoken";

interface ISignup {
  credentials: {
    email: string;
    password: string;
  };
  bio: string;
  name: string;
}

interface IUserPayloadType {
  userErrors: { message: string }[];
  token: string | null;
}

export const authResolvers = {
  signup: async (
    __: any,
    { credentials: { email, password }, name, bio }: ISignup,
    { prisma }: IContext
  ): Promise<IUserPayloadType> => {
    const isEmail = validator.isEmail(email);

    if (!isEmail) {
      return {
        userErrors: [{ message: "invalid email" }],
        token: null,
      };
    }

    const isValidPassword = validator.isLength(password, {
      min: 5,
    });

    if (!isValidPassword) {
      return {
        userErrors: [{ message: "invalid password" }],
        token: null,
      };
    }

    if (!name || !bio) {
      return {
        userErrors: [{ message: "name or bio is missing" }],
        token: null,
      };
    }

    const hashedPassword = await bycrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
      },
    });

    const token = jwt.sign(
      {
        userId: user.id,
      },
      process.env.JWT_SIGNATURE as string,
      {
        expiresIn: 3600000,
      }
    );

    const profile = await prisma.profile.create({
      data: {
        bio,
        userId: user.id,
      },
    });

    console.log(profile);

    return {
      userErrors: [],
      token,
    };
  },

  signIn: async (
    __: any,
    { credentials: { email, password } }: ISignup,
    { prisma }: IContext
  ): Promise<IUserPayloadType> => {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      return {
        userErrors: [{ message: "user does not exist" }],
        token: null,
      };
    }

    const isMatch = await bycrypt.compare(password, user.password);

    if (!isMatch) {
      return {
        userErrors: [{ message: "Invalid Credentials" }],
        token: null,
      };
    }

    const token = jwt.sign(
      {
        userId: user.id,
      },
      process.env.JWT_SIGNATURE as string,
      {
        expiresIn: 3600000,
      }
    );

    return {
      userErrors: [],
      token,
    };
  },
};
