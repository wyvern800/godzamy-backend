function pad_2(number) {
  return (number < 10 ? "0" : "") + number;
}

function hours(date) {
  var hours = date.getHours();
  if (hours > 12) return hours - 12; // Substract 12 hours when 13:00 and more
  return hours;
}

function am_pm(date) {
  if (date.getHours() == 0 && date.getMinutes() == 0 && date.getSeconds() == 0)
    return ""; // No AM for MidNight
  if (date.getHours() == 12 && date.getMinutes() == 0 && date.getSeconds() == 0)
    return ""; // No PM for Noon
  if (date.getHours() < 12) return " AM";
  return " PM";
}

module.exports = utils;
