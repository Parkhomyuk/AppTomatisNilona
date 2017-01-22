var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');

var db = mongojs('mongodb://admin:admin@ds117839.mlab.com:17839/blogs_page',['blogs']);

// Get Blogs
router.get('/', function(req, res, next){

   //res.send('BLOG PAGE');
    db.blogs.find(function(err, blogs){
        if(err){
            res.send(err);
        } else {
            res.json(blogs);
        }
    });

});

// Get Single Todo
    router.get('/:id', function(req, res, next){
    db.blogs.findOne({
        _id: mongojs.ObjectId(req.params.id)
    }, function(err, blogs){
        if(err){
            res.send(err);
        } else {
            res.json(blogs);
        }
    });
});

// Save Todo

router.post('/todo', function(req, res, next){
    var todo = req.body;
    if(!todo.name || !(todo.isCompleted + '')){
        res.status(400);
        res.json({
            "error": "Invalid Data"
        });
    } else {
        db.save(todo, function(err, result){
            if(err){
                res.send(err);
            } else {
                res.json(result);
            }
        });
    }
});



// Update Todo

router.put('/:id', function(req, res, next){
    var blog = req.body;
    var updObj = {};

    if(blog.isCompleted){
        updObj.isCompleted = blog.isCompleted;
    }

    if(blog.author){
        updObj.author = todo.author;
    }

    if(!updObj){
        res.status(400);
        res.json({
            "error": "Invalid Data"
        });
    } else {
        db.todos.update({
            _id: mongojs.ObjectId(req.params.id)
        },updObj, {}, function(err, result){
            if(err){
                res.send(err);
            } else {
                res.json(result);
            }
        });
    }
});


// Delete Todo

router.delete('/:id', function(req, res, next){
    db.blogs.remove({
        _id: mongojs.ObjectId(req.params.id)
    },'', function(err, result){
        if(err){
            res.send(err);
        } else {
            res.json(result);
        }
    });
});


module.exports = router;

