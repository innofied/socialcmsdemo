(function(){
    var mongo = require('mongodb'),
    express = require('express'),
    app = express(),
    BSON = mongo.BSONPure;

    var mongodb = {
        "hostname":"dbh22.mongolab.com",
        "port":27227,
        "username":"admin",
        "password":"admin",
        "name":"",
        "db":"socialcms"
    }
  
    var generate_mongo_url = function(obj){
        obj.hostname = (obj.hostname);
        obj.username = (obj.username);
        obj.password = (obj.password);
        obj.port = (obj.port);
        obj.db = (obj.db);
        return "mongodb://" + obj.username + ":" + obj.password + "@" + obj.hostname + ":" + obj.port + "/" + obj.db;
    };

    var mongourl = generate_mongo_url(mongodb);

    app.post('/register',express.bodyParser(), function(req, res) {
        var title = req.body.title,
        text = req.body.text,
        author = req.body.author,
        tags = req.body.tags;
        if ( null == title || title.length < 1
            || null == text || text.length < 1
            || null == author || author.length < 1
            || null == tags || text.tags < 1) {
            res.send(400);
            return;
        }
        require('mongodb').connect(mongourl, function(err, conn){
            conn.collection('book', function(err, coll){
                coll.insert({
                    title:title,
                    text:text,
                    author : author,
                    tags : tags
                }, function () {
                    var response={};
                    response.success="true";
                    res.send(response);
                }); 
            }, function(){
                var response={};
                    response.success="true";
                    response.message="Unable to load collection."
                    res.send(response);
            });
        });
    });

    app.post('/delete',express.bodyParser(), function(req, res) {
        var _id = req.body._id,
        status = false,
        o_id = new BSON.ObjectID(_id);
        if ( null == _id || _id.length < 1) {
            res.send(400);
            return;
        }
        require('mongodb').connect(mongourl, function(err, conn){
            conn.collection('book', function(err, coll){
                coll.remove({
                    '_id': o_id
                }, function () {
                    var response={};
                    response.success="true";
                    res.send(response);
                });
            }, function(){
                var response={};
                    response.success="true";
                    response.message="Unable to load collection."
                    res.send(response);
            });
        });
    });

    app.post('/edit',express.bodyParser(), function(req, res) {
        var _id = req.body._id,
        o_id = new BSON.ObjectID(_id),
        title =req.body.title,
        text=req.body.text,
        author=req.body.author,
        tags=req.body.tags;
        if ( null == title || title.length < 1
            || null == text || text.length < 1
            || null == author || author.length < 1
            || null == _id || _id.length < 1
            || null == tags || text.tags < 1) {
            res.send(400);
            return;
        }
        require('mongodb').connect(mongourl, function(err, conn){
            conn.collection('book', function(err, coll){
                coll.update({
                    '_id': o_id
                },{
                    "$set" : {
                        title : title,
                        text : text,
                        author : author,
                        tags : tags
                    }
                }, function () {
                    var response={};
                    response.success="true";
                    res.send(response);
                }); 
            }, function(){
                var response={};
                    response.success="true";
                    response.message="Unable to load collection."
                    res.send(response);
            });
        });
    });

    app.get('/search',express.bodyParser(), function(req, res) {
        var search = req.query.search,
        matchedItem=[];
        require('mongodb').connect(mongourl, function(err, conn){
            conn.collection('book', function(err, coll){
                coll.find({
                    },function(err,cursor){
                        cursor.toArray(function(err, items) {
                            for(var i=0; i<items.length;i++){
                                if(items[i].title.search(search)!==-1 || items[i].text.search(search)!==-1 || items[i].author.search(search)!==-1 || items[i].tags.search(search)!==-1){
                                    matchedItem.push(items[i]);
                                }
                            }
                            res.send(matchedItem);
                        });
                    });
            })
        })
    });

    app.listen(8000);
    console.log("SocialNet is listening to port 8000.");
}());