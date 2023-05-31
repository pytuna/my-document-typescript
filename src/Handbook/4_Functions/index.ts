function map<Input, Output>(arr: Input[], func: (arg: Input) => Output): Output[] {
  return arr.map(func);
}
 
// Parameter 'n' is of type 'string'
// 'parsed' is of type 'number[]'
const parsed = map(["1", "2", "3"], (n) => Boolean(n)); // Input string Output boolean
const parsed2 = map(["1", "2", "3"], (n) => (n)); // Input string Output string
const parsed3 = map(["1", "2", "3"], (n) => parseInt(n)); // Input string Output number
