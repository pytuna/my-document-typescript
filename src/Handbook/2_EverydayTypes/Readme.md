# Everyday Types

## The primitives: `string`, `number`, `boolean`

## Arrays: `number[]`, `Array<number>` `...`

## `any`

- Khi một giá trị thuộc loại `any`, thì `.ts` trở về thành `.js` :') => để code `ts` chuẩn ta nên chọn `noImplicitAny` trong `tsconfig.json`

## Functions

- Trong `ts` cho phép đặt kiểu dữ liệu cho các params và hàm có kiểu trả về như `java`, `c++`

```typescript
declare function addTwoInterger(a: number, b: number): number;
```

- Khi một hàm xuất hiện ở nơi mà `ts` có thể xác định cách nó sẽ được gọi, thì các tham số của hàm đó sẽ tự động được cung cấp các loại.

```typescript
const names = ['Alice', 'Bob', 'Eve'];
names.forEach(function (s) {
  // Tự hiểu s là string vì mảng names là `string[]`
  console.log(s.toUpperCase());
});
```

## UNION Types

- Union là loại được hình thành từ hai hoặc nhiều loại khác, đại diện cho các giá trị có thể là bất kỳ loại nào trong các loại đó.

```typescript
let a: number | string | boolean;
a = 12;
a = 'hello';
a = true;
a = {}; // Error
```

- Khi sử dụng `Union` ta phải thu hẹp phạm vi sử dụng (`Narrowing`) để tránh gặp lỗi khi code và khi runtime.

## Type Aliases

- `Type Aliases` giúp ta define một loại kiểu để sử dụng nhiều lần sau này và thống nhất cho 1 kiểu dữ liệu.

- Kế thừa dùng `&`

- Không thể sửa đổi hay thêm `fields`

```typescript
type Point = {
  x: number;
  y: number;
};
type Padding = 'left' | 'right' | 'top' | 'bottom';
type ID = number | string;
```

## Interfaces

- Giống với `Type Aliases` nhưng ta nên dùng `Interfaces` với OOP trong `ts`

- Kế thừa dùng `extends`

- Có thể thêm `fields`

## Type Assertions

- Đôi khi, ta sẽ có thông tin về loại giá trị mà `ts` không thể biết được. Vậy nên ta có thể ép kiểu thủ công để `ts` có thể biết đc nhé. Để ép kiểu dùng `as`.

```typescript
const a: string = '12';
const b: number = a as unknown as number;
```

- Ép kiểu mà quá đáng thí `ts` sẽ báo lỗi

```typescript
const x = 'hello' as number;
// Conversion of type 'string' to type 'number' may be a mistake because neither type sufficiently overlaps with the other. If this was intentional, convert the expression to 'unknown' first.
```

## Literal Types

- Có thể define 1 type là giá trị cụ thể nào đó là `string`, `number`...

```typescript
type Padding = 'top' | 'bottom';
type IntRange = 10 | 100 | 200;
type CSS = `${number} ${'px' | 'em' | 'rem'}`;
```

## Literal Inference

```typescript
declare function handleRequest(url: string, method: "GET" | "POST"): void;
// ---cut---
const req = { url: "https://example.com", method: "GET" };
handleRequest(req.url, req.method); // (req.method) Argument of type 'string' is not assignable to parameter of type '"GET" | "POST"'.
```
- Vì hàm `handleRequest` chỉ chấp nhận `Union Literal Types` là `GET` và `POST` mà trong object `req` property `method` cũng là `GET` nhưng `ts` hiểu nó là `string` chứ không phải là `GET` nên ta phải ép kiểu.

```typescript
// Change 1: Ép khứa method trong req thành as "GET"
const req = { url: "https://example.com", method: "GET" as "GET" };
// Change 2: Ép cái param khi truyền vào thành as "GET"
handleRequest(req.url, req.method as "GET");

// Cách đặc biệt: Chuyển req thành as const
const req = { url: "https://example.com", method: "GET" } as const;
handleRequest(req.url, req.method);
```