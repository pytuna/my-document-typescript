# The Basics - Typescript

[Link](https://www.typescriptlang.org/docs/handbook/2/basic-types.html)

---

TypeScript giống với các ngôn ngữ OOP như java/c# giúp hạn chế các lỗi thường gặp trong Javascript

---

## Kiểm tra kiểu tĩnh

- Typescript sẽ kiểm tra lỗi khi gõ và thông báo ngay trong khi viết code và trước khi chạy chương trình

```typescript
const message = 'hello!';
message();
/* 
This expression is not callable.
Type 'String' has no call signatures.
*/
```

---

## Kiểm tra lỗi thường gặp

- Thường JS chỉ hay gặp lỗi khi runtime. Nhưng những lỗi cú pháp khi lập trình thì JS vẫn chạy được khiến chương trình xảy ra lỗi khi runtime. [The ECMAScript specification](https://tc39.github.io/ecma262/) có hướng dẫn rõ ràng về cách JS sẽ hoạt động khi nó gặp phải điều gì đó không mong muốn.

> Ví dụ: Khi truy xuất 1 giá trị undefined trong Object là bình thường trong JS nhưng trong TS sẽ báo lỗi

```typescript
const user = {
  name: 'Daniel',
  age: 26,
};

user.location;
/*
Property 'location' does not exist on type '{ name: string; age: number; }'.
*/
```

> Ví dụ: Hàm chưa được gọi

```typescript
function flipCoin() {
  // Meant to be Math.random()
  return Math.random < 0.5;
  /*
Operator '<' cannot be applied to types '() => number' and 'number'.
*/
}
```

> Ví dụ: Các lỗi logic cơ bản

```typescript
const value = Math.random() < 0.5 ? 'a' : 'b';
if (value !== 'a') {
  // ...
} else if (value === 'b') {
  /*
This comparison appears to be unintentional because the types '"a"' and '"b"' have no overlap.
*/
  // Oops, unreachable
}
```

---

## Các loại tool của Typescript

- Trình kiểm tra kiểu sẽ gợi ý các thuộc tính & phương thức của một đối tượng nào đó
- Cung cấp trình sửa lỗi, tái cấu trúc lại code

---

## Trình biên dịch Typescript sang Javascript

```
npm install -g typescript
```

- Biên dịch file ts sang js bằng cmd hoặc dựa trên cấu hình trên tsconfig
- Nên chọn cấu hình `--noEmitOnError` để khi file `.ts` có lỗi sẽ ngăn chặn biên dịch và cập nhật sang file `.js` và thông báo lỗi

---

## Hạ cấp

- TypeScript có khả năng viết lại mã từ các phiên bản ECMAScript mới hơn sang các phiên bản cũ hơn như ECMAScript 3 hoặc ECMAScript 5 (còn gọi là ES3 và ES5). Quá trình chuyển từ phiên bản ECMAScript mới hơn hoặc “cao hơn” xuống phiên bản cũ hơn hoặc “thấp hơn” đôi khi được gọi là hạ cấp
- Hạ cấp có thể thay đổi trong file `tsconfig.json`

---

## Sự nghiêm ngặc - strict mode

- Giúp viết code TS ít xảy ra lỗi hơn, có thể thay đổi cấu hình trong file `tsconfig.json`

### `noImplicitAny`

- Tuy nhiên, việc sử dụng `any` thường mất đi mục đích sử dụng TypeScript ngay từ đầu. Chương trình càng lớn thì càng dễ gây ra lỗi hơn. Bật `noImplicitAny` cờ sẽ báo lỗi trên bất kỳ biến nào có loại được suy ra ngầm định là any.

### `strictNullChecks`

- Theo mặc định, các giá trị như `null` và `undefined` có thể gán cho bất kỳ loại nào khác. Điều này có thể làm cho việc viết một số đoạn mã trở nên dễ dàng hơn, nhưng lại hay quên xử lý `null` và `undefined` là nguyên nhân của vô số lỗi trên thế giới - một số người coi đó là [sai lầm tỷ đô](https://www.youtube.com/watch?v=ybrQvs4x0Ps) ! Cờ `strictNullCheckslàm` cho việc xử lý `null` và `undefined` rõ ràng hơn, đồng thời giúp chúng ta không phải lo lắng về việc liệu chúng ta có quên xử lý `null` và `undefined`.
