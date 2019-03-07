/*
 * 后台管理系统路由
 * @Author: Miracle
 */

module.exports = app => {
    const { router, controller } = app;
    router.post('/admin/login', controller.admin.login.index);
    router.post('/admin/upload', controller.admin.upload.create);
    router.resources('/admin/users', controller.admin.user);
    router.resources('/admin/roles', controller.admin.role);
    router.resources('/admin/adverts', controller.admin.adverts);
};
