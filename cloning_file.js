const fs = require("fs");

let readableStream = fs.createReadStream("./test.apk");
let writableStream = fs.createWriteStream(
  `./output/${new Date().getTime()}.apk`
);

readableStream.setEncoding("utf8");

// Flowing mode
// readableStream.on("data", (chunk) => {
//   writableStream.write(chunk);
// });

// Pause mode
let chunk;
readableStream.on("readable", () => {
  while ((chunk = readableStream.read(1000000)) !== null) {
    console.log("Cloning each MB.");
    writableStream.write(chunk);
  }
});

writableStream.on("error", (err) => {
  console.log(err.stack);
});
