/*
 * 会员表
 * @Author: Miracle
 */

module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;

    const MemberSchema = new Schema({
        username: { type: String, maxlength: [ 10, '长度不能超过10' ], minlength: [ 3, '长度不能小于3' ] },
        mobile: { type: String, unique: true, match: [ /^1\d{10}$/, '手机号码格式不对' ] },
        email: { type: String, match: [ /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/, '邮箱格式不对' ] },
        password: { type: String },
        avatar: { type: String },
        sex: { type: String, enum: { values: [ 'boy', 'girl', 'unknown' ], message: '值必须取body, girl, unknown其中一个' } },
    });

    return mongoose.model('Member', MemberSchema, 'member');
};
