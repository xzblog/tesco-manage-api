/*
 * 路由文件
 * @Author: Miracle
 */

module.exports = app => {
    require('./router/web')(app);
    require('./router/admin')(app);
    require('./router/api')(app);
};
