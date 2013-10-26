

exports.imageguru=imageguru={
	reducedImage : require('./reducedImage')
}


exports.createObject=function(){
  var obj = Object.create(imageguru);
  return obj;
}