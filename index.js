'use strict';
var app = require('koa')();
var common = require('koa-common');
var router = require('koa-router')();
var hbs = require('koa-hbs');
var find = require('list-files');
var Q = require('q');


var settings = {
    viewPathRelative: 'views',
    viewPath: __dirname + '/views/',
    partialsPath: __dirname + '/views/partials/',
    staticPath: __dirname + '/static/'
};

function fileList(directory, mask){
    var deferred = Q.defer();
    find(function(files) {
        deferred.resolve(files);
    }, {
        dir: directory,
        name: mask
    });
    return deferred.promise;
}

class Views {

    static *main(next){
      this.status == 200;
      yield this.render('main', {title: 'koa-hbs'});
    }

    static *populateTemplateName(templateName, next){
        this.template = {name: templateName};
        yield next
    }

    static *listTemplates(next) {
        this.status == 200;
        this.body = yield fileList(settings.viewPathRelative, 'hbs');
    }

    static *generic(next) {
        yield this.render(this.template.name, {title: this.template.name});
        this.status == 200;
        yield next;
    }

    static *eventPopulate(event, next) {
      yield next;
    }
};

router
    .param('template', Views.populateTemplateName)
    .param('event', Views.eventPopulate)
    .get('/', Views.main)
    .get('/templates', Views.listTemplates)
    .get('/portfolio', Views.portfolio);
    .get('/portfolio/:event', Views.portfolio);
    .get('/:template', Views.generic);

app
    .use(common.responseTime())
    .use(common.logger('dev'))
    .use(hbs.middleware({ viewPath: settings.viewPath, partialsPath: settings.partialsPath }))
    .use(router.routes())
    .use(router.allowedMethods())
    .use(common.static(settings.staticPath, {defer: true}));

var server = app.listen(1234, function () {
    console.log('Listening on port %d', server.address().port);
});


