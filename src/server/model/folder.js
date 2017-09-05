var Folder = require('../lib/mongo').Folder;

module.exports = {

    //默认获取排序第一的文集
    getOneFile: function () {
        return Folder
            .findOne()
            .exec();
    },
    //创建文集
    createFolder: function (folder) {
        return Folder
            .create(folder)
            .addCreatedAt()
            .exec();
    },
    //更新文集
    updataFolder: function (id, folder) {
        return Folder
            .update({'_id':id}, { $push: { 'folders': folder } })
            .addCreatedAt()
            .exec();
    },

    // 获取所有文集
    getFolder: function () {
        return Folder
            .find()
            .addCreatedAt()
            .exec();
    },

    //通过文集名获取内部文章
    getFile: function (ids) {
        console.log(ids);
        return Folder
            .find({ _id: ids })
            .exec();
    }


}

