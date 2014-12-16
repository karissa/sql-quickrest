var http = require('http');
var Router = require('routes-router');

var QuickRestModel = require('..')
var sqlRest = require('..')


function Server () {
  var sqlRest = new sqlRest({
    name: 'user',
    key: 'id',
    columns: ['id', 'name', 'emai', 'lastLogin']
  })

  var router = Router();
  // Wire up API endpoints
  router.addRoute('/api/example/:id?', function(req, res, opts, cb) {
    var id = parseInt(opts.params.id) || opts.params.id

    QuickRestModel.dispatch(sqlRest, req, res, id, function (err, data) {
      if (err) {
        console.error(err)
        res.statusCode = 500;
        res.end(JSON.stringify({'error': err.message}));
        return
      }

      res.statusCode = 200
      res.end(JSON.stringify(data));
    })
  });

  var server = http.createServer(router);
  var port = 5000;

  return  {
    server: server,
    port: port
  };
}


module.exports = Server;
