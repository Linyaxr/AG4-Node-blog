var Comment = require('../lib/mongo').Comment;


module.exports = {
    // 创建一个留言
    create: function create(comment) {
        return Comment
            .create(comment)
            .addCreatedAt()
            .exec();
    },

    //// 通过用户 id 和留言 id 删除一个留言
    //delCommentById: function delCommentById(commentId, author) {
    //    return Comment.remove({ author: author, _id: commentId }).exec();
    //},

    //// 通过文章 id 删除该文章下所有留言
    //delCommentsByPostId: function delCommentsByPostId(postId) {
    //    return Comment.remove({ postId: postId }).exec();
    //},

    // 通过文章 id 获取该文章下所有留言，按留言创建时间升序
    getComments: function (postId) {
        return Comment
            .find({ postId: postId })
            .sort({ _id: -1 })
            .addCreatedAt()
            .exec();
    },

    // 通过文章 id 获取该文章下留言数
    getCommentsCount: function (postId) {
        return Comment
            .count({ postId: postId })
            .exec();
    }
};
