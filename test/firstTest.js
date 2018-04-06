var should = require('chai').should(),
		expect = require('chai').expect,
		supertest = require('supertest'),
		api = supertest('http://localhost:9999'),
    post_data = require('../data/algorithms_post.js'),
    ver_ana_api = require('../data/verify_analytics_api.js');


 describe("analytics api", function(){
	it("to check length", function(done){
		api.get("/data/analytics")
		.expect(200)
		.end(function(err,res){
			expect(res.body).to.have.lengthOf(1);
			done();
		});
	});

  post_data.forEach(function(data){
	 it("to create a new analytics with id "+data.expected_id, function(done){
		  api.post("/data/analytics")
		  .send(data.post_data)
		  .expect(200)
		  .end(function(err,res){
			   var id = res.body._id;
			   expect(id).to.equal(data.expected_id);
			   expect(res.body._links.self.href).to.have.string(data.expected_link);
			   done();
		  });
	 });
  });

  ver_ana_api.forEach(function(data){
    it("to check analytics of specific algorithm with id "+data.id, function(done){
      api.get("/data/analytics/"+data.id)
      .expect(200)
      .end(function(err,res){
        expect(res.body.lastModifiedDate).to.equal(data.response.lastModifiedDate);
        done();
      });
    });
  });
	

	it("check schema", function(done){
		api.get("/data/analytics/1")
		.expect(200)
		.end(function(err,res){
			res.body.should.have.property("_id");
			done();
		});
	});

	it("duplicate analytics should not be created", function(done){
		api.post("/data/analytics")
		.send(post_data[0].post_data)
		.expect(500)
		.end(function(err,res){
			res.body.should.not.have.property("_id");
			expect(res.body.errmsg).to.equal('E11000 duplicate key error collection: vts.analytics index: _id_ dup key: { : \"'+post_data[0].expected_id+'\" }');
			done();
		});
	});

	it("to delete analytics api",function(){

		return api.get("/data/analytics/2")
		.expect(200)
		.then(function(){
			return api.delete("/data/analytics/2")
								.expect(200,{"delete":"success"})
								.then(function(){
									return api.get("/data/analytics/2")
														.expect(500);
									});  
			});
		
		
	});

});

describe("algorithm api",function(){
	it("get all algorithms",function(done){
		api.get("/data/algorithms")
		.expect(200)
		.end(function(err,res){
			expect(res.body).to.be.an('array').that.is.not.empty;
			done();
		});
	});

	it("create new algorithms",function(){
		api.post("/data/algorithms")
		.send()
	})

});