
var assert      = require('assert');
var request     = require('request');
var xtend       = require('util')._extend;
var response    = require('./response');
var EE          = require('events').EventEmitter;

if(process.env.SLACK_VERBOSE) require('request-debug')(request);

module.exports = Slack;

function Slack(token, opts) {
  assert(token, 'need token to initialize');

  opts          = opts || {};
  var baseUrl   = opts.baseUrl || 'https://slack.com/api/';
  var requester = opts.request || request;
  var timeout   = opts.timeout || 10000;

  var client = {};

  client.apiTest          = action('api.test');
  client.authTest         = action('auth.test');
  
  // users
  client.usersInfo        = action('users.info', 'user');
  client.usersList        = action('users.list', 'members');
  
  // channels 
  client.channelsInfo     = action('channels.info', 'channel');
  client.channelsList     = action('channels.list', 'channels');
  client.channelsHistory  = action('channels.history', 'messages');

  return client;

  /*
    
  */

  function action(method, output) {
    return function actionClosure(qs, options, cb) {
    
      if(typeof qs === 'function') {
        cb      = qs;
        qs = { };
        options      = { };
      }

      if(typeof options === 'function') {
        cb = options;
        options = { };
      }
      
      var defaultQs      = { token: token };
      var defaultOptions = { method: 'GET' };
      var url            = [ baseUrl, method ].join('');
    
      qs = xtend(defaultQs, qs);
      options = xtend(defaultOptions, options);
      
      var req = xtend({ 
        method: method, 
        url: url, 
        qs: qs , 
        timeout: timeout }, options);

      requester(req, afterRequest);
      
      function afterRequest(err, result) {
        if(err) { return cb(err); }
        var res = response(result.body);
        
        if(res.error) { return cb(res.error); }
        if(output) { return cb(null, res.body[output], res); }
        return cb(null, res.body);
       }
    };
  }
}
