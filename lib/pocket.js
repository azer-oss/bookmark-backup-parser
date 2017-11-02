const PocketBookmarks = require("./pocket-bookmarks")

module.exports = {
  parse
}

function parse (input) {
  const bookmarks = new PocketBookmarks()
  bookmarks.read(input)
  return bookmarks.links
}
