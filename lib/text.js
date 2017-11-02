const normalize = require("./normalize")

module.exports = {
  parse
}

function parse (input) {
  const result = []
  const marked = {}

  const lines = input.split('\n')
  const len = lines.length
  let i = -1

  while (++i < len) {
    let row = parseLine(lines[i])
    if (row) {
      result.push(row)
    }
  }

  return result
}

function parseLine (line) {
  const url = line.match(/([^\w]|^)(https?:[\/\\]+[^\s"'<> ]+)/i)
  if (!url) return

  const date = extractDate(line.replace(url, ''))

  return {
    url: url[2],
    addedAt: date ? Number(date) : null
  }
}

function extractDate (text) {
  var date = text.match(/([^\w]|^)(\d{4}-\d{1,2}-\d{1,2})([^\d]|$)/)
  if (date) {
    date = new Date(date[2])
    if (isValidDate(date)) {
      return date
    }
  }

  var miliseconds = text.match(/([^\w]|^)(\d{12,13})([^\d]|$)/)
  if (miliseconds) {
    date = new Date(Number(miliseconds[2].trim()))
    if (isValidDate(date)) {
      return date
    }
  }

  var seconds = text.match(/([^\w]|^)(\d{9,10})([^\d]|$)/)
  if (seconds) {
    date = new Date(Number(seconds[2].trim()) * 1000)
    if (isValidDate(date)) {
      return date
    }
  }

  return null
}

function isValidDate (date) {
  var year = date.getFullYear()
  return year > 1990 && year < 2025
}
