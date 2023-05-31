# Narrowing

- Trong TypeScript, narrowing (hay còn gọi là type narrowing) là quá trình giới hạn (narrow) kiểu dữ liệu của một biến hoặc biểu thức cụ thể dựa trên một số điều kiện. Mục đích chính của narrowing là giảm thiểu khả năng phát sinh lỗi và cung cấp thông tin kiểu dữ liệu chính xác hơn cho trình biên dịch TypeScript.

- Các cách thức narrowing có thể được sử dụng trong TypeScript bao gồm:

1. Kiểm tra kiểu (Type guards): Sử dụng các biểu thức điều kiện để kiểm tra kiểu dữ liệu của một biến. Ví dụ, sử dụng toán tử typeof để kiểm tra kiểu dữ liệu của một biến có phải là "string" hay không.
2. Kiểm tra tồn tại (Existence checks): Kiểm tra xem một thuộc tính hoặc phương thức có tồn tại trong một đối tượng hay không trước khi truy cập vào nó.
3. Kiểm tra độ rỗng (Null checks): Kiểm tra xem một biến có giá trị null hay không trước khi sử dụng nó.
4. Kiểm tra kiểu union (Type unions): Sử dụng kiểu union để giới hạn kiểu dữ liệu của biến dựa trên các giá trị có thể có. Ví dụ, kiểu number | string chỉ cho phép giá trị là số hoặc chuỗi.

<i>
Narrowing giúp TypeScript kiểm tra các lỗi tiềm ẩn và gợi ý các phương pháp xử lý dữ liệu phù hợp. Nó cũng giúp tăng cường tính chính xác và khả năng đọc hiểu mã nguồn, giúp bạn viết mã TypeScript an toàn và dễ bảo trì hơn.
</i>

## `typeof` Type guards

- Giống `js` toán tử `typeof` trả về kiểu dữ liệu của giá trị: "`string`", "`number`", "`bigint`", "`boolean`", "`symbol`", "`undefined`", "`object`", "`function`"

```typescript
function paddLeft(padding: number | string, input: string): string {
  if (typeof padding === 'number') {
    return ' '.repeat(padding) + input; // padding là số
  } else {
    return padding + input; // padding là chuỗi
  }
}
```

## Truthiness - Các giá trị truthy, falsy

- Khi so sánh (|| &&) các giá trị sẽ được ép kiểu về boolean để so sánh các giá trị truthy sẽ true và falsy sẽ false

```typescript
function getUsersOnlineMessage(numUsersOnline: number) {
  if (numUsersOnline) {
    // numUsersOnline là giá trị truthy sẽ vào đây Vd: 1, '2', {}
    return `There are ${numUsersOnline} online now!`;
  }
  // numUsersOnline là falsy như null, undefined, 0, NaN
  return "Nobody's here. :(";
}
```

## Equality narrowing

- TypeScript cũng sử dụng các câu lệnh chuyển đổi if-else, switch và kiểm tra đẳng thức như ===, !==, == và != để thu hẹp các loại.

```typescript
function example(x: string | number, y: string | boolean) {
  if (x === y) {
    // Khi x === y thì chắc chắn rằng chỉ có thể x và y là chuỗi vì union x là chuỗi hoặc số còn y là chuỗi hoặc boolean
    x.toUpperCase();
    y.toLowerCase();
  } else {
    console.log(x);
    console.log(y);
  }
}
```

## The `in` operator narrowing

- Toán tử `in` để xác định xem một đối tượng có thuộc tính có tên hay không.

## Narrowing `instanceof`

- Kiểm tra xem đối tượng có phải được tạo từ class nào đó hay không

## Using type predicates `is`

- Thường dùng để kiểm tra xem đối tượng có chung kiểu với `type` hay không và thường được dùng trong `return type` cuả `function`.

```typescript
function isFish(pet: Fish | Bird): pet is Fish {
  return (pet as Fish).swim !== undefined;
}
```
## Discriminated unions

- Đối với các type muốn thu hẹp có nhiều cách khác nhau như kiểm tra xem có thuộc tính hay không `in`, thêm thuộc tính để phân biệt, ...

```typescript
interface Circle {
  kind: "circle";
  radius: number;
}
 
interface Square {
  kind: "square";
  sideLength: number;
}
// kind dùng để phân loại giữa Circle và Square
type Shape = Circle | Square;
```