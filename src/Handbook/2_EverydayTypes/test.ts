type outputType = {
  [key: string]: string;
};
// input
const color = 'white,black,blue';
const storage = '64GB,128GB';
const price = '500USD,700USD,1000USD';
const amount = '100,200,50,300';
const obj = { color, storage, price, amount };

function test(obj: { [key: string]: string }): outputType[] {
  const keys = Object.keys(obj);

  return keys.reduce((previousValue, currentValue) => {
    const key: string = currentValue;
    const prevOutput: outputType[] = previousValue;

    const newArr: string[] = obj[key].split(',');

    if (prevOutput.length === 0) {
      const newOutput: outputType[] = [];

      newArr.forEach((value) => {
        const output: outputType = {
          [key]: value,
        };
        newOutput.push(output);
      });

      return newOutput;
    } else {
      return prevOutput.reduce((previousValue, currentValue) => {
        const outputs = newArr.map((value) => {
          return {
            ...currentValue,
            [key]: value,
          } as outputType;
        });

        return [...previousValue, ...outputs];
      }, [] as outputType[]);
    }
  }, [] as outputType[]);
}
// output
const result = test(obj);
console.log(result, `Array size ${result.length}`);

// const output: outputType[] = color.split(',').reduce((previousValue, currentValue) => {
//   const outputReduce: outputType[] = storage.split(',').map((itemStorage) => {
//     return {
//       color: currentValue,
//       storage: itemStorage,
//     } as outputType;
//   });
//   return [...previousValue, ...outputReduce];
// }, [] as outputType[]);
// console.log(output);
