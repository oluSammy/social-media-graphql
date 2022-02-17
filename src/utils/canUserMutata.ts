import { IContext } from "..";
interface CanUserMutatePostParams {
  userId: number;
  postId: number;
  prisma: IContext["prisma"];
}

export const CanUserMutatePost = async ({
  userId,
  postId,
  prisma,
}: CanUserMutatePostParams) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    return {
      userErrors: [{ message: "user not found" }],
      post: null,
    };
  }

  const post = await prisma.post.findUnique({
    where: {
      id: postId,
    },
  });

  if (post?.authorId !== user.id) {
    return {
      userErrors: [{ message: "post not owned by user" }],
      post: null,
    };
  }
};
