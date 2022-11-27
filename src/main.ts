import './style.css'
import typescriptLogo from './typescript.svg'
import { setupCounter } from './counter'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://www.typescriptlang.org/" target="_blank">
      <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />
    </a>
    <h1>Vite + TypeScript</h1>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
    <p class="read-the-docs">
      Click on the Vite and TypeScript logos to learn more
    </p>
  </div>
`

setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)
//-------------------

const svg = document.querySelector("#svg");

const a = [30, 150];
const ab = [290, 30];
const c = [550, 450];
// const dist = 180;

// Задаем вектор по координатам
const vector = (start: number[], finish: number[]) => {
  return {
    vec: [finish[0] - start[0], finish[1] - start[1]],
    length: lengthVector(start, finish),
  };
};
//Длина вектора по координатам
const lengthVector = (start: number[], end: number[]):number =>
  Math.hypot(end[1] - start[1], end[0] - start[0]);
//Нормализация вектора
const normalize = ({ vec, length }: {vec: number[]; length: number}): number[] => [vec[0] / length, vec[1] / length];
// Нахождение координаты точки на векторе
const pointOnVector = (start: number[], normVec: number[], len: number) => {
  return normVec[1] > 0
    ? [start[0] + normVec[0] * len, start[1] + normVec[1] * len]
    : [start[0] - normVec[0] * len, start[1] - normVec[1] * len];
};
//линия отрезка
const showPath = (start: number[], end: number[], cl: string, col: string) =>
  `<path class=${cl} d="M ${start[0]} ${start[1]} L ${end[0]} ${end[1]}" stroke=${col} />`;
//render svg
const render = (start: number[], end: number[], cl: string, col: string): string =>

  (svg ? svg.innerHTML += showPath(start, end, cl, col) : '0');
//Находим перпендикулярный вектор
const getPerpOfLine = (normVec: number[], len: number) => {
  const nx = normVec[0] * len;
  const ny = normVec[1] * len;
  return [-ny, nx];
};



2;
//Находим угол в радианах
const vec1 = vector(a, ab);
const vec2 = vector(ab, c);
const normVec1 = normalize(vec1);
const normVec2 = normalize(vec2);
const pointM = pointOnVector(ab, normVec1, 100);
const pointN = pointOnVector(ab, normVec2, 100);
render(a, ab, "aab", "green");
render(ab, c, "abc", "red");
render(
  pointM,
  [
    pointM[0] + getPerpOfLine(normVec1, 300)[0],
    pointM[1] + getPerpOfLine(normVec1, 300)[1],
  ],
  "perpppp",
  "black"
);
render(
  pointN,
  [
    pointN[0] + getPerpOfLine(normVec2, 300)[0],
    pointN[1] + getPerpOfLine(normVec2, 300)[1],
  ],
  "perppppnn",
  "black"
);
console.log(vec1, normVec1, pointM);
console.log(vec2, normVec2, pointN);

// const angle = (start, end) => Math.atan2(end[1] - start[1], end[0] - start[0]);

// const showPerpendicularAngle = (start, len, angle, cl, col) =>
  //перпендикуляр к линии с использованием угла
  // `<path class=${cl} d="M ${start[0]} ${start[1]} L ${
    // -Math.sin(angle) * len + start[0]
  // } ${Math.cos(angle) * len + start[1]}" stroke=${col} />`;

// данные ------------------

// const lengthAB = lengthVector(a, ab);
// console.log("lengthAB", lengthAB);

// const lengthBC = lengthVector(ab, c);
// console.log("lengthBC", lengthBC);

// const angleAB = angle(a, ab);
// console.log("angleAB", angleAB);
// const angleBC = angle(ab, c);
// console.log("angleBC", angleBC);

// const angleCB = angle(c, ab);
// console.log("angleCB", angleCB);

// const angleBA = angle(ab, a);
// console.log("angleBA", angleBA);

// 1. Строим перпендикуляры до пересечения

// const aPath = showPath(a, ab, "a-path", "grey");
// const aPerpendicular = showPerpendicularAngle(
//   a,
//   dist,
//   angleAB,
//   "a-perp",
//   "grey"
// );

// const bPath = showPath(ab, c, "b-path", "green");
// const bPerpendicular = showPerpendicularAngle(
//   c,
//   dist,
//   angleBC,
//   "b-perp",
//   "green"
// );

// svg.innerHTML = aPath + bPath + aPerpendicular + bPerpendicular;

// 2. Находим координату точки пересечения перпендикуляров и радиус дуги

// line intercept math by Paul Bourke http://paulbourke.net/geometry/pointlineplane/
// Determine the intersection point of two line segments
// Return FALSE if the lines don't intersect
function intersect(x1, y1, x2, y2, x3, y3, x4, y4) {
  // Check if none of the lines are of length 0
  if ((x1 === x2 && y1 === y2) || (x3 === x4 && y3 === y4)) {
    return false;
  }

  const denominator = (y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1);

  // Lines are parallel
  if (denominator === 0) {
    return false;
  }

  let ua = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / denominator;
  let ub = ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) / denominator;

  // is the intersection along the segments
  if (ua < 0 || ua > 1 || ub < 0 || ub > 1) {
    return false;
  }

  // Return a object with the x and y coordinates of the intersection
  let x = x1 + ua * (x2 - x1);
  let y = y1 + ua * (y2 - y1);

  return [x, y];
}

// let o = intersect(
//   a[0],
//   a[1],
//   -Math.sin(angleAB) * dist + a[0],
//   Math.cos(angleAB) * dist + a[1],
//   c[0],
//   c[1],
//   -Math.sin(angleBC) * dist + c[0],
//   Math.cos(angleBC) * dist + c[1]
// );

// console.log(o);

// let dt1 = Math.sqrt((x2-x1)**2+(y2-y1)**2);
// let dt = Math.sqrt((o[0]-a[0])**2+(o[1]-a[1])**2);
// let dt = Math.hypot(o[0] - a[0], o[1] - a[1]);

// console.log(dt);

//3. Строим дугу

// const arc = `<path d="M ${a[0]} ${a[1]} A ${dt} ${dt} 0 0 1 ${c[0]} ${c[1]}" stroke="grey" fill="none" />`;

// svg.innerHTML += arc;

//--------------
//x1=lsinθ+x
//y1=lcosθ+y

// const points = (arr, angle) => {
//   const x1 = 200 * -Math.sin(angle) + arr[0];
//   const y1 = 200 * Math.cos(angle) + arr[1];
//   return [x1, y1];
// };

// console.log(points(a, angleAB));
// console.log(points(c, angleBC));

//------------------
// Нахождение координаты точки на отрезке
// Rab = sqrt((Xb - Xa) ^ 2 + (Yb - Ya) ^ 2)
// k = Rac / Rab
// Xc = Xa + (Xb - Xa) * k
// Yc = Ya + (Yb - Ya) * k

// const e = [400, 550];
// const d = [50, 400];
// const Red = lengthVector(e, d);
// //расстояние от точки начала вектора
// const pointFromStart = 20;

// const kf = pointFromStart / Red;

// // const coord = (start, finish);
// const Xcc = e[0] + (d[0] - e[0]) * kf;
// const Ycc = e[1] + (d[1] - e[1]) * kf;
// const cc = [Xcc, Ycc];

// const lengthPerp = 150;

// const pathDE = showPath(d, e, "d-path", "teal");

// svg.innerHTML += pathDE;

// function getPerpOfLine1(start, end, lengthPerp) {
//   // the two points can not be the same
//   var nx = end[0] - start[0]; // as vector
//   var ny = end[1] - start[1];
//   const len = lengthPerp / Math.hypot(nx, ny); // length of line
//   nx *= len; // make one unit long
//   ny *= len; // which we call normalising a vector
//   return [-ny, nx]; // return the normal  rotated 90 deg
// }

// // console.log(getPerpOfLine(e, d, lengthPerp));

// const start = cc;
// const finish = [
//   cc[0] + getPerpOfLine1(e, d, lengthPerp)[0],
//   cc[1] + getPerpOfLine1(e, d, lengthPerp)[1],
// ];

// const perpDE = showPath(start, finish, "d-perp", "orange");

// svg.innerHTML += perpDE;

//++++++++++++++++++++++++++++++++++++++++++++++++++++
//++++++++++++++++++++++++++++++++++++++++++++++++++++

//-------------------

//===============================

// const x1 = 40,
//   y1 = 40,
//   x2 = 260,
//   y2 = 110;
// const endLen = 10; // length of end lines

// var px = y1 - y2; // as vector at 90 deg to the line
// var py = x2 - x1;
// // const len = endLen / Math.hypot(px, py);
// px *= len;  // make leng 10 pixels
// py *= len;

// draw line the start cap and end cap.
// ctx.beginPath();

// ctx.lineTo(x1, y1);   // the line start
// ctx.lineTo(x2, y2);
// ctx.moveTo(x1 + px, y1 + py); // the start perp line
// ctx.lineTo(x1 - px, y1 - py);
// ctx.moveTo(x2 + px, y2 + py); // the end perp line
// ctx.lineTo(x2 - px, y2 - py);
// ctx.stroke();

// the line segment
// const h = [130, 60];
// const j = [190, 30];
// const k = [250, 60];

// var phjX = h[1] - j[1]; // as vector at 90 deg to the line
// var phjY = j[0] - h[0];
// const endLen = 200;
// const len = endLen / Math.hypot(phjX, phjY);
// phjX *= len; // make leng 10 pixels
// phjY *= len;

// const hjPath = `<path class="hj-path" d="M ${h[0]} ${h[1]} L ${j[0]} ${j[1]}" stroke="grey" stroke-width="3"/>`;

// const hperpPath = `<path class="hjperp-path" d="M ${h[0]} ${h[1]} L ${
//   h[0] + phjX
// } ${h[1] + phjY}" stroke="grey" stroke-width="3"/>`;

// svg.innerHTML += hjPath;
// svg.innerHTML += hperpPath;

// const hpperp = document.querySelector(".hjperp-path");

// console.log(hpperp.getTotalLength());

// let pjkX = j[1] - k[1];
// let pjkY = k[0] - j[0];

// pjkX *= len;
// pjkY *= len;

// const jkPath = showPath(j, k, "kkk", "gold");

// const jkperpPath = `<path class="jkperp-path" d="M ${k[0]} ${k[1]} L ${
//   k[0] + pjkX
// } ${k[1] + pjkY}" stroke="gold" stroke-width="3"/>`;

// svg.innerHTML += jkPath;
// svg.innerHTML += jkperpPath;
