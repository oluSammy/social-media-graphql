import { IContext } from "..";
import { User as IUserParent, Post } from "@prisma/client";

// interface IPostParentType {
//   id: number;
//   bio: string;
//   userId: number;
// }

export const User = {
  posts: (parent: IUserParent, __: any, { prisma }: IContext) => {
    return prisma.post.findMany({
      where: {
        authorId: +parent.id,
      },
    });
  },
};
