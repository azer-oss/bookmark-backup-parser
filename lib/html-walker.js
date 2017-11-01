const Sax = require("easysax")

class HTMLWalker {
  constructor() {
    this.parser = new Sax();
    this.parser.on('startNode', (tag, attrs) => this.onStartNode(tag, attrs))
    this.parser.on('endNode', (tag) => this.onEndNode(tag))
    this.parser.on('textNode', (text) => this.onTextNode(text))
  }

  get(attrs, key) {
    return attrs[key] || attrs[key.toUpperCase()]
  }

  read(input) {
    this.parser.parse(input)
  }

  normalizeTag(tag) {
    return tag.toLowerCase()
  }

  onStartNode() {}
  onEndNode() {}
  onTextNode(text) {}
}

module.exports = HTMLWalker
