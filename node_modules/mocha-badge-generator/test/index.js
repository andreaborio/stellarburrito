const events = require('events');
const fs = require('fs');
const assert = require('chai').assert;

const BadgeGenerator = require('../');

const BADGE = './test/badge.svg';
const BADGE_FAILED = './test/failed.svg';
const BADGE_PASSED = './test/passed.svg';
const BADGE_PNG = './test/badge.png';
const BADGE_PNG_PASSED = './test/passed.png';

try {
    fs.accessSync(BADGE, fs.constants.R_OK | fs.constants.W_OK);
    fs.unlinkSync(BADGE);
} catch (e) {}

describe('mocha badge reporter', function() {
    it('should register test failed 3/4', function(done) {
        const runner = new events.EventEmitter();
        BadgeGenerator(runner)
            .then(() => {
                const actual = fs.readFileSync(BADGE, 'utf8');
                const expected = fs.readFileSync(BADGE_FAILED, 'utf8');
                assert.equal(actual, expected);
                fs.unlink(BADGE, function() {
                    done();
                });
            })
            .catch(err => {
                console.log(err);
                assert.ok(false);
                done();
            });
        runner.emit('pass');
        runner.emit('pass');
        runner.emit('pass');
        runner.emit('fail');
        runner.emit('end');
    });

    it('should register test passed 4/4', function(done) {
        const runner = new events.EventEmitter();
        BadgeGenerator(runner)
            .then(() => {
                const actual = fs.readFileSync(BADGE, 'utf8');
                const expected = fs.readFileSync(BADGE_PASSED, 'utf8');
                assert.equal(actual, expected);
                fs.unlink(BADGE, function() {
                    done();
                });
            })
            .catch(err => {
                console.log(err);
                assert.ok(false);
                done();
            });

        runner.emit('pass');
        runner.emit('pass');
        runner.emit('pass');
        runner.emit('pass');
        runner.emit('end');
    });

    it('should throw a write error', function(done) {
        process.env.MOCHA_BADGE_GEN_OUTPUT = '/invalid/path/badge.svg';
        const runner = new events.EventEmitter();
        BadgeGenerator(runner)
            .then(() => {
                assert.ok(false);
                done();
            })
            .catch(err => {
                assert.ok(true);
                done();
            });

        runner.emit('pass');
        runner.emit('end');

        // restore default
        process.env.MOCHA_BADGE_GEN_OUTPUT = './test/badge.svg';
    });

    it('should output png', function(done) {
        process.env.MOCHA_BADGE_GEN_SUBJECT = 'PNG';
        process.env.MOCHA_BADGE_GEN_OK_COLOR = 'blue';
        process.env.MOCHA_BADGE_GEN_KO_COLOR = 'purple';
        process.env.MOCHA_BADGE_GEN_FORMAT = 'png';
        process.env.MOCHA_BADGE_GEN_OUTPUT = './test/badge.png';

        const runner = new events.EventEmitter();
        BadgeGenerator(runner)
            .then(() => {
                assert.isTrue(fs.existsSync(BADGE_PNG));
                fs.unlink(BADGE_PNG, function() {
                    done();
                });
            })
            .catch(err => {
                console.log(err);
                assert.ok(false);
                done();
            });
        runner.emit('pass');
        runner.emit('pass');
        runner.emit('pass');
        runner.emit('pass');
        runner.emit('end');

        // restore default
        process.env.MOCHA_BADGE_GEN_SUBJECT = 'Tests';
        process.env.MOCHA_BADGE_GEN_OK_COLOR = 'brightgreen';
        process.env.MOCHA_BADGE_GEN_KO_COLOR = 'red';
        process.env.MOCHA_BADGE_GEN_FORMAT = 'svg';
        process.env.MOCHA_BADGE_GEN_OUTPUT = './test/badge.svg';

        // sync2png takes a bit of time
    }).timeout(10000);

    after(() => {
        const runner = new events.EventEmitter();
        BadgeGenerator(runner);
        runner.emit('pass');
        runner.emit('pass');
        runner.emit('pass');
        runner.emit('pass');
        runner.emit('end');
    });
});
