const test = require("prova")
const netscape = require("../lib/netscape")

test('samples/netscape-tiny.html', t => {
  const html = require('fs').readFileSync("./test/sample-files/netscape-tiny.html").toString()
  const parsed = netscape.parse(html)
  t.equal(parsed.length, 6)
  t.equal(parsed[0].url, 'http://novatogatorop.com/')
  t.equal(parsed[0].title, 'Nova Togatorop')
  t.equal(parsed[0].addedAt, 1509512514000)
  t.deepEqual(parsed[0].tags, ['foo'])

  t.equal(parsed[1].title, 'Github')
  t.equal(parsed[1].url, 'https://github.com/')
  t.equal(parsed[1].addedAt, 1509512445000)
  t.deepEqual(parsed[1].tags, ['bar', 'foo'])

  t.equal(parsed[2].title, 'Kozmos')
  t.equal(parsed[2].url, 'https://getkozmos.com/')
  t.equal(parsed[2].addedAt, 1509512489000)
  t.deepEqual(parsed[2].tags, ['bar', 'foo'])

  t.equal(parsed[3].title, 'Azer Koçulu')
  t.equal(parsed[3].url, 'http://azer.bike/')
  t.equal(parsed[3].addedAt, 1509512461000)
  t.deepEqual(parsed[3].tags, ['span'])

  t.equal(parsed[4].title, 'Youtube')
  t.equal(parsed[4].url, 'https://youtube.com/')
  t.equal(parsed[4].addedAt, 1509524061000)
  t.deepEqual(parsed[4].tags, ['yolo'])

  t.equal(parsed[5].title, 'Wikipedia')
  t.equal(parsed[5].url, 'https://en.wikipedia.org/')
  t.equal(parsed[5].addedAt, 1509524085000)
  t.deepEqual(parsed[5].tags, ['yolo'])

  t.end()
})

test('samples/firefox.html', t => {
  const html = require('fs').readFileSync("./test/sample-files/firefox.html").toString()
  const parsed = netscape.parse(html)
  t.equal(parsed.length, 7)
  t.end()
})
