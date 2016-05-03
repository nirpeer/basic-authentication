export class BasicAuthentication {
  constructor() {
    this.authentication = new Mongo.Collection("authentication");
  }

  checkAuthentication(base64authentication) {
      // Parse from base64
      let authentication = JSON.parse(CryptoJS.enc.Base64.parse(base64authentication).toString(CryptoJS.enc.Utf8));
      console.log('authentication', JSON.stringify(authentication));
      console.log('try to authenticate message for user', authentication.userName);
      let authenticationRaw = this.authentication.findOne({type: 'receive', userName: authentication.userName,
        password: authentication.password});
      if (!authenticationRaw) {
        throw new Meteor.Error(401, 'Bad authentication ' + JSON.stringify(authentication));
      }
  }

  createBase64Authentication(userName) {
    console.log('creating authentication for user', userName);
    let authenticationRaw = this.authentication.findOne({type: 'send', userName: userName});
    if (!authenticationRaw) {
      throw new Meteor.Error(401, 'send user name not found', userName);
    }

    let authentication = {
      userName: authenticationRaw.userName,
      password: authenticationRaw.password
    };

    let encodedAuthentication = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(JSON.stringify(authentication)));
    console.log('encoded authentication is', encodedAuthentication);
    return encodedAuthentication;
  }
}