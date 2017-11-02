const PocketBookmarks = require("./pocket-bookmarks")

module.exports = {
  parse,
  test
}

function parse (input) {
  const bookmarks = new PocketBookmarks()
  bookmarks.read(input)
  return bookmarks.links
}

function test (input) {
  return input.trim().charAt(0) === '<' && input.indexOf('<ul>') > -1
}
