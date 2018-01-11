const TAG_BLACKLIST = [
  'Bookmarks bar',
  'Bookmarks Bar',
  'Imported From Safari',
  'Other Bookmarks',
  'imported',
  'Unlabeled'
]

module.exports = {
  date,
  html3,
  htmlTag,
  tag,
  tags,
  timestamp
}

function date (input) {
  const d = new Date(input)
  if (d.toJSON()) {
    return Number(d)
  }
}

function timestamp (ts) {
  if (!ts) return

  ts = date(ts) || ts

  ts = String(ts)
  if (ts.length < 12) {
    ts += '000'
  }

  return Number(ts)
}

function tags (input) {
  if (!input) return
  if (!Array.isArray(input)) {
    input = input.split(/\s*,\s*/g)
  }

  const result = input.map(tag).filter(t => t && t.length > 0)
  if (result.length > 0) {
    return result
  }
}

function tag (input) {
  if (!input) return

  let b = TAG_BLACKLIST.length
  while (b--) {
    input = input.replace(TAG_BLACKLIST[b], '').trim()
  }

  return input.trim()
}

function htmlTag (tag) {
  return tag.toLowerCase()
}

function html3 (doc) {
  return doc
    .replace(/<DT>/g, '')
    .replace(/<\/DT>/g, '')
    .replace(/<p>/g, '')
    .replace(/<\/p>/g, '')
}
