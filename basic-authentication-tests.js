// Import Tinytest from the tinytest Meteor package.
import { Tinytest } from "meteor/tinytest";

// Import and rename a variable exported by basic-authentication.js.
import { name as packageName } from "meteor/basic-authentication";

// Write your tests here!
// Here is an example.
Tinytest.add('basic-authentication - example', function (test) {
  test.equal(packageName, "basic-authentication");
});
