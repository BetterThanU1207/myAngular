var mssql = require('./mssql');
var seq = require('sequelize');

var Model = mssql.defineModel('deviceData', {
    collectorID: seq.TEXT,
    deviceID: seq.TEXT,
    totalFlow: seq.TEXT,
    time: seq.TEXT    
})
Model.sync();
//导出模型对象
module.exports = Model;