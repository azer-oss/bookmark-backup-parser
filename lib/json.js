const normalize = require("./normalize")

const URL_FIELDS = ['url', 'href', 'link']
const TITLE_FIELDS = ['title', 'name', 'description', 'desc']
const TIME_FIELDS = ['time', 'added_at', 'created_at', 'addedAt', 'createdAt', 'likedAt']
const TAG_FIELDS = ['tags', 'keywords']

module.exports = {
  parse,
  test
}

function test (input) {
  try {
    JSON.parse(input)
    return true
  } catch (err) {
    return false
  }
}

function parse (input) {
  let parsed

  try {
    parsed = JSON.parse(input)
  } catch (err) {
    return []
  }

  if (!Array.isArray(parsed)) {
    let keys = Object.keys(parsed)
    if (keys.length == 1 && Array.isArray(parsed[keys[0]])) {
      keys = parsed[keys[0]]
    }
  }

  const links = []
  const len = parsed.length
  let i = -1
  while (++i < len) {
    let link = lookupFields(parsed[i])
    if (!link) continue
    links.push(link)
  }

  return links
}

function lookupFields (obj) {
  if (!obj) return

  const url = lookupField(obj, URL_FIELDS)
  const title = lookupField(obj, TITLE_FIELDS)
  const time = lookupField(obj, TIME_FIELDS)
  let tags = lookupField(obj, TAG_FIELDS)

  if (!url || !/^\w+:\/\//.test(url)) return

  if (typeof tags === 'string') {
      tags = tags.split(/[\s',]+/)
  }

  return {
    url: url,
    title: title,
    addedAt: normalize.timestamp(time),
    tags: normalize.tags(tags)
  }
}

function lookupField (obj, fields) {
  const len = fields.length
  let i = -1

  while (++i < len) {
    if (obj[fields[i]]) {
      return obj[fields[i]]
    }
  }
}
