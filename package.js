Package.describe({
  name: 'nirpeer:basic-authentication',
  version: '0.0.3',
  // Brief, one-line summary of the package.
  summary: 'meteor base 64 basic authentication',
  // URL to the Git repository containing the source code for this package.
  git: 'https://github.com/nirpeer/basic-authentication.git',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.3.2.4');
  api.use(['ecmascript', 'jparker:crypto-base64@0.1.0']);
  api.mainModule('basic-authentication.js');
});

Package.onTest(function(api) {
});
