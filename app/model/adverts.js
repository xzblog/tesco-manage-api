/*
 * 广告表
 * @Author: Miracle
 */

module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;
    const d = new Date();

    const AdvertsSchema = new Schema({
        title: { type: String, required: true }, // 标题
        description: { type: String }, // 介绍
        url: { type: String }, // 图片地址
        href: { type: String }, // 对应地址
        platform: { type: Number, default: 0 }, // 0: PC， 1: APP， 2: H5
        status: { type: Number, default: 0 }, // 0: 未开始， 1: 进行中， 2: 已结束
        beginTime: { type: Number }, // 开始时间
        endTime: { type: Number }, // 结束时间
        createdAt: {
            type: Number,
            default: d.getTime(),
        },
    });

    return mongoose.model('Adverts', AdvertsSchema, 'adverts');
};
