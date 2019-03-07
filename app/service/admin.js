/*
 * 管理用户相关
 * @Author: Miracle
 */

const { Service } = require('egg');
const md5 = require('md5');

class AdminService extends Service {
    async find() {
        const { ctx } = this;
        const result = await ctx.model.Admin.find({}, { password: 0, __v: 0 }).populate('role', 'description').sort({ _id: '-1' });
        return result;
    }

    async findSignle() {
        const { ctx } = this;
        const { id } = ctx.params;
        return await ctx.model.Admin.findById(id);
    }

    async create() {
        const { ctx } = this;
        const req = ctx.request.body;
        const newPassword = md5(req.password);
        const data = Object.assign({}, req, { password: newPassword });
        const admin = new ctx.model.Admin(data);
        const error = admin.validateSync();
        if (error) {
            return {
                status: 'error',
                message: '参数错误',
                error,
            };
        }
        const docs = await admin.save();
        const role = await ctx.model.Role.findById(docs.role);
        const result = Object.assign({}, docs._doc, { role });
        return {
            status: 'ok',
            message: '创建成功',
            data: result,
        };
    }

    async edit() {
        const { ctx } = this;
        const { id } = ctx.params;
        const req = ctx.request.body;
        const { password } = req;
        if (password !== 'tescoDefaultPassword') { // 表示用户改了密码,需加密后再存入数据库
            const newPassword = md5(password);
            Object.assign(req, { password: newPassword });
        } else {
            delete req.password; // 删除password属性
        }
        return await ctx.model.Admin.findByIdAndUpdate(id, req, { new: true }).populate('role', 'description');
    }

    async delete() {
        const { ctx } = this;
        const { id } = ctx.params;
        const result = await ctx.model.Admin.findByIdAndDelete(id);
        console.log(result);
        return result;
    }
}

module.exports = AdminService;
