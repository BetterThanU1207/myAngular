const Sequelize = require('sequelize');
const config = require('../config/db');
// new Sequelize(database, [username=null], [password=null], [options={}])
// class Sequelize 接收 4 个参数，后三个参数是可选的
const sequelize = new Sequelize(
    config.database,
    config.user,
    config.password, {
        host: config.host,
        port: config.port,
        dialect: config.dialect,
        pool: config.pool
    }
);

sequelize.authenticate() // 连接测试
    .then(() => {
        console.log("mssql is success");
    })
    .catch(err => {
        console.log(err);
    });

/**
 * 定义数据模型
 * 
 * @param {any} name 模型名称【数据库表名】
 * @param {any} attributes 数据字段集合
 * @returns 数据模型对象
 */

function defineModel(name, attributes) {
    var attrs = {};

    for (let key in attributes) {
        let value = attributes[key];
        if (typeof value === 'object' && value['type']) {
            value.allowNull = value.allowNull || false;
            attrs[key] = value;
        } else {
            attrs[key] = {
                type: value,
                allowNull: false
            };
        }
    }
    //附加公共字段
    // sequelize默认会为模型添加id字段， 自增， 主键。
    // attrs.id = {
    //     type: ID_TYPE,
    //     primaryKey: true
    // };
    // attrs.createAt = {
    //     type: Sequelize.BIGINT,
    //     allowNull: false
    // };
    // attrs.updateAt = {
    //     type: Sequelize.BIGINT,
    //     allowNull: false
    // };
    // attrs.version = {
    //     type: Sequelize.BIGINT,
    //     allowNull: false
    // };
    // // 状态：0表示有效，1表示无效，2表示已删除，默认为0.
    // attrs.status = {
    //     type: Sequelize.INTEGER,
    //     allowNull: false
    // };
    //调用seq方法定义模型并返回
    return sequelize.define(name, attrs, {
        tablename: name,
        timestamps: false,
        hooks: {
            beforeValidate: function (obj) {
                let now = Date.now();
                if (obj.isNewRecord) {
                    obj.createAt = now;
                    obj.updateAt = now;
                    obj.version = 0;
                } else {
                    obj.updateAt = now;
                    ++obj.version;
                }
            }
        }
    });
}
module.exports.defineModel = defineModel;