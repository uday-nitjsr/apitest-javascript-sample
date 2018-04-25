var should = require('chai').should(),
    expect = require('chai').expect,
    supertest = require('supertest'),
    api = supertest('http://localhost:9999'),
    getUser = require('../data/getData/getUserWithId.js'),
    getAlgo = require('../data/getData/getAlgorithmWithId.js');

Feature('Algorithm api',()=>{
	var admin = new getUser(1);
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

	Scenario('verify algorithms api results in error if accessToken is not added',()=>{
		var response;
		Given('I hit algorithms api without accessToken',(done)=>{
			api.get("/data/algorithms")
			.end(function(err,res){
				response = res;
				done();
			});
		});
		Then('response should have status code 403',()=>{
			expect(response.status).to.equal(403);
		});
		And('response should have error',()=>{
			expect(response.body.Errors[0].Message).to.equal('The resource owner or authorization server denied the request.');
		});
	});

	Scenario('verify creating a new algorithms',()=>{
		var token,response;
		var algo = new getAlgo("2");
		Given('I login application with admin',(done)=>{
			api.post("/data/users/action/doLogin")
			.send({
				"username":admin.username,
				"password":admin.password
			}).end(function(err,res){
				token = res.body.access_token;
				done();
			});
		});

		When('I post new algorithm',(done)=>{
			api.post("/data/algorithms")
			.set("accessToken",token)
			.send(algo)
			.end(function(err,res){
				response = res;
				done();
			});
		});

		Then('response status should be 200',()=>{
			expect(response.status).to.equal(200);
		});
		And('response has id as sent in post algorithm',()=>{
			expect(response.body._id).to.eq(algo._id);
		});
		And('response has name as sent in post call',()=>{
			expect(response.body.name).to.equal(algo.name);
		});
		And('response has all workItems as sent in post call',()=>{
			var expetedLength = algo.workItems.length;
			expect(response.body.workItems).to.have.length(expetedLength);
		});
	});

	Scenario('verify creating duplicate algorithm',()=>{
		var token,response;
		var algo = new getAlgo("1");
		Given('I login application with admin',(done)=>{
			api.post("/data/users/action/doLogin")
			.send({
				"username":admin.username,
				"password":admin.password
			}).end(function(err,res){
				token = res.body.access_token;
				done();
			});
		});

		When('I post algorithm for duplicate id',(done)=>{
			api.post("/data/algorithms")
			.set("accessToken",token)
			.send(algo)
			.end(function(err,res){
				response = res;
				done();
			});
		});

		Then('response status should be 500',()=>{
			expect(response.status).to.equal(500);
		});
		And('response should have error Message',()=>{
			expect(response.body.errmsg).to.eq('E11000 duplicate key error collection: vts.algorithms index: _id_ dup key: { : \"1\" }');
		}); 
	});

	// Scenario('verify algorithm is not created with blank data');

	Scenario('verify the reponse of algorithm is proper has details of specific algorithm with id provided in URI',()=>{
		var token,response;
		Given('I login application with admin',(done)=>{
			api.post("/data/users/action/doLogin")
			.send({
				"username":admin.username,
				"password":admin.password
			})
			.end(function(err,res){
				response = res;
				done();
			});
		});

		When('I use algorithm api for',()=>{
			api.get("/data/algorithms/1")
			.set("accessToken",token);
		});
	});
});