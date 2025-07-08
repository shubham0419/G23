//// ------------------- Destructure ----------------------------

// const body = {
//   name:"shubham",
//   email:"shubham@gmail.com",
// }

// console.log(body.name);
// console.log(body["name"]);

// const {email} = body;
// console.log(email);


// // Array
// const arr = [1,2,3,4,5,6,7];

// const [ele0,sec] = arr;
// console.log(ele0,sec); // --> 1,2

//// ------------------- module ----------------------------

// const format_date = require("./utils/date-converter");

// let date = format_date("07-07-2025");
// console.log(date);

// const date_converter = require("./utils/date-converter");

// let resultDate = date_converter.formatDate("07-07-2025");
// console.log(resultDate);

// // import with destructring
const {formatDate,anotherConverter} = require("./utils/date-converter");

let resultDate = formatDate("07-07-2025");
console.log(resultDate);

resultDate = anotherConverter("07-07-2025");
console.log(resultDate);