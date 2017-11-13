import * as firebase from "firebase";

const config = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID
};

firebase.initializeApp(config);

const database = firebase.database();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();


export { firebase, googleAuthProvider, database as default };

// database
//   .ref("expenses")
//   .once("value")
//   .then(snapshot => {
//     const expenses = [];
//     snapshot.forEach(childSnapshot => {
//       expenses.push({
//         id: childSnapshot.key,
//         ...childSnapshot.val()
//       });
//     });
//     console.log(expenses);
//   }); // change firebase object to array

// database.ref("expenses").on("value", snapshot => {
//   const expenses = [];
//   snapshot.forEach(childSnapshot => {
//     expenses.push({
//       id: childSnapshot.key,
//       ...childSnapshot.val()
//     });
//   });
//   console.log(expenses);
// });

// database.ref("expenses").on("child_removed", snapshot => {
//   console.log(snapshot.key, snapshot.val());
// });

// database.ref("expenses").on("child_changed", snapshot => {
//   console.log(snapshot.key, snapshot.val());
// });
// database.ref("expenses").push({
//   description: "Lunch",
//   amount: 100,
//   note: "the egg isn't nice.",
//   createdAt: 111
// });

// database.ref("notes").push({
//   title: "Course topics",
//   body: "React Native"
// });

// database.ref("notes/-Kxg8j9hOzl4TUp3ImsK").update({
//   body: "Go and buy food"
// });
// database.ref().on("value", snapshot => {
//   const val = snapshot.val();
//   console.log(`${val.name} is a ${val.job.title} at ${val.job.company}`);
// }); // subscribe

// database
//   .ref()
//   .once("value")
//   .then(snapshot => {
//     const val = snapshot.val();
//     console.log(val);
//   })
//   .catch(e => {
//     console.log("Error fetching the data", e);
//   });

// database
//   .ref()
//   .set({
//     name: "Stefan Tian",
//     age: 20,
//     isSingle: true,
//     stressLevel: 6,
//     job: {
//       title: "Software Engineer",
//       company: "Google"
//     },
//     location: {
//       city: "Philadelphia",
//       country: "United States"
//     }
//   })
//   .then(() => {
//     console.log("Succefully saved the data");
//   })
//   .catch(e => {
//     console.log(e);
//   });

// database
//   .ref("isSingle")
//   .remove()
//   .then(() => {
//     console.log("Successfully removed the data !");
//   })
//   .catch(e => {
//     console.log("Failed to remove the data = (", e);
//   });

// database
//   .ref()
//   .update({
//     stressLevel: 9,
//     "job/company": "Amazon",
//     "location/city": "Seattle"
//   })
//   .then(() => {
//     console.log("Successfully updated the data !");
//   })
//   .catch(e => {
//     console.log("Failed to update the data = (", e);
//   });
