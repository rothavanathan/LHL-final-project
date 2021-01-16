var express = require("express");
var router = express.Router();

/* GET home page. */
app.get("/", function (req, res) {
  var filePath = "../public/media/BURIAL_GROUND_drums.mp3";
  var stat = fs.statSync(filePath);
  var total = stat.size;
  if (req.headers.range) {
    var range = req.headers.range;
    var parts = range.replace(/bytes=/, "").split("-");
    var partialstart = parts[0];
    var partialend = parts[1];

    var start = parseInt(partialstart, 10);
    var end = partialend ? parseInt(partialend, 10) : total - 1;
    var chunksize = end - start + 1;
    var readStream = fs.createReadStream(filePath, { start: start, end: end });
    res.writeHead(206, {
      "Content-Range": "bytes " + start + "-" + end + "/" + total,
      "Accept-Ranges": "bytes",
      "Content-Length": chunksize,
      "Content-Type": "video/mp4",
    });
    readStream.pipe(res);
  } else {
    res.writeHead(200, {
      "Content-Length": total,
      "Content-Type": "audio/mpeg",
    });
    fs.createReadStream(filePath).pipe(res);
  }
});

module.exports = router;
