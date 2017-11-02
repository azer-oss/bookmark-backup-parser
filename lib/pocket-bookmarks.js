const HTMLWalker = require("./html-walker")
const normalize = require("./normalize")

class PocketBookmarks extends HTMLWalker {
  constructor() {
    super()
    this.isExpectingLinkTitle = false
    this.links = []
  }

  addLink(attrs) {
    const url = this.get(attrs, 'href')

    if (url.indexOf('https://getpocket.com/installed') === 0) {
      return
    }

    this.links.push({
      url,
      addedAt: normalize.timestamp(this.get(attrs, 'time_added')),
      tags: normalize.tags(this.get(attrs, 'tags'))
    })

    this.isExpectingLinkTitle = true
  }

  onStartNode(tag, getAttrs) {
    tag = normalize.htmlTag(tag)

    switch(tag){
    case "a":
      this.addLink(getAttrs())
      break;
    };
  }

  onTextNode(text) {
    if (this.isExpectingLinkTitle) {
      this.links[this.links.length - 1].title = text
      this.isExpectingLinkTitle = false
    }
  }
}

module.exports = PocketBookmarks
