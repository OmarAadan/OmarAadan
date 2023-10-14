const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function calculateSalesTarget(startDate, endDate, totalTarget) {
  const workingDays = getWorkingDays(startDate, endDate);
  const dailyTarget = totalTarget / workingDays;

  return dailyTarget;
}

function getWorkingDays(startDate, endDate) {
  const start = new Date(startDate);
  const end = new Date(endDate);
  let workingDays = 0;

  while (start <= end) {
    if (start.getDay() !== 5) { // Exclude Fridays (assuming Friday is the 5th day)
      workingDays++;
    }
    start.setDate(start.getDate() + 1);
  }

  return workingDays;
}

rl.question('Enter the start date (YYYY-MM-DD): ', (startDate) => {
  rl.question('Enter the end date (YYYY-MM-DD): ', (endDate) => {
    rl.question('Enter the total target sales: ', (totalTarget) => {
      const dailyTarget = calculateSalesTarget(startDate, endDate, totalTarget);
      console.log('Daily Target Sales:', dailyTarget.toFixed(2), '$');

      const workingDays = getWorkingDays(startDate, endDate);
      console.log('Number of Working Days:', workingDays);

      rl.close();
    });
  });
});