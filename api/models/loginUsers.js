var mssql = require('./mssql');
var seq = require('sequelize');

var Model = mssql.defineModel('loginUser', {
    username: seq.TEXT,
    password: seq.TEXT,
    roleLevel: seq.BIGINT,
    status: seq.BIGINT
})
Model.sync();
//导出模型对象
module.exports = Model;