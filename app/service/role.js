/*
 * 用户角色
 * @Author: Miracle
 */

const { Service } = require('egg');
const md5 = require('md5');

class MemberService extends Service {

    async find() {
        const { ctx } = this;
        return await ctx.model.Role.find();
    }

    async create() {
        const { ctx } = this;
        const req = ctx.request.body;
        const role = new ctx.model.Role(req);
        return await role.save();
    }

    async edit() {
        const { ctx } = this;
        const { id } = ctx.params;
        const req = ctx.request.body;
        return await ctx.model.Role.findByIdAndUpdate(id, req, { new: true });
    }

    async delete() {
        const { ctx } = this;
        const { id } = ctx.params;
        console.log(id);
        return await ctx.model.Role.findByIdAndDelete(id);
    }
}

module.exports = MemberService;
