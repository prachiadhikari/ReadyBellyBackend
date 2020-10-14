const app = require('../../../index.js');
const request = require('supertest');
const expect = require('chai').expect;
const chai = require('chai');
let userToken;
let id ='';

describe("Purchase API TDD Testing", function () {
  before(function (done) {
    console.log("***************************Efwewevwvre************");
    request(app)
      .post("/api/user/login")
      .send({
        email:"admin@gmail.com",
        password: "admin123",
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

  //test case 1: Get user success
 it('should pass, Get all user details', (done) => {
            request(app).get('/api/user/all')
            .set("Authorization", `Bearer ${userToken}`)
                .then((res) => {
                    const body = res.body;
                    expect(body).to.not.be.empty;
                     expect(res.status).to.equal(200);
		             expect(res.body.message).to.equal("All users shown");
                    done();
                })
                .catch((err) => done(err));
            });

 ///test case 2: Approves vendors registration request by ADMIN
it('should Pass, aprove vendors registation by admin', (done) => {
request(app).post('/api/user/1/approve')
.set('Authorization', `Bearer ${userToken}`)
 .send({
 	 }).then((res) => {
            expect(res.status).to.equal(200);
            expect(res.body.message).to.equal("User successfully approved");
            done();
        }).catch (err => done(err));
});


///test case 3 : Remove user by Admin
it('should Pass,remove users admin', (done) => {
  request(app).delete('/api/user/1')
  .set('Authorization', `Bearer ${userToken}`)
   .send({
      }).then((res) => {
              expect(res.status).to.equal(200);
              expect(res.body.message).to.equal("Success");
              done();
          }).catch (err => done(err));
  });

  
  //test case 4: delete user by admin by not specifying id
 it('should fail, should not remove users admin', (done) => {
  request(app).delete('/api/user/')
  .set('Authorization', `Bearer ${userToken}`)
   .send({
     id:"",
      }).then((res) => {
              expect(res.status).to.equal(500);
              expect(res.body.message).to.equal("Could not Delete");
              done();
          }).catch (err => done(err));
  });

 
 });   

