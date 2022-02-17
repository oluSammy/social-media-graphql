import { IContext } from "..";
// import { Profile, User } from "@prisma/client";

interface IProfileParentType {
  id: number;
  bio: string;
  userId: number;
}

export const Profile = {
  user: (parent: IProfileParentType, __: any, { prisma }: IContext) => {
    return prisma.user.findUnique({
      where: {
        id: parent.userId,
      },
    });
  },
};
