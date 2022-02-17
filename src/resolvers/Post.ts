import { IContext } from "..";
import { Post as IPostParent } from "@prisma/client";
import { userLoader } from "../loaders/userLoader";

// interface IPostParentType {
//   id: number;
//   bio: string;
//   userId: number;
// }

export const Post = {
  user: (parent: IPostParent, __: any, { prisma }: IContext) => {
    return userLoader.load(parent.authorId);
    // return prisma.user.findUnique({
    //   where: {
    //     id: parent.authorId,
    //   },
    // });
  },
};
