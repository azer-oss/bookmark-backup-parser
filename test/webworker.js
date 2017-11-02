const test = require("prova")

test('parsing a large file via web worker', t => {
  t.plan(3)

  GET('/assets/in/test/sample-files/netscape-big.html', (err, file) => {
    t.error(err)
    t.ok(file)

    console.time()
    const worker = new Worker('/assets/in/dist/worker.js')
    worker.onmessage = function (event) {
      t.equal(event.data.result.length, 5402)
      console.timeEnd()
    }

    worker.onerror = function (event) {
      t.error(event.error)
    }

    worker.postMessage({
      input: file
    })
  })
})


function GET (url, callback) {
  var xmlhttp = new XMLHttpRequest()
  xmlhttp.open('GET', url)
  xmlhttp.onreadystatechange = () => {
    if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
      callback(undefined, xmlhttp.responseText)
    }
  }

  xmlhttp.send(null)
}
