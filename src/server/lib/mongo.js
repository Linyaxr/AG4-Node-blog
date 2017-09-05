var Mongolass = require('mongolass');
var mongolass = new Mongolass();
mongolass.connect("mongodb://127.0.0.1:27017/blogs");

var moment = require('moment');
var objectIdToTimestamp = require('objectid-to-timestamp');

// 根据 id 生成创建时间 created_at
mongolass.plugin('addCreatedAt', {
    afterFind: function (results) {
        console.log("6666");
        results.forEach(function (item) {
            item.created_at = moment(objectIdToTimestamp(item._id)).format('YYYY-MM-DD HH:mm');
        });
        return results;
    },
    afterFindOne: function (result) {
        console.log(results);
        if (result) {
            result.created_at = moment(objectIdToTimestamp(result._id)).format('YYYY-MM-DD HH:mm');
        } else {
            console.log("错误");
        }
        return result;
    }
});
exports.Article = mongolass.model('Article', {
    author: { type: 'string' },
    title: { type: 'string' },
    content: { type: 'string' },
    describe: { type: 'string' },
    reloadId: { type: 'string' },
    zs: {type:Number},
    dz: { type: Number },
    pl: { type: Number }
});
exports.Article.index({ created_at: 1 }).exec();// 根据用户名找到用户，用户名全局唯一

exports.User = mongolass.model('User', {
    name: { type: 'string' },
    password: { type: 'string' },
});
exports.User.index({ name: 1 }, { unique: true }).exec();// 根据用户名找到用户，用户名全局唯一

exports.Folder = mongolass.model('Folder', {
    name: { type: 'string' },
    folders: { type: Array }
})
exports.Folder.index({ name: 1 }, { unique: true }).exec();// 根据用户名找到用户，用户名全局唯一


exports.Post = mongolass.model('Post', {
    author: { type: 'string' },
    title: { type: 'string' },
    content: { type: 'string' },
    describe: { type: 'string' },
    zs: {type:Number},
    pv: { type: Number, default: 0 },
    pl: { type: Number, default: 0 }
});
exports.Post.index({ author: 1, _id: -1 }).exec();// 按创建时间降序查看用户的文章列表

exports.Comment = mongolass.model('Comment', {
    author: { type:'string' },
    name: { type: 'string' },
    createTime: {type:'string'},
    content: { type: 'string' },
    postId: { type: 'string' }
});
exports.Comment.index({ postId: 1, _id: 1 }).exec();// 通过文章 id 获取该文章下所有留言，按留言创建时间升序
exports.Comment.index({ author: 1, _id: 1 }).exec();// 通过用户 id 和留言 id 删除一个留言
