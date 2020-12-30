const clockContainer = document.querySelector(".js-clock");
const clockTitle = clockContainer.querySelector(".js-title");

function getTime() {
    const date = new Date();
    const minutes = date.getMinutes();
    const hours = date.getHours();
    const seconds = date.getSeconds();
    const weekday = new Array(7);
    weekday[0] = "Sunday", weekday[1] = "Monday", weekday[2] = "Tuesday", weekday[3] = "Wednesday", weekday[4] = "Thursday", weekday[5] = "Friday", weekday[6] = "Saturday";
    const days = weekday[date.getDay()];
    clockTitle.innerText =
    `${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}.${days}`;
}
function init() {
    getTime();
    setInterval(getTime, 1000);
}

init();