const normalize = require("./normalize")

module.exports = {
  parse,
  test
}

function test (input) {
  let parsed

  try {
    parsed = JSON.parse(input)
  } catch (err) {
    return false
  }

  return Array.isArray(parsed) && parsed[0].dateAdded
}

function parse (input) {
  let parsed

  try {
    parsed = JSON.parse(input)
  } catch (err) {
    return []
  }

  const result = []
  walk(parsed, result, [])

  return result
}

function walk (rows, result, tags) {
  const len = rows.length
  let i = -1

  while (++i < len) {
    if (rows[i].url) {
      result.push({
        url: rows[i].url,
        addedAt: normalize.timestamp(rows[i].dateAdded),
        title: rows[i].title,
        tags
      })
    } else if (rows[i].children) {
      let tag = normalize.tag(rows[i].title)
      walk(rows[i].children, result, tag ? tags.concat([tag]) : tags)
    }
  }
}
