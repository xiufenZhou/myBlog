/**
 * Created by xingyunzhi on 17/1/6.
 */

var mongoose = require('mongoose');

var blogSchema = new mongoose.Schema({
    title: String,
    author: String,
    content: String,
    time: Number
});

blogSchema.pre('save', function (next) {
    var self = this;
    next();
});

var blogModel = mongoose.model('blog', blogSchema);

module.exports = blogModel;