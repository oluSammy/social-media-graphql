import { IContext } from "..";
import { Profile, User } from "@prisma/client";

interface IUserPayload {
  userErrors: { message: string }[];
  user: User | null;
}

interface IProfilePayload {
  profileErrors: { message: string }[];
  profile: Profile | null;
}

export const Query = {
  health: () => "OK",
  posts: async (_: any, __: any, { prisma }: IContext) => {
    const posts = await prisma.post.findMany({
      orderBy: [
        {
          createdAt: "desc",
        },
      ],
    });

    return posts;
  },
  me: async (
    __: any,
    _: any,
    { prisma, userInfo }: IContext
  ): Promise<IUserPayload> => {
    if (!userInfo) {
      return {
        userErrors: [{ message: "user does not exist" }],
        user: null,
      };
    }

    const user = await prisma.user.findUnique({
      where: {
        id: userInfo?.userId,
      },
    });

    console.log("HERE@!!!", user);

    if (!user) {
      return {
        userErrors: [{ message: "user no longer exist" }],
        user: null,
      };
    }

    return {
      userErrors: [],
      user,
    };
  },

  profile: async (
    _: any,
    { userId }: { userId: number },
    { prisma }: IContext
  ): Promise<IProfilePayload> => {
    const profile = await prisma.profile.findUnique({
      where: {
        userId: +userId,
      },
    });

    if (!profile) {
      return {
        profileErrors: [{ message: "profile does not exist" }],
        profile: null,
      };
    }

    return {
      profileErrors: [],
      profile,
    };
  },
};
