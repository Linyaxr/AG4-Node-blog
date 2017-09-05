var Article = require('../lib/mongo').Article;

module.exports = {

    releArticle: function (post) {
        return Article
            .create(post)
            .addCreatedAt()
            .exec();
    },
    getArticle: function (id) {
        return Article
            .find(id)
            .exec();
    },
    updateArticle: function (id,posts) {
        return Article
            .update({ reloadId:id}, { $set: posts })
            .addCreatedAt()
            .exec();
    },
    dzArticle: function (id) {
        return Article
            .update({ _id: id }, { $inc: { dz: 1 } })
            .exec();
    },
    excellentArt: function () {
        return Article
            .find()
            .sort({ dz: -1 }).limit(1)
            exec();
    }

}

