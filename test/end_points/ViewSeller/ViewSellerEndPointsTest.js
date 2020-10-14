const app = require('../../../index.js');
const request = require('supertest');
const expect = require('chai').expect;
const chai = require('chai');

///test case 1: View all top sellers
 it("Pass, top seller details", (done) => {
    request(app)
      .get("/api/user/type")
      .then((res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body.message).to.equal("All vendors shown");
        done();
      })
      .catch((err) => done(err));
  });

