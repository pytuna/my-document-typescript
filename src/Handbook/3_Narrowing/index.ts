// Narrowing: typeof
function paddLeft(padding: number | string, input: string): string {
  if (typeof padding === 'number') {
    return ' '.repeat(padding) + input;
  } else {
    return padding + input;
  }
}
console.log('Narrowing: typeof', paddLeft('_______', 'hello'));

// Narrowing: Truthiness

function getUsersOnlineMessage(numUsersOnline: number) {
  if (numUsersOnline) {
    return `There are ${numUsersOnline} online now!`;
  }
  return "Nobody's here. :(";
}

console.log('Narrowing: Truthiness', getUsersOnlineMessage(1));

// Narrowing: in
type Fish = { swim: () => void };
type Bird = { fly: () => void };

function move(animal: Fish | Bird) {
  if ('swim' in animal) {
    return animal.swim();
  }
  return animal.fly();
}
const animal: Fish = {
  swim() {
    return 'Cá 7 màu bơi';
  },
};

console.log('Narrowing: in', move(animal));

// Narrowing: instanceof
function logValue(x: Date | string) {
  if (x instanceof Date) {
    console.log(x.toUTCString());
  } else {
    console.log(x.toUpperCase());
  }
}

logValue(new Date());

// Narrowing: type predicates
function getSmallPet(animal: Fish | Bird): Fish | Bird{
  return animal;
}
function isFish(pet: Fish | Bird): pet is Fish {
  return (pet as Fish).swim !== undefined;
}
// ---cut---
const pet = getSmallPet({
  swim() {
    return 'Cá 7 màu bơi';
  },
} as Fish);

if (isFish(pet)) {
  console.log(pet.swim());
} else {
  pet.fly();
}
