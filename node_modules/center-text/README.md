# center-text [![Build status](https://travis-ci.org/twolfson/center-text.png?branch=master)](https://travis-ci.org/twolfson/center-text)

Center text horizontally

This was built as part of a CLI presentation to horizontally center text. As a result, this will properly center [ANSI colored text][].

**It was not designed to work with non-monospaced text.**

[ANSI colored text]: http://en.wikipedia.org/wiki/ANSI_escape_code

## Getting Started
Install the module with: `npm install center-text`

```javascript
// In an 40 column terminal
var centerText = require('center-text');
centerText('Hello World!');
// Returns '              Hello World!              ';
```

## Documentation
`center-text` exposes a function, `centerText`, as its `module.exports`.

### `centerText(text, options)`
Return string of centered text

- text `String` - Content to center
- options `Object`
    - columns `Number` - Amount of columns to center between. If not provided, `process.stdout.columns` will be used.
    - leftBias `Boolean` - If truthy, uneven offsets will pad to the right more than the left.
        - See [Examples](#examples) for more info

## Examples
An example of `leftBias` in action:

```js
centerText('aa', {
  columns: 3
});
// Returns ' aa'

centerText('aa', {
  columns: 3,
  leftBias: true
});
// Returns 'aa '
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint via [grunt](https://github.com/gruntjs/grunt) and test via `npm test`.

## Donating
Support this project and [others by twolfson][gittip] via [gittip][].

[![Support via Gittip][gittip-badge]][gittip]

[gittip-badge]: https://rawgithub.com/twolfson/gittip-badge/master/dist/gittip.png
[gittip]: https://www.gittip.com/twolfson/

## Unlicense
As of Nov 30 2013, Todd Wolfson has released this repository and its contents to the public domain.

It has been released under the [UNLICENSE][].

[UNLICENSE]: UNLICENSE
