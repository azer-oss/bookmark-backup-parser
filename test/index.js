const test = require("prova")
const parse = require("../")

test("samples/chrome-big.html", t => {
  const html = require("fs")
    .readFileSync("./test/sample-files/chrome-big.html")
    .toString()

  const parsed = parse(html)
  t.equal(parsed.length, 24119)
  t.equal(parsed[0].title, "Buttermilk Banana Bread")
  t.deepEqual(parsed[0].tags, ["made", "quickbreads_sweet"])

  t.end()
})

test("samples/netscape-tiny.html", t => {
  const html = require("fs")
    .readFileSync("./test/sample-files/netscape-tiny.html")
    .toString()
  const parsed = parse(html)
  t.equal(parsed.length, 6)
  t.equal(parsed[0].url, "http://novatogatorop.com/")
  t.equal(parsed[0].title, "Nova Togatorop")
  t.equal(parsed[0].addedAt, 1509512514000)
  t.deepEqual(parsed[0].tags, ["foo"])

  t.equal(parsed[1].title, "Github")
  t.equal(parsed[1].url, "https://github.com/")
  t.equal(parsed[1].addedAt, 1509512445000)
  t.deepEqual(parsed[1].tags, ["bar", "foo"])

  t.equal(parsed[2].title, "Kozmos")
  t.equal(parsed[2].url, "https://getkozmos.com/")
  t.equal(parsed[2].addedAt, 1509512489000)
  t.deepEqual(parsed[2].tags, ["bar", "foo"])

  t.equal(parsed[3].title, "Azer Koçulu")
  t.equal(parsed[3].url, "http://azer.bike/")
  t.equal(parsed[3].addedAt, 1509512461000)
  t.deepEqual(parsed[3].tags, ["span"])

  t.equal(parsed[4].title, "Youtube")
  t.equal(parsed[4].url, "https://youtube.com/")
  t.equal(parsed[4].addedAt, 1509524061000)
  t.deepEqual(parsed[4].tags, ["yolo"])

  t.equal(parsed[5].title, "Wikipedia")
  t.equal(parsed[5].url, "https://en.wikipedia.org/")
  t.equal(parsed[5].addedAt, 1509524085000)
  t.deepEqual(parsed[5].tags, ["yolo"])

  t.end()
})

test("samples/firefox.html", t => {
  const html = require("fs")
    .readFileSync("./test/sample-files/firefox.html")
    .toString()
  const parsed = parse(html)
  t.equal(parsed.length, 11)
  t.end()
})

test("samples/safari.html", t => {
  const html = require("fs")
    .readFileSync("./test/sample-files/safari.html")
    .toString()
  const parsed = parse(html)
  t.equal(parsed.length, 4)

  t.equal(parsed[0].url, "https://www.apple.com/")
  t.equal(parsed[0].title, "Apple")
  t.notOk(parsed[0].addedAt)
  t.notOk(parsed[0].tags)

  t.equal(parsed[1].url, "https://www.icloud.com/")
  t.equal(parsed[1].title, "iCloud")
  t.notOk(parsed[1].addedAt)
  t.notOk(parsed[1].tags)

  t.end()
})

test("samples/netscape-big.html", t => {
  const html = require("fs")
    .readFileSync("./test/sample-files/netscape-big.html")
    .toString()
  const parsed = parse(html)
  t.equal(parsed.length, 5402)
  t.end()
})

test("samples/pocket.html", t => {
  const html = require("fs")
    .readFileSync("./test/sample-files/pocket.html")
    .toString()
  const parsed = parse(html)

  t.equal(parsed.length, 4)
  t.equal(parsed[0].url, "http://github.com")
  t.equal(parsed[0].title, "Github")
  t.equal(parsed[0].addedAt, 1509515224000)
  t.deepEqual(parsed[0].tags, ["coding", "open source", "programming"])

  t.equal(parsed[1].title, "Azer Koçulu")
  t.equal(parsed[1].url, "http://azer.bike")
  t.equal(parsed[1].addedAt, 1502366628000)
  t.deepEqual(parsed[1].tags, ["personal"])

  t.equal(parsed[2].title, "Youtube")
  t.equal(parsed[2].url, "https://www.youtube.com/watch?v=5q9H2cd36RU")
  t.equal(parsed[2].addedAt, 1494036573000)
  t.notOk(parsed[2].tags)

  t.equal(parsed[3].title, "Kozmos")
  t.equal(parsed[3].url, "http://getkozmos.com")
  t.equal(parsed[3].addedAt, 1494036561000)
  t.notOk(parsed[3].tags)

  t.end()
})

test("samples/pinboard.json", t => {
  const input = require("fs")
    .readFileSync("./test/sample-files/pinboard.json")
    .toString()
  const parsed = parse(input)
  t.equal(parsed.length, 5399)

  t.equal(parsed[0].url, "https://echo.labstack.com/middleware/gzip")
  t.equal(
    parsed[0].title,
    "Gzip Middleware | Echo - High performance, minimalist Go web framework"
  )
  t.equal(parsed[0].addedAt, 1495110788000)
  t.deepEqual(parsed[0].tags, ["golang", "library"])

  t.equal(parsed[1].url, "https://github.com/NYTimes/gziphandler")
  t.equal(
    parsed[1].title,
    "NYTimes/gziphandler: Golang middleware to gzip HTTP responses"
  )
  t.equal(parsed[1].addedAt, 1495110604000)
  t.deepEqual(parsed[1].tags, ["compression"])

  t.equal(parsed[2].url, "https://gist.github.com/the42/1956518")
  t.equal(
    parsed[2].title,
    "GZip encoding for GO V1 using custom responsewriter"
  )
  t.equal(parsed[2].addedAt, 1495110600000)
  t.deepEqual(parsed[2].tags, ["gist", "gzip"])

  t.equal(
    parsed[3].url,
    "https://us-west-2.console.aws.amazon.com/console/home?region=us-west-2#"
  )
  t.equal(parsed[3].title, "AWS Management Console")
  t.equal(parsed[3].addedAt, 1495108630000)
  t.notOk(parsed[3].tags)

  t.end()
})

test("samples/bookmarks.txt", t => {
  const input = require("fs")
    .readFileSync("./test/sample-files/bookmarks.txt")
    .toString()
  const parsed = parse(input)
  t.equal(parsed.length, 3)

  t.equal(parsed[0].url, "https://siteinspire.com")
  t.notOk(parsed[0].title)
  t.equal(parsed[0].addedAt, 1502981647000)
  t.notOk(parsed[0].tags)

  t.equal(parsed[1].url, "http://itsnicethat.com")
  t.equal(parsed[1].addedAt, 1502981606000)
  t.notOk(parsed[1].title)
  t.notOk(parsed[1].tags)

  t.equal(parsed[2].url, "https://land-book.com")
  t.equal(parsed[2].addedAt, 1502980736000)
  t.notOk(parsed[2].title)
  t.notOk(parsed[2].tags)

  t.end()
})

test("samples/chrome.json", t => {
  const input = require("fs")
    .readFileSync("./test/sample-files/chrome.json")
    .toString()
  const parsed = parse(input)
  t.equal(parsed.length, 6)

  t.equal(parsed[0].title, "Github")
  t.equal(parsed[0].url, "https://github.com/")
  t.equal(parsed[0].addedAt, 1509512445162)
  t.deepEqual(parsed[0].tags, ["foo", "bar"])

  t.equal(parsed[1].url, "http://novatogatorop.com/")
  t.equal(parsed[1].title, "Nova Togatorop")
  t.equal(parsed[1].addedAt, 1509512514026)
  t.deepEqual(parsed[1].tags, ["foo"])

  t.equal(parsed[2].title, "Azer Koçulu")
  t.equal(parsed[2].url, "http://azer.bike/")
  t.equal(parsed[2].addedAt, 1509512461626)
  t.deepEqual(parsed[2].tags, ["span"])

  t.equal(parsed[3].title, "Youtube")
  t.equal(parsed[3].url, "https://youtube.com/")
  t.equal(parsed[3].addedAt, 1509524061518)
  t.deepEqual(parsed[3].tags, ["yolo"])

  t.equal(parsed[4].title, "Wikipedia")
  t.equal(parsed[4].url, "https://en.wikipedia.org/")
  t.equal(parsed[4].addedAt, 1509524085123)
  t.deepEqual(parsed[4].tags, ["yolo"])

  t.equal(parsed[5].title, "Kozmos")
  t.equal(parsed[5].url, "https://getkozmos.com")
  t.equal(parsed[5].addedAt, 1510289975272)
  t.deepEqual(parsed[5].tags, ["yolo"])

  t.end()
})

test("samples/kozmos.json", t => {
  const input = require("fs")
    .readFileSync("./test/sample-files/kozmos.json")
    .toString()
  const parsed = parse(input)
  t.equal(parsed.length, 8)
  t.equal(
    parsed[0].title,
    "A gentle introduction to Golang Modules - Ukiah Smith"
  )
  t.equal(
    parsed[0].url,
    "https://ukiahsmith.com/blog/a-gentle-introduction-to-golang-modules/"
  )
  t.equal(parsed[0].addedAt, 1536475223000)
  t.deepEqual(parsed[0].tags, ["go"])

  t.end()
})
