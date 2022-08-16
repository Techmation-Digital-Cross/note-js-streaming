const express = require("express");
const fs = require("fs");
const app = express();

app.get("/", function (req, res) {
  res.status(200).send("server is working !");
});

app.get("/video", function (req, res) {
  // Validation
  const range = req.headers.range;
  if (!range) {
    return res.status(400).send("Required range header.");
  }

  const videoPath = "./dummy.mp4";
  const videoSize = fs.statSync(videoPath).size;
  const chunkSize = 20 ** 6;

  // Convert to number
  const start = Number(range.replace(/\D/g, ""));
  // Checking end range exceed the videoSize
  const end = Math.min(start + chunkSize, videoSize - 1);
  const contentLength = end - start + 1;
  const headers = {
    "Content-Range": `bytes ${start}-${end}/${videoSize}`,
    "Accept-Ranges": "bytes",
    "Content-Length": contentLength,
    "Content-Type": "video/mp4",
  };

  res.writeHead(206, headers);
  const videoStream = fs.createReadStream(videoPath, { start, end });
  videoStream.pipe(res);
});

app.listen(3000, function () {
    console.log("Server is listening on port : ", 3000);
})
