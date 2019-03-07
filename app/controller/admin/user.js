/*
 * 管理用户
 * @Author: Miracle
 */

const { Controller } = require('egg');

class UserController extends Controller {
    async index() { // GET / user
        const { ctx } = this;
        const result = await ctx.service.admin.find();
        ctx.body = {
            status: 'ok',
            message: '获取成功',
            data: result,
        };
    }

    async show() {
        const { ctx } = this;
        const result = await ctx.service.admin.findSignle();
        ctx.body = {
            message: '查询成功',
            data: result,
        };
    }

    async create() {
        const { ctx } = this;
        const result = await ctx.service.admin.create();
        if (result.status === 'ok') {
            ctx.body = result;
            ctx.status = 201;
        } else {
            ctx.body = result;
            ctx.status = 422;
        }
    }

    async update() {
        const { ctx } = this;
        const result = await ctx.service.admin.edit();
        console.log(result);
        ctx.body = {
            message: '更新成功',
            data: result,
        };
    }

    async destroy() {
        const { ctx } = this;
        const result = await ctx.service.admin.delete();
        ctx.body = {
            message: '删除成功',
            data: result,
        };
        ctx.status = 204;
    }
}

module.exports = UserController;
