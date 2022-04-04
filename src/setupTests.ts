// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

const originalError = console.error.bind(console.warn);

beforeAll(() => {
    console.error = (msg) => !msg.toString().startsWith('Warning:') && originalError(msg);
});

afterAll(() => {
    console.error = originalError;
});
