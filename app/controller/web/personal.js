/*
 * 个人中心
 * @Author: Miracle
 */

const { Controller } = require('egg');

class PersonalController extends Controller {
    async index() {
        await this.ctx.render('/my');
    }
}

module.exports = PersonalController;
