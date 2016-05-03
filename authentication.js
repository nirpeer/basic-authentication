class Authentication {
  constructor() {
    this.collection = new Mongo.Collection("authentication");
  }

  findOne(...args) {
    return this.collection.findOne(...args);
  }
}

Z.declare('Authentication')
  .dependsOn()
  .asSingleton()
  .provides(Authentication);