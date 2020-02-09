const body = document.querySelector("body");

function drawBG(number) {
  const img = new Image();
  img.src = "img/" + number + ".jpg";

  img.classList.add("bgImage");
  body.prepend(img);
}

function getNumber() {
  const number = Math.floor(Math.random() * 10) + 1;
  return number;
}

function init() {
  drawBG(getNumber());
}

init();
