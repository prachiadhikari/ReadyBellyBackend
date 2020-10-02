const app = require('../../../index.js');
const request = require('supertest');
const expect = require('chai').expect;
//const sinon = require('sinon');
const chai = require('chai');
//const queries = require('../../controller/ProductController');
let userToken;
let id ='';


describe("Products API TDD Testing", function () {
  before(function (done) {
    console.log("***************************LOGIN************");
    request(app)
      .post("/api/user/login")
      .send({
        email: "p@gmail.com",
        password: "krishna",
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

//test case 1: Add Product using token
it('should Pass, Add Product', (done) => {
    request(app).post('/api/product/add')
    .set('Authorization', `Bearer ${userToken}`)
    .send({
        name: "Chicken Momo",
        price: "2000",
        desc: "Available",
        type: "MOMO",
        size: "LARGE",
        offer:"2",
        image:"dd",
        user_id:"2",
       
        }).then((res) => {
            expect(res.status).to.equal(200);
            expect(res.body.message).to.equal("Product inserted successfully");
            done();
        }).catch (err => done(err));
});

//test case 2: When dummy token is provided
it('should fail, provided dummy token', (done) => {
        request(app).post('/api/product/add')
            .set('Authorization', 'dummytoken')
           .send({
            name: "Chicken Momo",
            price: "2000",
            desc: "Available",
            type: "MOMO",
            size: "LARGE",
            offer:"2",
            image:"dd",
            user_id:"2",
       
        }).then((res) => {
            expect(res.status).to.equal(403);
            expect(res.body.message).to.equal("Forbidden");
            done();
        }).catch (err => done(err));
});



//test case 2: Get product success
 it('should pass, Get all product details', (done) => {
            request(app).get('/api/product/all')
                .then((res) => {
                    const body = res.body;
                    expect(body).to.not.be.empty;
                     expect(res.status).to.equal(200);
		             expect(res.body.message).to.equal("All products shown");
                    done();
                })
                .catch((err) => done(err));
 })   

//test case 3: Delete product using token
it('should pass, Create new product and delete the same product', (done) => {
            request(app).post('/api/product/add')
                .set("Authorization", `Bearer ${userToken}`)
                .send({
                    name: "product name about to delete",
                    price: "2000",
                    desc: "Available",
                    type: "MOMO",
                    size: "LARGE",
                    offer:"2",
                    image:"product image about to delete",
                    user_id:"2",
                })
                .then((res) => {
                    let pid = res.body.pid
                    request(app).delete('/api/product/' + pid)
                        .set("Authorization", `Bearer ${userToken}`)
                        .then((res) => {
                            expect(res.status).to.equal(200);
                            expect(res.body.message).to.equal("success");
                            done();
                        })
                        .catch((err) => done(err));
                })
                .catch((err) => done(err));
})


//test case 4: When product name is not provided
it('should Fail, Add Product because no Product name provided', (done) => {
    request(app).post('/api/product/add')
    .set('Authorization', `Bearer ${userToken}`)
    .send({
        name: "",
        price: "2000",
        desc: "Available",
        type: "MOMO",
        size: "LARGE",
        offer:"2",
        image:"dd",
        user_id:"2",
       
        }).then((res) => {
            expect(res.status).to.equal(500);
            expect(res.body.message).to.equal("Product name is required");
            done();
        }).catch (err => done(err));
});


//test case 5: When product type is not provided
it('should Fail, Add Product because no Product Type provided', (done) => {
    request(app).post('/api/product/add')
    .set('Authorization', `Bearer ${userToken}`)
    .send({
        name: "Chicken Momo",
        price: "2000",
        desc: "Available",
        type: "",
        size: "LARGE",
        offer:"2",
        image:"dd",
        user_id:"2",
       
        }).then((res) => {
            expect(res.status).to.equal(500);
            expect(res.body.message).to.equal("Product Type is required");
            done();
        }).catch (err => done(err));
});


///test case 6: Update product using Token
 it("Pass, update products info", (done) => {
    request(app)
      .put("/api/product/update")
      .set("Authorization", `Bearer ${userToken}`)
      .send({
        name: "Chicken Momo update",
        price: "2000",
        desc: "Available",
        type: "MOMO",
        size: "LARGE",
        offer:"2",
        image:"dd",
        user_id:"2",
      })
      .then((res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.not.be.empty;
        done();
      })
      .catch((err) => done(err));
  });
});

