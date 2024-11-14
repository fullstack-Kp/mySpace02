export const getExpiredItems = (tasks) => {
  const expiredTasks = {};
  const now = new Date(); // Get the current date and time
  const currentDateString = now.toLocaleDateString("en-GB"); // Date format 'DD/MM/YYYY'

  // Iterate through the object to check each date and time
  Object.keys(tasks).forEach((dateString) => {
    const taskDate = new Date(dateString.split("/").reverse().join("-")); // Convert date to YYYY-MM-DD format
    const taskItems = tasks[dateString];
    const expiredItemsForDate = [];

    taskItems.forEach((item) => {
      const [hours, minutes] = item.time
        .split(":")
        .map((num) => parseInt(num, 10));
      const taskTime = new Date(taskDate);
      taskTime.setHours(hours, minutes, 0, 0); // Set the task date with the specific time

      // Check if the current time is past the task's time
      if (now > taskTime) {
        expiredItemsForDate.push(item);
      }
    });

    // If there are expired tasks for this date, add them to the result
    if (expiredItemsForDate.length > 0) {
      expiredTasks[dateString] = expiredItemsForDate;
    }
  });

  return expiredTasks;
};

export const getUpcomingItems = (tasks) => {
  const upcomingTasks = {};
  const now = new Date(); // Get the current date and time
  const currentDateString = now.toLocaleDateString("en-GB"); // Date format 'DD/MM/YYYY'

  // Iterate through the object to check each date and time
  Object.keys(tasks).forEach((dateString) => {
    const taskDate = new Date(dateString.split("/").reverse().join("-")); // Convert date to YYYY-MM-DD format
    const taskItems = tasks[dateString];
    const upcomingItemsForDate = [];

    taskItems.forEach((item) => {
      const [hours, minutes] = item.time
        .split(":")
        .map((num) => parseInt(num, 10));
      const taskTime = new Date(taskDate);
      taskTime.setHours(hours, minutes, 0, 0); // Set the task date with the specific time

      // Check if the current time is before the task's time (future task)
      if (now < taskTime) {
        upcomingItemsForDate.push(item);
      }
    });

    // If there are upcoming tasks for this date, add them to the result
    if (upcomingItemsForDate.length > 0) {
      upcomingTasks[dateString] = upcomingItemsForDate;
    }
  });

  return upcomingTasks;
};
