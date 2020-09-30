
// const app = require('../../../index.js');
// const request = require('supertest');
// const expect = require('chai').expect;

// it('should Pass, Register User', (done) => {
//     request(app).post('/api/user/registration')
//     .send({
//         fullname: "Prachi Adhikari",
//         address1: "kalanki",
//         mobile: "9816798765",
//         phone: "014350123",
//         password: "admin123",
//         user_type: "ADMIN",
//         email: "admin@gmail.com"
//         }).then((res) => {
//             expect(res.status).to.equal(200);
//             expect(res.body.message).to.equal("User successfully inserted!");
//             done();
//         }).catch (err => done(err));
// });

// // //test case 2: When email is not provided
// // it('should Fail, Register User because no email provided', (done) => {
// //     request(app)
// //     .post('/api/user/registration')
// //     .send({
// //         fullname: "Prachi Adhikari",
// //         address1: "Kathmandu",
// //         mobile: "981234567",
// //         phone: "014350123",
// //         password: "prachi",
// //         user_type: "USER",
// //         email: ''
// //         }).then((res) => {
// //             console.log("NO EMAIL");
// //             expect(res.status).to.equal(500);
// //             expect(res.body.message).to.equal("email and password is required");
// //             done();
// //         }).catch (err => {
// //             console.log(err);
// //             done(err);
// //         });
// // })

// // //test case 2: When fullname ail is not provided
// // it('should Fail, Register User because no fullname provided', (done) => {
// //     request(app).post('/api/user/registration')
// //     .send({
// //         fullname: "",
// //         address1: "Kathmandu",
// //         mobile: "981234567",
// //         phone: "014350123",
// //         password: "prachi",
// //         user_type: "USER",
// //         email: 'pa@gmail.com'
// //         }).then((res) => {
// //             console.log("********AT SUCESS");
// //             expect(res.status).to.equal(500);
// //             expect(res.body.message).to.equal("Fullname is required");
// //             done();
// //         }).catch (err => {
// //             done(err);
// //         });
// //     })

// //     // test case 6: Users successs login
// // it('should Pass, Login User', (done) => {
// //     request(app).post('/api/user/login')
// //     .send({
// //         email: "op@gmail.com",
// //         password: "prachi"
// //         }).then((res) => {
// //             console.log(res.message);
// //             expect(res.status).to.equal(200);
// //             expect(res.body.message).to.equal("Login Success");
// //             done();
// //         }).catch (err => done(err));
// // });



// // //test case 7: When email is not provided
// // it('should Fail,Login User failed  because no email is provided', (done) => {
// //     request(app).post('/api/user/login')
// //     .send({
// //         email: "",
// //         password: "prachi"
// //         }).then((res) => {
// //             expect(res.status).to.equal(400);
// //             expect(res.body.message).to.equal("email or password not found.");
// //             done();
// //         }).catch (err => {
// //             done(err);
// //         });
// //     })

// // //test case 8 : When email is not provided during login
// // it('should Fail,Login failed because no password is provided', (done) => {
// //     request(app).post('/api/user/login')
// //     .send({
// //         email: "op@gmail.com",
// //         password: ""
// //         }).then((res) => {
            
// //             expect(res.status).to.equal(400);
// //             expect(res.body.message).to.equal("email or password not found.");
// //             done();
// //         }).catch (err => {
// //             done(err);
// //         });
// // })