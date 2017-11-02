## bookmark-backup-parser

Well tested, multi-format parser for your bookmarking backups. This is the library [Kozmos](https://getkozmos.com) uses for import.

**Supported Formats:**

| Format | Timestamps? | Tags?    |
| --- | --- |
| Netscape (HTML) | ✔ | * |
| Pocket (HTML) | ✔ | ✔ |
| Pinboard (JSON) | ✔ | ✔ |
| JSON | ** | ** |
| Txt  | *** | ✖ |

* Netscape (Google Chrome, Firefox) formats have folders instead of tags. This library generates tags from the folder names hierarchically.
** JSON files has to be structured as an array and also use [common property names](https://github.com/kozmos/bookmark-backup-parser/tree/master/lib/json.js#l1).
** Timestamps can be extracted from `txt` files only if URL and timestamp is in the same line.

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

## Web Worker

It's safer to use this library inside a web worker. You can either webworkerify it,
or you can generate a web worker bundle in this repo, so you can save some bytes from your app bundle.

Generate the web worker bundle, clone this repo and run `make create-worker`:

```bash
$ git clone git@github.com:kozmos/bookmark-backup-parser.git
$ cd bookmark-backup-parser
$ npm install
$ make create-worker
```

This will save the worker bundle to `dist/worker.js`. Copy that to a public
folder in your app where you can access in production, and call it from your app
like in the below example:

```js
const worker = new Worker('/public/backup-parsing-worker.js')

worker.onmessage = function (event) {
  // It'll respond you with the result
  console.log(event.data.result)
}

worker.onerror = function (event) {
  // This gets called when there is an error
  console.error(event.error)
}

// Send a message to the worker with `input` property. It has to be a string.
worker.postMessage({
  input: "..."
})
```
