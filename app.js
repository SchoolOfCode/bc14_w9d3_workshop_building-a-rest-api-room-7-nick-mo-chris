import express from 'express';
const app = express();
const PORT = 3000;

import {
	getQuotes,
	addQuote,
	getRandomQuote,
	editQuote,
	deleteQuote,
} from './quote.js';

app.post("/api/quotes", async (req, res) => {
	const newQuote = await addQuote("NEW QUOTE!")
	console.log(newQuote)
	res.send(newQuote)
});

app.use(express.json());

app.get('/', function (req, res) {
	res.send('Welcome to cwissy.rest');
});

// Write a request handler to return the correct response and perform the correct action when a GET request is received to /api/quotes
app.get('/api/quotes', async function (req, res) {
	console.log(req.query);
	if (req.query.type === 'random') {
		const randomQuote = await getRandomQuote();
		// console.log(randomQuote);
		return res.send(randomQuote.quoteText);
	}
	const quotes = await getQuotes();
	console.log(quotes);
	// res.send(quotes);
	res.send(quotes.map(quote => quote.quoteText));
});

app.listen(PORT, function () {
	console.log(`Server is now listening on http://localhost:${PORT}`);
});
