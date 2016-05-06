var instance;

export class BasicAuthentication {
  constructor() {
    this.authentication = new Mongo.Collection("authentication");
  }

  static getInstance() {
    if (!instance) {
      instance = new BasicAuthentication();
    }

    return instance;
  }

  checkAuthentication(base64authentication) {
    // Parse from base64
    let authentication = CryptoJS.enc.Base64.parse(base64authentication).toString(CryptoJS.enc.Utf8);
    console.log('check authentication', authentication);
    let splittedAuthentication = authentication.split(":");
    console.log('try to authenticate message for user', splittedAuthentication[0]);
    let authenticationRaw = this.authentication.findOne({
      type: 'receive', userName: splittedAuthentication[0], password: splittedAuthentication[1]
    });
    if (!authenticationRaw) {
      throw new Meteor.Error(401, 'Bad authentication ' + authentication);
    }
  }

  createBase64Authentication(userName) {
    console.log('creating authentication for user', userName);
    let authenticationRaw = this.authentication.findOne({type: 'send', userName: userName});
    if (!authenticationRaw) {
      throw new Meteor.Error(401, 'send user name not found', userName);
    }

    let authentication = authenticationRaw.userName + ":" + authenticationRaw.password;
    let encodedAuthentication = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(authentication));
    console.log('encoded authentication is', encodedAuthentication);
    return encodedAuthentication;
  }
}