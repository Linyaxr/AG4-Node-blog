const express = require('express');
const user = require('../model/user');
const posts = require('../model/posts');
const comment = require('../model/comment');
const folder = require('../model/folder');
const releArticle = require('../model/article');
const router = express.Router();

/* GET api listing. */
router.get('/index', (req, res) => {
    res.status(200).send({
        name: req.session.LINNAME
    })
});

/**
  * 登录&注册&登出
  * 状态码：
  * 1：成功
  * 2：错误
  * 3：管理员
*/
router.post('/login', (req, res) => {
    user.userLogin(req.body).then(data => {
        if (data.length == 0) {
            res.status(200).send({
                status: 2,
                message: "用户名或密码不存在"
            });
        } else {
            req.session.LINID = data[0]._id;
            req.session.LINNAME = data[0].name;

            if (data[0].name == "林涯") {
                res.status(200).send({
                    status: 3,
                    auth: 1,
                    message: "欢迎你管理员"
                })
            } else {
                res.status(200).send({
                    status: 1,
                    message: "登录成功"
                })
            }

        }
    })
})
/*
  * 注册
  * 1：已经注册过了（不允许重复注册）
  * 2：注册成功
  * 3；注册失败
*/
router.post('/regist', (req, res) => {
    if (req.session.REGISTATE == 1) {
        res.status(200).send({
            status: 1
        })
    } else {
        user.createUser(req.body).then(data => {
            if (data.result.ok == 1) {
                req.session.LINID = data.ops[0]._id;
                req.session.LINNAME = data.ops[0].name;
                req.session.REGISTATE = 1;
                res.status(200).send({
                    status: 2,
                    message: "注册成功",
                })
            } else {
                res.status(200).send({
                    status: 3,
                    message: "用户名不能重复&只能是中文"
                })
            }
        }).catch(err => { console.log(err); })
    }
   
})

router.get('/logOut', (req, res) => {
    req.session.LINID = null;
    req.session.LINNAME = null;
    res.status(200).send({ status: 1 });
})
/**
  * 获取文章 & 创建文章 & 保存文章 & 发布文章
*/

//获取文章列表
router.get('/article', (req, res) => {
    releArticle.getArticle().then(function (data) {
        res.status(200).send(data);
    });
});
// 发布文章
router.post('/releArticle', (req, res) => {
    releArticle.releArticle(req.body).then(function (data) {
        //console.log(data);
    })
});
//根据草稿箱id验证发布文章是否已经存在
router.post('/findArticle', (req, res) => {
    var session = req.session;
    releArticle.getArticle(req.body).then(function (data) {
        if (data.length == 0) {
            res.status(200).send({
                status: 1
            })
        } else {
            res.status(200).send({
                status: 2,
                data: data,
                LINID:session.LINID,
                LINNAME: session.LINNAME,
            })
        }
    })
})
/*
  * 创建文章
  * 2:创建失败
*/
router.post('/addArticle', (req, res) => {
    posts.create(req.body).then(function (data) {
        console.log(data);
        if (data.result.ok == 1) {
            res.status(200).send(data);
        } else {
            res.status(200).send({
                statu: 2
            })
        }
    })
})
/*
  * 保存文章
*/
router.post('/updatePost', (req, res) => {
    posts.updatePostById(req.body._id, req.body.data).then(function (data) {
        console.log(data);
    })
})


/*
  * 更新文章
*/
router.post('/updateArticle', (req, res) => {
    releArticle.updateArticle(req.body.id, req.body.data).then(data => {
        console.log(data);
    })
})

//获取点赞最多的文章（10篇）
router.get('/excellentArt', (req, res) => {
    releArticle.excellentArt().then(data => {
        res.status(200).send(data);
    })
})

/*
  * 点赞
  * 2：未注册、登录
  * 1：点赞过了
  * 3：点赞成功
*/
router.post('/dzArticle', (req, res) => {
    if (req.session.LINID == null) {
        res.status(200).send({
            status: 2
        })
    } else {
        if (req.session.DZSTATE == 1) {
            res.status(200).send({
                status: 1
            })
        } else {
            releArticle.dzArticle(req.body.id).then(data => {
                req.session.DZSTATE = 1;
                res.status(200).send({
                    status:3
                })
            })
        }
    }
})



//排序第一的文集
router.get('/getFileOne', (req, res) => {
    folder.getOneFile().then(data => {
        console.log(data);
        if (data == null) {
            res.status(200).send({
                status: 2
            })
        } else {
            res.status(200).send(data);
        }

    })
})
/*
  * 添加文件夹
  * 1：成功
  * 2：失败（文件名唯一）
*/
router.post('/addFolder', (req, res) => {
    folder.createFolder(req.body).then(data => {
        if (data.result.ok == 1) {
            res.status(200).send({
                status: 1,
                data: data
            })
        } else {
            res.status(200).send({
                status: 2
            })
        }
    })
});
//获取文件夹
router.get('/findFolder', (req, res) => {
    folder.getFolder().then(data => {
        res.status(200).send(data);
    });
});
//更新folder集合的folders字段
router.post('/uploadFolder', (req, res) => {
    folder.updataFolder(req.body._id, req.body.folders).then(data => {
        if (data.result.ok == 1) {
            res.status(200).send({
                status: 1    //更新成功
            })
        }
    })
})
/*
  * 通过文集id获取文件
  * 1:获取成功
  * 2:获取失败（内容为空）
*/
router.post('/getFile', (req, res) => {
    console.log(req.body);
    folder.getFile(req.body._id).then(data => {
        console.log(data);
        if (data.length == 0) {
            res.status(200).send({
                status: 2
            })
        } else {
            res.status(200).send({
                status: 1,
                data: data
            })
        }
    })
})
//通过id获取文章
router.post('/getArticle', (req, res) => {
    console.log(req.body._id);
    posts.getPostById(req.body._id).then(data => {
        res.status(200).send(data);
    })
})

/*
  * 创建留言&留言数目&获取所有留言
*/
router.post('/createComment', (req, res) => {
    var localTime = new Date().toLocaleString();
    req.body.createTime = localTime;
    comment.create(req.body).then(data => {
        res.status(200).send(data);
    })
})
router.post('/countComment', (req, res) => {
    comment.getCommentsCount(req.body.id).then(data => {
        res.status(200).send(data);
    })
});
router.post('/findComment', (req, res) => {
    comment.getComments(req.body.id).then(data => {
        res.status(200).send(data);
    })
})


module.exports = router;
