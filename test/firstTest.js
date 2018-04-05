var should = require('chai').should(),
    expect = require('chai').expect,
    supertest = require('supertest'),
    api = supertest('http://localhost:9999');


 describe("analytics api", function(){

 	it("to check length", function(done){
 		api.get("/data/analytics")
 		.expect(200)
 		.end(function(err,res){
 			expect(res.body).to.have.lengthOf(1);
 			done();
 		});
 	});

 	it("to create a new analytics", function(done){
 		api.post("/data/analytics")
 		.send({
 			"_id":2,
  			"älgorithmId":2,
  			"active":true,
  			"workorders":100,
  			"avgThreshold":2,
  			"totalThreshold":100,
  			"automaticThreshold":3,
  			"humanThreshold":2,
  			"recurringThresolds":12,
  			"avgHumanInteraction":3,
  			"NYAEvents":20
 		})
 		.expect(200)
 		.end(function(err,res){
 			var id = res.body._id;
 			expect(id).to.equal('2');
 			expect(res.body._links.self.href).to.have.string("/data/analytics/2");
 			done();
 		});
 	});

 	it("to check analytics of specific algorithm", function(done){
 		api.get("/data/analytics/1")
 		.expect(200)
 		.end(function(err,res){
 			expect(res.body._id).to.equal("1");
 			expect(res.body.älgorithmId).to.equal(1);
 			expect(res.body.active).to.equal(true);
 			done();
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
 		.send({
 			 "_id":1,
  			"älgorithmId":1,
  			"active":true,
  			"workorders":100,
  			"avgThreshold":2,
  			"totalThreshold":100,
  			"automaticThreshold":3,
  			"humanThreshold":2,
  			"recurringThresolds":12,
  			"avgHumanInteraction":3,
  			"NYAEvents":20
		})
 		.expect(500)
 		.end(function(err,res){
 			res.body.should.not.have.property("_id");
 			expect(res.body.errmsg).to.equal("E11000 duplicate key error collection: vts.analytics index: _id_ dup key: { : \"1\" }");
 			done();
 		});
 	});

 	it("to delete analytics api",function(done){
 		api.get("/data/analytics/2")
 		.expect(200);

 		api.delete("/data/analytics/2")
 		.expect(200)
 		.end(function(err,res){
 			expect(res.body.delete).to.equal("success");
 		});

 		api.get("/data/analytics/2")
 		.expect(500,done);
 	})
 });