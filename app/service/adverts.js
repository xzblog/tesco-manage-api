/*
 * 广告相关
 * @Author: Miracle
 */

const { Service } = require('egg');

class AdvertsService extends Service {
    async find() {
        const { ctx } = this;
        const docs = await ctx.model.Adverts.find().sort({ _id: '-1' });
        return docs;
    }

    async create() {
        const { ctx } = this;
        const req = ctx.request.body;
        const adverts = new ctx.model.Adverts(req);
        const error = adverts.validateSync();
        if (error) {
            return {
                status: 'error',
                message: '参数错误',
                error,
            };
        }
        const docs = await adverts.save();
        return {
            status: 'ok',
            message: '创建成功',
            data: docs,
        };
    }

    async edit() {
        const { ctx } = this;
        const { id } = ctx.params;
        const req = ctx.request.body;
        return await ctx.model.Adverts.findByIdAndUpdate(id, req, { new: true });
    }

    async delete() {
        const { ctx } = this;
        const { id } = ctx.params;
        console.log(id);
        const result = await ctx.model.Adverts.findByIdAndDelete(id);
        return result;
    }
}

module.exports = AdvertsService;
