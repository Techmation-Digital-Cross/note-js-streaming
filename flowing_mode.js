const fs = require("fs");
let data = "";

// Create a readable stream
let readerStream = fs.createReadStream("./dummy.txt");
readerStream.setEncoding("utf8");

// When reader stream get data
readerStream.on("data", (chunk) => {
  data += chunk;
});

// When reader stream ends
readerStream.on("end", () => {
  console.log("End of file.");
});

// When reader stream got error
readerStream.on("error", (err) => {
  console.log(err.stack);
});
