var http = require('http');
var path = require('path');
var debug = require('debug')('test-common');
var request = require('request').defaults({json: true});

var config = require('../example/config.js');
var Server = require('../example');

module.exports = function() {
  var common = {};


  common.testGET = function (t, path, data, cb) {
    this.getServer(t, function(err, api, done) {
      params = {
        method: 'GET',
        uri: 'http://localhost:' + api.port + path
      };
      debug('requesting', params);
      request(params, function get(err, res, json) {
        cb(err, api, res, json, done);
      });
    });
  };

  common.testPOST = function (t, path, data, cb) {
    this.getServer(t, function(err, api, done) {
      params = {
        method: 'POST',
        uri: 'http://localhost:' + api.port + path,
        json: data,
        'content-type': 'application/json'
      };
      debug('requesting', params);
      request(params, function get(err, res, json) {
        cb(err, api, res, json, done);
      });
    });
  };

  common.getServer = function (t, cb) {
    var api = Server();

    api.server.listen(api.port, function() {
      console.log('listening on port', api.port);
      cb(null, api, done);
    });

    function done() {
      setTimeout(destroy, 100) // fixes weird test errors on travis-ci

      function destroy() {
        api.server.close()
        t.end()
      }
    }
  };

  return common;
};

