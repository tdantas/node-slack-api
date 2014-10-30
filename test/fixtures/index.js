
function json(name) { 
  return require('./responses/' + name);
}

module.exports.UsersInfo        = json('users.info.json');
module.exports.UsersList        = json('users.list.json');
module.exports.ChannelsInfo     = json('channels.info.json');
module.exports.ChannelsList     = json('channels.list.json');
module.exports.ChannelsHistory  = json('channels.history.json');
