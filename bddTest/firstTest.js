var should = require('chai').should(),
    expect = require('chai').expect,
    supertest = require('supertest'),
    api = supertest('http://localhost:9999'),
    post_data = require('../data/algorithms_post.js'),
    ver_ana_api = require('../data/verify_analytics_api.js');


Feature('Alogrithms api', () => {

  Scenario('Verify all the algorithms are shown', () => {

    var token;
    var response;

    Given('I login application with admin', (done) => {
      api.post("/data/users/action/doLogin")
      .send({
        "username":"breddy@buyitinstalled.com",
        "password":"1234"
      })
      .expect(200)
      .end(function(err,res){
          token = res.body.access_token;
          done();
      });
    });
    When('I hit algorithms api', (done) => {
      api.get("/data/algorithms")
      .set("accessToken",token)
      .end(function(err,res){
        response = res;
        done();
      });
    });

    Then('response must an array', () => {
      expect(response.body).to.be.an('array');
    });

    And('response has 200 status code', () => {
      expect(response.status).to.equal(200);
    });
  });

  Scenario('Verify algorithms api is not accesible if user is not logged in', () => {
    var response;

    Given('I hit algorithms api without logging to application', (done) => {
      api.get('/data/algorithms')
      .end(function(err,res){
        response = res;
        done();
      });
    });

    Then('response code should be 403', () => {
        expect(response.status).to.equal(403);
      });

    And('response should contain error message "The resource owner or authorization server denied the request."', () => {
      expect(response.body.Errors[0].Message).to.equal("The resource owner or authorization server denied the request.");
    });
  });

  Scenario('Verify new algorithm can be created', () => {
    var response,token;

    Given('I login application with admin', (done) => {
      api.post("/data/users/action/doLogin")
      .send({
        "username":"breddy@buyitinstalled.com",
        "password":"1234"
      })
      .expect(200)
      .end(function(err,res){
        token = res.body.access_token;
        done();
      });
    });

    When('I post an algorithm', (done) => {
      api.post("/data/algorithms")
      .set("accessToken",token)
      .send({})
      .end(function(err,res){
        response = res;
        done();
      });
    });

    Then('respone should have status 200',()=>{
      expect(response.status).to.equal(200);
    });

  });
});