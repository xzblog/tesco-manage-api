/*
 * login
 * @Author: Miracle
 */

const { Controller } = require('egg');


class LoginController extends Controller {
    async index() {
        const { ctx } = this;
        await ctx.render('/login');
    }

    async loginByPassword() {
        const { ctx } = this;
        const { remember } = ctx.request.body;
        let maxAge = null;
        const user = await ctx.service.user.exist();
        if (user) {
            if (remember) {
                maxAge = 1000 * 3600 * 24 * 7;
            }
            ctx.cookies.set('userinfo', user._id, { maxAge, encrypt: true });
            ctx.redirect('/my');
        }
    }
}

module.exports = LoginController;
