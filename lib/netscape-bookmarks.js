const HTMLWalker = require('./html-walker')

class NetscapeBookmarks extends HTMLWalker {
  constructor() {
    super()

    this.isExpectingFolderTitle = false
    this.isExpectingFolderTitle = false
    this.nextFolderTitle = ''

    this.root = {
      title: 'root',
      root: true,
      children: [],
      links: []
    }

    this.currentFolder = this.root
  }

  addLink(attrs) {
    let ts = this.get(attrs, 'add_date')
    if (ts.length < 12) {
      ts += '000'
    }

    this.currentFolder.links.push({
      url: this.get(attrs, 'href'),
      addedAt: Number(ts)
    })

    this.expectingLinkTitle = true
  }

  addFolder() {
    const parent = this.currentFolder

    this.currentFolder = {
      title: this.nextFolderTitle,
      parent: () => parent,
      children: [],
      links: []
    }

    parent.children.push(this.currentFolder)
    this.nextFolderTitle = ''
  }

  expectFolderTitle(attrs) {
    if (this.get(attrs, 'add_date') && !this.get(attrs, 'personal_toolbar_folder')) {
      this.isExpectingFolderTitle = true
    }
  }

  normalizeInput(input) {
    return input.replace(/<DT>/g, '').replace(/<\/DT>/g, '').replace(/<p>/g, '').replace(/<\/p>/g, '')
  }

  onStartNode(tag, getAttrs) {
    tag = this.normalizeTag(tag)

    switch(tag){
    case "a":
      this.addLink(getAttrs())
      break;
    case "dl":
      this.addFolder(getAttrs())
      break;
    case "h3":
      this.expectFolderTitle(getAttrs())
      break;
    };
  }

  onEndNode(tag) {
    tag = this.normalizeTag(tag)

    if (tag == 'dl' && !this.currentFolder.root) {
      this.currentFolder = this.currentFolder.parent()
      return
    }
  }

  onTextNode(text) {
    if (this.isExpectingLinkTitle) {
      this.currentFolder.links[this.currentFolder.links.length - 1].title = text
      this.isExpectingLinkTitle = false
    }

    if (this.isExpectingFolderTitle) {
      this.nextFolderTitle = text
      this.isExpectingFolderTitle = false
    }
  }

}

module.exports = NetscapeBookmarks
