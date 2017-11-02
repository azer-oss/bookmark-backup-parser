const netscape = require("./lib/netscape")
const json = require("./lib/json")
const pocket = require("./lib/pocket")
const text = require("./lib/text")

const parsers = [
  netscape,
  pocket,
  json,
  text
]

module.exports = parse

function parse (input) {
  const len = parsers.length
  let i = -1
  while (++i < len) {
    if (parsers[i].test(input)) {
      return parsers[i].parse(input)
    }
  }
}
