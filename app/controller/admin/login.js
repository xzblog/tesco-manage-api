/*
 * 登录
 * @Author: Miracle
 */

const { Controller } = require('egg');
const md5 = require('md5');

class LoginController extends Controller {
    async index() {
        const { ctx } = this;
        console.log(ctx.request.body);
        const { username, password, type } = ctx.request.body;
        const newPassword = md5(password);
        await ctx.model.Admin.findOne({ username, password: newPassword }).populate('role')
            .then(docs => {
                if (docs) {
                    ctx.body = {
                        type,
                        status: 'ok',
                        message: '登录成功',
                        role: docs.role.name,
                    };
                } else {
                    ctx.body = {
                        type,
                        status: 'error',
                        message: '账号或密码错误',
                    };
                }
            })
            .catch(err => {
                ctx.set('Content-Type', 'application/json');
                ctx.throw(500, err);
            });
    }
}

module.exports = LoginController;
