var fs = require('fs'),
    parse = require('url').parse,
    path = require('path'),
    fs = require('fs'),
    gm = require('gm'),
    mime = require('mime');




exports = module.exports = function getReducedImage(root, options) {

  var options = options || {},
      width = options.width || 140,
      height = options.height || 100;

  if (!root) throw new Error('getReducedImage root path  must be set');

  options.root = root;
  rootLength = root.length;

  return function(req, res, next) {
    var sendImage=function(filetosend) {
        console.log('sending File:'+filetosend);
          var stat = fs.statSync(filetosend);
          res.writeHead(200,{
            'Content-Type': type,
            'Content-Length': stat.size
          });
          fs.createReadStream(filetosend)
            .on('data',function(data) {
              res.write(data);
            })
            .on('end', function() {
              res.end();
            })
        }
    var resizeImage=function(filein,fileout,callback){
      gm(filein)
        .resize(width, height)
        .noProfile()
        /*.font("Helvetica.ttf", 12)
        .drawText(30, 20, "Gıda Havuzu") */
        .write(fileout, function (err) {
            if (!err) {
              console.log('done');
              callback()
            } else callback(err);
        });
    }

    var url, filename, type, acceptEncoding, ua;
    if (req.method !== 'GET') return next();

    url = parse(req.url);

    filename = path.join(root, url.pathname);
    type = mime.lookup(filename);
    //console.log('type:'+type+'  filename:'+filename);

    // Check for requested file
    fs.stat(filename, function(err, stat) {
      if (err || stat.isDirectory()) {
        console.log('HATA'); //resim bulunamadı gönderilecek
        sendImage(path.join(root,'..','404.png'));
      } else {
        var resizedFilename = path.join(root,'..','cache',url.pathname);
        fs.exists(resizedFilename, function(exists) {
          if (exists) {
            sendImage(resizedFilename);
          } else {
            resizeImage(filename,resizedFilename,function(err){
              if (err){
                console.log(err);
                sendImage(path.join(root,'..','404.png'));
              } else {
                sendImage(resizedFilename);
              }
            });
          }
        });
      }

    });  //fs.stat
  }; //return func
};
