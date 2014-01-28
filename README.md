uwebtools
========

[![NPM](https://nodei.co/npm/uwebtools.png?downloads=true)](https://nodei.co/npm/uwebtools/)

Usishi Webtools library for web projects written with node.js

[![Build Status](https://secure.travis-ci.org/usishi/uwebtools.png)](http://travis-ci.org/usishi/uwebtools)

```javascript
var uutils = global.uutils = uwebtools.uutils.createObject();
var imageGuru = global.imageGuru = uwebtools.imageGuru.createObject();



```

```javascript
app.use('/metaimage',webtools.reducedImage(__dirname + '/static/meta/images', {}));
```