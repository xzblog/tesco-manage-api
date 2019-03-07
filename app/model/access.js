/*
 * 管理员权限表
 * @Author: Miracle
 */

module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;
    const d = new Date();

    const AccessSchema = new Schema({
        module_name: { type: String, maxlength: [ 10, '长度不能超过10' ], minlength: [ 3, '长度不能小于3' ] },
        action_name: { type: String, unique: true, match: [ /^1\d{10}$/, '手机号码格式不对' ] },
        type: { type: String, match: [ /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/, '邮箱格式不对' ] },
        url: { type: String },
        status: { type: String },
        module_id: { type: Schema.Types.ObjectId },
        sort: { type: Number },
        description: { type: String },
        add_time: {
            type: Number,
            default: d.getTime(),
        },
    });

    return mongoose.model('Access', AccessSchema, 'access');
};
