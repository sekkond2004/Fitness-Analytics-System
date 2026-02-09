require('dotenv').config();
console.log(process.env.USER_NAME);
console.log(process.env.WEEKLY_GOAL);

const { workoutCalculator } = require('./workoutReader');
const { readHealth } = require('./healthReader');

async function processFiles() {
  try {
    const userName = process.env.USER_NAME;
    const weeklyGoal = Number(process.env.WEEKLY_GOAL);

    console.log(`Processing data for: ${userName}`);
    console.log('📁 Reading workout data...');

    const workoutData = await workoutCalculator('./data/workouts.csv');

    console.log('📁 Reading health data...');
    const healthEntries = await readHealth();

    console.log('\n=== SUMMARY ===');
    console.log(`Workouts found: ${workoutData.totalWorkouts}`);
    console.log(`Total workout minutes: ${workoutData.totalMinutes}`);
    console.log(`Health entries found: ${healthEntries}`);
    console.log(`Weekly goal: ${weeklyGoal} minutes`);

    if (workoutData.totalMinutes >= weeklyGoal) {
      console.log(
        `🎉 Congratulations ${userName}! You have exceeded your weekly goal!`
      );
    } else {
      console.log(
        `💪 Keep going ${userName}! You are ${
          weeklyGoal - workoutData.totalMinutes
        } minutes away from your goal.`
      );
    }

  } catch (error) {
    console.log('❌ Error processing files:', error.message);
  }
}

processFiles();
