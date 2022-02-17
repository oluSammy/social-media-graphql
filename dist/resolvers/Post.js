"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = void 0;
var userLoader_1 = require("../loaders/userLoader");
// interface IPostParentType {
//   id: number;
//   bio: string;
//   userId: number;
// }
exports.Post = {
    user: function (parent, __, _a) {
        var prisma = _a.prisma;
        return userLoader_1.userLoader.load(parent.authorId);
        // return prisma.user.findUnique({
        //   where: {
        //     id: parent.authorId,
        //   },
        // });
    },
};
