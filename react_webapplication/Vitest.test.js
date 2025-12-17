import { describe, it, expect } from 'vitest';

describe('Test Suite 1', function () {
    it('Test 1', function () {

        expect(1).toBe(1);
    });

    it('Test 2', function () {

        // "this is expected to fail."
        expect(1).toBe(2);
    });
});