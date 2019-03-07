/*
 * 文件上传
 * @Author: Miracle
 */

const { Controller } = require('egg');
const moment = require('moment');
const pump = require('mz-modules/pump');
const mkdirp = require('mz-modules/mkdirp');
const path = require('path');
const fs = require('fs');

async function getFile(filename) {
    const day = moment().format('YYYYMMDD');
    const dir = path.join('app/public/upload/admin/', day);
    await mkdirp(dir);
    const salt = Math.random().toString(16).substr(2);
    const uploadDir = path.join(dir, salt + path.extname(filename));
    return {
        uploadDir,
        saveDir: uploadDir.slice(3).replace(/\\/g, '/'),
    };
}

class UploadController extends Controller {
    async create() {
        const { ctx } = this;
        const stream = await ctx.getFileStream();
        const result = await getFile(path.basename(stream.filename));
        console.log(result);
        const writeStream = fs.createWriteStream(result.uploadDir);
        await pump(stream, writeStream); // 写入文件，并做错误处理
        ctx.body = {
            url: result.saveDir,
        };
    }

    async multiple() {
        const { ctx } = this;
        const parts = ctx.multipart({ autoFields: true });
        const files = [];
        let stream;
        // parts() 返回 promise 对象
        while ((stream = await parts()) != null) {
            if (!stream.filename) {
                // 这时是用户没有选择文件就点击了上传(part 是 file stream，但是 part.filename 为空)
                // 需要做出处理，例如给出错误提示消息
                return;
            }
            const fieldname = stream.fieldname;
            const result = await getFile(path.basename(stream.filename));
            const writeStream = fs.createWriteStream(result.uploadDir);
            await pump(stream, writeStream);
            files.push({ [fieldname]: result.saveDir });
        }
        ctx.body = {
            url: files,
            fields: parts.field,
        };
    }
}

module.exports = UploadController;
