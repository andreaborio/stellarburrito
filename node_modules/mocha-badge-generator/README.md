# Mocha Badge Generator

![Test](https://raw.githubusercontent.com/ianpogi5/mocha-badge-generator/master/test/badge.svg?sanitize=true)
[![Build Status](https://travis-ci.com/ianpogi5/mocha-badge-generator.png?branch=master)](https://travis-ci.com/ianpogi5/mocha-badge-generator)
[![codecov](https://codecov.io/gh/ianpogi5/mocha-badge-generator/branch/master/graph/badge.svg)](https://codecov.io/gh/ianpogi5/mocha-badge-generator)
[![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/ianpogi5/mocha-badge-generator/issues)

[![https://nodei.co/npm/mocha-badge-generator.png?downloads=true&downloadRank=true&stars=true](https://nodei.co/npm/mocha-badge-generator.png?downloads=true&downloadRank=true&stars=true)](https://www.npmjs.com/package/mocha-badge-generator)

No need for 3rd party to generate badge for your tests. You can generate it locally by running your test script.

Mocha Badge Generator is a [Mocha](https://mochajs.org/) reporter which outputs a badge (SVG or PNG file) with the number of tests passed and failed which you can embed in your readme file.

## Install

```bash
npm install mocha-badge-generator --save-dev
```

## Usage

In your `package.json`, add reporter to your test script.

```json
{
    "scripts": {
        "test": "mocha --reporter mocha-badge-generator",
    }
}
```

Default output file is `test/badge.svg`.

## Configuration

You can change the output by defining environment variables in your test script.

| Config                   | Default          | Description                                                                                                                                              |
| ------------------------ | :--------------: | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| MOCHA_BADGE_GEN_SUBJECT  | Tests            | The text that appears the left side of the badge.                                                                                                        |
| MOCHA_BADGE_GEN_OK_COLOR | brightgreen      | The color when all tests pass. Possible colors are brightgreen, green, yellow, yellowgreen, orange, red, blue, grey, gray, lightgrey, lightgray, purple. |
| MOCHA_BADGE_GEN_KO_COLOR | red              | The color when at least 1 test fail. See above for possible colors.                                                                                      |
| MOCHA_BADGE_GEN_OUTPUT   | ./test/badge.svg | Name of the output file.                                                                                                                                 |
| MOCHA_BADGE_GEN_FORMAT   | svg              | Output file format. Possible values are svg and png.                                                                                                     |

Sample config for changing output to PNG.

```json
{
    "scripts": {
        "test": "MOCHA_BADGE_GEN_FORMAT=png MOCHA_BADGE_GEN_OUTPUT=badge.png mocha --reporter mocha-badge-generator",
    }
}
```

## Adding to your README

```markdown
![Test](test/badge.svg)
```

 If you want the badge to show in npm, use the following format.

```markdown
![Test](https://raw.githubusercontent.com/ianpogi5/mocha-badge-generator/master/test/badge.svg?sanitize=true)
```

Change `ianpogi5/mocha-badge-generator` to your own github repo.