var
  uuid            = require('node-uuid')
  ,crypto         = require('crypto')
  ,querystring    = require('querystring')
  ;


function pad(val, len) {
  val = String(val);
  len = len || 2;
  while (val.length < len) val = "0" + val;
  return val;
};

exports.uutils=uutils={
  randompassword : ''
  ,_isObject : function(a) {
    return (!!a) && (a.constructor === Object);
  }
  ,sendReturn :  function(res,returnVal) {
    res.contentType('application/json');
    if (this._isObject(returnVal)){
      res.send(JSON.stringify(returnVal));
    } else {
      res.send(returnVal);
    }
  }
  ,_bytesToSize:function(bytes, precision)
  {  
      var kilobyte = 1024;
      var megabyte = kilobyte * 1024;
      var gigabyte = megabyte * 1024;
      var terabyte = gigabyte * 1024;
     
      if ((bytes >= 0) && (bytes < kilobyte)) {
          return bytes + ' B';
   
      } else if ((bytes >= kilobyte) && (bytes < megabyte)) {
          return (bytes / kilobyte).toFixed(precision) + ' KiB';
   
      } else if ((bytes >= megabyte) && (bytes < gigabyte)) {
          return (bytes / megabyte).toFixed(precision) + ' MiB';
   
      } else if ((bytes >= gigabyte) && (bytes < terabyte)) {
          return (bytes / gigabyte).toFixed(precision) + ' GiB';
   
      } else if (bytes >= terabyte) {
          return (bytes / terabyte).toFixed(precision) + ' TeB';
   
      } else {
          return bytes + ' Bi';
      }
  }
  ,_turkceTarih : function(_date){
     var weekday = new Array(7);
     weekday[1] = 'Pazar';
     weekday[2] = 'Pazartesi';
     weekday[3] = 'Salı';
     weekday[4] = 'Çarşamba';
     weekday[5] = 'Perşembe';
     weekday[6] = 'Cuma';
     weekday[7] = 'Cumartesi';
     // Aylar
     var month = new Array(12);
     month[1] = 'Ocak';
     month[2] = 'Şubat';
     month[3] = 'Mart';
     month[4] = 'Nisan';
     month[5] = 'Mayıs';
     month[6] = 'Haziran';
     month[7] = 'Temmuz';
     month[8] = 'Ağustos';
     month[9] = 'Eylül';
     month[10] = 'Ekim';
     month[11] = 'Kasım';
     month[12] = 'Aralık';

     yr_st = " 19";
     yr = _date.getYear();
     if ( yr > 99 )
     {
     yr_st =" ";
     if ( yr < 2000 ) yr += 1900;
     }
     
     return _date.getDate() + ' ' 
            + month[_date.getMonth()+1] + ' ' 
            + yr_st+ yr + ' ' 
            + pad(_date.getHours(),2) + ":" + pad(_date.getMinutes(),2) + ":" + pad(_date.getSeconds(),2)
  }
  ,_enctext: function(text){
    var cipher = crypto.createCipher('aes-256-cbc',this.randompassword)
    var crypted = cipher.update(text,'utf8','hex')
    crypted += cipher.final('hex');
    return crypted;
  }
  ,_dectext:function(text){
    var decipher = crypto.createDecipher('aes-256-cbc',this.randompassword)
    var dec = decipher.update(text,'hex','utf8')
    dec += decipher.final('utf8');
    return dec;
  }
  ,_hashString:function(str){
    var shasum = crypto.createHash('sha1');
    shasum.update(str);
    return shasum.digest('hex');
  }
  ,httpPostData : function(settings,data,cb){
    var postdata = querystring.stringify(data);
    settings.headers= {
                  'Content-Type': 'application/x-www-form-urlencoded',
                  'Content-Length': postdata.length
              };
    settings.method='POST';
                            
    var req=http.request(settings, function(res) {
      res.body='';
      res.setEncoding('utf8');
      res.on('data',function(chunk){
        res.body+=chunk;
      });
      res.on('end',function(){
        cb(res.body);
      });
      res.on('error',function(e){
        cb('bhUtils-httpPostData(res) :'+e);
      });
    });
    req.on('socket', function (socket) {
      socket.setTimeout(60000*10); //10 min
      socket.on('timeout', function() {
        cb('bhUtils-httpPostData(req) :Connection Timeout');   
      });
    });
    req.on('error',function(e){
      cb('bhUtils-httpPostData(req) :'+e); 
    });
    req.write(postdata);
    req.end();
  }
}

exports.createObject=function(){
  var obj = Object.create(uutils);
  obj.randompassword = uuid.v4();
  return obj;
}