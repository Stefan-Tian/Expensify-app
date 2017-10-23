const address = [
  "1299 S Jupiter Street",
  "Philadelphia",
  "Pennsylvania",
  "19147"
];

const [street, city, state, zip] = address;
// or const [, , state, zip] = address;

console.log(`You live in ${city}`);

const item = ["Coffee (hot)", "$2.00", "$2.50", "$2.75"];
const [product, , mPrice] = item;
console.log(`A medium ${product} costs ${mPrice}`);
