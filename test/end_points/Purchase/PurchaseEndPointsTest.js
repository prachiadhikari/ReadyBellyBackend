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
//test case 1: Book Purchase using token
it('should Pass, Book Purchase', (done) => {
    request(app).post('/api/purchase/book')
    .set('Authorization', `Bearer ${userToken}`)
    .send({
       status:"PENDING",
        price: "2000",
        quantity:"2",

        user_id:"1",

       
        }).then((res) => {
            expect(res.status).to.equal(200);
            expect(res.body.message).to.equal("Product (s) booked successfully");
            done();
        }).catch (err => done(err));
});

//test case 2: When dummy token is provided
it('should fail, provided dummy token', (done) => {
    request(app).post('/api/purchase/book')
        .set('Authorization', 'dummytoken')
       .send({
        status:"PENDING",
        price: "2000",
        quantity:"2",
        user_id:"1",
   
    }).then((res) => {
        expect(res.status).to.equal(403);
        expect(res.body.message).to.equal("Forbidden");
        done();
    }).catch (err => done(err));
});

//test case 3: Status update of Booking by Vendpr
it('should Pass,  status-update by vendor', (done) => {
    request(app).post('/api/purchase/1/status-update')
    .set('Authorization', `Bearer ${userToken}`)
    .send({
        status:"DELIVERED"

        }).then((res) => {
            expect(res.status).to.equal(200);
            //expect(res.body.message).to.equal("Product inserted successfully");
            done();
        }).catch (err => done(err));
});

//test case 4: Cancel Booking by User
 it('should pass, cancel products booking by user', (done) => {
    request(app).post('/api/purchase/1/status-update')
    .set('Authorization', `Bearer ${userToken}`)
    .send({
        status:"CANCELED"
       
        }).then((res) => {
            expect(res.status).to.equal(200);
            done();
        }).catch (err => done(err));
 })   
//test case 5: Get all booking list of users to Vendors
 it('should pass, Get all Booking List', (done) => {
    request(app).get('/api/purchase/by/vendor/all')
    .set('Authorization', `Bearer ${userToken}`)
    .then((res) => {
            expect(res.status).to.equal(200);
            expect(res.body.message).to.equal("All products shown for vendor");
            done();
        }).catch (err => done(err));
 })

});