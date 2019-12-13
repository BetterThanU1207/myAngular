let config = {
    host: '127.0.0.1',
    port: 1207,
    user: 'sa',
    password: '12070413',
    database: 'CMS',
    dialect: 'mssql',
    pool: {
        max: 5,
        min: 0,
        idle: 100000 //10秒后不操作自动释放线程
    }
}
module.exports = config;