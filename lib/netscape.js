const NetscapeBookmarks = require("./netscape-bookmarks")
const normalize = require("./normalize")

module.exports = {
  parse,
  test
}

function test(input) {
  return input.trim().charAt(0) === "<" && input.indexOf("<DL>") > -1
}

function parse(input) {
  const bookmarks = new NetscapeBookmarks()
  bookmarks.read(normalize.html3(input))

  const result = []
  const map = {}
  flatten(bookmarks.root, result, map)

  return result
}

function flatten(folder, list, map) {
  const len = folder.links.length
  let i = -1
  while (++i < len) {
    if (map[folder.links[i].url] || !/^\w+:\/\//.test(folder.links[i].url))
      continue

    if (!folder.links[i].tags || folder.links[i].tags.length === 0) {
      folder.links[i].tags = tags(folder)
    }

    list.push(folder.links[i])
    map[folder.links[i].url] = true
  }

  const flen = folder.children.length
  i = -1
  while (++i < flen) {
    flatten(folder.children[i], list, map)
  }
}

function tags(folder) {
  const tags = []
  while (!folder.root) {
    let tag = normalize.tag(folder.title)

    if (tag) {
      tags.push(tag)
    }

    folder = folder.parent()
  }

  if (tags.length > 0) {
    return tags
  }
}
