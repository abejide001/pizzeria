import request from "supertest";
import app from "../../app";
jest.setTimeout(30000);
describe("User auth", () => {
  it("fails when the account does not exist", async () => {
    await request(app)
      .post("/api/v1/auth/signin")
      .send({
        email: "test@gmail.com",
        password: "asff",
      })
      .expect(401);
  });

  it("should return 422 if there is no input", async () => {
    await request(app).post("/api/v1/auth/signin").send({}).expect(422);
  });

  it("should return 401 when an invalid email is provided", async () => {
    await request(app)
      .post("/api/v1/auth/signin")
      .send({
        email: "abab",
        password: "abcde",
      })
      .expect(401);
  });

  it("should return 422 when password is not provided", async () => {
    await request(app)
      .post("/api/v1/auth/signin")
      .send({
        email: "abab@gmail.com",
        password: "",
      })
      .expect(422);
  });

  it("fails when an incorrect password is supplied", async () => {
    await request(app)
      .post("/api/v1/auth/signup")
      .send({
        email: "test@gmail.com",
        password: "sdfsfsg",
      })
      .expect(201);

    await request(app)
      .post("/api/v1/auth/signin")
      .send({
        email: "test@gmail.com",
        password: "sdfssf",
      })
      .expect(401);
  });

  it("fails when an incorrect mail is supplied", async () => {
    await request(app)
      .post("/api/v1/auth/signup")
      .send({
        email: "test@gmail.com",
        password: "sdfsfsg",
      })
      .expect(201);

    await request(app)
      .post("/api/v1/auth/signin")
      .send({
        email: "tes@gmail.com",
        password: "sdfssf",
      })
      .expect(401);
  });
});
