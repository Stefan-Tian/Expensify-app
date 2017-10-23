// const person = {
//   name: "Stefan",
//   age: 26,
//   location: {
//     city: "Zhongli",
//     temp: 38
//   }
// };

// // I can rename it, or set a default value.
// const {
//   name,
//   country = "Taiwan",
//   location: { city, temp: temperature }
// } = person;
// console.log(
//   `${name} lives in ${country} ${city}, where is ${temperature} degree now`
// );

const book = {
  title: "Ego is the enemy",
  author: "Ryan Holiday",
  publisher: {
    name: undefined
  }
};

// rename it first and set a default
const { publisher: { name: publisherName = "Self-Published" } } = book;
console.log(publisherName);
