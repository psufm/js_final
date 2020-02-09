const clockDiv = document.querySelector(".js-clock");
const clockText = clockDiv.querySelector("h1");
const clockStyle = document.getElementsByName("hourStyle");
let timeStyle = false;

function setTime() {
  const date = new Date();
  const hours = timeStyle
    ? checkTimeValue(date.getHours()) - 12
    : checkTimeValue(date.getHours());
  const minutes = checkTimeValue(date.getMinutes());
  const seconds = checkTimeValue(date.getSeconds());

  clockText.innerText = hours + " : " + minutes + " : " + seconds;
}

function getHourStyle(event) {
  event.target.value === "12" ? (timeStyle = true) : (timeStyle = false);
}

function init() {
  setTime();
  setInterval(setTime, 1000);
  clockStyle.forEach(e => {
    e.addEventListener("click", getHourStyle);
  });
}

function checkTimeValue(time) {
  return time > 9 ? time : "0" + time;
}

init();
