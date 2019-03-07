/*
 * 广告
 * @Author: Miracle
 */

const { Controller } = require('egg');

class AdvertsController extends Controller {
    async index() {
        const { ctx } = this;
        const result = await ctx.service.adverts.find();
        ctx.body = {
            status: 'ok',
            message: '获取成功',
            data: result,
        };
    }

    async create() {
        const { ctx } = this;
        const result = await ctx.service.adverts.create();
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
        const result = await ctx.service.adverts.edit();
        console.log(result);
        ctx.body = {
            message: '更新成功',
            data: result,
        };
    }

    async destroy() {
        const { ctx } = this;
        const result = await ctx.service.adverts.delete();
        ctx.body = {
            message: '删除成功',
            data: result,
        };
        ctx.status = 204;
    }
}

module.exports = AdvertsController;
