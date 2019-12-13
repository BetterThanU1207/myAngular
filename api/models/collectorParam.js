var mssql = require('./mssql');
var seq = require('sequelize');

var Model = mssql.defineModel('deviceParams', {
    deviceID: seq.TEXT,
    upTime: seq.TEXT,
    IP: seq.TEXT,
    loraXindao: seq.TEXT,
    loraSulv: seq.TEXT,
    loraGonglv: seq.TEXT,
    GPRS: seq.TEXT,
    cjqBanben: seq.TEXT,
    cjqTime: seq.TEXT,
    meterNum: seq.TEXT,
    zjNum: seq.TEXT
})
Model.sync();
//导出模型对象
module.exports = Model;