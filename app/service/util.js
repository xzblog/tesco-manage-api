/*
 * 工具集
 * @Author: Miracle
 */

const { Service } = require('egg');
const svgCaptcha = require('svg-captcha');


class UtilService extends Service {
    async captcha() {
        const { ctx } = this;
        const captcha = svgCaptcha.create({
            size: 4,
            fontSize: 50,
            width: 120, height: 40, background: '#b1c3f5',
        });
        ctx.session.captcha = captcha.text;
        console.log(captcha.text);
        return captcha;
    }
}

module.exports = UtilService;
