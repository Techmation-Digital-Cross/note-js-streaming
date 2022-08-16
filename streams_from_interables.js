const { Readable } = require("stream");

async function* generate() {
  yield "hello";
  yield "world";
}

const readable = Readable.from(generate());

readable.on("data", (chunk) => {
  console.log(chunk);
});
