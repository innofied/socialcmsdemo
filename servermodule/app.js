(function(){
    var mongo = require('mongodb'),
    express = require('express'),
    app = express(),
    BSON = mongo.BSONPure,
    showbody;

    var mongodb = {
        "hostname":"dbh22.mongolab.com",
        "port":27227,
        "username":"admin",
        "password":"admin",
        "name":"",
        "db":"socialcms"
    }
    var Imap = require('imap');

    var imap = new Imap({
        host: 'imap.gmail.com',
        port: 993,
        secure: true
    });
  
    var generate_mongo_url = function(obj){
        obj.hostname = (obj.hostname);
        obj.username = (obj.username);
        obj.password = (obj.password);
        obj.port = (obj.port);
        obj.db = (obj.db);
        return "mongodb://" + obj.username + ":" + obj.password + "@" + obj.hostname + ":" + obj.port + "/" + obj.db;
    };

    var mongourl = generate_mongo_url(mongodb);
    
    
    var allowCrossDomain = function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        res.header("Access-Control-Allow-Headers", req.headers['access-control-request-headers']);
        if ('OPTIONS' == req.method) {
            res.send(200);
        }
        else {
            next();
        }
    }
    app.configure(function() {
    
        app.use(allowCrossDomain);
    
    });
     app.get('/settings',express.bodyParser(), function(req, res) {
         imap.user=req.body.username;
         imap.password=req.body.password;
     });
    app.get('/reademail',express.bodyParser(), function(req, res) {

        function die(err) {
            console.log('Uh oh: ' + err);
            process.exit(1);
        }

        function openInbox(cb) {
            imap.connect(function(err) {
                if (err) die(err);
                imap.openBox('INBOX', true, cb);
            });
        }

        openInbox(function(err, mailbox) {
            var mail=[];
            
            if (err) die(err);
            imap.search([ 'UNSEEN', ['SINCE', 'April 29, 2013'] ], function(err, results) {
                if (err) die(err);
                imap.fetch(results,
                {
                    headers: ['from', 'subject'],
                    body: true,
                    cb: function(fetch) {
                        fetch.on('message', function(msg) {
                            var data={},body = '';
                            msg.on('headers', function(hdrs) {
                                data.from=hdrs.from.toString('utf8');
                                data.subject=hdrs.subject;
                                
                            });
                            msg.on('data', function(chunk) {
                                body += chunk.toString('utf8');
                            });
                            msg.on('end', function(hdrs) {
                                
                                if(showbody)
                                { console.log(body)
                                    showbody=false;
                                }
                                
                                data.body=body;
                                data.date=msg.date;
                                mail.push(data);

                            });
                        });
                    }
                }, function(err) {
                    if (err) throw err;
                    imap.logout();
                    res.send(mail)
                }
                );
            });
        });
    });

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
                    tags : tags,
                    keywords : [title, author]
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
                        tags : tags,
                        keywords : [title, author]
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
        var search = req.query.search;
        require('mongodb').connect(mongourl, function(err, conn){
            conn.collection('book', function(err, coll){
                coll.ensureIndex( {
                    keywords: 1
                } )
                coll.find({
                    keywords : search
                },function(err,cursor){
                    cursor.toArray(function(err, items) {
                        res.send(items);
                    });
                });
            })
        })
    });

    app.listen(8000);
    console.log("SocialNet is listening to port 8000.");
}());