const NetscapeBookmarks = require("./netscape-bookmarks")

module.exports = {
  parse
}

function parse (input) {
  const bookmarks = new NetscapeBookmarks()
  bookmarks.read(bookmarks.normalizeInput(input))

  const result = []
  const map = {}
  flatten(bookmarks.root, result, map)

  return result
}

function flatten (folder, list, map) {
  const len = folder.links.length
  let i = -1
  while (++i < len) {
    if (map[folder.links[i].url]) continue

    folder.links[i].tags = tags(folder)
    list.push(folder.links[i])
    map[folder.links[i].url] = true
  }

  const flen = folder.children.length
  i = -1
  while (++i < flen) {
    flatten(folder.children[i], list, map)
  }
}

function tags (folder) {
  const tags = []
  while (!folder.root) {
    if (folder.title.trim() !== '') {
      tags.push(folder.title)
    }

    folder = folder.parent()
  }

  return tags
}
