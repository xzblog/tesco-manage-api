/*
 * 公用的
 * @Author: Miracle
 */

const { Controller } = require('egg');

class CommonController extends Controller {
    async captcha() {
        const { ctx } = this;
        const captcha = await ctx.service.util.captcha();
        ctx.response.type = 'image/svg+xml';
        ctx.body = captcha.data;
    }
}

module.exports = CommonController;
