// eslint-disable-next-line @typescript-eslint/no-require-imports
const Sequencer = require('@jest/test-sequencer').default;

class CustomSequencer extends Sequencer {
    sort(tests) {
        return tests.sort((a, b) => a.path.localeCompare(b.path));
    }
}

module.exports = CustomSequencer;