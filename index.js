'use strict';
var app = require('koa')();
var common = require('koa-common');
var router = require('koa-router')();

var db = {
    tobi: { name: 'tobi', species: 'ferret' },
    loki: { name: 'loki', species: 'ferret' },
    jane: { name: 'jane', species: 'elephant' }
};

var pets = {
    list: function*(next){
        var names = Object.keys(db);
        this.body = 'pets: ' + names.join(', ');
        yield next;
    },
    lookup: function*(name, next){
        this.pet = db[name];
        if (!this.pet) return this.throw('cannot find that pet', 404);
        yield next;
    },
    show: function*(next){
        this.body = this.pet.name + ' is a ' + this.pet.species;
        yield next;
    }
};



router
    .param('name', pets.lookup)
    .get('/pets', pets.list)
    .get('/pets/:name', pets.show);

router.get('/', function *(next) {
    this.status = 200;
    this.body = 'Hello World!';
    yield next;
});

app
    .use(router.routes())
    .use(router.allowedMethods());


var server = app.listen(1234, function () {
    console.log('Listening on port %d', server.address().port);
});

function delay(milliseconds) {
    var deferred = Q.defer();
    console.log('start: '+milliseconds+'ms, '+ new Date());
    setTimeout(function(){
        console.log('delayed ' + milliseconds + 'ms '+ new Date());
        deferred.resolve(milliseconds);
    }, milliseconds);
    return deferred.promise;
}

//var hbs = require('koa-hbs')
//var Q = require('q');
//// enable logger middleware
//app.use(common.logger('dev'));
//app.use(common.responseTime());
////app.use(function *simpleSample(next){
////    console.log('before 1: '+ new Date());
////    yield next;
////    yield delay(1000);
////    yield delay(2000);
////   console.log('after 1'+ new Date());
////});
//app.use(function *simpleSample2(next){
//    console.log('before 2'+ new Date());
//    yield next;
//    console.log('after 2'+ new Date());
//});
//
//
//
//app.use(common.responseTime());
//
//// enable static middleware
//app.use(common.static(__dirname + '/static', {defer: true}));
//
//
//app.use(hbs.middleware({
//    viewPath: __dirname + '/views',
//    partialsPath: __dirname + '/views/partials'
//}));
//
////app.use(function *() {
//////    this.status == 200;
////    yield this.render('main', {title: 'koa-hbs'});
//////    this.body = "Page not found.";
////});
//
//
//var server = app.listen(1234, function () {
//    console.log('Listening on port %d', server.address().port);
//});
