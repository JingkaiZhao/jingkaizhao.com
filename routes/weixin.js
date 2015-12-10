var express = require('express');
var crypto = require('crypto');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  var signature = req.query.signature;
  var timestamp = req.query.timestamp;
  var nonce = req.query.nonce;
  var echostr = req.query.echostr;
  var token = 'LGvY1AfeYHs43zACDNAXAYy7AEmbePMsZoJhgsMZvVmQh5nSWBx36vVSvbWkDkqfu_OzqPGKroX9-_zpKBr9fr-1x8rIURe1A3ZmLVRpbQoZPKbACAVLG';
 
  //1. put token, timestamp, nonce sort in dictionary
  var array = new Array(token,timestamp,nonce);
  array.sort();
  var str = array.toString().replace(/,/g,"");

  //2. encrypt 3 strings to 1 string with sha1
  var sha1Code = crypto.createHash("sha1");
  var code = sha1Code.update(str,'utf-8').digest("hex");
 
  //3. identify if encrypted string is same with singature
  if (code === signature){
    res.send(echostr)
  } else {
    res.send("error");
  }
});

module.exports = router;