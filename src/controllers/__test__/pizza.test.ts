import request from "supertest";
import app from "../../app";

describe("Create pizza", () => {
  it("should return 401 if user is not authenticated", async () => {
    const res = await request(app).post("/api/v1/pizza").send({})
    expect(res.status).toBe(401)
  });

  it("should create a pizza", async () => {
    const payload = {
      name: "Greek Pizza",
      price: 300,
      quantity: 2,
      userId: "2010120203"
    }
    const res = await request(app).post("/api/v1/pizza").set("Authorization", `Bearer ${global.adminSignIn()}`).send({
      ...payload
    })
    expect(res.status).toBe(201)
  });
});
