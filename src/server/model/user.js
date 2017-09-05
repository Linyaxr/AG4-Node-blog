var User = require('../lib/mongo').User;

module.exports = {

    //创建用户
    createUser: function (user) {
        return User
            .create(user)
            .addCreatedAt()
            .exec();
    },
    //登录
    userLogin: function (user) {
        return User
            .find({ name: user.name, password: user.password })
            .exec();
    },

    // 通过用户名获取用户信息
    getUserByName: function getUserByName(name) {
        return User
            .findOne({ name: name })
            .addCreatedAt()
            .exec();
    }

}

