
var assert = require('chai').assert;
var Fixture  = require('./fixtures');
var Client = require('../');
var nock  = require('nock');

function mockRequest(path, response, delay) {
  return nock('https://slack.com')
    .get(path)
    .delay(delay || 0)
    .reply(200, response || {});
}

function verify(body, scope, done) {
  return function cb(err, result, raw) {
    scope.done();
    assert.notOk(err);
    assert.ok(raw);
    assert.ok(result);
    assert.deepEqual(result, body);
    done();
  };
}

describe('Client', function() {

  var slackClient;

  it('initialization fails without token', function(done) {
    assert.throws(function(){ Client(); });
    done();
  });
  
  it('initialize with a token', function(done) {
    assert.doesNotThrow(function() { 
      slackClient = Client('MY_TOKEN'); 
    });
    done();
  });

  describe('endpoints', function() {
 
    it('usersInfo', function(done) {
      var body = Fixture.UsersInfo;
      var scope = mockRequest('/api/users.info?token=MY_TOKEN&user=U023BECGF', body);
      slackClient.usersInfo({ user: 'U023BECGF' }, verify(body.user, scope, done));
    });

    it('usersList', function(done) {
      var body = Fixture.UsersList;
      var scope = mockRequest('/api/users.list?token=MY_TOKEN', body);
      slackClient.usersList(verify(body.members, scope, done));
    });

    it('channelsHistory', function(done) {
      var body = Fixture.ChannelsHistory;
      var scope = mockRequest('/api/channels.history?token=MY_TOKEN&channel=C999999', body);
      slackClient.channelsHistory({ channel: 'C999999' }, verify(body.messages, scope, done));
      
    });
    
    it('channelsInfo', function(done) {
      var body = Fixture.ChannelsInfo;
      var scope = mockRequest('/api/channels.info?token=MY_TOKEN&channel=C999998', body);
      slackClient.channelsInfo({ channel: 'C999998' }, verify(body.channel, scope, done));
    });

    it('channelsList', function(done) {
      var body = Fixture.ChannelsList;
      var scope = mockRequest('/api/channels.list?token=MY_TOKEN', body);
      slackClient.channelsList(verify(body.channels, scope, done));
    });
  });

});
