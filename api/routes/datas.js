var express = require('express');
var loraData = require('../models/loraData');
var collectorParam = require('../models/collectorParam');

var router = express.Router();
// 获取所有lora水表数据
router.get('/lora', function (req, res) {
    console.log("Loradata");
    loraData
    .findAll()
    .then(loras => {
        res.send(loras);
    });
});
// 获取所有集抄器参数数据
router.get('/param', function (req, res) {
    console.log("CollectorParam");
    collectorParam
        .findAll()
        .then(params => {
            res.send(params);
        });
});

module.exports = router;