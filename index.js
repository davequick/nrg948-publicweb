// app.js
var koa = require('koa');
var app = koa();
var common = require('koa-common');
var route = require('koa-route');

// enable logger middleware
app.use(common.logger('dev'));


// app.use(function *() {
//     if(this.request.url==='/test') {
//         if(Math.random() < .9) {
//             this.body = 'A';
//         } else {
//             this.body = 'B';
//         }
//     }
// });


// enable static middleware
app.use(common.static(__dirname + '/static'));

app.use(function *() {
    this.body = "Page not found.";
});

var server = app.listen(80, function () {
    console.log('Listening on port %d', server.address().port);
});
