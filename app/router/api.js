/*
 * 移动端路由
 * @Author: Miracle
 */

module.exports = app => {
    const { router, controller } = app;

    router.get('/api', controller.web.home.index);
};
