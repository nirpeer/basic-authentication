# basic-authentication
meteor base 64 basic authentication

# Usage
Check authentication: BasicAuthentication.getInstance().checkAuthentication(base64authentication);

Create authentication:  BasicAuthentication.getInstance().createBase64Authentication('userName');

# Requirements
Meteor - https://www.meteor.com/

"authentication" table in mongo
format: { type: "send/receive", userName: "userName", password: "password" } 


