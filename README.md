## bookmark-backup-parser

Take a bookmark backup formatted as XML or HTML, return a flat JSON of bookmarks.
Supports Netscape, Pocket and any text formats, includes a web worker messaging interface.

Supported Formats:

| Format | Timestamps? | Tags / Folders? |
| --- | --- |
| Netscape | ✔ | ✔ |
| Pocket | ✔ | ✔ |
| Txt  | * | ✖ |

* Timestamps can be extracted from `txt` files only if URL and timestamp is in the same line.

## Install

```bash
$ npm install kozmos/bookmark-backup-parser
```

## Usage

```js
const parse = require('bookmark-backup-parser')
const html = require('fs').readFileSync('./bookmarks.html').toString()

const parsed = parse(html)
// [
//   { url: "http://kozmos.cool", createdAt: 1501384533000, tags: ['foo', 'bar'] },
//   ...
// ]
```
