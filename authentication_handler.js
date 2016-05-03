class AuthenticationHandler {
  constructor(LoggerFactory, Authentication) {
    this.logger = LoggerFactory.get('AuthenticationHandler');
    this.authentication = Authentication;
  }

  checkAuthentication(base64authentication) {
    if (Meteor.settings.authentication) {
      // Parse from base64
      let authentication = JSON.parse(CryptoJS.enc.Base64.parse(base64authentication).toString(CryptoJS.enc.Utf8));
      this.logger.verbose('authentication', JSON.stringify(authentication));
      this.logger.debug('try to authenticate message for user', authentication.userName);
      let authenticationRaw = this.authentication.findOne({type: 'receive', userName: authentication.userName,
        password: authentication.password});
      if (!authenticationRaw) {
        throw new Meteor.Error(401, 'Bad authentication ' + JSON.stringify(authentication));
      }
    }
  }

  createBase64Authentication(userName) {
    this.logger.debug('creating authentication for user', userName);
    let authenticationRaw = this.authentication.findOne({type: 'send', userName: userName});
    if (!authenticationRaw) {
      throw new Meteor.Error(401, 'send user name not found', userName);
    }

    let authentication = {
      userName: authenticationRaw.userName,
      password: authenticationRaw.password
    };

    let encodedAuthentication = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(JSON.stringify(authentication)));
    this.logger.debug('encoded authentication is', encodedAuthentication);
    return encodedAuthentication;
  }
}

Z.declare('AuthenticationHandler')
  .dependsOn('LoggerFactory', 'Authentication')
  .asSingleton()
  .provides(AuthenticationHandler);