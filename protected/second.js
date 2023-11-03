// Description: This file contains the functions that are used in the index.html file.

// here we are calling the function displayTime() on load and then every second.
window.onload = () => {
  displayTime();
  setInterval(() => {
    displayTime();
  }, 1000); // Update every second
};

// This function checks if the date is in daylight saving time.
// based if the date is between friday before the  last sunday of march  2:00 and the last sunday of october 2:00.
const isDLS = (date) => {
  let lestDayOfMarch = new Date(date.getFullYear(), 3, 0);
  let lastDayOfOct = new Date(date.getFullYear(), 10, 0);

  let lastSundayOfMarch = lestDayOfMarch.getDate() - lestDayOfMarch.getDay();
  let lastSundayOfOct = lastDayOfOct.getDate() - lastDayOfOct.getDay();

  const start = new Date(date.getFullYear(), 2, lastSundayOfMarch - 2, 2);
  const end = new Date(date.getFullYear(), 9, lastSundayOfOct, 2);
  return date >= start && date < end;
};

// This function converts takes the date back to UTC time and adds 2/3 hours based on if the date is in daylight saving time.
const timeConverter = (date) => {
  const nowMS = date.getTime();
  const difMSFromUTC = date.getTimezoneOffset() * 60 * 1000;
  const DLS = isDLS(new Date());
  const dlsMS = DLS ? 10800000 : 7200000;
  let nowUTC = nowMS + difMSFromUTC + dlsMS;

  return new Date(nowUTC);
};

// This function formats the time to 12 hours format.
const timeFormetter = (time) => {
  return time.toLocaleDateString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });
};

//? entry point for the program.
// This function displays the time in the index.html file.
const displayTime = () => {
  const now = new Date();
  const convertedTime = timeConverter(now);
  document.getElementById("israel-display").innerHTML =
    timeFormetter(convertedTime);
  document.getElementById("local-display").innerHTML = timeFormetter(now);
};

// for testing
module.exports = { timeConverter, isDLS };
