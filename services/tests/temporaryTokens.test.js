
describe('temporaryTokens', function() {
    let temporaryTokens;

    beforeEach(function() {
        jest.resetModules();
        temporaryTokens = require('../temporaryTokens');
    })

    describe('getToken', function() {
        test('should return null', async function() {
            const payload = await temporaryTokens.getToken('demo');
            expect(payload).toBeNull();
        })
    })

    describe('setToken', function() {
        test('should return exsiting token', async function() {
            const payload = await temporaryTokens.getToken('demo');
            expect(payload).toBeNull();

            await temporaryTokens.setToken('demo','demoPayload');
            const newPayload = await temporaryTokens.getToken('demo');
            expect(newPayload).toBe('demoPayload');
        })
    })
})
