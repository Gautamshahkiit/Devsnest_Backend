// var fs = require("fs");
// // Create
// fs.mkdirSync("day_05");
// // Read
// fs.writeFileSync("day_05/hello.txt", "Hi");
// fs.appendFileSync("day_05/hello.txt", "Hello");
// const data = fs.readFileSync("day_05/hello.txt", "utf-8");
// console.log(data);
// fs.renameSync("day_05/hello.txt", "day_05/hello1.txt");
// fs.unlinkSync("day_05/hello1.txt");
// fs.rmkdir("day_05");

var Test = require("./req_test");
var Obj = new Test();
console.warn(Obj.print());