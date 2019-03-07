/*
 * 登录权限验证
 * @Author: Miracle
 */

module.exports = () => {
    return async function authSingle(ctx, next) {
        const user = ctx.cookies.get('userinfo', { encrypt: true });
        console.log(user, 'cookie');
        if (!user) { // 没登录
            ctx.redirect('/login');
            return;
        }
        await next();
    };
};
