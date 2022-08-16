const assert = require("assert");
const { Readable } = require("stream");

async function readableToString(readable) {
  let result = "";
  for await (const chunk of readable) {
    result += chunk;
  }
  return result;
}

const readable = Readable.from("Good mornign !", { encoding: "utf8" });
readableToString(readable).then((string) => {
  assert.equal(string, "Good mornign !");
});
