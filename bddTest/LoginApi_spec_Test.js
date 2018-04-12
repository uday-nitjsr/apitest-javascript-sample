var should = require('chai').should(),
    expect = require('chai').expect,
    supertest = require('supertest'),
    api = supertest('http://localhost:9999');
    getUser = require('../data/getData/getUserWithId.js');

Feature('Login api verification', () => {
  Scenario('Verify that user is able to login', ()=>{

    var token,response;

    Given('I login application with valid data', (done)=>{
      var admin = new getUser(1);
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

  Scenario('Verify that user is NOT able to login with incorrect data', ()=>{
  	Given('I login application with invalid data',(done)=>{
  		var admin = new getUser(2);
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

  	Then('response status should be 500',()=>{
  		expect(response.status).to.equal(500);
  	});
  	And('response should have body with error message',()=>{
  		expect(response.body.Errors[0].Message).to.equal("The user credentials were incorrect.");
  	});
  });
});