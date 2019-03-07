/*
 * register
 * @Author: Miracle
 */

const { Controller } = require('egg');


class RegisterController extends Controller {
    async index() {
        const { ctx } = this;
        await ctx.render('/register');
    }

    async exist() {
        const { ctx } = this;
        const data = await ctx.service.member.exist();
        if (!data) {
            ctx.body = {
                message: '用户可以注册',
                data: true,
            };
        } else {
            ctx.body = {
                message: '该号码已注册',
                data: false,
            };
        }
    }

    async sendsms() {
        const { ctx } = this;
        const result = await ctx.service.member.sendsms();
        if (typeof result === 'number') {
            ctx.body = {
                message: '发送成功',
                data: result,
            };
        }
    }

    async register() {
        const { ctx } = this;
        const result = await ctx.service.member.create();
        ctx.body = {
            message: '创建成功',
            data: result.mobile,
        };
        ctx.status = 201;
    }

}

module.exports = RegisterController;
