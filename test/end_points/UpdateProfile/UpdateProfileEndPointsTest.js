const app = require('../../../index.js');
const request = require('supertest');
const expect = require('chai').expect;
const chai = require('chai');
let userToken;
let id ='';


describe("UPDATE PROFILE API TDD Testing", function () {
  before(function (done) {
    console.log("***************************UPDATEPROFILE************");
    request(app)
      .post("/api/user/login")
      .send({
        email: "prachi@gmail.com",
        password: "prachi",
      })
      .then((res) => {
        console.log(res.message);
        expect(res.status).to.equal(200);
        expect(res.body.message).to.equal("Login Success");
        userToken = res.body.userToken;
        console.log("*********** token here ***********");
        console.log(userToken);
        done();
      })
      .catch((err) => done(err));
  });



///test case 1: Update user profile using Token
 it("Pass, update profile details", (done) => {
    request(app)
      .put("/api/user/update")
      .set("Authorization", `Bearer ${userToken}`)
      .send({
        fullname: "Prachi",
        address1: "Kathmandu",
        mobile: "9878345067",
        phone: "01870123",
        password: "prachi",
        user_type: "USER",
        email: "prachi@gmail.com",
        id: 6
      })
      .then((res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.not.be.empty;
        done();
      })
      .catch((err) => done(err));
  });
});

