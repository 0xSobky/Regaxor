# Regaxor

Regaxor (RegExp Haxxor) is a regular expression fuzzer, written in ECMAScript 6.


## Why do we need it?

Whatever you're coding, regular expressions come in handy in various situations and are often very useful but can also be very tricky to get right. Writing a regex that matches what you expect is easy; writing a regex that ___only___ matches what you expect is virtually impossible (except in trivial cases). That's where this tool comes into play—by fuzzing regular expressions, we can easily detect any issues/gotchas before learning about them the hard way.


### Regex gotchas?!

The following are just some examples of common regex gotchas (NVM the funny titles):

1. In the beginning was the Word
```javascript
let badRegex = /https?:\/\/example\.com\/[\w]*/;
let str = 'Word\nhttps://example.com/';
str.match(badRegex);
// Output: ["https://example.com/", index: 5, input: "Word↵https://example.com/", groups: undefined]

let goodRegex = /^https?:\/\/example\.com\/[\w]*/;
str.match(goodRegex);
// Output: null

'https://example.com/'.match(goodRegex);
// Output: ["https://example.com/", index: 0, input: "https://example.com/", groups: undefined]

```

2. Catch 22
```javascript
let badRegex = /[123]|22/g;
badRegex.exec('22');
// Output: ["2", index: 0, input: "22", groups: undefined]

let goodRegex = /22|[123]/g;
goodRegex.exec('22');
// Output: ["22", index: 0, input: "22", groups: undefined]

```

3. One sneaky dot
```javascript
let str = 'https://exampleXcom';
let badRegex = /^\w+:\/\/example.com$/;
badRegex.exec(str);
// Output: ["https://exampleXcom", index: 0, input: "https://exampleXcom", groups: undefined]

let goodRegex = /^\w+:\/\/example\.com$/;
goodRegex.exec(str);
// Output: null

goodRegex.exec('https://example.com');
// Output: ["https://example.com", index: 0, input: "https://example.com", groups: undefined]

```

4. All or nothing
```javascript
let badRegex = /^\.*|\d+$/g;
'abc'.match(badRegex);
// Output: [""]

let goodRegex = /^[\d.]+$/g;
'abc'.match(goodRegex);
// Output: null

'12.3'.match(goodRegex);
// Output: ["12.3"]

```

5. The word boundary trap
```javascript
let badRegex = /word/;
badRegex.exec('aworda');
// Output: ["word", index: 1, input: "aworda", groups: undefined]

let goodRegex = /\bword\b/;
goodRegex.exec('aworda');
// Output: null

goodRegex.exec('a word');
// Output: ["word", index: 2, input: "a word", groups: undefined]

```

6. Multiline confusion
```javascript
let badRegex = /a.*b/;
badRegex.exec('a\nb');
// Output: null

let alsoBadRegex = /a.*b/m;
alsoBadRegex.exec('a\nb');
// Output: null

let goodRegex = /a[^]*b/;
goodRegex.exec('a\nb');
// Output: ["a↵b", index: 0, input: "a↵b", groups: undefined]

```

7. One escape is not enough
```javascript
let badRegex = 'x\.com';
new RegExp(badRegex).exec('xycom');
// Output: ["xycom", index: 0, input: "xycom", groups: undefined]

let goodRegex = 'x\\.com';
new RegExp(goodRegex).exec('xycom');
// Output: null

new RegExp(goodRegex).exec('x.com');
// Output: ["x.com", index: 0, input: "x.com", groups: undefined]

```

8. Escaping the escaping
```javascript
let str = 'double\\"quotes"';

// Bad.
str.replace(/"/g, '\\"');
// Output: "double\\"quotes\""

// Not bad but not recommended.
str.replace(/(\\|")/g, '\\$1');
// Output: "double\\\"quotes\""

// Better.
str.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
// Output: "double\\\"quotes\""

```

9. Too greedy
```javascript
let badRegex = /<.+><\/.+>/g;
let tags = '<tag attribute="foo"></tag><tag id="foo"></tag>';
badRegex.exec(tags);
// Output: ["<tag attribute="foo"></tag><tag id="foo"></tag>", index: 0, input: "<tag attribute="foo"></tag><tag id="foo"></tag>", groups: undefined]

let notBadRegex = /<.+?><\/.+?>/g;
notBadRegex.exec(tags);
// Output: ["<tag attribute="foo"></tag>", index: 0, input: "<tag attribute="foo"></tag><tag id="foo"></tag>", groups: undefined]

notBadRegex.exec(tags);
// Output: ["<tag id="foo"></tag>", index: 27, input: "<tag attribute="foo"></tag><tag id="foo"></tag>", groups: undefined]

```

10. The misplaced hyphen
```javascript
let badRegex = /[\w -$]+/;
'#'.match(badRegex);
// Output: ["#", index: 0, input: "#", groups: undefined]

let goodRegex = /[\w $-]+/;
'#'.match(goodRegex);
// Output: null

'$100 USD'.match(goodRegex);
// Output: ["$100 USD", index: 0, input: "$100 USD", groups: undefined]

```

At times, writing a regex can feel like walking in a minefield. At other times, regular expressions are the wrong answer—or as Jamie Zawinski puts it `Some people, when confronted with a problem, think "I know, I'll use regular expressions." Now they have two problems.`. So, especially in security-sensitive contexts, you're probably better off not using regular expressions unless you really have to....


## Screenshot(s)

[![screenshot.png](https://github.com/0xSobky/Regaxor/raw/master/data/images/screenshot.png)](https://github.com/0xSobky/Regaxor/raw/master/data/images/screenshot.png)


## Credits

* [@0xSobky](https://twitter.com/0xSobky)
