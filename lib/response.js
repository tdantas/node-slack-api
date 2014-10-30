
var xtend = require('util')._extend;

module.exports = SlackResponse;

function SlackResponse(data) {
  var raw       = data;
  var jsonData  = JSON.parse(data);
  
  var response = {
    raw: raw,
    jsonData: jsonData
  };

  response.error   = extractResponseError(jsonData);
  response.body = extractPayload(jsonData);
  
  return response;
}

function extractResponseError(jsonData) {
  if(jsonData.ok) return null;
  return new Error(jsonData.error);
}

function extractPayload(jsonData) {
  var shallowClone = xtend({}, jsonData);
  delete shallowClone.ok;
  delete shallowClone.error;
  
  return shallowClone;
}
