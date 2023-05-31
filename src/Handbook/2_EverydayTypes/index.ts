// // Hàm
// const log: (string: string) => void = function (string: string): void {
//   console.log(string);
// };

// log('Hello World!');

// // Hàm ẩn danh
// const arr: string[] = ['vy', 'trung', 'nam'];

// arr.forEach((element) => {
//   // Tự động hiểu element là string
//   console.log(element.toUpperCase());
// });

// // Thuộc tính tùy chọn

// const user: { name: string; age?: number } = { name: 'trung nam' };

// function printUser(user: { name: string; age?: number }) {
//   /*
//   `user.age` is possibly 'undefined'.
//   console.log(user.age.toFixed(2));
//   */

//   if (user.age !== undefined) {
//     console.log(user.age.toFixed(2));
//   }
//   console.log(user.age?.toFixed(2));
// }
// printUser(user);

// Union

// const value = 12;

// function printValue(value: number | string) {
//   console.log(value);
//   // Dùng narrow để thu hẹp lại kiểu để tránh gặp lỗi
//   if (typeof value === 'string') {
//     console.log(value.toUpperCase());
//   } else {
//     console.log(value.toFixed(2));
//   }
// }

// printValue(value);

// ==> Type Aliases

// type Point = {
//   x: number;
//   y: number;
// };
 
// // Exactly the same as the earlier example
// function printCoord(pt: Point) {
//   console.log("The coordinate's x value is " + pt.x);
//   console.log("The coordinate's y value is " + pt.y);
// }
 
// printCoord({x: 199, y:333});

// ==> Interfaces

// interface Point {
//   x: number;
//   y: number;
// }

 
// function printCoord(pt: Point) {
//   console.log("The coordinate's x value is " + pt.x);
//   console.log("The coordinate's y value is " + pt.y);
// }
// printCoord({ x: 100, y: 100 });


// ==>Type Assertions

// const x = +'12' as number;
// console.log(x);

// ==>Literal Types
type pd = 'top'|'bottom'|'right'|'left'
const padding: pd = 'bottom';

function abc(padding: pd):pd{
  padding = 'right';
  return padding
}
abc(padding);

// ==>Literal Inference
