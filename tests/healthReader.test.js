const { readHealth } = require('../healthReader');
const fs = require('fs/promises');

// Mock fs.readFile
jest.mock('fs/promises');

describe('readHealth()', () => {

  test('counts total number of health entries', async () => {
    const mockData = JSON.stringify({
  user: "Alex",
  metrics: [
    {}, {}, {}, {}, {}, {}, {}, {}
  ]
});

    fs.readFile.mockResolvedValue(mockData);

    const result = await readHealth();
    expect(result).toBe(8);
  });

  test('throws an error if file cannot be read', async () => {
    fs.readFile.mockRejectedValue(new Error('File not found'));

    await expect(readHealth()).rejects.toThrow('File not found');
  });

});

test('placeholder test', () => {
  expect(true).toBe(true);
});
