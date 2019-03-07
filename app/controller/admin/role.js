/*
 * 用户角色
 * @Author: Miracle
 */

const { Controller } = require('egg');

class UserController extends Controller {
    async index() {
        const { ctx } = this;
        const result = await ctx.service.role.find();
        ctx.body = {
            message: '获取成功',
            data: result,
        };
    }

    async create() {
        const { ctx } = this;
        const result = await ctx.service.role.create();
        ctx.body = {
            message: '创建成功',
            data: result,
        };
        ctx.status = 201;
    }

    async update() {
        const { ctx } = this;
        const result = await ctx.service.role.edit();
        ctx.body = {
            message: '更新成功',
            data: result,
        };
    }

    async destroy() {
        const { ctx } = this;
        await ctx.service.role.delete();
        ctx.status = 204;
    }
}

module.exports = UserController;
