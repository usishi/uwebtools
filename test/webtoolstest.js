var 
	uwebtools = require('../')
	,assert   = require('assert')
  ,should  = require('should')
	;

var testVariables = {
	testString:"Hello Word"
}

var uutils = global.uutils = uwebtools.uutils.createObject();

describe('uutils',function(){
  describe('Türkçe Tarih',function(){
    it('returns a string',function(done){
      var donen = uutils._turkceTarih(new Date());
      donen.should.be.string;
      done();
    });
  });
  describe('enctext dectext',function(){
  	var encoded='';
  	var decoded='';
  	it('enctext returns a string',function(done){
  		encoded=uutils._enctext(testVariables.testString);
  		encoded.should.be.string;
  		done();
  	});
  	it('dectext returns a string',function(done){
  		decoded=uutils._dectext(encoded);
  		decoded.should.be.string;
  		done();
  	});
  	it('decoded text must same test input',function(done){
  		decoded.should.be.equal(testVariables.testString);
  		done();
  	});
  });
  describe('bytesToSize',function(){
  	it('returns a string',function(done){
  		var size = uutils._bytesToSize(Math.floor(Math.random() * 1000000000),2);
  		size.should.be.string;
  		done();
  	});
  });
});