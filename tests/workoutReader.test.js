const { workoutCalculator } = require('../workoutReader');
const fs = require('fs');
const csv = require('csv-parser');
const { EventEmitter } = require('events');

jest.mock('fs');
jest.mock('csv-parser');

describe('workoutCalculator()', () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('counts total workouts and total duration minutes', async () => {
    const stream = new EventEmitter();

    // mock chainable stream behavior
    stream.pipe = jest.fn(() => stream);
    stream.on = jest.fn((event, callback) => {
      if (event === 'data') {
        callback({ duration: '30' });
        callback({ duration: '15' });
        callback({ duration: '45' });
        callback({ duration: '20' });
        callback({ duration: '35' });
        callback({ duration: '10' });
        callback({ duration: '60' });
        callback({ duration: '40' });
        callback({ duration: '25' });
        callback({ duration: '50' });
      }

      if (event === 'end') {
        callback();
      }
      return stream;
    });

    fs.createReadStream.mockReturnValue(stream);
    csv.mockReturnValue(stream);

    const result = await workoutCalculator('./data/workouts.csv');

    expect(result.totalWorkouts).toBe(10);
    expect(result.totalMinutes).toBe(330);
  });

  test('throws an error when the CSV file is missing', async () => {
    const stream = new EventEmitter();

    stream.pipe = jest.fn(() => stream);
    stream.on = jest.fn((event, callback) => {
      if (event === 'error') {
        callback(new Error('stream error'));
      }
      return stream;
    });

    fs.createReadStream.mockReturnValue(stream);

    await expect(
      workoutCalculator('./data/workouts.csv')
    ).rejects.toThrow('Workout file not found or cannot be opened.');
  });

});
