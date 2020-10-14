const app = require('../../../index.js');
const request = require('supertest');
const expect = require('chai').expect;

const chai = require('chai');

let userToken;
let id ='';


describe("Feedback API TDD Testing", function () {
  before(function (done) {
    console.log("***************************here************");
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

//test case 1: Add Feedback using token
it('should Pass, Add Feedback', (done) => {
    request(app).post('/api/feedback/add')
    .set('Authorization', `Bearer ${userToken}`)
    .send({
       message:"Good quality",
        user_id:"1",
       
        }).then((res) => {
            expect(res.status).to.equal(200);
            expect(res.body.message).to.equal("Feedback inserted successfully");
            done();
        }).catch (err => done(err));
});

//test case 2: When dummy token is provided
it('should fail, provided dummy token', (done) => {
    request(app).post('/api/feedback/add')
        .set('Authorization', 'dummytoken')
       .send({
           message:"nicefood",
            user_id:"1",
   
    }).then((res) => {
        expect(res.status).to.equal(500);
        expect(res.body.message).to.equal("Could not insert Feedback!!!");
        done();
    }).catch (err => done(err));
});
//test case 3: Get Feedback success
it('should pass, Get all Feedback details', (done) => {
    request(app).get('/api/feedback/all')
        .then((res) => {
            const body = res.body;
            expect(body).to.not.be.empty;
             expect(res.status).to.equal(200);
             expect(res.body.message).to.equal("All feedback shown");
            done();
        })
        .catch((err) => done(err));
})   

});