var express = require('express');
var router = express.Router();
var blogModel = require('../schema/blogModel');
var _ = require('underscore');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: '我的博客' });
});

router.get('/blog', function(req, res, next) {
    var blogList = [];
    var typeList = {};
    blogModel.find().exec(function (err,data) {
        if(!err && !!data){
            blogList = data;
            typeList = _.groupBy(blogList,'type');
            console.log('typeList==',typeList);
        }
        res.render('blog', { title: '我的博客',blog:blogList,typeList:typeList });
    });
});

router.get('/blogDetail',function (req,res,next) {
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
    var type = req.body.type;
    var d = new Date();
    var Y = d.getFullYear();
    var M = d.getMonth()+1;
    M = M<10 ? '0'+M : M;
    var D = d.getDate();
    D = D<10 ? '0'+D : D;
    var S = d.getHours();
    S = S<10 ? '0'+ S: S;
    var F = d.getMinutes();
    F = F<10 ? '0'+F : F;
    var m = d.getSeconds();
    m = m<10 ? '0'+m : m;

    var date = Y+'-'+M+'-'+D +' '+S+':'+F+':'+m;
    console.log('date',date);
    var blog = new blogModel({
        title:title,
        author: 'zhouxiufen',
        type:type,
        content:content,
        createTime:date
    });

    console.log('blog>>>>>>',blog);
    blog.save(function (err) {
        console.log('errrr',err);
        return res.send({status : 200, info : blog});
    });
});

module.exports = router;
