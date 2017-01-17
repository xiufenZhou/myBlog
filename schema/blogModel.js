/**
 * Created by xingyunzhi on 17/1/6.
 */

var mongoose = require('mongoose');

var blogSchema = new mongoose.Schema({
    title: String,
    author: String,
    type:String,
    content: String,
    createTime: String
});

blogSchema.pre('save', function (next) {
    var self = this;
    next();
});

var blogModel = mongoose.model('blog', blogSchema);

module.exports = blogModel;