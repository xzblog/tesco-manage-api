/*
 * pc端路由
 * @Author: Miracle
 */

module.exports = app => {
    const { router, controller, middleware } = app;
    const authSingle = middleware.authSingle();

    router.get('/', controller.web.home.index);
    router.get('/my', authSingle, controller.web.personal.index);
    router.get('/login', controller.web.login.index);
    router.post('/loginbypassword', controller.web.login.loginByPassword);
    router.get('/register', controller.web.register.index);
    router.get('/captcha', controller.web.common.captcha);
    router.get('/exist', controller.web.register.exist);
    router.post('/sendsms', controller.web.register.sendsms);
    router.post('/register', controller.web.register.register);
};
