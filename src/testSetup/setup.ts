import jwtSign from "../utils/token";

const { MongoMemoryServer } = require("mongodb-memory-server");
const mongoose = require("mongoose");

declare global {
  var adminSignIn: () => Promise<string[]>
  var userSignIn: () => Promise<string[]>
}
let mongo: any;

beforeAll(async () => {
  process.env.JWT_KEY = "adsfdg";
  mongo = await MongoMemoryServer.create();
  const mongoUri = mongo.getUri();

  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  await mongo.stop();
  await mongoose.connection.close();
});

global.adminSignIn = () => {
  // Build a JWT payload.  { id, email, and role }
  const payload = {
    id: mongoose.Types.ObjectId().toHexString(),
    email: "admin@gmail.com",
    role: "admin",
  };

  // Create the JWT!
  const token = jwtSign(payload);

  return token;
};

global.userSignIn = () => {
  // Build a JWT payload.  { id, email, and role }
  const payload = {
    id: mongoose.Types.ObjectId().toHexString(),
    email: "customer@gmail.com",
    role: "customer",
  };

  // Create the JWT!
  const token = jwtSign(payload);

  return token;
};