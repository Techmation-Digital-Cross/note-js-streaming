const fs = require("fs");
const readableStream = fs.createReadStream("./dummy.txt");
let data = "";
let chunk;

readableStream.on("readable", () => {
  while ((chunk = readableStream.read()) !== null) {
    data += chunk;
  }
});

readableStream.on("end", function () {
  console.log(data);
});
