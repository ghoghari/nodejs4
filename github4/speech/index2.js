var txtomp3 = require("text-to-mp3");
var fs = require("fs");
 
txtomp3.getMp3("hello my name is nikunj from surat", function(err, binaryStream){
  if(err){
    console.log(err);
    return;
  }
  var file = fs.createWriteStream("nik.mp3"); // write it down the file
  file.write(binaryStream);
  file.end();
});