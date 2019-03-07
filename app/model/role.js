/*
 * 管理员角色表
 * @Author: Miracle
 */

module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;
    const d = new Date();

    const RoleSchema = new Schema({
        name: { type: String },
        description: { type: String },
        status: { type: Number, default: 1 },
        createAt: {
            type: Number,
            default: d.getTime(),
        },
    });

    return mongoose.model('Role', RoleSchema, 'role');
};
