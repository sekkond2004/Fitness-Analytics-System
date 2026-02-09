const fs = require('fs');
const csv = require('csv-parser');

function workoutCalculator(filePath) {
  return new Promise((resolve, reject) => {
    let totalWorkouts = 0;
    let totalMinutes = 0;

    fs.createReadStream(filePath)
      .on('error', () => {
        reject(new Error('Workout file not found or cannot be opened.'));
      })
      .pipe(csv())
      .on('data', (row) => {
        totalWorkouts++;

        // basic for loop
        for (let key in row) {
          if (key === 'duration') {
            totalMinutes += Number(row[key]);
          }
        }
      })
      .on('end', () => {
        console.log(`Total workouts: ${totalWorkouts}`);
        console.log(`Total minutes: ${totalMinutes}`);
        resolve({ totalWorkouts, totalMinutes });
      })
      .on('error', () => {
        reject(new Error('Workout file is corrupted.'));
      });
  });
}

module.exports = { workoutCalculator };
