var express = require('express');
var router = express.Router();
var blogModel = require('../schema/blogModel');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: '我的博客' });
});

router.get('/blog', function(req, res, next) {
    var blogList = [];

    blogModel.find().exec(function (err,data) {

        if(!err && !!data){
            blogList = data;
        }
        res.render('blog', { title: '我的博客',blog:blogList });
    });
});

router.get('/blogDetail',function (req,res,next) {
    console.log('hahhahahhah')
    var _id = req.query.id;
    var blogContent = {};
    blogModel.findById(_id).exec(function (err,data) {
        if(!err && !!data){
            blogContent = data;
        }
        res.render('content',{title:'我的博客',content:blogContent})

    });
});

router.post('/add',function (req,res) {
    var title = req.body.title;
    var content = req.body.content;
    var blog = new blogModel({
        title:title,
        author: 'zhouxiufen',
        content:content,
        createTime:Date.now()
    });
    blog.save();

    return res.sendStatus(200);
});

module.exports = router;
