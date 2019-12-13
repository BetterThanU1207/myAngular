var express = require('express');
var loginUser = require('../models/loginUsers');
const jsonwebtoken = require('jsonwebtoken')
var router = express.Router();
// 应该是私密的，秘钥
const SECRET = 'asdfghjklmnbvcxz'
// 登录
router.post('/login', async (req, res) => {
    console.log("logining....");
    loginUser.findOne({
        where: {
            'username': req.body.name,
            // 'password': req.body.password,
            'status': 1
        }
    }).then(result => {
        if (result === null) {
            return res.status(422).send({
                message: '用户名不存在'
            })
        } else {
            // 再看密码是否正确
            // const isPasswordValid = require('bcrypt').compareSync(
            //     req.body.password,
            //     result.password
            // )
            console.log(req.body.password);
            // console.log(result.password);
            // console.log(isPasswordValid);
            if (req.body.password !== result.password) {
                return res.status(422).send({
                    message: '密码错误'
                })
            }
            console.log("result:", JSON.stringify(result, null, 4));

            // 生成 token 返回给客户端
            const token = jsonwebtoken.sign({
                user: {
                    id: String(result.id),
                    role: String(result.roleLevel)
                },
                // 设置 token 过期时间
                exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24), // 1天
            }, SECRET);
            console.log(token);
            res.send({
                token
            })
        }
    });
});
// 获取所有用户名
router.get('/all', function (req, res) {
    loginUser.findAll({
        where: {
            // 'status': 1
        }
    }).then(users => {
        console.log("All users:", JSON.stringify(users, null, 4));
        res.send(users);
    });
});
// 添加用户
router.post('/add', function (req, res) {
    // console.log(req.body.name);
    // console.log(req.body.password);
    loginUser.create({
            username: req.body.name,
            password: req.body.password,
            roleLevel: req.body.role,
            createdAt: Date.now(),
            updatedAt: Date.now(),
            version: 0,
            status: 1
        }).then(ok => res.json({
            status: 'ok'
        }))
        .catch(e => res.json({
            status: 'error',
            message: e
        })); //异常捕获
});
// 停用用户
router.post('/close', function (req, res) {
    loginUser.update({
            status: 0 //修改的字段对应的内容
        }, {
            where: {
                'username': req.body.name
                // 'password': req.body.password
            }
        }) //username role password对应相应的字段名
        .then(ok => res.json({
            status: 'ok'
        }))
        .catch(e => res.json({
            status: 'error',
            message: e
        })); //异常捕获
});
// 停用用户
router.post('/open', function (req, res) {
    loginUser.update({
            status: 1 //修改的字段对应的内容
        }, {
            where: {
                'username': req.body.name
                // 'password': req.body.password
            }
        }) //username role password对应相应的字段名
        .then(ok => res.json({
            status: 'ok'
        }))
        .catch(e => res.json({
            status: 'error',
            message: e
        })); //异常捕获
});
// 修改密码
router.post('/update', function (req, res) {
    loginUser.update({
            password: req.body.password //修改的字段对应的内容
        }, {
            where: {
                username: req.body.name //查询条件
            }
        })
        .then(ok => res.json({
            status: 'ok'
        }))
        .catch(e => res.json({
            status: 'error',
            message: e
        }));
});

module.exports = router;