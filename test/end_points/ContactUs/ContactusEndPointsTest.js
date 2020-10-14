const app = require('../../../index.js');
const request = require('supertest');
const expect = require('chai').expect;



///test case 1: Add contactus
 it("Pass, add contact us", (done) => {
    request(app).post('/api/contact/add')
      .send({
        yourname: "Prachi Adhikari",
        youremail: "prachi@gmail.com",
        yourfeedback: "service"
      })
      .then((res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body.message).to.equal("Your query sent successfully");
        done();
      })
      .catch((err) => done(err));
  });


///test case 2: Add contactus
 it("Should fail, when yourname is not provided", (done) => {
    request(app).post('/api/contact/add')
      .send({
        yourname: "",
        youremail: "prachi@gmail.com",
        yourfeedback: "good service"
      })
      .then((res) => {
        expect(res.statusCode).to.equal(500);
       expect(res.body.message).to.equal("Your name is required");
        done();
      })
      .catch((err) => done(err));
  });

///test case 3
it("Should fail, when youremail is not provided", (done) => {
    request(app).post('/api/contact/add')
      .send({
        yourname: "Prachi Adhikari",
        youremail: "",
        yourfeedback: "service good"
      })
      .then((res) => {
        expect(res.statusCode).to.equal(500);
        expect(res.body.message).to.equal("Your email is required");
        done();
      })
      .catch((err) => done(err));
  });

///test case 4
it("Should fail, when yourfeedback is not provided", (done) => {
    request(app).post('/api/contact/add')
      .send({
        yourname: "Prachi Adhikari",
        youremail: "prachi@gmail.com",
        yourfeedback: ""
      })
      .then((res) => {
        expect(res.statusCode).to.equal(500);
       expect(res.body.message).to.equal("Your feedback is required");
        done();
      })
      .catch((err) => done(err));
  });
