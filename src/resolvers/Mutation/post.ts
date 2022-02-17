import { Post } from "@prisma/client";
import { IContext } from "../..";
import { CanUserMutatePost } from "../../utils/canUserMutata";

interface IPostCreate {
  post: {
    title: string;
    content: string;
  };
}

interface IPostPayloadType {
  userErrors: { message: string }[];
  post: Post | null;
}

interface IPostUpdate extends IPostCreate {
  postId: string;
}

interface IPostPublish {
  publish: boolean;
  postId: number;
}

export const postResolvers = {
  postCreate: async (
    _: any,
    { post: { title, content } }: IPostCreate,
    { prisma, userInfo }: IContext
  ): Promise<IPostPayloadType> => {
    if (!userInfo) {
      return {
        userErrors: [{ message: "forbidden access, unauthenticated" }],
        post: null,
      };
    }

    if (!title || !content) {
      return {
        userErrors: [
          {
            message: "title or content is missing",
          },
        ],
        post: null,
      };
    }

    return {
      userErrors: [],
      post: await prisma.post.create({
        data: {
          title,
          content,
          authorId: userInfo.userId,
        },
      }),
    };
  },

  postUpdate: async (
    _: any,
    { postId, post }: IPostUpdate,
    { prisma, userInfo }: IContext
  ) => {
    if (!postId || !post) {
      return {
        userErrors: [
          {
            message: "postId or post is missing",
          },
        ],
        post: null,
      };
    }

    if (userInfo) {
      const error = await CanUserMutatePost({
        userId: userInfo?.userId,
        postId: +postId,
        prisma,
      });

      if (error) {
        return error;
      }
    }

    const { content, title } = post;

    if (!content && !title) {
      console.log(title, "iatch!!");
      return {
        userErrors: [
          {
            message: "content or title required",
          },
        ],
        post: null,
      };
    }

    return {
      userErrors: [],
      post: await prisma.post.update({
        where: {
          id: +postId,
        },
        data: {
          ...post,
        },
      }),
    };
  },

  postDelete: async (
    _: any,
    { postId }: { postId: string },
    { prisma }: IContext
  ) => {
    const post = await prisma.post.delete({
      where: {
        id: +postId,
      },
    });

    return post;
  },

  postPublish: async (
    _: any,
    { postId, publish }: IPostPublish,
    { prisma, userInfo }: IContext
  ): Promise<IPostPayloadType> => {
    if (!postId) {
      return {
        userErrors: [
          {
            message: "postId or post is missing",
          },
        ],
        post: null,
      };
    }

    if (userInfo) {
      const error = await CanUserMutatePost({
        userId: userInfo?.userId,
        postId: +postId,
        prisma,
      });

      if (error) {
        return error;
      }
    }

    const newPost = await prisma.post.update({
      where: {
        id: +postId,
      },
      data: {
        published: publish,
      },
    });

    return {
      userErrors: [],
      post: newPost,
    };
  },
};
