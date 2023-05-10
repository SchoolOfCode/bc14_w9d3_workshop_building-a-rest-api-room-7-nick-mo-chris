const express = require("express");
const morgan = require("morgan");
const app = express();
const port = 3000;

const {
  getQuotes,
  addQuote,
  getRandomQuote,
  editQuote,
  deleteQuote,
} = require("./quote.js");

// Using morgan middleware as a logger
app.use(morgan("dev"));

// Tell express to serve static files
app.use(express.static("public"));

// Parsing the JSON body
app.use(express.json());

// Create the GET route handler
app.get("/api/quotes", async function (req, res) {
  // if the query string type equals random return a random quote
  if (req.query.type === "random") {
    // Get a random quote and store in variable
    const randomQuote = await getRandomQuote();
    // Send the random quote in the response along with a 200 error code (response body will be in JSON format)
    res.status(200).json(randomQuote);
  } else {
    // store all the quotes in a variable
    const quotes = await getQuotes();
    // send a response with an array of all quotes
    res.status(200).json(quotes);
  }
});

// Create the POST route handler - /api/quotes
app.post("/api/quotes", async function (req, res) {
  // Create the new quote
  const newQuote = await addQuote(req.body.quoteText);
  // Send a response with a 201 status code containing the newly created quote
  res.status(201).json(newQuote);
});

// Create the PATCH route handler - /api/quotes/:id
app.patch("/api/quotes/:id", async function (req, res) {
  // Get the id of the quote we want to update (req.params)
  const id = req.params.id;
  // Get the new quoteText from the request body
  const { quoteText } = req.body;
  // Update the quote with the new quoteText
  const updatedQuote = await editQuote(id, quoteText);
  // Send a response with a 200 status code and the newly edited quote
  res.status(200).json(updatedQuote);
});

// Create the DELETE route handler - /api/quotes/:id
app.delete("/api/quotes/:id", async function (req, res) {
  // Get the id of the quote we want to delete
  const id = req.params.id;
  // Delete the quote and store it in a variable
  const deletedQuote = await deleteQuote(id);
  // send a response with a 200 status code and the deleted quote object
  res.status(200).json(deletedQuote);
});

app.listen(port, function () {
  console.log(`Server listening on port ${port}`);
});
