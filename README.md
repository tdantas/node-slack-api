# node-slack-api

### Installation

as soon as I implement more [slack methods](https://api.slack.com/methods), I will publish to npm. **(be my guest to help me)**


| method              | status  | 
|-------------------  |---------|
| api.test            |  OK     |             
| auth.test           |  OK     | 
|            
| channels.history    |  OK     |
| channels.info       |  OK     |
| channels.list       |  OK     |
|
| users.info          | OK      | 	      
| users.list          | OK      |


### How to use ?

```
  var SlackClient = require('node-slack-api')('<YOUR TOKEN HERE'>);
  
  // Users Info
  SlackClient.usersInfo({ user: 'U83912' }, function(err, user, rawResponse){});
  
  // Users list
  SlackClient.userslist(function(err, members, rawResponse){ });
  
  // Channels Info
  SlackClient.channelsInfo({ channel: 'U83912' }, function(err, channels, rawResponse){});
  
  // Channels History
  SlackClient.channelsInfo({ channel: 'U83912' }, function(err, messages, rawResponse){});

  
```

### Tests ?

```
 $ npm install
 $ npm test

```

