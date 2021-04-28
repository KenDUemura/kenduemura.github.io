var create = function (objId, x, y, z, width, height, color) {
  // set div attributes
  var div = document.createElement("div");
  div.id = objId;
  div.className = "sphere";
  div.style.zIndex = z;
  div.style.position = "absolute";
  div.style.left = x + "px";
  div.style.top = y + "px";
  div.style.width = width + "px";
  div.style.height = height + "px";
  div.style.borderRadius = "50%";
  div.style.background = color;

  // Then append the whole thing onto the body
  document.getElementsByTagName("body")[0].appendChild(div);

  // default start position
  div.x = x;
  div.y = y;

  // default sizes
  div.w = width;
  div.h = height;
  return div;
};

var earch = create("earth", 400, 40, 16, 400, 388, "blue");
var moon = create("moon", 200, 378, 10, 100, 98, "grey");

const moonEarthMargin = 64;
const xradius = earth.w / 2 + moon.w + moonEarthMargin;
const yradius = 36;
const zradius = 36;
const xmidpoint = earth.x + earth.w / 2 - moon.w;
const ymidpoint = earth.y + earth.h / 2 - moon.h / 2;
const fps = 1000 / 144;

var angleVelocity = 0.0032;
var positionX = moon.x;
var positionY = moon.y;
var Xreverse = false;
var Yreverse = false;
var angle = 0;
var previousX = xradius * Math.cos(angle);
var previousY = yradius * Math.sin(angle);

function moveMoon() {
  angle = angle + angleVelocity;
  let xDelta = xradius * Math.cos(angle);
  let yDelta = -yradius * Math.sin(angle);
  let zDelta = -zradius * Math.sin(angle);
  // console.log(xDelta, yDelta, zDelta);

  // Moon X Direction
  positionX = xmidpoint + xDelta;
  Xreverse = previousX > xDelta ? true : false;
  previousX = xDelta;

  // Moon Y Direction
  positionY = ymidpoint + yDelta;

  // Move
  moon.style.left = positionX + "px";
  moon.style.top = positionY + "px";

  // Z Moon Size
  moon.style.zIndex = Math.round(yDelta) + yradius;
  moon.style.width = moon.w + zDelta + "px";
  moon.style.height = moon.h + zDelta + "px";
}

// This call the moveBall function every 100ms
setInterval(moveMoon, fps);
