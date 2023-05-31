import 'reflect-metadata';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
// type anyFunc = (...args: Array<any>) => any;

// function funcInfo<T extends anyFunc>(func: T): string {
//   return `Function "${func.name}" accepts "${func.length}" arguments`;
// }

// const add = (a: number, b: number) => a + b;
// const sayMyName = (s: string) => console.log(s);

// console.log('add info ->', funcInfo(add));
// console.log('sayMyName info ->', funcInfo(sayMyName));

// console.log('check ->', Reflect.defineMetadata);

// const target = {
//   name: 'Nam', age: 21
// }

// Reflect.defineMetadata('github', 'pytuna', target)
// Reflect.defineMetadata('major', 'Nodejs', target)
// Reflect.defineMetadata('top', 'string', target, 'Zuka')


// console.log(target);
// console.log(Reflect.getMetadata('top', target, 'Zuka'))

// console.log(Reflect.getOwnMetadataKeys(target));
// Reflect.getOwnMetadataKeys(target).forEach(key=>{
//   console.log(`${key}: "${Reflect.getOwnMetadata(key, target)}"`);
// })


// Decorator example
function log(target: any, key: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  Reflect.defineMetadata('haha', '123', target);
  descriptor.value = function (...args: any[]) {
    console.log(`Calling ${key} with arguments: ${args}`);
    const result = originalMethod.apply(this, args);
    console.log(`Method ${key} returned: ${result}`);
    return result;
  };

  return descriptor;
}

// Class example with decorator and metadata
class Calculator {
  @log
  add(a: number, b: number) {
    return a + b;
  }
}

// Usage
const calculator = new Calculator();
calculator.add(2, 3); 
console.log(Reflect.getMetadataKeys(calculator));