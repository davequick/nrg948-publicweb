// app.js
var koa = require('koa');
var app = koa();
var common = require('koa-common');

// enable logger middleware
app.use(common.logger('dev'));

// enable static middleware
app.use(common.static(__dirname + '/static'));

app.use(function *() {
    this.body = "Page not found.";
});

var server = app.listen(4000, function () {
    console.log('Listening on port %d', server.address().port);
});