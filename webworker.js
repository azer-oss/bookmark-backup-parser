const parse = require("./")

onmessage = function (event) {
  postMessage({
    result: parse(event.data.input)
  })
}
