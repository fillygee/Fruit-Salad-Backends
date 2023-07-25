// // const http = require("http"); /// bring http into a module
// // const port = 3000; // setting the port number
// // const server = http.createServer((req, res) => {
// // 	res.setHeader("Content-Type", "text/html"); /// saying the head is going to be a text or html

// // 	//res.statusCode = 404; << telling the server to send a 404 error message
// // 	res.end(
// // 		"<img src='https://image.petmd.com/files/styles/978x550/public/2023-04/kitten-development.jpeg?w=1080&q=75'>"
// // 	); // requirement is what it takes fromthe browser, we choose what we send as a resolution, telling to send hello and that is all
// // });

// // server.listen(port, () => console.log(`App running on port; ${port}`));
// // // passing a port number , when it runs we'll see "app running on port 3000" logged

// const express = require("express");
// const app = express();
// const port = 3000;

// // app.get("/", (req, res) => {
// // 	res.send("Hello World"); // means we don't have to add anything into our url
// // });

// app.get("/penguins", (req, res) => {
// 	//res.status(204).send(); //
// 	res.send("Here are the penguins"); // means we don't have to add anything into our url
// });

// // app.get("/penguins/:name", (req, res) => {
// // 	res.send(req.query); // req is what goes into the url and res is what you do with the outcome
// // });
// app.listen(port, () => console.log(`App running on port ${port}`));
require("dotenv").configDotenv();
const cors = require("cors");
const express = require("express");
const app = express(); // must have brackets after that

const port = process.env.PORT;

const fruits = require("./fruits.js");

app.use(cors());
app.use("/fruits", express.json());

app.get("/", (req, res) => {
	res.send("Hello fruity!");
});

app.get("/fruits", (req, res) => {
	res.send(fruits);
});

//app.get("/fruits/:name", (req, res) => {
//res.send(`Return a fruit with name ${req.params.name}`); /// what the users put in the url / name could be anything
//}); // if you wanted calories, do req.params.nutrition.calories

// app.get("/fruits/:name", (req, res) => {
// 	for (let i: 0; i < fruits.length; i++) {
// 		if (req === fruits[i]) {
// 			req = req.toLowerCase();
// 			let arr = req.split(",");
// 			arr[0] = arr[0].toUpperCase();
// 			req = arr.join("");

// 		}
//         res.send('return a fruit' )
// 	}

// 	}

// 	/// what the users put in the url / name could be anything
// }); // if you wanted calories, do req.params.nutrition.calories

app.get("/fruits/:name", (req, res) => {
	const name = req.params.name.toLowerCase();
	const fruit = fruits.find((fruit) => fruit.name.toLowerCase() == name);
	if (fruit === undefined) {
		res.status(404).send("The fruit doesn't exist.");
	} else {
		res.send(fruit);
	}
});

//(fruits.some((fruit) => fruit === fruits[fruit])) {

const ids = fruits.map((fruit) => fruit.id);
let maxId = Math.max(...ids);

app.post("/fruits", (req, res) => {
	const fruit = fruits.find(
		(fruit) => fruit.name.toLowerCase() == req.body.name.toLowerCase()
	);
	if (fruit != undefined) {
		res.status(409).send("The fruit already exists");
	} else {
		maxId += 1;
		req.body.id = maxId;

		fruits.push(req.body);
		res.status(201).send(req.body);
	}
});

app.delete("/fruits/:name", (req, res) => {
	const name = req.params.name.toLowerCase();
	const fruitIndex = fruits.findIndex(
		(fruit) => fruit.name.toLowerCase() == name
	);
	if (fruitIndex === -1) {
		res.status(404).send("The fruit doesn't exist");
	} else {
		fruits.splice(fruitIndex, 1);
		res.sendStatus(204);
	}
});

app.listen(port, () => console.log(`App running on ${port}`));

module.exports = app;
