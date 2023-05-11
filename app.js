import express from "express";
import morgan from "morgan";
const app = express();
const PORT = 3004;

import {
  getQuotes,
  addQuote,
  getRandomQuote,
  editQuote,
  deleteQuote,
} from "./quote.js";

// Parse the JSON data and turns them into JS objects
  // The data will need to be stringified before sending it to the client
app.use(express.json());

// Morgan Middlewear
  // returns the morgan type:'tiny' log
app.use(morgan("tiny")); 

// Custom middleware
  // returns the number of key pairs in the object being returned
app.use((req, res, next) => {
  console.log(Object.keys(req).length);
  // Call the next middleware function in line
  next();
});

// returns the static file 'public' and it's contents
  // only renders in the browser
app.use(express.static("public"));

app.post("/api/quotes", async (req, res) => {
  const newQuote = await addQuote("NEW QUOTE!");
  console.log(newQuote);
  res.send(newQuote);
  // Example Request: http://localhost:3000/api/quotes
  // Don't forget it's a POST request.
});

app.patch("/api/quotes/:id", async (req, res) => {
  // Patch should update a quote.
  // console.log(req.params.id)
  const { id } = req.params;
  const updatedQuote = await editQuote(id, "Different quote test.");
  // console.log(updatedQuote)
  return res.send(updatedQuote);

  // Example Request: http://localhost:3000/api/quotes/0f39b18b-7773-4f5e-b2f6-383b0f110c35
});

app.get("/", function (req, res) {
  res.send("Welcome to cwissy.rest");
  console.log("Testing");
  // Example Request: http://localhost:3000
});

// Write a request handler to return the correct response and perform the correct action when a GET request is received to /api/quotes
app.get("/api/quotes", async function (req, res) {
  console.log(req.query);
  if (req.query.type === "random") {
    const randomQuote = await getRandomQuote();
    // console.log(randomQuote);
    return res.send(randomQuote.quoteText);
    //Example Request: http://localhost:3000/api/quotes?type=random
  }
  const quotes = await getQuotes();
  console.log(quotes);
  // res.send(quotes);
  res.send(quotes.map((quote) => quote.quoteText));
  //Example Request: http://localhost:3000/api/quotes
});

// Write a post request to delete a post
app.delete("/api/quotes/:id", async function (req, res) {
  // Pulling the id out of parameters (end of the URL)
  const { id } = req.params;
  // create a new variable from the deleteQuote function - should return the deleted item
  const deletedQuote = await deleteQuote(id);
  // Sends the deleted quote to user
  res.send(deletedQuote);
});

app.listen(PORT, function () {
  console.log(`Server is now listening on http://localhost:${PORT}`);
});
