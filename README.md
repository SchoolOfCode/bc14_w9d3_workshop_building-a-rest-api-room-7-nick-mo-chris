# Workshop - Building a REST API

## 🎯 Workshop objectives

- ☑️ Build a REST API using Node.js and Express
- ☑️ Create API endpoints allowing the user to create, read, update and delete a resource
- ☑️ Use Thunderclient/Postman to make HTTP requests to test API endpoints

<br>

## 💼 The brief

Chris wants to build an inspirational quotes app so his words of wisdom are never lost and easily accessible for future bootcampers.

Today your job is to build the REST API (the backend for the app).

The API will use the `quotes.js` helper functions previously built in the "working-with-files" workshop.

The API will feature the following endpoints:

| HTTP Method | Path            | Query Params | Request Body (JSON)     | Response Body (JSON)          | Status Code | Result                         |
| ----------- | --------------- | ------------ | ----------------------- | ----------------------------- | ----------- | ------------------------------ |
| GET         | /api/quotes     |              |                         | An array of all quote objects | 200         | Gets all quotes                |
| GET         | /api/quotes     | ?type=random |                         | A random quote object         | 200         | Gets a randomly selected quote |
| POST        | /api/quotes     |              | { quoteText: (String) } | A newly created quote object  | 201         | Creates a new quote            |
| PATCH       | /api/quotes/:id |              | { quoteText: (String) } | An edited quote object        | 200         | Updates a quote                |
| DELETE      | /api/quotes/:id |              |                         | A deleted quote object        | 200         | Deletes a quote                |

<br>

## 🎫 Ticket 1 - Starter files

This project has already been initialized for you using the `npm init` command.

Open the `package.json` file and you'll notice that the following dependencies have already been added:

- uuid - a package you'll use to generate unique ids
- express - a package you'll use to handle http requests and send responses
- nodemon - a package that auto restarts the server whenever you make changes to the API

Now would be a good time to install these packages and their dependencies.

Run `npm install` in the terminal.

Another key thing to notice is the `dev` script.

This will enable you to start the Express server using `nodemon` by running `npm run dev` in the terminal.

The following files have been created for you in the root of your project:

- `quote.js` - where the helper functions will be located
- `quotes.json` - where the list of quotes will be stored
- `app.js` - where your Express/API logic will be located
- `.gitignore` - tells git what files to ignore

We've initialized `quotes.json` with an array of Chris's favorite quotes to get you started.

💡 In your `.gitignore` file we've added "node_modules" as you don't want all of those files being pushed up to GitHub.

<br>

## 🎫 Ticket 2 - Creating CRUD routes

<br>

### 🎫 Ticket 2a - Getting familiar with app.js

Open `app.js`.

You'll notice that the code for a basic Express API is already there.

```js
import express from "express";
const app = express();
const PORT = 3000;

import { getQuotes, addQuote, getRandomQuote, editQuote, deleteQuote } from "./quote.js";

app.use(express.json());

app.get("/", function (req, res) {
  res.send("Welcome to cwissy.rest");
});

app.listen(PORT, function () {
  console.log(`Server is now listening on http://localhost:${PORT}`);
});
```

💡 It would be a good idea to test out the route handler provided by sending a HTTP GET request (via Thunderclient/Postman) to the URL logged in the terminal. Don't forget to start the server beforehand `npm run dev`.

If the server starts and you're getting the correct response (`Welcome to cwissy.rest`) in Thunderclient/Postman, move on to the next ticket. ✔️

<br>

### 🎫 Ticket 2b - Create the GET route handler

Write a request handler to return the correct response and perform the correct action when a `GET` request is received to `/api/quotes`.

💡 This endpoint will respond with a random quote object or an array of all quote objects, depending on whether the `?type=random` query string is present.

<br>

### 🎫 Ticket 2c - Create the POST route handler

Write a request handler to return the correct response and perform the correct action when a `POST` request is received to `/api/quotes`. Choose the appropriate helper function to create your data.

<br>

### 🎫 Ticket 2d - Create the PATCH route handler

Write a request handler to return the correct response and perform the correct action when a `PATCH` request is received to `/api/quotes/:id`. Choose the appropriate helper function to update your data.

<br>

### 🎫 Ticket 2e - Create the DELETE route handler

Write a request handler to return the correct response and perform the correct action when a `DELETE` request is received to `/api/quotes/:id`. Choose the appropriate helper function to delete your data.

<br>

## 🥇 You've finished!

🔍 Take another look at your code and see if anything can be refactored.

📮 If you do make any changes while refactoring make sure to re-test your routes using Thunderclient/Postman.

🚁 Once you've done that, you could check to see if any fellow bootcampers need help.
