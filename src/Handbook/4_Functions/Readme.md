# More on Functions

## Function Type Expressions

- Cách đơn giản nhất để mô tả một hàm là dùng một biểu thức kiểu hàm. Các loại này tương tự về mặt cú pháp với các hàm mũi tên

```typescript
function greeter(fn: (a: string) => void) {
  fn('Hello, World');
}
function printToConsole(s: string) {
  console.log(s);
}
greeter(printToConsole);
```

## Call Signatures

- Các hàm ngoài khả năng gọi còn có thể chứa các thuộc tính

```typescript
type DescribableFunction = {
  description: string;
  (someArg: number): boolean;
};
function doSomething(fn: DescribableFunction) {
  console.log(fn.description + ' returned ' + fn(6));
}

function myFunc(someArg: number) {
  return someArg > 3;
}
myFunc.description = 'default description';
doSomething(myFunc);
```

## Construct Signatures

## Generic Functions

- Giúp hàm xử lý được nhiều loại dữ liệu được truyền vào

```typescript
function firstElement<Type>(arr: Type[]): Type | undefined {
  return arr[0];
}
```

- Bằng cách thêm một tham số kiểu Type vào hàm này và sử dụng nó ở hai vị trí, chúng ta đã tạo một liên kết giữa đầu vào của hàm (mảng) và đầu ra (giá trị trả về)

### Inference - Sự suy luận

```typescript
function map<Input, Output>(arr: Input[], func: (arg: Input) => Output): Output[] {
  return arr.map(func);
}
const parsed = map(['1', '2', '3'], (n) => Boolean(n)); // Input string Output boolean
const parsed2 = map(['1', '2', '3'], (n) => n); // Input string Output string
const parsed3 = map(['1', '2', '3'], (n) => parseInt(n)); // Input string Output number
```

- Lưu ý rằng trong ví dụ này, `ts` có thể suy ra cả loại của tham số `Input` đầu vào (từ mảng chuỗi đã cho), cũng như tham số `Output` đầu ra dựa trên giá trị trả về của biểu thức hàm.

### Constraints - Hạn chế

- Chúng ta đã viết một số hàm chung có thể hoạt động trên bất kỳ loại giá trị nào. Đôi khi chúng ta muốn liên kết hai giá trị, nhưng chỉ có thể hoạt động trên một tập con giá trị nhất định. Trong trường hợp này, chúng ta có thể sử dụng một ràng buộc để giới hạn các loại mà một tham số kiểu có thể chấp nhận (`extends`).

```typescript
// Chỉ chấp nhận cái kiểu có thuộc tính length
function longest<Type extends { length: number }>(a: Type, b: Type) {
  if (a.length >= b.length) {
    return a;
  } else {
    return b;
  }
}
// longerArray is of type 'number[]'
const longerArray = longest([1, 2], [1, 2, 3]);
// longerString is of type 'alice' | 'bob'
const longerString = longest('alice', 'bob');
// Error! Numbers don't have a 'length' property
const notOK = longest(10, 100);
```

### Working with Constrained Values

```typescript
function minimumLength<Type extends { length: number }>(obj: Type, minimum: number): Type {
  if (obj.length >= minimum) {
    return obj;
  } else {
    return { length: minimum };
    // Type '{ length: number; }' is not assignable to type 'Type'.
    // '{ length: number; }' is assignable to the constraint of type 'Type', but 'Type' could be instantiated with a different subtype of constraint '{ length: number; }'.
  }
}
```

- Có vẻ như hàm này vẫn ổn - `Type` bị ràng buộc với { length: number } và hàm trả về Loại hoặc một giá trị khớp với ràng buộc đó. Vấn đề là hàm này hứa hẹn sẽ trả về cùng một loại đối tượng như đã được truyền vào, chứ không chỉ một số đối tượng khớp với ràng buộc.

### Specifying Type Arguments - Chỉ định loại đối số

- TypeScript thường có thể suy ra các đối số loại dự định trong một cuộc gọi chung, nhưng không phải lúc nào cũng vậy. Ví dụ

```typescript
function combine<Type>(arr1: Type[], arr2: Type[]): Type[] {
  return arr1.concat(arr2);
}
const arr = combine([1, 2, 3], ['hello']); // Error: Type 'string' is not assignable to type 'number'.

const arr2 = combine<string | number>([1, 2, 3], ['hello']); // Không lỗi
```

### Guidelines for Writing Good Generic Functions

<i>Viết hàm có generic phải clean mới đỡ nhức cái đầu</i>

#### Push Type Parameters Down

```typescript
function firstElement1<Type>(arr: Type[]) {
  return arr[0];
}

function firstElement2<Type extends any[]>(arr: Type) {
  return arr[0];
}

// a: number (good)
const a = firstElement1([1, 2, 3]);
// b: any (bad)
const b = firstElement2([1, 2, 3]);
```

- Thoạt nhìn chúng có vẻ giống hệt nhau, nhưng `firstElement1` là cách viết hàm này tốt hơn nhiều. Kiểu trả về được suy luận của nó là Type, nhưng kiểu trả về được phỏng đoán của `firstElement2` là bất kỳ vì TypeScript phải giải quyết biểu thức arr[0] bằng cách sử dụng kiểu ràng buộc, thay vì "chờ đợi" để giải quyết phần tử trong khi gọi.

```
Quy tắc: Khi có thể, hãy sử dụng chính tham số loại thay vì hạn chế nó (Constraints)
```

#### Use Fewer Type Parameters - Dùng ít tham số kiểu

```typescript
function filter1<Type>(arr: Type[], func: (arg: Type) => boolean): Type[] {
  return arr.filter(func);
}

function filter2<Type, Func extends (arg: Type) => boolean>(arr: Type[], func: Func): Type[] {
  return arr.filter(func);
}
```

- Chúng ta đã tạo một tham số loại `Func` không liên quan đến hai giá trị. Đó luôn là một dấu hiệu đỏ, bởi vì điều đó có nghĩa là người gọi muốn chỉ định đối số loại phải chỉ định thủ công đối số loại bổ sung mà không có lý do. `Func` không làm bất cứ điều gì ngoài việc làm cho chức năng khó đọc và suy luận hơn!

```
Quy tắc: Luôn sử dụng càng ít tham số loại càng tốt
```

#### Type Parameters Should Appear Twice - các thông số Type xuất hiện hai lần

```typescript
function greet<Str extends string>(s: Str) {
  console.log('Hello, ' + s);
}
greet('world');
// Cái trên không cần thiết
function greet(s: string) {
  console.log('Hello, ' + s);
}
```

- Hãy nhớ rằng, Generic sinh ra để cho phép các hàm có thể xử lý được nhiều loại dữ liệu. Nếu một tham số loại chỉ được sử dụng một lần trong chữ ký hàm, thì nó không liên quan gì cả. Điều này bao gồm loại trả về được suy luận.

```
Quy tắc: Nếu một thông số loại chỉ xuất hiện ở một vị trí, hãy xem xét lại nếu bạn thực sự cần nó
```

## Optional Parameters

```typescript
function f(x?: number) {
  // x là số hoặc undefined
  // ...
}
// OR
function f(x = 10) {
  // ...
}

f(); // OK
f(10); // OK
```

### Optional Parameters in Callbacks

- Khi viết các tham số tùy chọn và biểu thức kiểu hàm, rất dễ mắc phải các lỗi sau khi viết các hàm gọi hàm gọi lại:

```typescript
function myForEach(arr: any[], callback: (arg: any, index?: number) => void) {
  for (let i = 0; i < arr.length; i++) {
    callback(arr[i], i);
  }
}
// Hợp lệ
myForEach([1, 2, 3], (a) => console.log(a));
myForEach([1, 2, 3], (a, i) => console.log(a, i));

myForEach([1, 2, 3], (a, i) => {
  console.log(i.toFixed()); // 'i' is possibly 'undefined'.
});
```

```
Quy tắc: Khi viết một loại hàm cho callback, không bao giờ viết một tham số tùy chọn trừ khi có ý định gọi hàm mà không chuyển đối số đó
```

## Function Overloads - Nạp chồng hàm

- Trong `TypeScript`, chúng ta có thể chỉ định một hàm có thể được gọi theo nhiều cách khác nhau bằng cách viết các `Overloads`. Để thực hiện việc này, hãy viết một số chữ ký hàm (thường là hai hoặc nhiều hơn), theo sau là phần thân của hàm:

```typescript
function makeDate(timestamp: number): Date;
function makeDate(m: number, d: number, y: number): Date;
function makeDate(mOrTimestamp: number, d?: number, y?: number): Date {
  if (d !== undefined && y !== undefined) {
    return new Date(y, mOrTimestamp, d);
  } else {
    return new Date(mOrTimestamp);
  }
}
```

- Nên lưu ý cách viết overload nha

```typescript
function testOverload(): number; // 1
function testOverload(m: number): string; // 2
function testOverload(m: number, c: number): number; // 3
function testOverload(s: string, c: number): number; // 4
function testOverload(mOrS?: number | string, c?: number): number | string {
  // Mấy cái trên chỉ là ảo cái dưới cùng mới là thật nên khéo léo khi viết khứa này
  if (!mOrS && !c) {
    return 1; // 1
  }
  if (mOrS) {
    if (typeof mOrS === 'number') {
      if (c) {
        return 3; // 3
      } else {
        return '2'; // 2
      }
    } else if (typeof mOrS === 'string' && c) {
      return 4; // 4
    }
  }
  return 0;
}
```

### Writing Good Overloads

<i>Luôn ưu tiên các tham số có kiểu kết hợp `union` thay vì `Overloads` khi có thể</i>

```typescript
function len(s: string): number;
function len(arr: any[]): number;
function len(x: any) {
  return x.length;
}
// thay bằng union cho gọn
function len(x: any[] | string) {
  return x.length;
}
```

## Declaring `this` in a Function

- Giống JS

## Other Types to Know About

### `void`

- Hàm không trả về bất cứ gì

### `object`

- Hàm trả về bất kỳ giá trị nào không phải là nguyên thủy

### `unknown`

- Loại `unknown` đại diện cho bất kỳ giá trị. Điều này tương tự với `any`, nhưng an toàn hơn vì không hợp pháp để làm bất cứ điều gì với một `unknown`.

### `never`

- Một số hàm không bao giờ trả về giá trị. Trong kiểu trả về, điều này có nghĩa là hàm đưa ra một ngoại lệ (lỗi) hoặc chấm dứt thực thi chương trình.

## Rest Parameters and Arguments "`...`"

### Rest Parameters

```typescript
function multiply(n: number, ...m: number[]) {
  return m.map((x) => n * x);
}
// 'a' gets value [10, 20, 30, 40]
const a = multiply(10, 1, 2, 3, 4);
```

### Rest Arguments

```typescript
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
arr1.push(...arr2);
```

- Lưu ý, `TypeScript` không cho rằng mảng là bất biến. Điều này có thể dẫn đến một số hành vi đáng ngạc nhiên

```typescript
const args = [8, 5];
const angle = Math.atan2(...args); // A spread argument must either have a tuple type or be passed to a rest parameter.

// Fix
// Inferred as 2-length tuple
const args = [8, 5] as const;
// OK
const angle = Math.atan2(...args);
```

## Parameter Destructuring

- Giống JS
