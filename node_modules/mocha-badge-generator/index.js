const fs = require('fs');
const badge = require('badge-up');
const svg2png = require('svg2png');

function BadgeGenerator(runner) {
    return new Promise((resolve, reject) => {
        let passes = 0;
        let failures = 0;

        runner.on('start', function() {});

        runner.on('pass', function() {
            passes++;
        });

        runner.on('fail', function() {
            failures++;
        });

        runner.on('end', function() {
            const subject = process.env.MOCHA_BADGE_GEN_SUBJECT || 'Tests';
            const okColor =
                process.env.MOCHA_BADGE_GEN_OK_COLOR || 'brightgreen';
            const koColor = process.env.MOCHA_BADGE_GEN_KO_COLOR || 'red';
            const foutput =
                process.env.MOCHA_BADGE_GEN_OUTPUT || './test/badge.svg';
            const format = process.env.MOCHA_BADGE_GEN_FORMAT || 'svg';

            const color = failures > 0 ? koColor : okColor;
            const status = passes + '/' + (passes + failures);

            badge(subject, status, badge.colors[color], (err, output) => {
                if (err) {
                    return reject(err);
                }

                if (format === 'png') {
                    output = svg2png.sync(output);
                }

                fs.writeFile(foutput, output, writeErr => {
                    if (writeErr) {
                        return reject(writeErr);
                    }
                    resolve();
                });
            });
        });
    });
}

module.exports = BadgeGenerator;
