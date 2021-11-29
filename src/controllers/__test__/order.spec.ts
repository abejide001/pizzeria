import request from "supertest";
import app from "../../app";

describe("Create orders", () => {
  it("should return 401 if user is not authenticated", async () => {
    const res = await request(app).post("/api/v1/order").send({})
    expect(res.status).toBe(401)
  });

  it("should return 404 if pizza does not exist", async () => {
    const payload = {
      items: ["61a402ff01cbe37a73a493d7", "61a402ff01cbe37a73a493d7"],
    }
    const res = await request(app).post("/api/v1/order").set("Authorization", `Bearer ${global.userSignIn()}`).send({
      ...payload
    })
    expect(res.body.error).toBe("Pizza not found")
  });

  it("should create an order for an available pizza", async () => {
    const payload = {
      name: "Greek Pizza",
      price: 300,
      quantity: 5,
      userId: "2010120203"
    }
    const pizza = await request(app).post("/api/v1/pizza").set("Authorization", `Bearer ${global.adminSignIn()}`).send({
      ...payload
    })
    let items = []
    items.push(pizza.body.data.id)
    const res = await request(app).post("/api/v1/order").set("Authorization", `Bearer ${global.userSignIn()}`).send({
      items
    })
    expect(res.body.message).toBe("Order created successfully")
  });
});
