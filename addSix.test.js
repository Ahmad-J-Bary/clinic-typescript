const { default: TestRunner } = require("jest-runner");
const addSix = require('./addSix');

test('retutns the number plus 6', () => {
    expect(addSix(1)).toBe(7);
})