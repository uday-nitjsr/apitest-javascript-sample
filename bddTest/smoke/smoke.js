var should = require('chai').should(),
    expect = require('chai').expect,
    supertest = require('supertest'),
    api = supertest('https://vts.qa.buyitinstalled.co/api');
    getUser = require('../../data/getData/getUserWithId.js');

Feature('Login api verification', () => {
  var admin = new getUser(1);
  Scenario('Verify that user is able to login', ()=>{

    var token,response;

    Given('I login application with valid data', (done)=>{
      api.post("/data/users/action/doLogin")
      .send({
        "admin":admin.username,
        "password":admin.password
      })
      .end(function(err,res){
        response = res;
        done();
      });
    });

    Then('response should be 200',()=>{
      expect(response.status).to.equal(200);
    });

    And('reponse body should have key access_token',()=>{
      expect(response.body).to.have.property("access_token");     
    });
  });

  Scenario('Verify that algorithms api fetches all the algorithms',()=>{
    var token,response;
    Given('I login application with admin',(done)=>{
      api.post("/data/users/action/doLogin")
      .send({
        "username":admin.username,
        "password":admin.password
      })
      .end(function(err,res){
        token = res.body.access_token;
        done();
      });
    });
    When('I hit get all algorithms api',(done)=>{
      api.get("/data/algorithms")
      .set("accessToken",token)
      .end(function(err,res){
        response = res;
        done();
      });
    });
    Then('response status should be 200',()=>{
      expect(response.status).to.equal(200);
    });
    And('response body should be an array',()=>{
      expect(response.body).to.be.an('array');
    });
  });
});