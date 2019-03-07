/*
 * 会员相关
 * @Author: Miracle
 */

const { Service } = require('egg');
const md5 = require('md5');

class MemberService extends Service {
    /**
     * 判断电话号码是否存在
     * @return {Promise<void>}
     */
    async exist() {
        const { ctx } = this;
        const { mobile } = ctx.query;
        console.log(typeof mobile, mobile);
        if (!mobile || !/^1\d{10}$/.test(mobile)) {
            ctx.set('Content-Type', 'application/json');
            ctx.throw(401, '参数有误');
        }
        return await ctx.model.Member.findOne({ mobile });
    }

    /**
     * 发送验证码
     * @returns {Promise<*>}
     */
    async sendsms() {
        const { ctx } = this;
        const { captcha } = ctx.request.body;
        const captchaText = ctx.session.captcha;
        if (captcha.toLowerCase() !== captchaText.toLowerCase()) {
            ctx.set('Content-Type', 'application/json');
            ctx.throw(401, '图片验证码错误');
        }
        const random = Math.floor(Math.random() * 9000) + 1000;
        ctx.session.sms = random;
        return random;
    }

    /**
     * 创建会员
     * @return {Promise<void>}
     */
    async create() {
        const { ctx } = this;
        const { mobile, password, sms } = ctx.request.body;
        if (sms !== ctx.session.sms) {
            ctx.set('Content-Type', 'application/json');
            ctx.throw(401, '短信验证码错误');
        }

        const newPassword = md5(password);
        const member = new ctx.model.Member({
            mobile, password: newPassword,
        });
        return await member.save();
    }

    /**
     * 登录
     * @returns {Promise<void>}
     */
    async loginByPassword() {
        const { ctx } = this;
        const { username, password } = ctx.request.body;
        // 目前是明文传过来的， 数据库存储的是加密后的， 所以需要加密后再进行查找
        const newPassword = md5(password);
        return await ctx.model.Member.findOne({ username, password: newPassword });
    }
}

module.exports = MemberService;
