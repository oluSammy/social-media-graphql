"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
// interface IPostParentType {
//   id: number;
//   bio: string;
//   userId: number;
// }
exports.User = {
    posts: function (parent, __, _a) {
        var prisma = _a.prisma;
        return prisma.post.findMany({
            where: {
                authorId: +parent.id,
            },
        });
    },
};
