const { response } = require("express");
const request = require("supertest");
const app = require("../../app");

describe("Test ROOT /", () => {
  test("It shold respond with 200 success status code", async () => {
    const response = await request(app)
      .get("/")
      .expect("Content-Type", /json/)
      .expect(200);
  });
});
