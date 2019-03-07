/*
 * json格式相应统一设置
 * @Author: Miracle
 */

module.exports = () => {
    return async function jsonRes(ctx, next) {
        await next();
        ctx.set('Content-Type', 'application/json');
    };
};
